import { Link } from "react-router-dom";
import { images } from "../constants";
export const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <div className="">
        <hr className="border-t border-[#959EAD] " />
        <h2 className=" font-extrabold text-xl flex ">
          <Link className=" text-white animate-pulse mx-auto my-10" to="/">
            BLOG APP
          </Link>
        </h2>
      </div>
      <footer className="container mx-auto grid grid-cols-10 px-5  gap-y-10 gap-x-5">
        <div className="col-span-5 mx-auto ">
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Pricing</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">Terms</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-5 mx-auto ">
          <ul className="text-[#959EAD] text-sm mt-5 space-y-4">
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/">Blog</Link>
            </li>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/">Faq</Link>
            </li>
          </ul>
        </div>

        <div className=" col-span-10  ">
          <div className="flex ">
            <h2 className="  text-dark-light text-bold mx-auto text-xl">
              On Social Media:
            </h2>
          </div>
          <ul className="flex justify-center items-center mt-5 space-x-4 text-gray-300">
            <li>
              <Link to="/">
                <img className="w-6 h-auto" src={images.Fb} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img className="w-6 h-auto" src={images.Git} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img className="w-6 h-auto" src={images.Google} alt="" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <img className="w-6 h-auto" src={images.In} alt="" />
              </Link>
            </li>
          </ul>
          <p className=" text-dark-light text-center text-md mt-4 pb-5 underline ">
            Copyright © 2023 BLOG APP. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
};
