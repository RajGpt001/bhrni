'use client';

import { logout } from '../login/actions';

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Log out
    </button>
  );
}
