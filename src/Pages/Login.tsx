import React from "react";
import { LoginUser, RegisterUser } from "../Api/User";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setToken } = React.useContext<any>(AppContext);

  const [state, setState] = React.useState<"login" | "register">("login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res =
        state === "login"
          ? await LoginUser(formData.email, formData.password)
          : await RegisterUser(
              formData.name,
              formData.email,
              formData.password
            );

      if (res?.data?.success) {
        toast.success(
          state === "login"
            ? "Login successful!"
            : "Registration successful!"
        );

        // save token safely
        if (res?.data?.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        }

        // save userId safely
        if (res?.data?.user?._id) {
          localStorage.setItem("userId", res.data.user._id);
        }

        // reset form
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/");
      } else {
        toast.error(
          res?.data?.message || "An error occurred. Please try again."
        );
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-md"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please sign in to continue
        </p>

        {state === "register" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none ring-0 w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left text-indigo-500">
          <button className="text-sm" type="button">
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 cursor-pointer w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() =>
            setState((prev) =>
              prev === "login" ? "register" : "login"
            )
          }
          className="text-gray-500 cursor-pointer text-sm mt-4 mb-10"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <span className="text-indigo-500 hover:underline">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;