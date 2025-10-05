import { redirect } from "react-router";

export function meta({}) {
  return [{ title: "Logs" }, { name: "description", content: "Logs page" }];
}

export async function loader({ context }) {
  if (!context.session?.user) throw redirect("/");
  return { session: context.session };
}

export default function Logs({ loaderData }) {
  const { session } = loaderData;
  return (
    <div className="p-4">
      <h1 className="text-2xl">Logs</h1>
    </div>
  );
}
