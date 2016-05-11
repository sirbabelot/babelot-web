const APP_PATH = '/home/deploy/web'
module.exports = function(shipit) {
  shipit.initConfig({
    staging: {
      servers: 'deploy@107.170.2.166',
      key: 'deploy_key'
    }
  });

  shipit.task('deploy', ()=> {
   return shipit
        .remoteCopy('docker-compose.yml', APP_PATH)
        .then(()=> shipit.remoteCopy('docker-compose.prod.yml', APP_PATH))
        .then(()=> shipit.remote(`
          cd ${APP_PATH} &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml stop &&
          echo "y" | docker-compose -f docker-compose.yml -f docker-compose.prod.yml rm --all &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml pull &&
          docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`
        ));
  });
};
