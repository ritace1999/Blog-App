import { images } from "../../constants";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="md:mt-8 mx-auto shadow-2xl shadow-blue-500/60 bg-slate-50  rounded-md w-[90%] lg:w-[70%] h-[85%] md:h-[80%] md:grid md:grid-cols-2">
        <div className="overflow-hidden md:bg-gradient-to-r from-blue-500 to-indigo-500 rounded-l-md">
          <img
            src={images.AuthImg}
            className=" hidden md:block md:h-full md:w-full cursor-pointer "
          />
        </div>
        <div>
          <div className="text-center py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
