const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// mongodb
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jucoem4.mongodb.net/?retryWrites=true&w=majority`;


// middleware
app.use(express.json());
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // Get the database and collection on which to run the operation
    const database = client.db("bistroDB");
    const menuCollection = database.collection("menu");
    const reviewsCollection = database.collection("reviews");

      //   menu api
      app.get('/menu', async (req, res) => {
          const result = await menuCollection.find().toArray();
          res.send(result);
      })
      
      //   reviews api
      app.get('/reviews', async (req, res) => {
          const result = await reviewsCollection.find().toArray();
          res.send(result);
      })

      // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// port
app.listen(port, () => {
    console.log(`boss is siting on port ${port}`);
})
