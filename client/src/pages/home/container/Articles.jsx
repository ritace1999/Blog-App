import { ArticleCard } from "../../../components/ArticleCard";
import { RiArrowRightDoubleFill } from "react-icons/ri";

export const Articles = () => {
  return (
    <section className="container flex flex-col  mx-auto px-5 py-10">
      <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] " />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] " />
        <ArticleCard className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)] " />
      </div>
      <button className="flex mx-auto item-center gap-x-2 font-bold text-primary  border-2 border-blue-600 px-3 py-3 rounded-xl hover:bg-blue-600 hover:text-white ">
        <span>More Articles</span>
        <RiArrowRightDoubleFill className="m-auto w-5 h-5" />
      </button>
    </section>
  );
};
