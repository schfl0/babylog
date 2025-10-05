import mongoClientPromise from "./mongodb.server.js";

export async function addLogger(email, logger) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("loggers")
    .findOneAndUpdate(
      { email },
      { $addToSet: { loggers: logger } },
      { upsert: true, returnDocument: "after" },
    );
}

export async function deleteLogger(email, logger) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db
    .collection("loggers")
    .findOneAndUpdate(
      { email },
      { $pull: { loggers: logger } },
      { returnDocument: "after" },
    );
}

export async function logBottle(email, ml, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("bottles").insertOne({ email, ml, date });
}

export async function logFood(email, food, g, date) {
  const client = await mongoClientPromise;
  const db = client.db();

  const res = await db.collection("foods").insertOne({ email, food, g, date });
}

export async function logNap(email, triggerNap) {
  const date = new Date();
  const client = await mongoClientPromise;
  const db = client.db();

  if (triggerNap === "start") {
    const openNap = await db
      .collection("naps")
      .findOne({ email, stop: { $exists: false } });

    if (openNap) {
      return { error: "Nap already in progress" };
    }

    const res = await db.collection("naps").insertOne({ email, start: date });
    return { status: "Nap started", start: date };
  }

  if (triggerNap === "stop") {
    const openNap = await db.collection("naps").findOneAndUpdate(
      {
        email,
        stop: { $exists: false },
      },
      { $set: { stop: date } },
      { sort: { start: -1 }, returnDocument: "after" },
    );

    if (!openNap) {
      return { error: "No nap in progress" };
    }

    return { status: "stopped", nap: openNap };
  }
  return { error: "Unknown trigger" };
}
