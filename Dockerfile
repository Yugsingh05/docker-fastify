# FROM node:20-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# # Build TypeScript
# # RUN npm run dev

# EXPOSE 3005

# CMD ["npm","run" ,"start"]


# Use lightweight Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the source code
COPY . .

# Expose app port
EXPOSE 3005

# Run development server when container starts
CMD ["npm", "run", "dev"]

