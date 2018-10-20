FROM node:carbon
COPY . .
RUN npm install
CMD [ "node", "dist/server.js" ]