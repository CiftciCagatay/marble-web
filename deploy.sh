yarn build

docker build . -t bluefx/helpdesk-v2

docker tag bluefx/helpdesk-v2 bluefx/helpdesk-v2:arctory

docker push bluefx/helpdesk-v2:arctory
