# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /usr/src/app
ENV HUSKY=0

# Copy only dependency manifests first for better caching
COPY package.json package-lock.json ./

# NPM retry tuning + deterministic install
RUN npm config set fetch-retry-maxtimeout 6000000 \
 && npm config set fetch-retry-mintimeout 1000000 \
 && npm ci --legacy-peer-deps

# Install runtime-env-cra in build stage so we don't need node/npm in runtime image
RUN npm i -g runtime-env-cra

# Copy the rest of the app and build
COPY . .
RUN npm run build


# ---------- Runtime stage ----------
FROM nginx:1.27.0-alpine

# Copy built frontend
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Copy env template and nginx config (as you had)
COPY --from=build /usr/src/app/.env.example /usr/share/nginx/html/.env
COPY --from=build /usr/src/app/nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy runtime-env-cra binary from build stage
COPY --from=build /usr/local/bin/runtime-env-cra /usr/local/bin/runtime-env-cra

WORKDIR /usr/share/nginx/html
EXPOSE 3000

CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
