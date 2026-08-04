import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ArrowLeft, History } from 'lucide-react'

export default async function ActivityLogPage() {
  const supabase = await createClient()

  // We need to fetch audit logs and join profiles to get admin name
  const { data: logs, error } = await supabase
    .from('admin_audit_log')
    .select('*, admin:profiles!admin_id(full_name, email)')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error("Error fetching audit logs:", error)
  }

  const formatDetails = (details: any) => {
    if (!details) return ''
    return Object.entries(details).map(([k, v]) => `${k}: ${v}`).join(', ')
  }

  const formatAction = (action: string) => {
    return action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users" className="text-gray-500 hover:text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-beige-900 flex items-center gap-2">
          <History className="h-6 w-6" /> Admin Audit Log
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Admin</th>
                <th className="px-6 py-4 font-medium">Action</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {logs?.map((log) => (
                <tr key={log.id} className="hover:bg-beige-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{log.admin?.full_name || 'Unknown'}</div>
                    <div className="text-gray-500 text-xs">{log.admin?.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {formatAction(log.action)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 uppercase">{log.target_table}</div>
                    <div className="font-mono text-xs text-gray-900 mt-1">{log.target_id.split('-')[0]}...</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-600">
                    {formatDetails(log.details)}
                  </td>
                </tr>
              ))}
              {logs?.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No activity logs found.
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
