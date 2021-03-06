import Auth from './pages/auth/Auth'
import Register from './pages/auth/Register'
import CreatePIN from './pages/auth/CreatePIN'
import AccountActivation from './pages/AccountActivation'
import Login from './pages/auth/Login'

import Home from './pages/main/Home'
import SearchReceiver from './pages/main/SearchReceiver'
import InputAmount from './pages/main/InputAmount'
import TransferResult from './pages/main/TransferResult'
import Profile from './pages/main/Profile'
import EditProfile from './pages/main/EditProfile'
import ChangePassword from './pages/main/ChangePassword'
import ChangePIN from './pages/main/ChangePIN'
import History from './pages/main/History'

export default [
  {
    path: '/',
    redirect: '/auth/login'
  },
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
  },
  {
    path: '/search-receiver',
    name: 'SearchReceiver',
    component: SearchReceiver,
    meta: { requiresAuth: true }
  },
  {
    path: '/input-amount/:id',
    name: 'InputAmount',
    component: InputAmount,
    meta: { requiresAuth: true }
  },
  {
    path: '/transfer-result/:id',
    name: 'TransferResult',
    component: TransferResult,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit-profile',
    name: 'EditProfile',
    component: EditProfile,
    meta: { requiresAuth: true }
  },
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { requiresAuth: true }
  },
  {
    path: '/change-pin',
    name: 'ChangePIN',
    component: ChangePIN,
    meta: { requiresAuth: true }
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true }
  }
]
