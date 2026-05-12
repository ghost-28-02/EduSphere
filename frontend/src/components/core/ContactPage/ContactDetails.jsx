import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]
        return (
          <div
            className="flex items-start gap-4 rounded-xl bg-primary-700 p-4 text-sm shadow-sm shadow-black/20"
            key={i}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600 text-white">
              <Icon size={20} />
            </div>

            <div className="flex flex-1 flex-col">
              <h3 className="text-lg font-semibold text-white">{ele?.heading}</h3>
              <p className="mt-1 text-sm font-medium text-gray-300">{ele?.description}</p>
              <p className="mt-2 text-sm font-semibold text-gray-200">{ele?.details}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails;