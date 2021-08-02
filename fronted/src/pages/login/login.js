/*
 * @Date: 2021-06-12 01:29:16
 * @LastEditTime: 2021-06-12 20:16:24
 */
import React, { useState, useEffect, useRef } from 'react'
import LoginCard from './formCard/LoginCard'
import RegisterCard from './formCard/RegisterCard'

import { init, animate, destroy } from './loginAnimate'

const Login = () => {
  const [showLogin, setShowLogin] = useState(true)
  useEffect(() => {
    init()
    animate()
    return () => {
      destroy()
    }
  }, [])

  return (
    <div id="loginBody" className="login-body">
      {showLogin ? (
        <LoginCard gotoRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterCard gotoLogin={() => setShowLogin(true)} />
      )}
    </div>
  )
}

export default Login
