module.exports = {
  apps: [
    {
      name: 'bany-app',
      script: './dist/boot.js',
      cwd: '/var/www/bany-app',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      watch: false,
      max_memory_restart: '512M',
      restart_delay: 3000,
      max_restarts: 5,
      min_uptime: '10s',
    },
  ],
};
