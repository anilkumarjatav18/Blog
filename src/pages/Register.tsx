import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import Footer from "../components/layout/Footer";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await registerUser(email, password, username);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">

      <main className="grow flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Decorative Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-linear-to-br from-blue-50 to-indigo-50/50 blur-3xl opacity-70 -z-10" />

        <div className="w-full max-w-120">
          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12">

            {/* Header */}
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                Join the Community
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Account
              </h1>
              <p className="text-slate-500 mt-2">
                Start your journey as a writer today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5">
                  Full Name / Username
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 ml-1 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="mt-2 text-[11px] text-slate-400 ml-1 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Use a mix of letters, numbers & symbols
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl flex items-center gap-3 border border-red-100">
                  <span className="shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center font-bold">!</span>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] disabled:opacity-70 shadow-xl shadow-slate-200 relative overflow-hidden"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Setting up your account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-50 text-center">
              <p className="text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center mt-8 text-slate-400 text-[12px] leading-relaxed max-w-75
           mx-auto">
            By registering, you agree to our
            <span className="text-slate-600 font-medium cursor-pointer hover:underline"> Terms of Service </span>
            and <span className="text-slate-600 font-medium cursor-pointer hover:underline"> Privacy Policy</span>.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}