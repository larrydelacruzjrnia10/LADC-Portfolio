module.exports = {
  apps: [
    {
      name: 'quickbite-pos-api',
      cwd: '/var/www/quickbite-pos/repo/sample-projects/quickbite-pos/backend',
      script: 'src/server.js',
      interpreter: 'node',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000,
      },
    },
  ],
};
