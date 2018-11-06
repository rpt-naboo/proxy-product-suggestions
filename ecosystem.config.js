module.exports = {
  apps: [{
  	name: 'proxy-product-suggestions',
    script: "server/app.js",
    env: {
      "NODE_ENV": "production"
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