// ============================================================================
// Verify Request Page
// ============================================================================
// Purpose: Confirmation page after email magic link sent
// Author: @dev (Dex)
// Based on: Task 6 (Authentication)
// ============================================================================

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-4">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-primary-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">Check your email</h1>

          {/* Message */}
          <p className="text-neutral-600 mb-6">
            A sign-in link has been sent to your email address. Click the link in the email to
            sign in to your account.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <div className="flex gap-3">
              <div className="text-blue-500 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Didn&apos;t receive the email?</p>
                <ul className="space-y-1 text-blue-800">
                  <li>• Check your spam folder</li>
                  <li>• Make sure you entered the correct email</li>
                  <li>• The link expires in 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to Sign In */}
          <div className="mt-8">
            <a
              href="/auth/signin"
              className="text-sm text-primary-500 hover:text-primary-600 font-medium"
            >
              ← Back to sign in
            </a>
          </div>
        </div>

        {/* Help Text */}
        <p className="mt-6 text-center text-sm text-neutral-500">
          Having trouble? Contact{' '}
          <a href="mailto:support@businessenglishrpg.com" className="underline hover:text-neutral-700">
            support
          </a>
        </p>
      </div>
    </div>
  );
}
