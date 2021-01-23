import Auth from './pages/auth/Auth'
import Register from './pages/auth/Register'
import CreatePIN from './pages/auth/CreatePIN'
import AccountActivation from './pages/AccountActivation'
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
        path: 'create-pin',
        name: 'CreatePIN',
        component: CreatePIN
      },
      {
        path: 'login',
        component: Login
      }
    ]
  },
  {
    path: '/activate',
    component: AccountActivation
  }
]
