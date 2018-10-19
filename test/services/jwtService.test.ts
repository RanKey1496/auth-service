import 'reflect-metadata';
import { instance, mock, when, anything } from 'ts-mockito';
import { expect } from 'chai';
import { JwtService, JwtServiceImp } from '../../src/service/jwtService';

describe('JwtService', () => {
    let jwtService: JwtService;

    beforeAll(async done => {
        jwtService = new JwtServiceImp();
        done();
    });

    describe('sign', () => {
        it('should return token and refresh', async () => {
            const result = jwtService.sign('test');
            expect(result.token).to.be.a('string');
            expect(result.refreshToken).to.be.a('string');
        });
    });

    describe('verify', () => {
        it('should verify a token', async () => {
            const token = jwtService.sign('test');
            const result = jwtService.verifyToken(token.token);
            expect(result).to.be.true;
        });
    });

    describe('verifyRefresh', () => {
        it('should verify a refresh token', async () => {
            const token = jwtService.sign('test');
            const result = jwtService.verifyRefresh(token.refreshToken);
            expect(result).to.be.true;
        });
    });
});
