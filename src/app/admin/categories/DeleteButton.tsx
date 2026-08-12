'use client'

import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'
import { deleteCategory } from './actions'

export function DeleteButton({ 
  categoryId, 
  productCount
}: { 
  categoryId: string, 
  productCount: number
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      type="button" 
      disabled={isPending}
      className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50" 
      onClick={() => {
        if (productCount > 0) {
          alert('Cannot delete this category because it has products linked to it.');
        } else if (confirm('Are you sure you want to delete this category?')) {
          startTransition(async () => {
            await deleteCategory(categoryId);
          })
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
