
import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold bg-gradient-to-b from-[#5AB2FF] to-[#8CFFD6] bg-clip-text text-transparent'>
        {" "}{text}{" "}
    </span>
  )
}

export default HighlightText;