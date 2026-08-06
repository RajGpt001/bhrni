import { SignUpCard } from '@/components/ui/sign-up-card'

export default function SignUpPage({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="w-full bg-black min-h-screen">
      <SignUpCard errorMessage={searchParams?.message} />
    </div>
  )
}
