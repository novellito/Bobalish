FROM node:lts-alpine as builder

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx
EXPOSE 4200

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /app/dist/ /usr/share/nginx/html # notice the local file paths
COPY --from=builder /app/dist/Bobalish /usr/share/nginx/html
