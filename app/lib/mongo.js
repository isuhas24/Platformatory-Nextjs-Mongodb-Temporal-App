import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI);

let clientPromise;

if (!global._mongoClientPromise) {
  //store the connection info in the global object 
  global._mongoClientPromise = client.connect()
    .then((client) => {
      console.log("MongoDB connected successfully");
      return client;
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err);
      throw err;
    });
}

clientPromise = global._mongoClientPromise;

export async function getDb(dbName) {
  const client = await clientPromise;
  return client.db(dbName);
}

export default clientPromise;
