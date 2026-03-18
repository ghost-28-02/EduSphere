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
                    <div className="lg:w-[40%]">
                        <ContactDetails/>
                    </div>
                    <div className='w-[60%]'>
                        <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
                            <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
                                Got a Idea? We've got the skills. Let's team up
                            </h1>
                            <p className="">
                                Tell us more about yourself and what you''re got in mind.
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