import React from 'react'

const AuthLayout = ({children}) => {
  const isLogin = false;
  return (
    <div className='page_body'>{children}</div>
  )
}

export default AuthLayout