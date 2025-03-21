FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

COPY . ./
RUN npm run build -- --configuration=production

# Use Caddy to serve the Angular app
FROM caddy:latest

WORKDIR /srv

COPY --from=build /app/dist/apps/nxtime/browser/ /srv/
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]

