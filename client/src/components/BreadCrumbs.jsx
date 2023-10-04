import { Link } from "react-router-dom";
export const BreadCrumbs = ({ data }) => {
  return (
    <div className="flex items-center py-4 overflow-x-auto whitespace-nowrap">
      {data.map((items, index) => (
        <div
          key={index}
          className="text-dark-light text-sm opacity-50   font-roboto "
        >
          <Link to={items.link}>{items.name}</Link>
          {index !== data.length - 1 && (
            <span className="cursor-pointer px-3">/</span>
          )}
        </div>
      ))}
    </div>
  );
};
