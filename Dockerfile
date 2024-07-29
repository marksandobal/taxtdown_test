# Node Js Application DockerFile
FROM node:20.12.2-buster-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json file
COPY . ./

# Install the dependencies
RUN npm install

RUN npm run build

# Set the environment variables
COPY .env ./

EXPOSE 3000

CMD ["npm", "run", "start"]
