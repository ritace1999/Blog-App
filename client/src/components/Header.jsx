import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user";
const NavItemsInfo = [
  { name: "Home", type: "link" },
  { name: "Articles", type: "link" },
  { name: "Pages", type: "dropdown", items: ["About Us", "Contact Us"] },
  { name: "Pricing", type: "link" },
  { name: "Faq", type: "link" },
];
const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleHandler = () => {
    setDropdown((currState) => {
      return !currState;
    });
  };
  return (
    <li className=" relative group">
      {item.type === "link" ? (
        <>
          <Link to="/" className="px-4 py-2">
            {item.name}
          </Link>
          <span className=" cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0  group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            |
          </span>
        </>
      ) : (
        <div className=" flex flex-col items-center">
          <button
            className="px-4 py-2 flex gap-x-1 items-center"
            onClick={toggleHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max `}
          >
            <ul className="bg-dark-hard lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to="/"
                  className="hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                >
                  {page}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setprofileDropdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((currState) => {
      return !currState;
    });
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <section className="sticky bg-[#E2E0DD]  top-0 left-0 right-0 z-50">
      <header className="container mx-auto px-2 flex justify-between py-4 items-center">
        <div>
          <h2 className=" font-extrabold text-xl">
            <Link className="w-16 text-blue-800 animate-pulse" to="/">
              BLOG APP
            </Link>
          </h2>
        </div>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 -h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu
              className="w-6 -h-6"
              onClick={navVisibilityHandler}
            />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0 " : "-right-full"
          } transition-all  duration-300 mt-[60px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49]
           flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0  lg:static gap-x-9 items-center`}
        >
          <ul className="text-white justify-center items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {NavItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div
              className="
              text-white
              justify-center
              items-center
              gap-y-5
              lg:text-dark-soft
              flex
              flex-col
              lg:flex-row
              gap-x-2
              font-semibold"
            >
              <div className="relative group">
                <div className=" flex flex-col items-center">
                  <button
                    className=" flex gap-x-1 items-center lg:mx-6 mt-5 lg:mt-0 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
                    onClick={() => setprofileDropdown(!profileDropdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  {/* Profile Dropdown */}
                  <div
                    className={`${
                      profileDropdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:px-8 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-full `}
                  >
                    <ul className="bg-dark-hard lg:bg-transparent text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
                      <button
                        onClick={() => navigate("/profile")}
                        className="hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Profile
                      </button>
                      <button
                        onClick={logoutHandler}
                        className="hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button className="mt-5 lg:mt-0 border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
              <Link to="/login">Login </Link>
            </button>
          )}
        </div>
      </header>
    </section>
  );
};
