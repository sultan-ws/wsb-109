const {MongoClient} = require('mongodb');

const dbName = 'wsb_109_tmp';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connection = async ()=>{
    await client.connect();
    const db = client.db(dbName);

    return db;
};

const insertData = async ()=>{
    const db = await connection();
    const collection = db.collection('users');

    const response = await collection.insertOne({
        name: 'John Doe',
        age: 30        
    });

    console.log(response);
};

// insertData();

const readData = async ()=>{
    const db = await connection();
    const collection = db.collection('users');

    const response = await collection.find().toArray();

    console.log(response);
};

readData();

const deleteData = async ()=>{
    const db = await connection();
    const collection = db.collection('users');

    const response = await collection.deleteOne({name: 'John Doe'});

    console.log(response);
};

// deleteData();

const updateData = async()=>{
    const db = await connection();
    const collection = db.collection('users');

    const response = await collection.updateOne(
        {name: 'John Doe'},
        {
            $set:{name: 'Jayant'}
        }
    );

    console.log(response);
};

// updateData();