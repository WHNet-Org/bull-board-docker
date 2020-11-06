FROM node:14.15.0-stretch

EXPOSE 4000
COPY ./node_modules ./node_modules
COPY ./docker-server.js .

CMD ["node", "docker-server.js"]
