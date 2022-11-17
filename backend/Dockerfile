FROM node:latest

WORKDIR /usr/src/app
COPY package.json ./
COPY . ./
RUN npm install

CMD ["npm", "run", "dev"]

# RUN npm run dev