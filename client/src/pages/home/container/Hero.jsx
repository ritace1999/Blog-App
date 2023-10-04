import images from "../../../constants/images";
import { FiSearch } from "react-icons/fi";

export const Hero = () => {
  return (
    <section className="container ms-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-left lg:max-w-[540px] lg:text-4xl xl:text-5xl ">
          Explore the most intriguing articles.
        </h1>
        <p className="text-dark-light mt-4 text-center md:text-xl lg:text-left lg:text-base xl:text-xl">
          Welcome to our blog—a hub of knowledge, ideas, and inspiration.
          Explore insightful articles, expert tips, and engaging content on
          diverse topics. Join our intellectual journey today!
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 xl:mt-10 relative">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-5 text-[#959EAD]" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-33 w-full py-3 focus:outline-none shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:py-4"
              type="text"
              placeholder="Search Articles"
            />
          </div>
          <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top1/2 md:-translate-1/2 md:w-fit md:py-2 md:mt-2">
            Search
          </button>
        </div>
        <div className="flex flex-col mt-4 lg:items-start lg:flex-row lg:flex-nowrap lg:gap-x-4 lh:mt-7">
          <span className="text-dark-light font-semibold italic lg:mt-4 mt-2 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-blue-400 bg-opacity-20 px-3 py-1.5 text-primary font-semibold  cursor-pointer">
              Technology
            </li>
            <li className="rounded-lg bg-blue-400 bg-opacity-20 px-3 py-1.5 text-primary font-semibold  cursor-pointer">
              Finance
            </li>
            <li className="rounded-lg bg-blue-400 bg-opacity-20 px-3 py-1.5 text-primary font-semibold   cursor-pointer">
              Science
            </li>
          </ul>
        </div>
      </div>
      <div className="hidden lg:block w-[42%]   ">
        <img src={images.HeroImage} alt="user reading articles" />
      </div>
    </section>
  );
};
