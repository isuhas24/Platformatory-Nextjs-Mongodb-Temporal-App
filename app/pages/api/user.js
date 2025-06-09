import clientPromise from "../../lib/mongo";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const uid = req.query.uid;
    if (!uid) return res.status(400).json({ error: "UID not provided" });

    const client = await clientPromise;
    const db = client.db("userDB1");

    const user = await db.collection("users").findOne({ uid });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in /api/user:", error);
    res.status(500).json({ error: "Server error" });
  }
}
