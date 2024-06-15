
import  { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        formData
      );
      console.log(response.data); // Optionally, handle success message or redirect to dashboard
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home"); // Redirect to dashboard after successful login
    } catch (error) {
      console.error("Error logging in:", error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <section className="flex justify-between items-center min-h-screen bg-[#12161D] px-6">

        <div className="text-white flex flex-col items-start ml-10 mt-10">
          <div className="text-4xl font-semibold mb-6 ">Logo</div>
          <div className="text-2xl opacity-80 ">
            Access to thousands of design 
          </div>
          <div className="text-2xl opacity-80 ">
          resources and templates
          </div>
          <img
            src="/login.png"
            alt="boy"
            className="w-[300px] h-[438px] md:w-[479px] "
          />
        </div>

        <div className="bg-white rounded-2xl p-10 w-[620px]  ml-0 mr-10">
          <h2 className="w-28 h-12 font-poppins font-medium text-xl leading-[48px] text-gray-800">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="w-20 h-5 font-inter font-normal text-sm leading-[19px] text-gray-600"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="w-20 h-5 font-inter font-normal text-sm leading-[19px] text-gray-600"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block  text-gray-900 font-sans font-normal text-base leading-[1.21rem]"
              >
               By creating an account, I agree to our <span className="underline">Terms of use</span>  and
               <span className="underline">  Privacy Policy </span>
               
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
               Login
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/"
              className="font-bold underline"
            >
              Sign up 
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;
