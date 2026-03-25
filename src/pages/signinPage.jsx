import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import * as Yup from "yup";

import { Button } from "@MEShadcnComponents/button";
import { Input } from "@MEShadcnComponents/input";
import { signIn } from "@MERedux/authentication/authenticationAction";

import logo from "@/assets/logo.png";

const SigninPage = () => {
  const dispatch = useDispatch();
  const { loader, error } = useSelector((state) => state.authentication);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(
        signIn({ username: values.username.trim(), password: values.password }),
      );
    },
  });

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left panel — branding (hidden on mobile/tablet) */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary p-10">
        <img
          src={logo}
          alt="Logo"
          className="h-24 w-24 xl:h-32 xl:w-32 mb-6 rounded-2xl shadow-lg"
        />
        <h2 className="text-3xl xl:text-4xl font-bold text-primary-foreground tracking-tight">
          ME Super Admin
        </h2>
        <p className="mt-2 text-primary-foreground/70 text-base xl:text-lg text-center max-w-sm">
          Manage everything from one place
        </p>
      </div>

      {/* Right panel — sign in form */}
      <div className="flex items-center justify-center bg-background px-4 py-8 sm:px-8">
        <div className="w-full max-w-100 space-y-8">
          {/* Mobile/Tablet logo */}
          <div className="flex flex-col items-center space-y-3 lg:hidden">
            <img src={logo} alt="Logo" className="h-14 w-14 sm:h-16 sm:w-16" />
          </div>

          {/* Heading */}
          <div className="space-y-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Enter your credentials to sign in
            </p>
          </div>

          {/* Form */}
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className={`text-sm font-medium ${formik.touched.username && formik.errors.username ? "text-destructive" : "text-foreground"}`}
              >
                Username
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                className="h-10 sm:h-11"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={
                  formik.touched.username && !!formik.errors.username
                }
                autoComplete="username"
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className={`text-sm font-medium ${formik.touched.password && formik.errors.password ? "text-destructive" : "text-foreground"}`}
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-10 sm:h-11 pr-10"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.password && !!formik.errors.password
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors hover:cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-destructive mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-medium bg-success hover:bg-success/90 hover:cursor-pointer"
              disabled={loader}
            >
              {loader ? (
                <>
                  {"Signing In..."}
                  <Loader2 className="size-4 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export default SigninPage;
