FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM node:18-alpine AS prod
COPY --from=build /app/build build/
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/dist dist/
COPY --from=build /app/package.json .
COPY --from=build /app/server.js .


EXPOSE 3000
CMD ["yarn", "start"]