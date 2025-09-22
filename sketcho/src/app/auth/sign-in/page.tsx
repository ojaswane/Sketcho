"use client"
import Google_button from '@/components/G auth-button/button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-Auth'
import Link from 'next/link'

export default function LoginPage() {
    const { signInForm, handlesignIn, loading } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = signInForm
    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <form
                onSubmit={handleSubmit(handlesignIn)}
                action=""
                className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
                <div className="p-8 pb-6">
                    <div>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Sign In to Tailark</h1>
                        <p className="text-sm">Welcome back! Sign in to continue</p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <Google_button />
                        <Button
                            type="button"
                            variant="outline">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 256 256">
                                <path
                                    fill="#f1511b"
                                    d="M121.666 121.666H0V0h121.666z"></path>
                                <path
                                    fill="#80cc28"
                                    d="M256 121.666H134.335V0H256z"></path>
                                <path
                                    fill="#00adef"
                                    d="M121.663 256.002H0V134.336h121.663z"></path>
                                <path
                                    fill="#fbbc09"
                                    d="M256 256.002H134.335V134.336H256z"></path>
                            </svg>
                            <span>Microsoft</span>
                        </Button>
                    </div>

                    <hr className="my-4 border-dashed" />

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Username
                            </Label>
                            <Input
                                type="email"
                                required
                                id="email"
                                {...register('email')}
                                className={errors.email ? 'border-distructive' : ''}
                            />
                            {errors.email && (
                                <p className='text-xs  text-distructive'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-0.5">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="pwd"
                                    className="text-sm">
                                    Password
                                </Label>
                                <Button
                                    asChild
                                    variant="link"
                                    size="sm">
                                    <Link
                                        href="#"
                                        className="link intent-info variant-ghost text-sm">
                                        Forgot your Password ?
                                    </Link>
                                </Button>
                            </div>
                            <Input
                                type="password"
                                required
                                id="pwd"
                                {...register('Password')}
                                className={errors.Password ? 'border-distructive' : ''}
                            />
                            {errors.Password && (
                                <p className='text-xs  text-distructive'>
                                    {errors.Password.message}
                                </p>
                            )}
                        </div>
                        {errors.root && (
                            <p className='text-center , text-xs , text-deistructive'>
                                {errors.root.message}
                            </p>
                        )}

                        <Button className="w-full"
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'signing in...' : 'sign in'}
                        </Button>
                    </div>
                </div>

                <div className="bg-muted rounded-(--radius) border p-3">
                    <p className="text-accent-foreground text-center text-sm">
                        Don't have an account ?
                        <Button
                            asChild
                            variant="link"
                            className="px-2">
                            <Link href="/sign-in">Create account</Link>
                        </Button>
                    </p>
                </div>
            </form>
        </section>
    )
}