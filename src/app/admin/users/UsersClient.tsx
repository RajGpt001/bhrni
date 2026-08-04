'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Shield, User, Ban } from 'lucide-react'

export default function UsersClient({ users }: { users: any[] }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.full_name || '').toLowerCase().includes(search.toLowerCase()) || 
      (user.email || '').toLowerCase().includes(search.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900 bg-white"
        >
          <option value="all">All Roles</option>
          <option value="customer">Customers</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-beige-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{user.full_name || 'No Name'}</div>
                    <div className="text-gray-500 text-xs">{user.email || 'No Email'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user.role === 'admin' ? <Shield className="h-3 w-3" /> : <User className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_active ? (
                      <span className="text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium">Active</span>
                    ) : (
                      <span className="text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                        <Ban className="h-3 w-3" /> Suspended
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.order_count}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">₹{user.total_spent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/users/${user.id}`} 
                      className="text-beige-900 hover:underline font-medium"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
