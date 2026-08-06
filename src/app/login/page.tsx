import { SignInCard } from '@/components/ui/sign-in-card-2'

export default function LoginPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="w-full bg-black min-h-screen">
      <SignInCard errorMessage={searchParams?.message} />
    </div>
  )
}
