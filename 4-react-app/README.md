# React App

- Sample app for creating production grade CI/CD pipeline using GitHub, Travis and AWS.
- Separate service in docker compose for development and testing
- Separate build process (dockerfile) for development and production.
- Production dockerfile use multi-step build process with a build phase and run phase

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
