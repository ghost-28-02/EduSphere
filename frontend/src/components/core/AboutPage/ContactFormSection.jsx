import React from 'react'
import ContactUsForm from '../../common/ContactUsForm';

function ContactFormSection() {
  return (
  <div className="mx-auto w-full rounded-3xl border border-gray-700 bg-primary-800 px-6 py-10 shadow-2xl shadow-black/20 sm:px-8 lg:px-10">
    <h1 className="text-center text-3xl font-semibold leading-tight text-white sm:text-4xl">Get in Touch</h1>
    <p className="mt-3 text-center text-gray-300" >
            We'd love to here for you, Please fill out this form.
        </p>
    <div className="mx-auto mt-12">
      <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection;