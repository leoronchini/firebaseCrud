const express = require('express');
const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

const app = express();
app.use(express.json());


admin.firestore().settings({
    host: 'localhost:8080',
    ssl: false
});

app.post('/addData', async (req, res) => {
    console.log('POST request received');
    const name = req.body.name;
    console.log('Request body:', req.body);

    if (!name) {
        return res.status(400).send('Name is required');
    }

    try {
        console.log('Adding data to Firestore')
        const collectionRef = admin.firestore().collection('collection');
        const newDoc = { name };

        const response = await collectionRef.add(newDoc);
        console.log(`Data inserted: ${JSON.stringify(newDoc)}`);
        
        return res.status(201).send(`Document added with ID: ${response.id}`);
    } catch (error) {
        console.error('Error adding data:', error);
        return res.status(500).send('Error adding data: ' + error.message);
    }
});

exports.api = functions
    .runWith({ timeoutSeconds: 300 })
    .https.onRequest(app);

exports.setIncrementId = functions.firestore
    .document('collection/{docId}')
    .onCreate(async (snap, context) => {
        const newValue = snap.data();
        const docId = context.params.docId;

        const collectionRef = admin.firestore().collection('collection');
        try {
            const snapshot = await collectionRef.orderBy('increment_id', 'desc').limit(1).get();

            let increment_id = 1;
            if (!snapshot.empty) {
                const lastDoc = snapshot.docs[0];
                increment_id = lastDoc.data().increment_id + 1;
            }

            await collectionRef.doc(docId).update({ increment_id });
            console.log(`Increment ID set for doc ${docId}`);
        } catch (error) {
            console.error('Error setting increment ID:', error);
        }
    });
