FROM node:alpine
WORKDIR /src/account-manager
COPY package*.json .
RUN npm ci
COPY . .
EXPOSE 5000
CMD ["npm","start"]