// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useRef, useState, useEffect } from "react";
// import { loginSuccess } from "../features/auth/authSlice";
// import axios from "axios";
// import { Button } from "@/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/ui/card";
// import { Input } from "@/ui/input";
// import { Label } from "@/ui/label";
// import { toast } from "react-toastify";
// import utils from "../utils/utils";

// export function LoginForm() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const userId = useSelector((state) => state.auth.userId);
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const [loading, setLoading] = useState(false);

//   const API_URL = `https://admin.selecthealing.online/admin/login`;

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const enteredEmail = emailRef.current.value;
//     const enteredPassword = passwordRef.current.value;

//     try {
//       const response = await axios.post(API_URL, {
//         email: enteredEmail,
//         password: enteredPassword,
//       });

//       const { token, id } = response.data;

//       console.log("response", response.data);
//       dispatch(
//         loginSuccess({ email: enteredEmail, authToken: token, userId: id })
//       );

//       toast.success("Login Successful!");
//       navigate("/");
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           "Invalid email or password. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       className="flex justify-center h-screen items-center bg-gray-100"
//       onSubmit={handleLogin}
//     >
//       <Card className="w-96 mx-auto p-8 flex flex-col gap-5 shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl text-center text-gray-800">
//             Admin Login
//           </CardTitle>
//           <CardDescription className="text-center text-gray-600">
//             Enter your email and password to login
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4">
//             <div className="grid gap-2">
//               <Label htmlFor="email" className="text-gray-700">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 ref={emailRef}
//                 placeholder="zain@gmail.com"
//                 required
//                 className="border-gray-300"
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="password" className="text-gray-700">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 ref={passwordRef}
//                 placeholder=""
//                 required
//                 className="border-gray-300"
//               />
//             </div>
//             <Button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </form>
//   );
// }
import React, { useState } from "react";
import Logo from "../assets/image 1.svg";
import bg from "../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import utils from "../utils/utils";
import { useDispatch } from "react-redux";
import { setSelectedToken } from "../features/logout/logoutSlice";
import LoaderModal from "../Components/Modal/Loader";
import { login, register } from "../features/auth/authSlice";
import Modal from "../Components/Modal";

