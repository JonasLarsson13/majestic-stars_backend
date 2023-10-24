import { MongoClient } from "mongodb";

export const initialize = async (client, collection) => {
  client = new MongoClient(process.env.MONGO_URL);
  await client.connect();
  const database = client.db("majesticstars");
  const result = database.collection(collection);
  return result;
};
