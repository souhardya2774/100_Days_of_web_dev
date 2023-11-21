const mongodb=require("mongodb");

const MongoClient=mongodb.MongoClient;
let database;

const connect=async()=>{
    const client=await MongoClient.connect("mongodb://localhost:27017");
    database=client.db("blogs");
};

const getDB=()=>{
    if(!database){
        throw{ message: "Database connection not established!" }
    }
    return database;
};

module.exports={
    connect:connect,
    getDB:getDB
};