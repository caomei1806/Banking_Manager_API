FROM node:16-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json /usr/src/app/
EXPOSE 5000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . /usr/src/app
CMD ["node", "-L", "src/app.js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . /usr/src/app
CMD ["nodemon", "-L", "src/app.js"]