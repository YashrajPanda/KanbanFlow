const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('kanbanflow');
        const collection = db.collection('tasks');
        
        const now = new Date();
        const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
        
        const result = await collection.updateMany(
            { status: 'IN_PROGRESS' },
            { $set: { dueDate: pastDate } }
        );
        
        console.log(`Updated ${result.modifiedCount} documents.`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
