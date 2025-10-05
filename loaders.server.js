import mongoClientPromise from "./mongodb.server.js";

export async function getLoggers(email) {
  const client = await mongoClientPromise;
  const db = client.db();
  const res = await db.collection("loggers").findOne({ email });
  return res?.loggers ?? [];
}

export async function getRunningNap(email) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("naps").findOne({
    email,
    stop: { $exists: false },
  });
  return res;
}
