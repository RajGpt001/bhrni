'use server'

import { createClient } from '@/lib/supabase/server'

export async function validateCoupon(code: string, cartTotal: number) {
  if (!code || typeof code !== 'string') return { error: 'Invalid coupon code' }
  const upperCode = code.toUpperCase().trim()

  const supabase = await createClient()

  const { data: coupon, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', upperCode)
    .single()

  if (error || !coupon) {
    return { error: 'Invalid coupon code' }
  }

  if (!coupon.is_active) return { error: 'Coupon is inactive' }
  
  const now = new Date()
  if (new Date(coupon.starts_at) > now) return { error: 'Coupon is not active yet' }
  if (coupon.expires_at && new Date(coupon.expires_at) < now) return { error: 'Coupon has expired' }
  
  if (cartTotal < coupon.min_order_value) return { error: `Minimum order value of ₹${coupon.min_order_value} required` }
  
  if (coupon.usage_limit && coupon.times_used >= coupon.usage_limit) return { error: 'Coupon usage limit reached' }

  // Calculate discount
  let discountAmount = 0
  if (coupon.discount_type === 'flat') {
    discountAmount = coupon.discount_value
  } else {
    discountAmount = cartTotal * (coupon.discount_value / 100)
    if (coupon.max_discount && discountAmount > coupon.max_discount) {
      discountAmount = coupon.max_discount
    }
  }

  // Cap discount at cart total
  if (discountAmount > cartTotal) {
    discountAmount = cartTotal
  }

  return { success: true, discountAmount, coupon: coupon }
}

export async function processCheckout(cartTotal: number, couponCode?: string) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to checkout' }
  }

  // If a coupon was provided, use the secure RPC to validate, increment limit safely, and create order
  if (couponCode) {
    const { data: result, error } = await supabase.rpc('redeem_coupon_and_create_order', {
      p_coupon_code: couponCode.toUpperCase().trim(),
      p_user_id: user.id,
      p_total_amount: cartTotal
    })

    if (error) {
      console.error("RPC Error:", error)
      return { error: 'Failed to process checkout. Please try again.' }
    }

    if (!result.success) {
      return { error: result.error }
    }

    return { success: true, orderId: result.order_id, discountAmount: result.discount_amount }
  } 
  
  // If no coupon, just create the order normally
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      status: 'pending',
      total_amount: cartTotal,
      discount_amount: 0
    })
    .select('id')
    .single()

  if (orderError) {
    console.error("Order Error:", orderError)
    return { error: 'Failed to process checkout. Please try again.' }
  }

  return { success: true, orderId: order.id, discountAmount: 0 }
}
