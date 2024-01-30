#FROM node:lts-alpine
#FROM node:current-alpine
#FROM node:16-bullseye-slim AS development
#FROM --platform=linux/amd64 node:15.14.0
#TODO: node 18
FROM node:15.14.0

USER root


RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY .npmrc ./

ENV NODE_ENV=production
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set timeout 1000000000

# Helps sharp to be installed
RUN chown -R root .

RUN npm install --prefer-offline --no-audit --platform=linux --arch=x64 --unsafe-perm=true --allow-root sharp
RUN npm install --prefer-offline --no-audit --ignore-scripts --unsafe-perm --verbose --foreground-scripts --production

#RUN yarn install --frozen-lockfile --network-timeout 1000000000

COPY . .

# RUN npm run build

# # development runner (ARM/M1 compatible)
# FROM --platform=linux/amd64 node:16-bullseye AS runner

# COPY --from=development . .

#TODO: test
EXPOSE 1337
CMD ["node", "--require=dotenv/config",  "--es-module-specifier-resolution=node", "--experimental-specifier-resolution=node", "index.js"]
