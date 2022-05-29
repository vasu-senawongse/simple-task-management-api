FROM node:10-alpine
USER root
RUN npm config set unsafe-perm true
RUN npm install -g nodemon
RUN mkdir -p /home/node/app/node_modules && chown -R root:root /home/node/app && mkdir -p /app/uploads
WORKDIR /app
COPY package*.json ./
# USER node
RUN npm install
COPY . .
EXPOSE 5000

CMD [ "node", "index.js" ]
