"use client";
import Link from "next/link";
import { doCredentialLogin } from "../app/actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const response = await doCredentialLogin(formData);

      if (response?.error) {
        console.error(response.error);
        setError(response.error.message || "An error occurred");
      } else {
        router.push("/show-items");
      }
    } catch (e: any) {
      console.error(e);
      setError("Check your Credentials");
    }
  }

  return (
    <div className='ShowItemList'>
      <div className="grid mt-8 justify-items-center"> 
        <div className="shadow-lg border-[#6A3636] p-5 rounded-lg border-t-4 bg-white">
          <h1 className="text-3xl text-slate-600 font-bold my-4">Good to see you again!</h1>
          {error && <div className="text-lg text-red-500">{error}</div>}
          <form
            onSubmit={onSubmit}
            className="my-8 max-w-md mx-auto flex flex-col gap-4 border p-6 border-gray-300 rounded-md shadow-sm bg-white">
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 text-base font-medium text-gray-700">
              Email Address
              </label>
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required/>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1 text-base font-medium text-gray-700">
                Password
              </label>
              <input
                className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                required/>
            </div>
            <button
              type="submit"
              className="bg-[#6A3636] text-white rounded px-4 py-2 mt-2 hover:bg-[#5A3636] transition">
              Login
            </button>
          </form>
          <p className="my-3 text-center">
            Don't have an account?
            <Link href="signup" className="mx-2 underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
