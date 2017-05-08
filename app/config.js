const config = {};

config.express = {
  port: process.env.EXPRESS_PORT || 3000,
  ip: '127.0.0.1',
};

// config.redis

export default config;
