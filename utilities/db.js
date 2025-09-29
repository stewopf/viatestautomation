const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27018/local_via';
let client;
let db;

async function connectToDatabase() {
  if (db && client?.topology?.isConnected()) {
    return db;
  }
  try {
    if (client) {
      await client.connect();
    } else {
      client = await MongoClient.connect(uri);
    }
    db = client.db();
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

async function queryDatabase(collectionName, query = {}, options = {}) {
  try {
    await connectToDatabase();  // Ensure connected/reconnect
    const collection = db.collection(collectionName);
    const cursor = collection.find(query, options);
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.error('MongoDB query error:', error);
    throw error;
  }
}

async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { queryDatabase, closeConnection };