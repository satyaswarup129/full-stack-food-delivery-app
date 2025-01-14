import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/slices/SearchSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { loginUser, setUser } from "../../redux/slices/AuthSlice";
import { getCart } from "../../Helper";
import { setCart } from "../../redux/slices/CartSlice";
import toast from "react-hot-toast";
axios.defaults.withCredentials = true;

function Navbar() {
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChange = (e) => {
    dispatch(setSearch(e.target.value));
  };

  const auth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://delicious-backend-1.onrender.com/api/getUser",
        { withCredentials: true }
      );
      const data = res.data;
      dispatch(setUser(data.user));
      dispatch(loginUser());

      const cartData = await getCart(data.user);
      dispatch(setCart(cartData.cartItems));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    const res = await axios.get(
      "https://delicious-backend-1.onrender.com/api/logout"
    );
    const data = await res.data;
    toast.success(data.message);
    window.location.href = "/";
  };
  const handleClick = () => {
    if (windowWidth < 767) {
      setToggle(!toggle);
    }
  };
  useEffect(() => {
    getUser();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 w-full">
      <nav className="bg-yellow-400 shadow-lg">
        <div className="max-w-70xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center mr-3">
              {/* Logo */}
              {windowWidth<767&&<FontAwesomeIcon
                icon={toggle ? faTimes : faBars}
                className="block lg:hidden h-8 w-8 mr-4 cursor-pointer"
                onClick={() => setToggle(!toggle)}
              />}
              <h3 className="text-lg font-bold sm:mr-5" onClick={handleClick}>
                <Link to="/">
                  {!toggle && (
                    <b>
                      <i className=" font-serif font-bold">DELICIOUS</i>
                    </b>
                  )}
                </Link>
              </h3>
            </div>

            {/* Search */}
            {(windowWidth > 767 || toggle) && (
              <div className="flex justify-start items-start  ">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-xl mt-2.5 bg-white py-2 px-4 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Auth Links */}
            {(windowWidth > 767 || toggle) && (
              <div className="flex items-center">
                {auth ? (
                  <Link
                    to="/"
                    className="text-lg font-semibold ml-4 mr-5 cursor-pointer hover:text-black-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-lg font-semibold ml-4 mr-3 cursor-pointer hover:text-black-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-lg font-semibold mr-5 cursor-pointer hover:text-black-300"
                    >
                      SignUp
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
