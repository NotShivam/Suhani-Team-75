FROM node:12-buster-slim

WORKDIR /app

COPY package*.json ./

ENV PORT 7600
ENV NODE_ENV production
RUN npm install

COPY . .

EXPOSE 7600

CMD ["npm","start"]
