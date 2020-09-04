FROM node:12.16.3-alpine AS dependencies
COPY ./package.json .
RUN npm i

FROM node:12.16.3-alpine AS builder
COPY . ./app
WORKDIR /app
COPY --from=dependencies ./node_modules ./node_modules
RUN npm run build-prod

FROM nginx:1.15.8-alpine
COPY --from=builder /app/dist/pwatest/ /usr/share/nginx/html
