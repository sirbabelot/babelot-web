# Dockerfile
FROM node:5

COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

# Bundle app source
COPY ./ /usr/src/app

EXPOSE 8000
