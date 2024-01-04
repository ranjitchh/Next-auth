"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

const Login = () => {
  const router = useRouter();
  const { data: session, session: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/dashboard");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;
    console.log(email, password);
    if (!email || !password) {
      toast.error("enter email and password before procedding");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      if (res?.url) {
        router.replace("/Dashboard");
      }
      toast.error("Invalid Credientals");
    } else {
      toast.success("Successfully Logged In.");
      router.push("/Dashboard");
    }
  };

  if (sessionStatus === "loading") {
    return <h1>Loading ...</h1>;
  }

  return (
    sessionStatus !== "authenticated" && (
      <>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="black text-gray-700 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-2 border border-gray-300 rounded "
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="black text-gray-700 text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full p-2 border border-gray-300 rounded "
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="mb-5 w-full bg-blue-500 text-white py-2 rounded"
                  >
                    Login
                  </button>
                </div>

                <span>
                  Dont't have an Account ?
                  <Link
                    href={"/register"}
                    className="text-center text-blue-500 hover:underline mt-2"
                  >
                    Register
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </>
    )
  );
};

export default Login;
