import React from 'react'

function HighlightText1({text, background}) {
  return (
    <span className={`font-bold ${background} bg-clip-text text-transparent`}>
        {" "}{text}
    </span>
  )
}

export default HighlightText1;