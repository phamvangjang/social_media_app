import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import path from "./utils/path";
import {
  DirectInbox,
  Explore,
  Home,
  MemberLayout,
  Profile,
  Reels
} from "./pages/member";
import { Account, ConfirmOTP, Login } from "./pages/auth";
import MyProfile from "./pages/member/MyProfile";

const App = () => {
  useEffect(() => {
    console.log(window.location.pathname);
    const currentpath = window.location.pathname;
    // Kiểm tra nếu route hiện tại là /accounts/login thì chuyển hướng đến localhost:3001
    if (currentpath === "/accounts/login") {
      window.location.replace("http://localhost:3001/auth/login");
    }
  }, []);

  return (
    <Routes>
      <Route path={path.MEMBER_LAYOUT} element={<MemberLayout />}>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.DIRECT_INBOX} element={<DirectInbox />} />
        <Route path={path.EXPLORE} element={<Explore />} />
        <Route path={`${path.MYPROFILE}/:id`} element={<MyProfile />} />
        <Route path={`${path.PROFILE}/:id`} element={<Profile />} />
        <Route path={path.REELS} element={<Reels />} />
      </Route>

      {/* Route cho các tài khoản */}
      <Route path={path.ACCOUNTS} element={<Account />}>
        {/* <Route path={path.CONFIRMOTP} element={<ConfirmOTP />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
