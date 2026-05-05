import React from 'react'
import { Link } from "react-router";

const Brand = ({ onCLick }) => {
  return (
    <Link
      to={'/'}
      onClick={onCLick}
      className="btn glass btn-ghost normal-case text-xl"
    >
      Generate_new_template
    </Link>
  )
}

export default Brand
