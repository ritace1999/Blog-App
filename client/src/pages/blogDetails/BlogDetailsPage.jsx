import { Link } from "react-router-dom";

import { BreadCrumbs } from "../../components/BreadCrumbs";
import { MainLayout } from "../../components/MainLayout";
import { images } from "../../constants";
import { SuggestedPosts } from "./container/SuggestedPosts";
import { CommentsContainer } from "../../components/comments/CommentsContainer";

const breadCrumbsData = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Article title", link: "/blog/1" },
];

const postsData = [
  {
    _id: "1",
    image: images.PostOneImage,
    title: "Futures signal crypto's mainstream adoption.",
    createdAt: "2023-09-01",
  },
  {
    _id: "2",
    image: images.PostOneImage,
    title: "Futures signal crypto's mainstream adoption.",
    createdAt: "2023-09-01",
  },
  {
    _id: "3",
    image: images.PostOneImage,
    title: "Futures signal crypto's mainstream adoption.",
    createdAt: "2023-09-01",
  },
  {
    _id: "4",
    image: images.PostOneImage,
    title: "Futures signal crypto's mainstream adoption.",
    createdAt: "2023-09-01",
  },
];
const tagsData = [
  "Technology",
  "Science",
  "Education",
  "Foods",
  "Medical",
  "Life",
  "Nature",
];

export const BlogDetailsPage = () => {
  return (
    <MainLayout>
      <section className=" container mx-auto w-[88%] flex flex-col  py-5 lg:flex-row lg:gap-x5 lg:items-start">
        <article className="flex-1  ">
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className="rounded-xl w-full"
            src={images.PostOneImage}
            alt="art"
          />
          <Link
            to="/blog?category=selectedCategory"
            className="text-primary text-sm font-roboto inline-block mt-4 md:text-base"
          >
            TECHNOLOGY
          </Link>
          <h1 className="text-lg font-bold font-roboto mt-4 text-dark-hard md:text-[26px]">
            The futures are a sign that the cryptocurrency is becoming
            mainstream.
          </h1>
          <div className="mt-4 text-dark-soft">
            <p className="leading-7 text-sm">
              The emergence of futures contracts for cryptocurrencies signals
              their growing acceptance in mainstream finance. These contracts
              attract institutional investors, offering risk management tools,
              increased liquidity, and regulatory oversight. They contribute to
              price discovery, fostering stability. However, the cryptocurrency
              market remains speculative and volatile, necessitating caution and
              research for investors. While futures reflect a maturing
              landscape, the inherent risks, including price fluctuations and
              regulatory shifts, persist.
            </p>
          </div>
          <CommentsContainer className="mt-10 " logginedUserId="a" />
        </article>
        <SuggestedPosts
          header={"Latest Article"}
          posts={postsData}
          tags={tagsData}
          className="mt-8 lg:mt-10 lg:mx-5 lg:max-w-[360px] "
        />
      </section>
    </MainLayout>
  );
};
