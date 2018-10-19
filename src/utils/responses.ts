import httpStatus from 'http-status';
import { Response } from 'express';

function data(code: number, success: boolean, message: string) {
    return {
        code,
        success,
        message
    };
}

export function dataResponse(res: Response, data: any) {
    return res.status(httpStatus.OK).json( data );
}

export function notFoundResponse(res: Response, message: string) {
    return res.status(httpStatus.NOT_FOUND).json(message);
}

export function badRequestResponse(res: Response, message: string) {
    return res.status(httpStatus.BAD_REQUEST).json(message);
}

export function unauthorizeResponse(res: Response, message: string) {
    return res.status(httpStatus.UNAUTHORIZED).json(message);
}

export function conflictResponse(res: Response, message: string) {
    return res.status(httpStatus.CONFLICT).json(message);
}

export function internalResponse(res: Response) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json('Internal server error, try again later');
}