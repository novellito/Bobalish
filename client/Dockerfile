# Ran into issues with node-sass when using
# node:alpine (node 11.4.0)
FROM node:lts-alpine

WORKDIR '/app'
COPY ./package.json ./
RUN npm install

COPY . . 

CMD ["npm", "run", "start"]