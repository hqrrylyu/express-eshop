FROM node:14-alpine AS build-stage

WORKDIR /app

COPY package.json yarn.lock ./

ARG DEV

RUN yarn install --frozen-lockfile $DEV \
    && yarn cache clean

COPY . .


# ---
FROM build-stage AS dev-stage

CMD [ "yarn", "run", "serve:dev" ]
