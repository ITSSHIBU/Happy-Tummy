FROM node:19

#WORKDIR /app

#COPY package*.json ./

RUN mkdir -p /home/app
#RUN npm install
ENV PORT 4000
#ARG PORT=3000
#ARG MY_SERVICE_PORT_RPC=50051
#EXPOSE ${PORT}
#EXPOSE ${MY_SERVICE_PORT_RPC}
COPY . /home/app
#COPY . .

#EXPOSE 4000

CMD [ "node", "/home/app/index.js" ]
