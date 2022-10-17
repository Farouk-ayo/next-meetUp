//api/new-meetup
//POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // connect returns a promise
    const client = await MongoClient.connect(
      "mongodb+srv://Faroukayo:Faroukayo@cluster0.2tlgmgj.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const results = await meetupsCollection.insertOne(data);

    console.log(results);

    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}
export default handler;
