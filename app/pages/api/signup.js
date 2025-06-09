import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { uid, name, email, phone } = req.body;
  const dbs = ["userDB1", "userDB2", "userDB3"];

  try {
    const client = await clientPromise;

    await Promise.all(
      dbs.map((dbName) =>
        client.db(dbName).collection("users").updateOne(
          { uid },
          { $setOnInsert: { uid, name, email, phone } },
          { upsert: true }
        )
      )
    );

    res.status(200).json({ message: "User inserted (if not existed)" });
  } catch (err) {
    console.error("Signup DB error:", err);
    res.status(500).json({ error: "Signup failed" });
  }
}
