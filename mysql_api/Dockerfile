FROM node:16.20.0

# Download and install dockerize
ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

# Create app directory
WORKDIR /app/api

# Install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install

# Bundle app source
COPY . .

# EXPOSED PORT
EXPOSE 3000

# Run the app, waiting for the database to be available
CMD dockerize -wait tcp://opetimize-db:3306 -timeout 30s node server.js
