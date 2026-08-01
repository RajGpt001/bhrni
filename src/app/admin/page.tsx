import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalProducts = await prisma.product.count();
  const totalOrders = await prisma.order.count();
  const totalCategories = await prisma.category.count();
  
  // Recent orders
  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalProducts}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{totalCategories}</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-200 dark:border-zinc-800 overflow-hidden mt-8">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-zinc-800">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-zinc-800/50 text-xs uppercase text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-800">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{order.id.slice(-8).toUpperCase()}</td>
                    <td className="px-6 py-4">{order.user?.name || 'Guest'}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">₹{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
