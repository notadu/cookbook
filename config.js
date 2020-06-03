const { env } = process;

// const nodeEnv = env.NODE_ENV || 'development';

module.exports = {
  port: env.PORT || 8080,
};
