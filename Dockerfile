ARG NODE_VERSION=26

FROM node:${NODE_VERSION}-alpine AS build
ARG BUILD_CONFIGURATION=production
WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npmn npm ci --ignore-scripts

COPY . .

RUN npm run build -- --configuration ${BUILD_CONFIGURATION}

FROM nginxinc/nginx-unprivileged:stable-alpine AS runner
ENV API_UPSTREAM=http://api:8081

COPY --chown=nginx:nginx nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --chown=nginx:nginx nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build --chown=nginx:nginx /app/dist/oikonomia-ui/browser /usr/share/nginx/html

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q0- http://127.0.0.1:8080/healthz >/dev/null || exit 1
