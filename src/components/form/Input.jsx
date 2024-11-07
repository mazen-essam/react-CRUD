import React from 'react'

function Input({className, ...props}) {
  return (
    <input className={`p-2 rounded-md w-full my-6 ${className}`} {...props} />
  )
}

export default Input