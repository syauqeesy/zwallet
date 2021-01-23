import Auth from './pages/auth/Auth'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'

export default [
  {
    path: '/auth',
    component: Auth,
    children: [
      {
        path: 'register',
        component: Register
      },
      {
        path: 'login',
        component: Login
      }
    ]
  }
]
