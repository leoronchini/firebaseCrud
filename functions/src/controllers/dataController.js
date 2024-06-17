const dataService = require('../services/dataService');


exports.addData = async (req, res) => {
    console.log('POST request received, request body:', req.body);
    const { name } = req.body;

    if (!name) {
        return res.status(400).send('Name is required');
    }

    try {
        const response = await dataService.addData(name);
        res.status(201).send(`Document added with ID: ${response.id}`);
    } catch (error) {
        res.status(500).send(`Error adding data: ${error.message}`);
    }
};

exports.setIncrementId = async (snap, context) => {
    const docId = context.params.docId;
    console.log('Firestore trigger function triggered with document ID:', docId);

    try {
        await dataService.setIncrementId(docId);
    } catch (error) {
        console.error('Error setting increment ID:', error);
    }
};
