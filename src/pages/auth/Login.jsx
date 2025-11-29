import React, { useState } from "react";
import { Apple, Github, Mail, HelpCircle } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const disposableDomains = [
    "tempmail.com",
    "throwawaymail.com",
    "mailinator.com",
    "yopmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "maildrop.cc",
    "getairmail.com",
  ];

  const validateEmail = () => {
    if (!email.includes("@")) return true;
    const domain = email.split("@")[1].toLowerCase();

    if (disposableDomains.includes(domain)) {
      setEmailError("Temporary emails are not allowed.");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validatePasswordMatch = () => {
    if (isLogin) return true;

    if (password !== confirmPass) {
      setPassError("Passwords do not match.");
      return false;
    }

    setPassError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailOk = validateEmail();
    const passOk = validatePasswordMatch();

    if (!emailOk || !passOk) return;

    if (isLogin) alert("Logged in successfully!");
    else alert("Account created successfully!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#24243e] via-[#302b63] to-[#0f0c29] relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute w-[300px] h-[300px] bg-pink-600 rounded-full blur-[100px] top-[-10%] left-[-10%] animate-pulse opacity-60"></div>
      <div className="absolute w-[300px] h-[300px] bg-cyan-400 rounded-full blur-[100px] bottom-[-10%] right-[-10%] animate-pulse opacity-60"></div>

      {/* Card */}
      <div className="relative z-10 w-[420px] p-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl text-white">

        <h2 className="text-center text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-white text-transparent bg-clip-text uppercase">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>

          {/* Full Name (Register Only) */}
          {!isLogin && (
            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="w-full bg-transparent border-b border-white/40 focus:border-cyan-400 outline-none py-2 text-white"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-1">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onBlur={validateEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent border-b border-white/40 focus:border-cyan-400 outline-none py-2 text-white"
            />
          </div>
          {emailError && (
            <p className="text-red-400 text-sm mb-3">{emailError}</p>
          )}

          {/* Password */}
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent border-b border-white/40 focus:border-cyan-400 outline-none py-2 text-white"
            />
          </div>

          {/* Confirm Password (Register Only) */}
          {!isLogin && (
            <>
              <div className="mb-1">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-white/40 focus:border-cyan-400 outline-none py-2 text-white"
                />
              </div>

              {passError && (
                <p className="text-red-400 text-sm mb-3">{passError}</p>
              )}
            </>
          )}

          {/* Forgot Password */}
          {isLogin && (
            <p className="text-right text-sm text-white/70 mb-4 cursor-pointer hover:text-cyan-400 duration-200">
              Forgot Password?
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-full border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition-all shadow-lg"
          >
            {isLogin ? "INITIALIZE SESSION" : "REGISTER INTERN"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 border-b border-white/20"></div>
            <span className="text-white/60 text-sm">Or connect with</span>
            <div className="flex-1 border-b border-white/20"></div>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mb-4">

            <button
              type="button"
              onClick={() => alert("Google Login Coming Soon")}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              <Mail size={20} />
            </button>

            <button
              type="button"
              onClick={() => alert("Microsoft Login Coming Soon")}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              <Github size={20} />
            </button>

            <button
              type="button"
              onClick={() => alert("Apple Login Coming Soon")}
              className="p-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              <Apple size={20} />
            </button>
          </div>

          {/* Switch Login/Register */}
          <p className="text-center text-white/70 text-sm">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setIsLogin(false)}
                  className="text-cyan-400 cursor-pointer underline"
                >
                  Apply for Intern
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setIsLogin(true)}
                  className="text-cyan-400 cursor-pointer underline"
                >
                  Login Here
                </span>
              </>
            )}
          </p>

        </form>
      </div>
    </div>
  );
}
