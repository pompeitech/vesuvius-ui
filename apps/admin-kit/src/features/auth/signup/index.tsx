import { Field, Form, useZodForm } from '@admin/form'
import { Button, toast } from '@pompeitech/vesuvius-ui'
import { Link, redirect, useNavigate } from 'react-router'
import { z } from 'zod'
import { isAuthenticated, setAuthenticated } from '../../../lib/auth'
import { useCurrentUserStore } from '../../../lib/use-current-user-store'
import { AuthLayout } from '../_shared/auth-layout'

export async function loader() {
  if (isAuthenticated()) {
    return redirect('/ecommerce/dashboard-1')
  }
  return null
}

const signupFormSchema = z
  .object({
    name: z.string().min(1, 'Name is required.'),
    email: z.email('Enter a valid email.'),
    password: z.string().min(6, 'At least 6 characters.'),
    confirmPassword: z.string().min(1, 'Confirm your password.')
  })
  .refine(values => values.password === values.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword']
  })

export function Component() {
  const navigate = useNavigate()
  const [profile, setProfile] = useCurrentUserStore()
  const form = useZodForm(signupFormSchema, {
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' }
  })

  const handleSignup = form.handleSubmit(values => {
    // No real backend — "creating an account" just seeds the persisted
    // profile store with the entered identity (see `useCurrentUserStore`)
    // and signs in, so the new name/email genuinely show up in the sidebar.
    setProfile({ ...profile, name: values.name, email: values.email })
    setAuthenticated(true)
    toast.success(`Account created — welcome, ${values.name}!`)
    navigate('/ecommerce/dashboard-1')
  })

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
            Log in
          </Link>
        </p>
      }
    >
      <Form {...form}>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <Field.Text name="name" label="Name" placeholder="Jane Doe" required />
          <Field.Text
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field.Text name="password" label="Password" type="password" required />
            <Field.Text name="confirmPassword" label="Confirm password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>
      </Form>
    </AuthLayout>
  )
}
