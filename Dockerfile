FROM node:22.15.0
WORKDIR /app
COPY package*.json ./
RUN npm install --production
USER node
COPY src ./src
CMD ["npm", "start"]