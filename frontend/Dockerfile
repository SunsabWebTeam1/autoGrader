# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Install app dependencies.
COPY package*.json ./
RUN npm install

# Copy the app source code.
COPY . .

# Build the app
RUN npm run build

# Install a simple HTTP server to serve static files
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]