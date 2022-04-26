FROM node:14.19.1-alpine as builder
WORKDIR usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.21.6-alpine
COPY --from=builder /usr/src/app/dist/JobRecommendations/ usr/share/nginx/html