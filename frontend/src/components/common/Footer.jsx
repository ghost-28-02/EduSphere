import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Blog",
  "Documentation",
  "Help Center",
  "FAQ",
];
const Plans = ["For Students", "For Instructors", "For Enterprise"];
const Community = ["Discussion Forums", "Community Events", "Partner With Us"];

const Footer = () => {
  return (
    <div className="bg-primary-900">
      <div className="mx-auto flex w-11/12 max-w-maxContent items-center justify-between gap-8 py-14 leading-6 text-gray-400 lg:flex-row">
        <div className="flex w-full flex-col border-b border-gray-700 pb-8 lg:flex-row">
          {/* Section 1 */}
          <div className="flex flex-wrap flex-row justify-between gap-3 pl-3 lg:w-[50%] lg:border-r lg:border-gray-700 lg:pr-5">
            <div className="mb-7 flex w-[30%] flex-col gap-3 lg:pl-0">
              <img src={Logo} alt="EduSphere Logo" className="h-10 w-auto object-contain" />
              <h1 className="text-[16px] font-semibold text-white">
                Company
              </h1>
              <div className="flex flex-col gap-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => {
                  return (
                    <div
                      key={i}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500"
                    >
                      <Link to={ele.toLowerCase()}>{ele}</Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3 text-2xl text-gray-300">
                <FaFacebook className="cursor-pointer transition-all duration-200 hover:text-secondary-500" />
                <FaGoogle className="cursor-pointer transition-all duration-200 hover:text-secondary-500" />
                <FaTwitter className="cursor-pointer transition-all duration-200 hover:text-secondary-500" />
                <FaYoutube className="cursor-pointer transition-all duration-200 hover:text-secondary-500" />
              </div>
              <div></div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-white">
                Resources
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>

              <h1 className="mt-7 text-[16px] font-semibold text-white">
                Support
              </h1>
              <div className="mt-2 cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500">
                <Link to={"/help-center"}>Help Center</Link>
              </div>
            </div>

            <div className="mb-7 w-[48%] lg:w-[30%] lg:pl-0">
              <h1 className="text-[16px] font-semibold text-white">
                Plans
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <h1 className="mt-7 text-[16px] font-semibold text-white">
                Community
              </h1>

              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500"
                    >
                      <Link to={ele.split(" ").join("-").toLowerCase()}>
                        {ele}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex flex-wrap flex-row justify-between gap-3 pl-3 lg:w-[50%] lg:pl-5">
            {FooterLink2.map((ele, i) => {
              return (
                <div key={i} className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                  <h1 className="text-[16px] font-semibold text-white">
                    {ele.title}
                  </h1>
                  <div className="flex flex-col gap-2 mt-2">
                    {ele.links.map((link, index) => {
                      return (
                        <div
                          key={index}
                          className="cursor-pointer text-[14px] transition-all duration-200 hover:text-secondary-500"
                        >
                          <Link to={link.link}>{link.title}</Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-11/12 max-w-maxContent flex-row items-center justify-between pb-14 text-sm text-gray-400">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length  === i
                      ? ""
                      : "border-r border-gray-700 cursor-pointer hover:text-secondary-500 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ © 2026 EduSphere</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;