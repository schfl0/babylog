import { useState, useEffect } from "react";
import { capitalizeStr } from "../utils";
import { useFetcher } from "react-router";

export default function AddLogger() {
  const fetcher = useFetcher();
  const options = ["bottle", "nap", "food", "temp", "med"];
  const [selectedLogger, setSelectedLogger] = useState(options[0]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data !== undefined) {
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form
      method="post"
      action="/add-logger"
      className="flex items-center justify-start gap-4"
    >
      <label htmlFor="addLogger">Add logger:</label>
      <select
        className="border px-2 py-1"
        name="addLogger"
        id="addLogger"
        value={selectedLogger}
        onChange={(e) => setSelectedLogger(e.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{capitalizeStr(option)}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-pink-600 px-2 py-1 text-sm text-white transition-all hover:opacity-60 cursor-pointer"
      >
        👍 Add
      </button>
    </fetcher.Form>
  );
}
