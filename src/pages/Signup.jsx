import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setError("All fields are required");
    }

    try {
      const res = await fetch(
        "https://intern-task-api.bravo68web.workers.dev/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data?.data?.result === "OK") {
        toast.success("Account created successfully");
        setFormData({ email: "", password: "" });
        navigate("/login");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (e) {
      setError(`Error: ${e.message}`);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto max-h-screen h-screen flex flex-col items-center justify-center md:px-16 px-5">
      <div className="flex items-center shadow-sm hover:shadow-md justify-center border-indigo-400 p-5 rounded-lg transition-all duration-200 border-2">
        <div className="max-w-[500px]">
          <h2 className="font-bold text-2xl text-center mb-10">Register</h2>
          <div>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <input
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border-indigo-300 rounded-lg border-2 py-2 md:px-10 px-2 outline-none"
                type="email"
              />
              <input
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border-indigo-300 rounded-lg border-2 py-2 md:px-10 px-2 outline-none"
                type="password"
              />

              {error && <p className="text-red-400">{error}</p>}
              <button
                type="submit"
                className="mt-5 bg-indigo-500 hover:bg-indigo-600 hover:scale-105 transition-all duration-200 text-white py-2 px-5 rounded-lg"
              >
                Register
              </button>
            </form>
            <p className="mt-2 text-center">
              Already have an account ?{" "}
              <Link
                className="text-indigo-600 hover:text-indigo-800 font-bold"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
