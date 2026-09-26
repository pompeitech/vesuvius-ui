import { Field, Form, useZodForm } from '@admin/form'
import { Button, Separator, toast } from '@pompeitech/vesuvius-ui'
import { Link, redirect, useNavigate } from 'react-router'
import { z } from 'zod'
import { isAuthenticated, setAuthenticated } from '../../../lib/auth'
import { CURRENT_USER } from '../../../lib/current-user'
import { AuthLayout } from '../_shared/auth-layout'

export async function loader() {
  if (isAuthenticated()) {
    return redirect('/ecommerce/dashboard-1')
  }
  return null
}

const loginFormSchema = z.object({
  email: z.email('Enter a valid email.'),
  password: z.string().min(6, 'At least 6 characters.')
})

export function Component() {
  const navigate = useNavigate()
  const form = useZodForm(loginFormSchema, { defaultValues: { email: '', password: '' } })

  const handleLogin = form.handleSubmit(values => {
    // No real backend to authenticate against — any well-formed email +
    // password "logs in" successfully, same simulated-write principle as
    // every other unimplemented backend action in this kit.
    setAuthenticated(true)
    toast.success(`Welcome back, ${values.email}.`)
    navigate('/ecommerce/dashboard-1')
  })

  const continueAsDemoUser = () => {
    setAuthenticated(true)
    toast.success(`Welcome back, ${CURRENT_USER.name}.`)
    navigate('/ecommerce/dashboard-1')
  }

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your email and password to sign in to your account."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-foreground underline underline-offset-4">
            Sign up
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Field.Text
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <div className="flex flex-col gap-1.5">
            <Field.Text name="password" label="Password" type="password" required />
            <button
              type="button"
              onClick={() => toast.info("Password reset isn't wired up in this demo yet.")}
              className="self-end text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Forgot password?
            </button>
          </div>
          <Button type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <Button type="button" variant="outline" className="w-full" onClick={continueAsDemoUser}>
        Continue as demo user
      </Button>
    </AuthLayout>
  )
}
