import React from 'react'
import { Routes, Route } from 'react-router-dom'
import path from './utils/path'
import {
  DirectInbox,
  Explore,
  Home,
  MemberLayout,
  Profile,
  Reels
} from './pages/member'
import { Account, ConfirmOTP, Login } from './pages/auth'

const App = () => {
  return (
    <>
      <Routes>
        <Route path={path.MEMBER_LAYOUT} element={<MemberLayout />} >
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DIRECT_INBOX} element={<DirectInbox />} />
          <Route path={path.EXPLORE} element={<Explore />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.REELS} element={<Reels />} />
        </Route>

        <Route path={path.ACCOUNTS} element={<Account />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CONFIRMOTP} element={<ConfirmOTP />} />
        </Route>
      </Routes>
    </>
  )
}

export default App