import express from 'express';
import admin from 'firebase-admin';

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('serviceAccountKey.json'),
});
app.use(express.json());


app.get('/getData', async (req, res) => {
    console.log('GET request received');
    const collectionRef = admin.firestore().collection('collection');

    await collectionRef.get().then(snapshot => {
        const data = snapshot.docs.map(doc => ({
            ...doc.data(),
            uid: doc.id
        }));
        res.json(data);
    })
        .catch(error => {
            res.status(500).send('Error getting data: ' + error.message);
        });
});

app.post('/addData', async (req, res) => {
    console.log('POST request received');
    const name = req.body.name;
    if (!name) {
        return res.status(400).send('Name is required');
    }

    try {
        const collectionRef = admin.firestore().collection('collection');
        const snapshot = await collectionRef.orderBy('id', 'desc').limit(1).get();

        let increment_id = 1;
        if (!snapshot.empty) {
            const lastDoc = snapshot.docs[0];
            increment_id = lastDoc.data().id + 1;
        }
        const data = { increment_id, name };

        const response = await collectionRef.add(data);
        res.status(201).send(`Document added with ID: ${response.id}`);
        console.log(`Data inserted: ${JSON.stringify(data)}`);
    } catch (error) {
        res.status(500).send('Error adding data: ' + error.message);
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
})