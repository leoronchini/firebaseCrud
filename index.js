import express from 'express';
import admin from 'firebase-admin';

const app = express();

admin.initializeApp({
    credential: admin.credential.cert('serviceAccountKey.json'),
});

app.get('/getdata', (req, res) => {
    console.log('GET request received');
    admin.firestore()
        .collection('collection')
        .get()
        .then(snapshot => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data(),
                uid: doc.id
            }))
            res.json(data);
        })
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})