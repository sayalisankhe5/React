import { signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, authProvider } from "../utils/googleAuthConfig";
import { updateUser } from "../utils/userSlice";

const validation = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is Required";
  }
  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleGoogleSignInClick = () => {
    signInWithPopup(auth, authProvider).then((res) => {
      console.log(res);
      dispatch(
        updateUser({ name: res.user.displayName, email: res.user.email })
      );
      localStorage.setItem("authToken", res.user.accessToken);
      navigateTo("/");
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validation,
    onSubmit: (values) => {
      console.log(values);
      dispatch(updateUser({ name: "", email: values.email }));
      localStorage.setItem("authToken", email);
      navigateTo("/");
    },
  });

  return (
    <>
      {/* <div className=" w-full absolute h-full  bg-gradient-to-r from-cyan-500 to-blue-500 ">
      <div className=" top-1/3 left-1/3 right-1/3 bottom-1/3 absolute bg-white  w-1/4 mx-auto rounded-lg flex justify-center align-middle">
        <div className="m-5 w-full p-2 flex flex-col align-middle">
          <div className="m-2 ">
            <label>Email</label>
            <input
              className="w-full rounded-md border"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.email && formik.errors.email ? (
              <div className=" text-sm text-red-700">
                {formik.errors.email}{" "}
              </div>
            ) : null}
          </div>
          <div className="m-2">
            <label>Password</label>
            <input
              className="w-full rounded-md border"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></input>
            {formik.touched.password && formik.errors.password ? (
              <div className=" text-sm text-red-700">
                {formik.errors.password}{" "}
              </div>
            ) : null}
          </div>
          <div className="m-2 p-1 self-center rounded-md bg-blue-500">
            <button onClick={formik.handleSubmit} type="button">
              Log In
            </button>
          </div>
        </div>
      </div>
    </div> */}
      <div className="flex justify-center items-center">
        <div className="w-full  max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to Foodista
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Oh, snapp!</span>{" "}
                  {formik.errors.email}.
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  <span class="font-medium">Oh, snapp!</span>{" "}
                  {formik.errors.password}.
                </p>
              ) : null}
            </div>
            {/* <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="remember"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
            >
              Lost Password?
            </a>
          </div> */}
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
            <button
              type="button"
              onClick={handleGoogleSignInClick}
              class="text-white mx-2  bg-blue-700 hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="29px"
                height="39px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              {/* <svg
                class="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg> */}
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
