import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { loginSuccess } from "../features/auth/authSlice";
import axios from "axios";
import { Button } from "@/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { toast } from "react-toastify";
import utils from "../utils/utils";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.userId);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const API_URL = `https://admin.selecthealing.online/admin/login`;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    try {
      const response = await axios.post(API_URL, {
        email: enteredEmail,
        password: enteredPassword,
      });

      const { token, id } = response.data;

      console.log("response", response.data);
      dispatch(
        loginSuccess({ email: enteredEmail, authToken: token, userId: id })
      );

      toast.success("Login Successful!");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center h-screen items-center bg-gray-100"
      onSubmit={handleLogin}
    >
      <Card className="w-96 mx-auto p-8 flex flex-col gap-5 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-800">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Enter your email and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                ref={emailRef}
                placeholder="zain@gmail.com"
                required
                className="border-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                ref={passwordRef}
                placeholder=""
                required
                className="border-gray-300"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
