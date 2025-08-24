const api = require('../routes/api');
const bucketlist = require('../model/bucketlists');

jest.mock('../model/bucketlists', () => {
    return {
        getAllBucketlists: jest.fn(),
        getBucketlistByInputName: jest.fn(),
        createBucketlist: jest.fn(),
        addBucketlistItem: jest.fn(),
        deleteBucketlistById: jest.fn(),
        getSingleBucketlistById: jest.fn(),
    };
});

// helper to find route handler by path+method on an express Router
function getRouteHandler(router, method, path) {
    const layer = router.stack.find(l => l.route && l.route.path === path && l.route.methods[method]);
    if (!layer) throw new Error(`route ${method.toUpperCase()} ${path} not found`);
    return layer.route.stack[0].handle;
}

describe('API router - unit tests (error & edge cases)', () => {
    let consoleErrorSpy;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => consoleErrorSpy.mockRestore());

    test('GET /bucketlists -> getAllBucketlists error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'get', '/bucketlists');
        const req = { user: { username: 'u', name: 'U' }, query: {} };
        const res = { send: jest.fn(), status: jest.fn().mockReturnThis(), json: jest.fn() };
        // make model return an error
        bucketlist.getAllBucketlists.mockImplementation((username, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test('GET /bucketlists?q=... -> getBucketlistByInputName error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'get', '/bucketlists');
        const req = { user: { username: 'u' }, query: { q: 'abc' } };
        const res = { send: jest.fn() };
        bucketlist.getBucketlistByInputName.mockImplementation((username, q, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test('POST /bucketlists -> createBucketlist error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'post', '/bucketlists');
        const req = { user: { username: 'u' }, body: { name: 'X' } };
        const res = { send: jest.fn() };
        bucketlist.createBucketlist.mockImplementation((b, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test('PUT /bucketlists/:bucketId/items/ -> addBucketlistItem error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'put', '/bucketlists/:bucketId/items/');
        const req = { body: { name: 'item', done: false, bucketlistId: 'bid' } };
        const res = { send: jest.fn() };
        bucketlist.addBucketlistItem.mockImplementation((id, item, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test('DELETE /bucketlists/:bucketlistId -> deleteBucketlistById error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'delete', '/bucketlists/:bucketlistId');
        const req = { params: { bucketlistId: 'bid' } };
        const res = { send: jest.fn() };
        bucketlist.deleteBucketlistById.mockImplementation((id, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });

    test('GET /bucketlists/:bucketlistId -> getSingleBucketlistById error calls console.error and does not res.send', () => {
        const handler = getRouteHandler(api, 'get', '/bucketlists/:bucketlistId');
        const req = { params: { bucketlistId: 'bid' }, user: { username: 'u' } };
        const res = { send: jest.fn() };
        bucketlist.getSingleBucketlistById.mockImplementation((username, id, cb) => cb(new Error('fail')));
        handler(req, res, () => {});
        expect(consoleErrorSpy).toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
    });
});