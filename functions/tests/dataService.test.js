const dataService = require('../src/services/dataService');
const dataRepository = require('../src/repositories/dataRepository');
jest.mock('../src/repositories/dataRepository');

describe('dataService', () => {
    describe('addData', () => {
        it('should call dataRepository.add with correct arguments', async () => {
            const name = 'John Doe';
            dataRepository.add.mockResolvedValue({ id: '123' });

            const result = await dataService.addData(name);

            expect(dataRepository.add).toHaveBeenCalledWith({ name });
            expect(result).toEqual({ id: '123' });
        });
    });

    describe('setIncrementId', () => {
        it('should call dataRepository.getNextIncrementId and dataRepository.update with correct arguments', async () => {
            dataRepository.getNextIncrementId.mockResolvedValue(1);
            const docId = '123';

            await dataService.setIncrementId(docId);

            expect(dataRepository.getNextIncrementId).toHaveBeenCalled();
            expect(dataRepository.update).toHaveBeenCalledWith(docId, { increment_id: 1 });
        });
    });
});
