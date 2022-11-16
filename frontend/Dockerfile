FROM node:latest as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY . ./
RUN npm install
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:latest

# WORKDIR /app

# # Cache and Install dependencies
# COPY package.json .
# RUN npm install
# # Copy app files
# COPY . .
# # Expose port
# EXPOSE 3000
# # Start the app
# CMD [ "npm", "start" ]