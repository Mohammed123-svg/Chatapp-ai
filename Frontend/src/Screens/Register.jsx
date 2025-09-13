import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { MdAttachEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "../Config/axios.js";
import { useContext } from "react";
import { Usercontext } from "../Context/user.context.jsx";

const Register = () => {

  const [logindata, setlogindata] = useState({ email: "", password: "" });
  const navigate=useNavigate()
  const {setuser}=useContext(Usercontext)

  const handleinputchange = (e) => {
    setlogindata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(logindata);

  const sumbithandler = (e) => {
    e.preventDefault();




    const {email,password}=logindata;//extract data first 
    axios
      .post("/api/v2/user/register", {
        email,
        password,
      })
      .then((res) => {
        // console.log(res.data);
        localStorage.setItem("token",res.data.message.token)
        setuser(res.data.message.users)
        navigate("/")
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
        <form
          onSubmit={sumbithandler}
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
            Register
          </button>

          {/* Already have account */}
          <p className="text-center text-gray-300">
            Already have an account?
            <Link
              to="/login"
              className="text-blue-400 hover:underline ml-2 font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
