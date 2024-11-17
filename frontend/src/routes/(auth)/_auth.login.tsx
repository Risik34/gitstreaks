import LoginForm from '@/components/LoginForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth/login')({
  component: Login,
})
function Login() {
  return (
    <div className="dark bg-background text-foreground h-screen py-20 px-14">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome, Please login up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
