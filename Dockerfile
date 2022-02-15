FROM node:14-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV REACT_APP_MOCK=true

COPY ./package.json ./package-lock.json ./jsconfig.json ./
RUN npm install --production

COPY ./src ./public ./
RUN npm run build

CMD npm run build:serve

# FROM base AS build
# WORKDIR /app
# ENV NODE_ENV=production
# COPY ./src ./src
# COPY ./public ./public
# RUN npm run build

# FROM build AS prod
# WORKDIR /app
# CMD node run build:serve
