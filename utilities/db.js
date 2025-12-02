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

async function deleteFromDatabase(collectionName, query) {
  if (!query || Object.keys(query).length === 0) {
    throw new Error('Deletion query cannot be empty');
  }
  try {
    await connectToDatabase(); 
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    if (result.deletedCount === 0) {
      console.warn('No document matched the query for deletion');
    }
    return result;
  } catch (error) {
    console.error('MongoDB deletion error:', error);
    throw error;
  }
}

async function findOneInDatabase(collectionName, query = {}, options = {}) {
  try {
    await connectToDatabase();
    const collection = db.collection(collectionName);
    const doc = await collection.findOne(query, options);
    return doc;
  } catch (error) {
    console.error('MongoDB findOne error:', error);
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

module.exports = { queryDatabase,deleteFromDatabase, closeConnection, findOneInDatabase };