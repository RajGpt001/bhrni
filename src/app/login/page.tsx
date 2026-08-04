import { login, signup } from './actions'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto mt-24 mb-32">
      <h1 className="text-3xl font-bold text-beige-900 mb-6 text-center">Welcome to LYKE</h1>
      <form className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground">
        
        <label className="text-md text-beige-900" htmlFor="full_name">
          Full Name (for sign up)
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-beige-200 mb-2"
          name="full_name"
          placeholder="Jane Doe"
        />

        <label className="text-md text-beige-900" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-beige-200 mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        
        <label className="text-md text-beige-900" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border border-beige-200 mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        
        <button formAction={login} className="bg-beige-900 text-beige-50 rounded-md px-4 py-3 mb-2 font-medium hover:bg-beige-800 transition-colors">
          Log In
        </button>
        <button formAction={signup} className="border border-beige-900 text-beige-900 rounded-md px-4 py-3 mb-2 font-medium hover:bg-beige-50 transition-colors">
          Sign Up
        </button>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-md">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
