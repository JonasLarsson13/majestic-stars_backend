/* import { MongoClient } from "mongodb";

const connectDB = {
  before: async () => {
    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri, { useNewUrlParser: true });

    try {
      await client.connect();
      const database = client.db("majesticstars");
      const collection = database.collection("mycollection");

      // Perform MongoDB operations here
    } finally {
      await client.close();
    }

    return {
      statusCode: 200,
      body: JSON.stringify("Data from MongoDB"),
    };
  },
};
 */
