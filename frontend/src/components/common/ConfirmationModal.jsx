import React from 'react'
import IconBtn from './IconBtn';

const ConfirmationModal = ({modaldata}) => {
  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black/40 backdrop-blur-sm p-4">
        <div className="w-full max-w-sm rounded-lg border border-gray-700 bg-primary-800 p-6 shadow-lg">
            <p className="text-2xl font-semibold text-white">{modaldata.text1}</p>
            <p className="mt-3 mb-5 leading-6 text-gray-300">{modaldata.text2}</p>
            
            <div className="flex items-center gap-x-4">
                <IconBtn 
                    onclick={modaldata?.btn1Handler}
                    text={modaldata?.btn1Text}
                />
                <button onClick={modaldata?.btn2Handler} className="cursor-pointer rounded-md bg-gray-700 py-2 px-4 font-semibold text-white hover:bg-gray-600 transition">
                    {modaldata?.btn2Text}
                </button>   
            </div>
        </div>
    </div>
  )
}

export default ConfirmationModal;