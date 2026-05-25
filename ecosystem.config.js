module.exports = {
  apps: [
    {
      name: 'bohemio-site',
      script: '.next/standalone/server.js',
      cwd: '/var/www/bohemio-site',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0', // required: Docker Nginx reaches host via 172.18.0.1:3000
        TZ: 'America/Sao_Paulo',
      },
    },
  ],
}
