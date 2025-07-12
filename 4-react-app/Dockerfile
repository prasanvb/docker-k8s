# Build stage: creates build artifacts under /app/build
FROM node:alpine3.22 AS builder

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . . 

RUN npm run build

# Run stage: Copy build artifacts from build stage and create a
FROM nginx:1.29.0-alpine-slim

# copy build artifacts from build stage to a specific ngnix folder as mentioned in docs
COPY --from=builder /app/build /usr/share/nginx/html

# NOTE: no need a RUN cmd as ngnix takes care of it when the container starts