import { redirect } from "react-router";
import {getBottleLogs} from '../../loaders.server'
import { index } from "@react-router/dev/routes";

export function meta({}) {
  return [{ title: "Logs" }, { name: "description", content: "Logs page" }];
}

export async function loader({ request }) {
  const res = await fetch("https://babylog.fl0dev.net/api/auth/session", {
      headers: {
        Cookie: request.headers.get("Cookie") ?? "",
      },
      credentials: "include",
    });
    const session = await res.json();
  if (!session?.user) throw redirect("/logs");

const bottleLogs = await getBottleLogs(session.user.email)

  return { session: session, bottleLogs: bottleLogs };
}

export default function Logs({ loaderData }) {
  const { session, bottleLogs } = loaderData;
  return (
    <div className="p-4">

      <h1 className="text-sm font-bold">Bottles</h1>
      {bottleLogs.length > 0 && (
        bottleLogs.map((bottle, index)=>(
          <div key={index}>
          <p>{bottle.date}</p>
          <p>{bottle.ml}</p>
        </div>
        ))
      )}
    </div>
  );
}
