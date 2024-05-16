#Primera Etapa
FROM node:16.13-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Segunda Etapa
FROM nginx:1.17.1-alpine
# Si estas utilizando otra aplicacion cambia PokeApp por el nombre de tu app
COPY --from=build-step /app/dist/accionistas /usr/share/nginx/html

# Configuración adicional para manejar enrutamiento en Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
