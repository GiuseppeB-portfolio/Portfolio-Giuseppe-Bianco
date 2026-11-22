# syntax=docker/dockerfile:1

# ---------------------------------------------------------
# Fase 1 - build: compila gli SCSS in css/style.css
# ---------------------------------------------------------
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY scss ./scss
RUN mkdir -p css && npm run build:css

# ---------------------------------------------------------
# Fase 2 - runtime: nginx non privilegiato, solo file statici
# L'immagine finale NON contiene Node, npm, SCSS, .git né altro
# codice sorgente: solo le pagine, gli script e gli stili del sito.
# ---------------------------------------------------------
FROM nginxinc/nginx-unprivileged:stable-alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --chown=nginx:nginx index.html cv.html progetti.html /usr/share/nginx/html/
COPY --chown=nginx:nginx assets /usr/share/nginx/html/assets
COPY --chown=nginx:nginx js /usr/share/nginx/html/js
COPY --from=build --chown=nginx:nginx /app/css /usr/share/nginx/html/css

# Il processo gira come utente "nginx" (non root) e ascolta sulla porta 8080
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/ || exit 1
