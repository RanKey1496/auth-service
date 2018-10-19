import 'reflect-metadata';
import App from './app';

console.info(`
d8888        888   888         .d8888b.                        d8b
d88888        888   888        d88P  Y88b                       Y8P
d88P888        888   888        Y88b.
d88P 888888  88888888888888b.     "Y888b.   .d88b. 888d888888  888888 .d8888b .d88b.
d88P  888888  888888   888 "88b       "Y88b.d8P  Y8b888P"  888  888888d88P"   d8P  Y8b
d88P   888888  888888   888  888         "88888888888888    Y88  88P888888     88888888
d8888888888Y88b 888Y88b. 888  888   Y88b  d88PY8b.    888     Y8bd8P 888Y88b.   Y8b.
d88P     888 "Y88888 "Y888888  888    "Y8888P"  "Y8888 888      Y88P  888 "Y8888P "Y8888
`);

process.on('uncaughtException', (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err.message}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;