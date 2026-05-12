import React from 'react'
import ContactUsForm from '../components/common/ContactUsForm';
import Footer from '../components/common/Footer';
import ContactDetails from '../components/core/ContactPage/ContactDetails';

function Contact() {
    return (
        <div>
            {/* Section 1 */}
            <section>
                <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
                    <div className="lg:w-2/5">
                        <ContactDetails />
                    </div>
                    <div className='lg:w-3/5 w-full'>
                        <div className="rounded-2xl bg-primary-700 border border-gray-700 text-gray-300 p-7 lg:p-14 flex gap-3 flex-col shadow-sm shadow-black/20">
                            <h1 className="text-4xl leading-10 font-semibold text-white">
                                Got a Idea? We've got the skills. Let's team up
                            </h1>
                            <p className="text-gray-300">
                                Tell us more about yourself and what you're got in mind.
                            </p>

                            <div className="mt-7">
                                <ContactUsForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className='text-white w-10/12 mx-auto my-20'>
                <p className='text-center text-4xl font-semibold'>Reviews from other learners</p>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Contact;