# React App

- Sample app for creating production grade CI/CD pipeline using GitHub, Travis and AWS.
- Separate build process for development and production

1. Nav to project
   `repos/docker-k8s/4-react-ap`

2. Build an image from Docker dev file
   `docker build . -t prasanvb/react-app:v1 -f Dockerfile.dev`

3. Run container to start dev server
   `docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app prasanvb/react-app:v1`
   - Without this, when you run v $(pwd):/app, Docker mounts your entire host project into /app, including an empty node_modules folder if it exists locally—which would override the container’s own installed node_modules.
