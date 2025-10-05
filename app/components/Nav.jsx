import { NavLink } from "react-router";
import { useSession } from "../sessionContext";

export default function Nav() {
  const { session, csrfToken } = useSession();
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
      {session && (
        <form
          action="http://localhost:3000/api/auth/signout"
          method="POST"
          className="ml-auto"
        >
          <input
            type="hidden"
            name="csrfToken"
            value={csrfToken?.csrfToken || ""}
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
