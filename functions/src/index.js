const functions = require('firebase-functions');
const dataController = require('./controllers/dataController');

exports.api = functions.https.onRequest(async (req, res) => {
    console.log('Request received:', req.method, req.url);
    if (req.method === 'POST') {
        await dataController.addData(req, res);
    } else {
        res.status(405).send('Method Not Allowed');
    }
});

exports.setIncrementId = functions.firestore
    .document('collection/{docId}')
    .onCreate(async (snap, context) => {
        await dataController.setIncrementId(snap, context);
    });
