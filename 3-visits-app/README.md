# Visits App Server

Web application tracks the users visits and page refreshes and stores the visit counts in the redis.
Project outlines running multiple container as service using docker compose

1. Navigate to application folder
   `cd docker-k8s/3-visits-app`

2. Build new express server image
   `docker build . -t prasanvb/visits-app:v1`

3. Start container
   `docker compose up`
