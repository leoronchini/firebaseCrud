const admin = require('firebase-admin');

admin.initializeApp();

const db = admin.firestore();

exports.add = async (data) => {
    const docRef = await db.collection('collection').add(data);
    return { id: docRef.id };
};

exports.getNextIncrementId = async () => {
    const snapshot = await db.collection('collection').orderBy('increment_id', 'desc').limit(1).get();

    if (snapshot.empty) {
        return 1;
    } else {
        const lastDoc = snapshot.docs[0];
        return lastDoc.data().increment_id + 1;
    }
};

exports.update = async (docId, data) => {
    await db.collection('collection').doc(docId).update(data);
};
