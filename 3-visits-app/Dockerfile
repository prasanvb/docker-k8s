FROM node:alpine3.22

# set a working directory on container
WORKDIR /app

# copy only package.json file to working directory
# Done to speed up build process
COPY ./package.json ./

# install node modules
RUN npm install

# copy all folders and file from host directory to working directory
COPY ./ ./

# Default startup command when it starts as container
CMD ["npm", "start"]