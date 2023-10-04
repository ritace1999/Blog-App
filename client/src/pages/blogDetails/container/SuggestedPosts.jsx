import { Link } from "react-router-dom";
export const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <div
      className={`w-full  shadow-2xl shadow-blue-500/60 rounded-lg p-5   ${className}`}
    >
      <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
        {header}
      </h2>
      <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1  ">
        {posts.map((items) => (
          <div
            key={items._id}
            className="flex space-x-3  flex-nowrap items-center "
          >
            <img
              src={items.image}
              alt="technology"
              className="  aspect-square object-cover rounded-lg w-1/5  "
            />
            <div className=" text-sm font-roboto font-medium  ">
              <h3 className="text-sm font-roboto text-dark-hard md:text-base lg:text-md ">
                {items.title}
              </h3>
              <span className="text-xs opacity-60  ">
                {new Date(items.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
        Tags:
      </h2>
      <div className="flex flex-wrap gap-y-2 mt-4">
        {tags.map((items, index) => (
          <Link
            key={index}
            className="inline-block mx-2  rounded-md px-3 py-1.5 bg-primary font-roboto text-white  md:text-sm"
            to="/"
          >
            {items}
          </Link>
        ))}
      </div>
    </div>
  );
};
