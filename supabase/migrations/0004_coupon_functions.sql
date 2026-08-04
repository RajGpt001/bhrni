-- ==========================================
-- 1. Redeem Coupon RPC Function
-- ==========================================
-- This function securely validates a coupon and creates an order in a single transaction.
-- It locks the coupon row to prevent race conditions when checking/incrementing usage_limit.

create or replace function public.redeem_coupon_and_create_order(
  p_coupon_code text,
  p_user_id uuid,
  p_total_amount numeric
) returns jsonb as $$
declare
  v_coupon record;
  v_discount_amount numeric(10,2) := 0;
  v_order_id uuid;
begin
  -- 1. If a coupon code is provided, validate and lock it
  if p_coupon_code is not null and trim(p_coupon_code) <> '' then
    select * into v_coupon 
    from public.coupons 
    where code = p_coupon_code 
    for update; -- Lock row

    -- Validations
    if not found then
      return jsonb_build_object('success', false, 'error', 'Coupon not found');
    end if;

    if v_coupon.is_active = false then
      return jsonb_build_object('success', false, 'error', 'Coupon is inactive');
    end if;

    if v_coupon.starts_at > now() then
      return jsonb_build_object('success', false, 'error', 'Coupon is not yet active');
    end if;

    if v_coupon.expires_at is not null and v_coupon.expires_at < now() then
      return jsonb_build_object('success', false, 'error', 'Coupon has expired');
    end if;

    if p_total_amount < v_coupon.min_order_value then
      return jsonb_build_object('success', false, 'error', 'Minimum order value not met (₹' || v_coupon.min_order_value || ')');
    end if;

    if v_coupon.usage_limit is not null and v_coupon.times_used >= v_coupon.usage_limit then
      return jsonb_build_object('success', false, 'error', 'Coupon usage limit reached');
    end if;

    -- Calculate Discount
    if v_coupon.discount_type = 'flat' then
      v_discount_amount := v_coupon.discount_value;
    else
      -- percentage
      v_discount_amount := (p_total_amount * (v_coupon.discount_value / 100.0));
      if v_coupon.max_discount is not null and v_discount_amount > v_coupon.max_discount then
        v_discount_amount := v_coupon.max_discount;
      end if;
    end if;
    
    -- Ensure discount doesn't exceed total
    if v_discount_amount > p_total_amount then
      v_discount_amount := p_total_amount;
    end if;

    -- Increment usage
    update public.coupons 
    set times_used = times_used + 1 
    where id = v_coupon.id;
  end if;

  -- 2. Create the Order
  insert into public.orders (user_id, status, total_amount, coupon_code, discount_amount)
  values (
    p_user_id, 
    'pending', 
    p_total_amount, 
    case when p_coupon_code is not null and trim(p_coupon_code) <> '' then p_coupon_code else null end, 
    v_discount_amount
  )
  returning id into v_order_id;

  return jsonb_build_object(
    'success', true, 
    'order_id', v_order_id, 
    'discount_amount', v_discount_amount
  );
end;
$$ language plpgsql security definer;
