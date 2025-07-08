# Node Express Server

- Navigate to application folder
  `cd docker-k8s/2-node-express`

- Build new express server image
  `docker build . -t prasanvb/express-server:v1`

- Run the express server and do port forwarding to host port 300
  `docker run -p 3000:8080 prasanvb/express-server:v1`
