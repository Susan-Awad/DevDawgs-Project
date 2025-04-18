// /app/delete-item/page.tsx


// WE DO NOT NEED THIS PAGE, SINCE DELETE IS DONE IN THE ITEMS PAGE
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteItemPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!id) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      router.push('/show-items');
    } catch (err: any) {
      console.error('Error deleting item:', err);
      setError(err.message || 'Unknown error');
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (id) handleDelete();
  }, [id]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold mb-4">Deleting Item...</h1>
      {isDeleting && <p>Processing deletion. Please wait...</p>}
      {error && (
        <p className="text-red-500">Error deleting item: {error}</p>
      )}
    </div>
  );
}
