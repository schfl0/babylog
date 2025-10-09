import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { useSession } from "../sessionContext";



export default function Nav() {
const {session} = useSession();
  const [csrfToken, setCsrfToken] = useState("")

  useEffect(()=> {
    (async()=>{
      const res = await fetch("/api/auth/csrf", {credentials: "include"});
      const data = await res.json();
      setCsrfToken(data.csrfToken);
    })()
  }, [])
  return (
    <nav className="flex items-center gap-6 p-4 text-sm">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "font-bold text-pink-600" : "font-bold text-black"
        }
      >
        👶 BabyLog
      </NavLink>
      <NavLink
        to="/logs"
        className={({ isActive }) =>
          isActive ? "text-pink-600" : "text-black"
        }
      >
        📝 Logs
      </NavLink>
      {session && csrfToken && (
        <form
          action="https://babylog.fl0dev.net/api/auth/signout"
          method="POST"
          className="ml-auto"
        >
          <input
            type="hidden"
            name="csrfToken"
            value={csrfToken}
          />
          <button
            type="submit"
            className="cursor-pointer bg-pink-600 px-2 py-1 text-sm text-white transition-all hover:opacity-60"
          >
            🔒 Sign out
          </button>
        </form>
      )}
    </nav>
  );
}
