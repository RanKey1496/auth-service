import express from 'express';

export interface RegistrableController {
    register(app: express.Application): void;
}