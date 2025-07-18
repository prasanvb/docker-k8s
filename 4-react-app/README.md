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

### Accessing build artifacts inside EC2

- Make sure EC2 security groups allow SSH inbound rules to access the terminal
- Connect to EC2 instance and perform
  - Check the running container
  - Attach a shell terminal to container, to view the build artifacts

### AWS Elastic Beanstalk web server environment using a managed Docker platform

- Upload a `.zip` file (either via AWS Console, CLI, or CI/CD) to a Beanstalk application environment
- Elastic Beanstalk, Detects `Dockerfile`, builds a Docker image from it (i.e.`docker build -t app .`) and then runs that image (i.e. `docker run`) as a container inside an EC2 instance.
- Elastic Beanstalk manages the EC2 instances, load balancer, networking, logs, scaling, etc.
