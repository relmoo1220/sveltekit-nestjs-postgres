# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the SvelteKit development port
EXPOSE 5173

# Command to run the SvelteKit app in development mode
CMD ["npm", "run", "dev", "--", "--host"]

