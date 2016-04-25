# Dockerfile
FROM node:5.3.0

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm -v

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/bablot_web/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/bablot_web
RUN npm install
