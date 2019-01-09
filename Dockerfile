FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html