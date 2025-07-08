# use linux alpine as base image
FROM alpine 

# download and install redis using apk package manager
RUN apk add --update redis

# Default startup command when it starts as container
CMD ["redis-server"]