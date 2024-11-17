import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/_auth')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
