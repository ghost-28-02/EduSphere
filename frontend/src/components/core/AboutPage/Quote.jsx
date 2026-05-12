import React from 'react'
import HighlightText1 from './HighlightText1';

function Quote() {
  return (
    <div className='mx-auto py-5 pb-20 text-center text-xl font-semibold leading-relaxed md:text-4xl'>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText1 text={"combines technology"} tone="secondary" />, 
        <HighlightText1 text={"expertise"} tone="coral" />, 
        and community to create an 
        <HighlightText1 text={"unparalleled educational experience."} tone="accent"/>
    </div>
  )
}

export default Quote;