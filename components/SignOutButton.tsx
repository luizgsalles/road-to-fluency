'use client';

import { signOut } from 'next-auth/react';

interface SignOutButtonProps {
  compact?: boolean;
}

export function SignOutButton({ compact }: SignOutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/auth/signin' })}
      className={compact
        ? 'text-sm font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg px-3 py-1.5 transition-colors'
        : 'btn-outline border-red-300 text-red-600 hover:bg-red-50'
      }
    >
      Sign Out
    </button>
  );
}
