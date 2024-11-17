import SignupForm from '@/components/SignupForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/(auth)/_auth/signUp')({
  component: Signup,
})
function Signup() {
  // If a auth token already exists  redirect  them to /home
  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken')
    if (jwtToken) {
      console.log(jwtToken)
      return
    }
  }, [])

  return (
    <div className="dark bg-background text-foreground h-screen py-20 px-14">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Welcome, Please sign up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
    </div>
  )
}
