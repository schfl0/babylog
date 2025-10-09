import { useSession } from "../sessionContext";

export default function Login() {
  const { csrfToken } = useSession();
  console.log("LOGIN CSRF:", csrfToken);

if(!csrfToken){
  return <div>Loading...</div>
}
  
  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center justify-center self-center">
      <form
        className="w-full"
        action="https://babylog.fl0dev.net/api/auth/signin/google"
        method="POST"
      >
        <input
          type="hidden"
          name="csrfToken"
          value={csrfToken?.csrfToken || ""}
        />
        <button
          className="flex w-full cursor-pointer items-center justify-between border p-2 text-sm transition-all hover:opacity-60"
          type="submit"
        >
          <p>Sign in with Google</p>
          <img
            loading="lazy"
            height="24"
            width="24"
            src="http://authjs.dev/img/providers/google.svg"
          />
        </button>
      </form>
    </div>
  );
}
