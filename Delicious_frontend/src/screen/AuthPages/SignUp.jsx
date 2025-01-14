import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate=useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await axios.post("https://delicious-backend-1.onrender.com/api/signup", {
      name,
      email,
      password,
    });

    const data = res.data;
    if (res.status === 200) {
      toast.success(data.message);
      navigate("/login");

    } else if (res.status === 500 || res.status === 400) {
      toast.error(data.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignup}
        action=""
        className="bg-white rounded-lg p-5 shadow-lg flex flex-col gap-3 w-[60vw] lg:w-[20vw] text-sm"
      >
        <span className=" text-lg text-gray-600 -mb-1 text-center">SignUp</span>

        <input
          type="text"
          name="name "
          id="name"
          className="outline-none border rounded-md px-3 py-2 focus:border-yellow-500 text-black "
          autoComplete="off"
          placeholder="enter name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email "
          id="email"
          className="outline-none border rounded-md px-3 py-2 focus:border-yellow-500 text-black "
          autoComplete="off"
          placeholder="enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password "
          id="password"
          className="outline-none border rounded-md px-3 py-2 focus:border-yellow-500 text-black "
          autoComplete="off"
          placeholder="enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className=" outline-none border rounded-md px-3 py-2 text-black bg-yellow-500 hover:bg-yellow-300 cursor-pointer"
        >
          Signup
        </button>
        <p className="text-xs text-gray-600 flex -mt-1 gap-2">
          <span>Or</span>
          <Link
            to="/login"
            className=" text-black hover:underline hover:text-blue-700 cursor-pointer"
          >
            Already have a Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
