const dataController = require('../src/controllers/dataController');
const dataService = require('../src/services/dataService');
jest.mock('../src/services/dataService');

describe('dataController', () => {
    describe('addData', () => {
        it('should return 400 if name is not provided', async () => {
            const req = { body: {} };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await dataController.addData(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Name is required');
        });

        it('should return 201 if data is added successfully', async () => {
            dataService.addData.mockResolvedValue({ id: '123' });

            const req = { body: { name: 'John Doe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await dataController.addData(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith('Document added with ID: 123');
        });

        it('should return 500 if there is an error', async () => {
            dataService.addData.mockRejectedValue(new Error('Test error'));

            const req = { body: { name: 'John Doe' } };
            const res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await dataController.addData(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Error adding data: Test error');
        });
    });

    describe('setIncrementId', () => {
        it('should call dataService.setIncrementId with correct arguments', async () => {
            const snap = {};
            const context = { params: { docId: '123' } };
            dataService.setIncrementId.mockResolvedValue();

            await dataController.setIncrementId(snap, context);

            expect(dataService.setIncrementId).toHaveBeenCalledWith('123');
        });

        it('should log an error if there is a problem', async () => {
            console.error = jest.fn();
            dataService.setIncrementId.mockRejectedValue(new Error('Test error'));

            const snap = {};
            const context = { params: { docId: '123' } };

            await dataController.setIncrementId(snap, context);

            expect(console.error).toHaveBeenCalledWith('Error setting increment ID:', new Error('Test error'));
        });
    });
});
