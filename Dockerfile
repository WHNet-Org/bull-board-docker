FROM node:lts

EXPOSE 4000
COPY ./node_modules ./node_modules
COPY ./docker-server.js .

CMD ["node", "docker-server.js"]
