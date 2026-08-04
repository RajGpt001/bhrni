import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // Fetch profile to get role and full name
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="bg-beige-50 dark:bg-black min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-beige-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
              My Account
            </h2>
          </div>
          <div className="mt-4 flex md:ml-4 md:mt-0">
            <LogoutButton />
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow sm:rounded-lg border border-beige-200 dark:border-gray-800">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-beige-900 dark:text-white">Profile Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Personal details and account status.</p>
          </div>
          <div className="border-t border-beige-200 dark:border-gray-800 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-beige-200 dark:sm:divide-gray-800">
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-beige-800 dark:text-gray-400">Full name</dt>
                <dd className="mt-1 text-sm text-beige-900 dark:text-white sm:col-span-2 sm:mt-0">{profile?.full_name || 'Not provided'}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-beige-800 dark:text-gray-400">Email address</dt>
                <dd className="mt-1 text-sm text-beige-900 dark:text-white sm:col-span-2 sm:mt-0">{user.email}</dd>
              </div>
              <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                <dt className="text-sm font-medium text-beige-800 dark:text-gray-400">Role</dt>
                <dd className="mt-1 text-sm text-beige-900 dark:text-white sm:col-span-2 sm:mt-0 capitalize">{profile?.role || 'customer'}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
