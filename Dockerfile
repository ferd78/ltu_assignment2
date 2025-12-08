FROM node:22-bookworm-slim


WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
