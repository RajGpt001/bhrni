'use client'

import { useState } from 'react'
import { updateUserRole, toggleUserSuspension } from '../actions'
import { Shield, ShieldAlert, Ban, CheckCircle } from 'lucide-react'

export default function UserActions({ user }: { user: any }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleRoleChange = async () => {
    const newRole = user.role === 'admin' ? 'customer' : 'admin'
    
    if (newRole === 'customer' && !confirm('WARNING: You are about to remove ADMIN privileges from this user. They will lose access to the admin dashboard. Are you sure?')) {
      return
    }

    if (newRole === 'admin' && !confirm('Are you sure you want to promote this user to ADMIN?')) {
      return
    }

    setLoading(true)
    setError(null)
    const res = await updateUserRole(user.id, newRole)
    if (res?.error) setError(res.error)
    setLoading(false)
  }

  const handleSuspensionToggle = async () => {
    const action = user.is_active ? 'suspend' : 'reactivate'
    
    if (!confirm(`Are you sure you want to ${action} this user?`)) {
      return
    }

    setLoading(true)
    setError(null)
    const res = await toggleUserSuspension(user.id, !user.is_active)
    if (res?.error) setError(res.error)
    setLoading(false)
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-6">
      <h3 className="text-lg font-semibold border-b pb-2">Administrative Actions</h3>
      
      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
          <div>
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              {user.role === 'admin' ? <ShieldAlert className="h-4 w-4 text-purple-600" /> : <Shield className="h-4 w-4 text-gray-400" />}
              Role Management
            </h4>
            <p className="text-sm text-gray-500 mt-1">Current role: <span className="font-semibold uppercase">{user.role}</span></p>
          </div>
          <button
            onClick={handleRoleChange}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
              user.role === 'admin' 
                ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            {user.role === 'admin' ? 'Demote to Customer' : 'Promote to Admin'}
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
          <div>
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              {user.is_active ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Ban className="h-4 w-4 text-red-500" />}
              Account Status
            </h4>
            <p className="text-sm text-gray-500 mt-1">Current status: <span className="font-semibold uppercase">{user.is_active ? 'Active' : 'Suspended'}</span></p>
          </div>
          <button
            onClick={handleSuspensionToggle}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50 ${
              user.is_active 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {user.is_active ? 'Suspend User' : 'Reactivate User'}
          </button>
        </div>
      </div>
    </div>
  )
}
