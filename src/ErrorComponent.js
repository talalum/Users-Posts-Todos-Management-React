import React from 'react'

export const ErrorComponent = ({title, display}) => {
  return (
    <div className={display ? 'error-massage' : 'hidden'} >{title}</div>
  )
}
