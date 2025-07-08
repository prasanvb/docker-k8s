# use linux alpine with node installed as base image
FROM node:alpine 


# NOT USED IN THIS APP. Sets an environment variable inside the container
ENV NODE_ENV=production

# set a working directory on container
WORKDIR /src

# copy only package.json file to working directory
# Done to speed up build process
COPY ./package.json ./

# install node modules
RUN npm install

# copy all folders and file from host directory to working directory
COPY ./ ./

# Doesn't actually publish the port, it just documents for users. When running the container, you still need to do port mapping
EXPOSE 8080

# Default startup command when it starts as container
CMD ["npm", "start"]