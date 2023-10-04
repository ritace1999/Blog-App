import { images } from "../constants";
import { BiCheck } from "react-icons/bi";

export const ArticleCard = ({ className }) => {
  return (
    <div
      className={`rounded-xl m-auto overflow-hidden shadow-2xl shadow-blue-500/60 ${className} `}
    >
      <img
        className="w-full object-cover  object-center h-auto md:h-52 lg:h-48 xl:h-60"
        src={images.PostOneImage}
        alt="laptop"
      />
      <div className="p-5">
        <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text[28px] ">
          Blockchain Technology
        </h2>
        <p className="text-dark-light mt-3 text-sm md:text-lg ">
          How Blockchain is Revolutionizing Finance and Banking
        </p>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-2 md:gap-x-2.5">
            <img
              className="cursor-pointer rounded-full w-9 h-9 md:w-10 md:h-10"
              src={images.profilePic}
              alt="profilepicture"
            />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base ">
                Monkey D. Luffy
              </h4>
              <div className="flex items-center gap-x-2">
                <span className="bg-[#35B37E] w-fit bg-opacity-20 p-1.5 rounded-full">
                  <BiCheck className="w-2 h-2 text-[#1c7650]" />
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  Verified User
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            14 Aug
          </span>
        </div>
      </div>
    </div>
  );
};
