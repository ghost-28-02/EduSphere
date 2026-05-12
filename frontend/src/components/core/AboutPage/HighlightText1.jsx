import React from 'react'

const toneClasses = {
  secondary: 'from-secondary-400 via-secondary-500 to-secondary-600',
  accent: 'from-accent-400 via-accent-500 to-accent-600',
  highlight: 'from-highlight-400 via-highlight-500 to-highlight-600',
  coral: 'from-coral-400 via-coral-500 to-coral-600',
  primary: 'from-primary-300 via-primary-500 to-secondary-400',
};

function HighlightText1({text, tone = 'accent'}) {
  return (
    <span className={`font-bold bg-gradient-to-r ${toneClasses[tone] || toneClasses.accent} bg-clip-text text-transparent`}>
        {" "}{text}
    </span>
  )
}

export default HighlightText1;