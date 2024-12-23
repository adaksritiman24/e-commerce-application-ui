# Base image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose application port
EXPOSE 3000

CMD ["npm", "start"]
