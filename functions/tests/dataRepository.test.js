const admin = require('firebase-admin');
const dataRepository = require('../src/repositories/dataRepository');

jest.mock('firebase-admin', () => {
    const firestore = jest.fn().mockReturnThis();
    firestore.collection = jest.fn().mockReturnThis();
    firestore.add = jest.fn();
    firestore.orderBy = jest.fn().mockReturnThis();
    firestore.limit = jest.fn().mockReturnThis();
    firestore.get = jest.fn();
    firestore.doc = jest.fn().mockReturnThis();
    firestore.update = jest.fn();
    return {
        firestore: () => firestore,
        initializeApp: jest.fn(),
        credential: {
            applicationDefault: jest.fn()
        }
    };
});

beforeAll(() => {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
});

describe('dataRepository', () => {
    describe('add', () => {
        it('should add a document and return the ID', async () => {
            const data = { name: 'John Doe' };
            const docRef = { id: '123' };
            admin.firestore().collection().add.mockResolvedValue(docRef);

            const result = await dataRepository.add(data);

            expect(admin.firestore().collection).toHaveBeenCalledWith('collection');
            expect(admin.firestore().collection().add).toHaveBeenCalledWith(data);
            expect(result).toEqual({ id: docRef.id });
        });
    });

    describe('getNextIncrementId', () => {
        it('should return 1 if no documents exist', async () => {
            const snapshot = { empty: true };
            admin.firestore().collection().orderBy().limit().get.mockResolvedValue(snapshot);

            const result = await dataRepository.getNextIncrementId();

            expect(admin.firestore().collection).toHaveBeenCalledWith('collection');
            expect(admin.firestore().collection().orderBy).toHaveBeenCalledWith('increment_id', 'desc');
            expect(admin.firestore().collection().orderBy().limit).toHaveBeenCalledWith(1);
            expect(result).toBe(1);
        });

        it('should return next increment ID if documents exist', async () => {
            const lastDoc = { data: () => ({ increment_id: 1 }) };
            const snapshot = { empty: false, docs: [lastDoc] };
            admin.firestore().collection().orderBy().limit().get.mockResolvedValue(snapshot);

            const result = await dataRepository.getNextIncrementId();

            expect(result).toBe(2);
        });
    });

    describe('update', () => {
        it('should update a document with given data', async () => {
            const docId = '123';
            const data = { increment_id: 1 };

            await dataRepository.update(docId, data);

            expect(admin.firestore().collection).toHaveBeenCalledWith('collection');
            expect(admin.firestore().collection().doc).toHaveBeenCalledWith(docId);
            expect(admin.firestore().collection().doc().update).toHaveBeenCalledWith(data);
        });
    });
});
