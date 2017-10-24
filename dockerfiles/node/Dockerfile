FROM node:8.0

RUN chown -R node:node /usr/local/bin/node \
    /usr/local/bin/npm \
    /usr/local/lib/node_modules

USER node

WORKDIR /app
CMD tail -f /dev/null