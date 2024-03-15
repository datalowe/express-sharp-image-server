# Use a base image that includes Node.js
FROM node:21.6 AS build
ARG GRAPHQL_ENDPOINT

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY main.js resize-image.js ./

# Expose the default Node port
EXPOSE 3000

# Start Node 
CMD ["npm", "run", "start"]