const LoginForm = () => {
  const [isOpenLoader, setIsOpenLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false); // New state to track if OTP is sent
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openModalLoader = () => setIsOpenLoader(true);
  const closeModalLoader = () => setIsOpenLoader(false);

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .max(255, "Email must be less than 255 characters")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Email must follow the standard email format"
        ),
      password: Yup.string().when("isOTPSent", {
        is: false, // Password is required only if OTP is not sent
        then: Yup.string().required("Password is required"),
      }),
      newPassword: Yup.string().when("isOTPSent", {
        is: true, // OTP is required only if OTP is sent
        then: Yup.string().required("OTP is required"),
      }),
    }),
    onSubmit: (values) => {
      submitLogin(values);
    },
  });

  const submitLogin = async (user) => {
    openModalLoader();
    try {
      const response = await fetch(`${utils.BASE_URL}auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${utils.token}`,
        },
        body: JSON.stringify(user),
      });
      const result = await response.json();

      if (response.ok) {
        dispatch(login({ ...result.user, token: result.jwt }));
        dispatch(setSelectedToken(result.jwt));
        localStorage.setItem("loginUserData", JSON.stringify(result.user));
        closeModalLoader();
        navigate("/");
      } else {
        setMessage(result?.error?.message || "Login failed");
        closeModalLoader();
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      closeModalLoader();
    }
  };

  const handleForgotPassword = async (email) => {
    openModalLoader();
    try {
      const response = await fetch(
        `http://54.173.110.62:3001/api/users/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        setMessage("Password reset OTP sent to your email");
        setIsOTPSent(true); // Set OTP sent state to true
        setIsForgotPasswordModalOpen(false);
        setIsResetPasswordModalOpen(true); // Open the reset password modal
      } else {
        setMessage("Failed to send reset OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      closeModalLoader();
    }
  };

  const handleResetPassword = async (email, newPassword) => {
    openModalLoader();
    try {
      const response = await fetch(
        `http://54.173.110.62:3001/api/users/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successfully.");
        setIsResetPasswordModalOpen(false);
        setIsOTPModalOpen(false);
      } else {
        setMessage("Failed to reset password. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      closeModalLoader();
    }
  };

  const handleGoogleSignIn = async () => {
    openModalLoader();
    try {
      const auth2 = google.accounts.oauth2.initTokenClient({
        client_id: `${utils.GOOGLE_CLIENT_ID}`,
        scope: "profile email",
        callback: async (response) => {
          try {
            const userInfoResponse = await fetch(
              "https://www.googleapis.com/oauth2/v3/userinfo",
              {
                headers: {
                  Authorization: `Bearer ${response.access_token}`,
                },
              }
            );

            const user = await userInfoResponse.json();

            const username = user.email.split("@")[0];
            const [fname, lname] = user.name.split(" ");

            const userData = {
              username: username,
              fname: fname,
              lname: lname,
              email: user.email,
              photoURL: user.picture,
              id: user.sub,
            };

            // Check if user exists in the backend
            const userExistsResponse = await fetch(
              `${utils.BASE_URL}users?filters[email][$eqi]=${user.email}&populate=*`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${utils.token}`,
                },
              }
            );

            const userExistsResult = await userExistsResponse.json();

            if (userExistsResponse.ok && userExistsResult.length > 0) {
              // User exists, log them in
              const existingUserData = userExistsResult[0];
              localStorage.setItem(
                "loginUserData",
                JSON.stringify(existingUserData)
              );
              dispatch(login(existingUserData));
              localStorage.setItem("jwtToken", response.access_token);
              navigate("/");
            } else {
              // User does not exist, register them
              const registerData = {
                username: userData.username,
                email: userData.email,
                password: userData.username, // Password can be something like username
                fname: userData.fname,
                lname: userData.lname,
                isSocial: true,
              };

              await Register(registerData);
              navigate("/");
            }
          } catch (error) {
            console.error("Error fetching user info:", error);
            setMessage("Failed to fetch user info. Please try again.");
          } finally {
            closeModalLoader();
          }
        },
      });

      auth2.requestAccessToken();
    } catch (error) {
      console.error("Google Sign-In error:", error);
      setMessage("Something went wrong, please try again.");
      closeModalLoader();
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center">
      <div className="bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div
          className="flex-1 text-center hidden lg:flex bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        >
          <div className="w-full flex items-center p-6 sm:p-12 bg-[#041F60] opacity-80">
            <Link to="/" className="logo absolute top-6 left-14">
              <img src={Logo} alt="" />
            </Link>
            <div className="text-[#CCAA5A] font-bold text-start text-[32px] leading-[38.4px]">
              <h1>START TODAY</h1>
              <h3 className="text-[64px] text-white leading-[76px]">
                Transform Your <br /> Health And <br /> Your Life.
              </h3>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 px-5 flex flex-col justify-center">
          <div className="flex flex-col">
            <div className="w-full flex-1">
              <div className="flex flex-col items-center">
                <div className="text-left w-full max-w-md py-3 mb-[34px]">
                  <h1 className="text-[32px] mb-2 font-bold text-[#090A0A] leading-[36px]">
                    Sign In
                  </h1>
                  <p className="text-base font-normal text-[#090A0A]">
                    Log in to your account
                  </p>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full max-w-md font-bold shadow-sm rounded-[48px] py-3 bg-[#F1F3FF] flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-4"
                >
                  <div className="">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Google SVG Paths */}
                    </svg>
                  </div>
                  <span className="ml-4 text-[16px] font-medium leading-[16px] text-[#041F60]">
                    Continue with Google
                  </span>
                </button>

                <div className="my-7 text-center">
                  <div className="px-2 inline-block leading-[16px] text-sm text-[#6C7072] tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign in with email
                  </div>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="mx-auto max-w-md"
                >
                  <input
                    className={`w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none ${
                      formik.touched.identifier && formik.errors.identifier
                        ? "border-red-500"
                        : "border-[#E3E5E5]"
                    }`}
                    type="email"
                    name="identifier"
                    placeholder="Email"
                    value={formik.values.identifier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.identifier && formik.errors.identifier ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.identifier}
                    </div>
                  ) : null}

                  <input
                    className={`w-full px-4 py-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] text-sm focus:outline-none ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-[#E3E5E5]"
                    }`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.password}
                    </div>
                  ) : null}
                  <div className="text-red-500 text-sm mt-4">{message}</div>

                  <span
                    className="text-[#041F60] leading-[16px] cursor-pointer text-[16px] font-[500]"
                    onClick={() => setIsForgotPasswordModalOpen(true)}
                  >
                    Forgot password?
                  </span>
                  <button
                    type="submit"
                    className="text-[#fff] leading-[16px] text-[16px] font-medium mb-7 mt-[46px] tracking-wide bg-[#CCAA5A] w-full py-4 rounded-[48px] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  >
                    <span className="ml-3">Log In</span>
                  </button>
                  <p className="mt-6 text-[16px] leading-[16px] font-medium font-inter text-[#6C7072] text-center">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#041F60] font-inter">
                      Join Now
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
        title="Forgot Password"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgotPassword(formik.values.identifier);
          }}
        >
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="email"
            name="identifier"
            placeholder="Email"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 text-sm mt-4">{message}</div>
          <button
            type="submit"
            className="text-[#fff] leading-[16px] text-[16px] font-medium mb-7 mt-[46px] tracking-wide bg-[#CCAA5A] w-full py-4 rounded-[48px] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Send Reset OTP</span>
          </button>
        </form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
        title="Reset Password"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleResetPassword(
              formik.values.identifier,
              formik.values.newPassword
            );
          }}
        >
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="email"
            name="identifier"
            placeholder="Email"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled // Disable the email field as it should be pre-filled
          />
          <input
            className="w-full px-4 py-4 mb-4 rounded-lg font-normal text-[#090A0A] leading-[16px] text-[16px] border placeholder-[#72777A] placeholder:font-normal placeholder:text-[16px] placeholder:leading-[16px] focus:outline-none border-[#E3E5E5]"
            type="text"
            name="newPassword"
            placeholder="OTP"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <div className="text-red-500 text-sm mt-4">{message}</div>
          <button
            type="submit"
            className="text-[#fff] leading-[16px] text-[16px] font-medium mb-7 mt-[46px] tracking-wide bg-[#CCAA5A] w-full py-4 rounded-[48px] transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
          >
            <span className="ml-3">Reset Password</span>
          </button>
        </form>
      </Modal>

      <LoaderModal
        isOpenLoader={isOpenLoader}
        openModalLoader={openModalLoader}
        closeModalLoader={closeModalLoader}
      />
    </div>
  );
};

export default LoginForm;
