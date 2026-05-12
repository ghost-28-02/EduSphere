import React from 'react'
import { Link } from 'react-router-dom'

function Button({children, active, linkto}) {
  return (
    <Link to={linkto} >
        <div className={`text-center text-sm px-6 py-3 rounded-full font-semibold transition-all duration-200 hover:scale-[0.98] ${active ? "bg-secondary-500 text-white hover:bg-secondary-600" : "border border-gray-700 bg-primary-700 text-gray-100 hover:border-secondary-500 hover:bg-primary-600 hover:text-white" }`}>
            {children}
        </div>
    </Link>
  )
}

export default Button