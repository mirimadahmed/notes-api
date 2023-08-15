# Use an official Node.js runtime as the base image
FROM node:18.17.1-alpine

RUN apk update && \
  apk add bash

# Set the working directory inside the container
WORKDIR /var/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which your application runs
EXPOSE 3000

# Start the application
CMD npm run dev
