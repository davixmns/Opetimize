FROM node:16.20.0

# Create app directory
WORKDIR /app/api

# Install app dependencies
COPY package.json .

# If you are building your code for production
COPY package-lock.json .

RUN npm install

# Bundle app source
COPY . .

# EXPOSED PORT
EXPOSE 3000

# Run the app
CMD [ "npm", "start" ]
