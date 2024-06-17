const dataRepository = require('../repositories/dataRepository');

exports.addData = async (name) => {
    const newDoc = { name };

    const response = await dataRepository.add(newDoc);
    return response;
};

exports.setIncrementId = async (docId) => {
    const increment_id = await dataRepository.getNextIncrementId();
    await dataRepository.update(docId, { increment_id });
};
