FROM node:20.17-bullseye-slim

WORKDIR /app

# Copy package.json and package-lock.json separately
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Copy the .env file into the Docker image
COPY .env .env

# Expose the port the app runs on
EXPOSE 3000

CMD ["node", "dist/index.js"]