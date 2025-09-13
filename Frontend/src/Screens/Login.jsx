import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "../Config/axios.js";
import { useContext } from "react";
import { Usercontext } from "../Context/user.context.jsx";


const Login = () => {
  const [logindata, setlogindata] = useState({
    email: "",
    password: "",
  });
  const {setuser} =useContext(Usercontext)

  const handleinputchange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const navigate = useNavigate();

  const submithandler = (e) => {
    e.preventDefault();
    const { email, password } = logindata;
    axios
      .post("/api/v2/user/login", {
        email,
        password,
      })
      .then((response) => {
        // console.log(response.data.users);
        console.log(response.data.message.login);
        
        localStorage.setItem("token",response.data.message.token)
        setuser(response.data.message.login)
        navigate("/");
      })
      .catch((err) => {
        // console.log(err);

        console.log(err.response.data);
      });
  };

  // console.log(logindata);

  return (
    <div className="flex justify-center items-center h-screen  bg-gradient-to-br from-red-500 to-yellow-400 px-4">
      <form
        onSubmit={submithandler}
        className="w-full max-w-xl bg-gray-800 text-white p-8 rounded-2xl shadow-2xl flex flex-col gap-5"
      >
        <h1 className="text-3xl font-bold text-center text-emerald-400">
          Create an Account
        </h1>

        {/*email */}
        <label className="flex items-center gap-3 bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500 w-full">
          <MdAttachEmail className="text-2xl text-emerald-300" />
          <input
            type="email"
            placeholder="mail@site.com"
            required
            name="email"
            value={logindata.email}
            onChange={handleinputchange}
            className="bg-transparent outline-none w-full placeholder:text-gray-400 text-base"
          />
        </label>

        {/* Password */}
        <label className="flex items-center gap-3 bg-gray-700 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500 w-full">
          <RiLockPasswordFill className="text-2xl text-emerald-300" />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            onChange={handleinputchange}
            value={logindata.password}
            className="bg-transparent outline-none w-full placeholder:text-gray-400 text-base"
          />
        </label>

        {/* Register Button */}
        <button
          type="submit"
          className="bg-emerald-500 text-black font-semibold text-lg py-3 rounded-xl hover:bg-emerald-400 transition duration-200 w-full"
        >
          Login
        </button>

        {/* Already have account */}
        <p className="text-center font-bold text-gray-300">
          Don't have account create one
          <Link
            to="/register"
            className="text-blue-400 hover:underline ml-2 font-medium"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
