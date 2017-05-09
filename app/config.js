import build from './build.generated.json';

const config = {};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1',
  buildHash: build.hash,
};


// config.redis

export default config;
