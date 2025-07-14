# React App

- Sample app for creating production grade CI/CD pipeline using GitHub, Travis and AWS.
- Separate service in docker compose for development and testing
- Separate build process (dockerfile) for development and production.
- Production [dockerfile](4-react-app/Dockerfile) use multi-step build process with 2 separate phases build phase and run phase
  - In the build stage we create a build artifacts
  - In the run stage we copy over build artifacts to host it on a ngnix server

## Manually running each docker container

1. Nav to project
   `repos/docker-k8s/4-react-ap`

2. Build an image from Docker dev file
   `docker build . -t prasanvb/react-app:v1 -f Dockerfile.dev`

3. Run container to start dev server
   `docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app prasanvb/react-app:v1`

   - Without `-v /app/node_modules`, when you run `-v $(pwd):/app`, Docker mounts your entire host project into `/app`, including an empty node_modules folder if it exists locally—which would override the container’s own installed node_modules.

   (or)

   Build and run containers using docker compose
   `docker compose up`

4. Manually Run tests
   `docker run -it 4-react-app-react-app npm run test` create a new instance and run test by overriding default cmd, but the volumes are not in sync

   (or)

   `docker exec -it [containerId] npm run test` to run test inside a currently running container that has volume mapping enabled

## Running multiple docker container using docker compose

1. Nav to project
   `repos/docker-k8s/4-react-ap`

2. Build an image and run container
   `docker compose up --build`

3. View running container
   `docker ps`

4. Stop all running containers
   `docker compose down`

## Production build process

- Create prod build artifact
  `docker build . -t prasanv/prod-build-artifact:v1`

- Start ngnix server, default ngnix port 80
  `docker run -p 80:80 prasanv/prod-build-artifact:v1`

## Accessing build artifacts inside EC2

- Make sure EC2 security groups allow HTTP and SSH inbound rules
- Connect to EC2 instance and view the build artifacts

  ```bash
  cd /var/app/current
  ls -lah

  ```
