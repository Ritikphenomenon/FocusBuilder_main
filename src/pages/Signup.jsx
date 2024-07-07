import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    profilePhoto: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/signup`, formData);
      toast.success('Signup successful! Redirecting to login...', {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Wait for 2 seconds before redirecting to login page
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error('Error signing up:', errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="flex justify-between items-center min-h-screen bg-[#12161D] px-6">
        <div className="text-white flex flex-col items-start ml-10 mt-10">
        <img className="text-4xl font-semibold mb-6" src="/logo.png" alt="" />
          
          <div className="text-2xl opacity-80">
          With Focusmate by your side, 
          </div>
          <div className="text-2xl opacity-80">
          distractions fade, and productivity soars.
          </div>
          <img
            src="/login.png"
            alt="boy"
            className="w-[300px] h-[438px] md:w-[479px]"
          />
        </div>

        <div className="bg-white rounded-2xl p-10 w-[620px] ml-0 mr-10">
          <h2 className="w-28 h-12 font-poppins font-medium text-xl leading-[48px] text-gray-800">Sign Up</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="w-1/2">
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

              <div className="w-1/2">
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
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="w-20 h-5 font-inter font-normal text-sm leading-[19px] text-gray-600"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <div className="w-1/2">
                <label
                  htmlFor="profilePhoto"
                  className="w-20 h-5 font-inter font-normal text-sm leading-[19px] text-gray-600"
                >
                  Profile Photo URL
                </label>
                <div className="mt-2">
                  <input
                    id="profilePhoto"
                    name="profilePhoto"
                    type="url"
                    autoComplete="url"
                    required
                    value={formData.profilePhoto}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-gray-900 font-sans font-normal text-base leading-[1.21rem]"
              >
                By creating an account, I agree to our{" "}
                <span className="underline">Terms of use</span> and
                <span className="underline"> Privacy Policy </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
