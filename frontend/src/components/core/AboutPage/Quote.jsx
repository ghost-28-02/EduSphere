import React from 'react'
import HighlightText1 from './HighlightText1';

function Quote() {
  return (
    <div className='text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center'>
        We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText1 text={"combines technology"} background={"bg-gradient-to-b from-[#5AB2FF] to-[#8CFFD6]"} />, 
        <HighlightText1 text={"expertise"} background={"bg-gradient-to-b from-[#FF512F] to-[#F09819]"} />, 
        and community to create an 
        <HighlightText1 text={"unparalleled educational experience."} background={"bg-gradient-to-b from-[#E65C00] to-[#F9D423]"}/>
    </div>
  )
}

export default Quote;