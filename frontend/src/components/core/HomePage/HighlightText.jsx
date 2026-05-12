
import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold bg-gradient-to-r from-secondary-400 via-accent-500 to-highlight-500 bg-clip-text text-transparent'>
        {" "}{text}{" "}
    </span>
  )
}

export default HighlightText;