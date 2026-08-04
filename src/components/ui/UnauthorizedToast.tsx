'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AlertCircle, X } from 'lucide-react';

export function UnauthorizedToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setShow(true);
      // Clean up the URL
      const newUrl = window.location.pathname;
      router.replace(newUrl, { scroll: false });
      
      // Auto dismiss after 5s
      const timer = setTimeout(() => setShow(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, router]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] animate-in slide-in-from-bottom-5">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-lg flex items-start gap-3 max-w-sm">
        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-medium text-red-800">Not Authorized</h3>
          <p className="text-sm text-red-700 mt-1">You don't have permission to access the admin panel.</p>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="text-red-500 hover:text-red-700 hover:bg-red-100 rounded-md p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
