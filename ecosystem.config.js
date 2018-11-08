module.exports = {
  apps: [{
    name: 'proxy-product-suggestions',
    script: "server/app.js",
    env: {
      "NODE_ENV": "production",
      "DB_NAME": "naboo",
      "DB_USER_NAME": "naboo",
      "DB_HOST": "naboo-ms.c7wabaeosydd.us-west-1.rds.amazonaws.com",
      "DB_PASSWORD": "rpt-08-naboo-ms"
    }
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-13-56-227-30.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/rpt-08-naboo.pem',
      ref: 'origin/master',
      repo: 'git@github.com:rpt-naboo/proxy-product-suggestions.git',
      path: '/home/ubuntu/rpt-08-naboo',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}

