import Auth from './pages/auth/Auth'
import Register from './pages/auth/Register'
import CreatePIN from './pages/auth/CreatePIN'
import AccountActivation from './pages/AccountActivation'
import Login from './pages/auth/Login'

import Home from './pages/main/Home'

export default [
  {
    path: '/auth',
    component: Auth,
    meta: { requiresVisitor: true },
    children: [
      {
        path: 'register',
        component: Register,
        meta: { requiresVisitor: true }
      },
      {
        path: 'create-pin',
        name: 'CreatePIN',
        component: CreatePIN,
        meta: { requiresVisitor: true }
      },
      {
        path: 'login',
        component: Login,
        meta: { requiresVisitor: true }
      }
    ]
  },
  {
    path: '/activate',
    component: AccountActivation,
    meta: { requiresVisitor: true }
  },
  {
    path: '/home',
    component: Home,
    meta: { requiresAuth: true }
  }
]
