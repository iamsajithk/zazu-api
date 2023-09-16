# Use node 16 as base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy prisma files
RUN npx prisma generate

# Copy source files
COPY . .

# Build app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start app
CMD ["node", "dist/main"]