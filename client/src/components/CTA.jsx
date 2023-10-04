import images from "../constants/images";

export const CTA = () => {
  return (
    <div>
      <img
        className="w-full h-auto  max-h-40 translate-y-1"
        src={images.Waves}
        alt="waves"
      />

      <section className="relative bg-dark-hard px-5">
        <div className="container grid grid-cols-12 mx-auto py-10 md:pd-20 lg:place-items-center ">
          <div className="col-span-12 lg:col-span-6">
            <h2 className="text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left text-center ">
              Get weekly stories update directly to your inbox.
            </h2>
            <div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2 lg:mx-0 ">
              <input
                className="px-4 py-3 rounded-lg w-full placeholder:text-dark-light placeholder:text-center"
                type="text"
                placeholder="Enter your email"
              />
              <button className="px-4 py-3 rounded-lg w-full bg-primary text-white font-bold md:w-fit md:whitespace-nowrap ">
                Subscribe Us
              </button>
            </div>
          </div>
          <div className="col-span-12 hidden lg:col-span-6 mb-[70px] md:block md:order-first lg:order-last">
            <div className="w-3/4 mx-auto relative">
              <div
                className={`rounded-xl w-full p-3 z-[1] relative bg-gray-200  shadow-2xl shadow-blue-500/60  `}
              >
                <img
                  className="w-full object-cover  object-center h-auto md:h-52 lg:h-48 xl:h-60"
                  src={images.CtaPic}
                  alt="laptop"
                />
                <div className="p-5">
                  <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl  lg:text-xl">
                    Best Weekly Reads
                  </h2>
                  <p className="text-dark-light mt-3 text-sm md:text-base ">
                    Stay connected with us to stay updated and engaged with a
                    wealth of interesting articles, insights, and information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
