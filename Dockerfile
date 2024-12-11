
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
FROM node:18-alpine
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
ENV NODE_ENV=production
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app ./
USER appuser
EXPOSE 4000
CMD ["node", "src/server.js"]