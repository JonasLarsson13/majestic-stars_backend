import { MongoClient } from "mongodb";
let client;

// Lambda function initialization code
async function initialize() {
  client = new MongoClient(
    "mongodb+srv://majesticstars2023:7tq6qo29xv9zF5ct@majesticstars.c0ppytg.mongodb.net/",
    { useNewUrlParser: true }
  );
  await client.connect();
}

initialize(); // Call the initialization code

exports.handler = async (event, context) => {
  try {
    // Use the `client` connection to interact with MongoDB
    const database = client.db("majesticstars");
    const collection = database.collection("meetups");

    // Parse the incoming event data, which might contain information about the meetup to be added
    const requestData = JSON.parse(event.body);

    // Insert the meetup data into the MongoDB collection
    const result = await collection.insertOne(requestData);

    return {
      statusCode: 200,
      body: JSON.stringify(result.ops[0]), // Return the added meetup data
    };
  } catch (error) {
    console.error("Error adding meetup:", error);
    return {
      statusCode: 500,
      body: JSON.stringify("Error adding meetup", error),
    };
  }
};
