FROM node:16.20.0

WORKDIR /app

COPY . .

COPY package.json .

RUN npm install
RUN #npm install crypto
RUN npm install -g expo-cli

EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

CMD ["expo", "start"]
