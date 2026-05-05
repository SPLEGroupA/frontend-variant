import React from 'react'
import { Link } from "react-router";

const Brand = ({ onCLick, isMobileFirst, logoSrc }) => {
  const className = 'font-semibold normal-case text-xl flex items-center gap-2' + (isMobileFirst ? ' p-0 no-underline' : '')

  return (
    <Link
      to={'/'}
      onClick={onCLick}
      className={className}
    >
      {logoSrc ? <img src={logoSrc} className='h-[1.1lh]' /> : 'Anisecond'}
    </Link>
  )
}

export default Brand
