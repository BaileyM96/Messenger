const jwt = require('jsonwebtoken');
const { Request } = require('jest-mock-express');
const { authMiddleWare, signToken } = require ('./auth');


const mySecret = 'shhhhh';
const expiration = '2h';

describe('Auth', () => {
    describe('authMiddleWare', () => {
        it('should parse the token from the headers', () => {
            const mockReq = new Request();
            const testToken = jwt.sign({ data: 'test' }, mySecret, { expiresIn: expiration });

            mockReq.headers.authorization = `Bearer ${testToken}`;
            const req = authMiddleWare({ req: mockReq });

            expect(req.user).toEqual('test');
        });

        //It should return the original request if no token is provided
        it('should return the original request if no token is provided', () => {
            const mockReq = new Request();
            const req = authMiddleWare({ req: mockReq });

            expect(req.user).toBeUndefined();
        });

        it('should return the original request if an invalid token is provided', () => {
            const mockReq = new Request();
            mockReq.headers.authorization = `Bearer Invalid`;
            const req = authMiddleWare({ req: mockReq });

            expect(req.user).toBeUndefined();
        })
    })
})
