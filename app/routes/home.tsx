import Login from "../components/Login";
import AddLogger from "../components/AddLogger";
import Loggers from "../components/Loggers";

export function meta({}) {
  return [
    { title: "BabyLog" },
    { name: "BabyLog", content: "Welcome to BabyLog!" },
  ];
}

export async function loader({ context }) {
  const { getLoggers, getRunningNap } = await import("loaders.server.js");

  const loggers = await getLoggers(context.session?.user.email);
  const openNap = await getRunningNap(context.session?.user.email);
  return { session: context.session, loggers, openNap };
}

export default function Home({ loaderData }) {
  const { session, loggers, openNap } = loaderData;

  return (
    <div className="flex flex-col p-4 text-sm">
      {session?.user ? (
        <>
          <div className="mt-2">
            <AddLogger />
          </div>
          <div className="mt-4">
            <Loggers session={session} loggers={loggers} openNap={openNap} />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
