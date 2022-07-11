FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock .
# COPY package-lock.json ./

RUN yarn install
# RUN npm install

# add app
COPY . . /
EXPOSE 3000

# start app
CMD ["yarn", "start"]
# CMD ["npm", "start"]
