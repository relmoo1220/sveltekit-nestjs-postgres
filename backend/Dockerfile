# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Install the NestJS CLI globally to support development commands like `start:dev`
RUN npm install -g @nestjs/cli

# Expose the default NestJS development port
EXPOSE 3000

# Command to run the app in development mode with hot-reloading
CMD ["npm", "run", "start:dev"]
