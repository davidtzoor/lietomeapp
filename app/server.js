import config from 'app/config'; // eslint-disable-line import/no-extraneous-dependencies
import bole from 'bole';
import app from './index';

bole.output({ level: 'debug', stream: process.stdout });
const log = bole('server');

log.info('server process starting');

if (app.settings.env === 'production') {
  app.locals.staticBaseUrl = config.express.buildHash;
} else {
  app.locals.staticBaseUrl = '.';
}

app.listen(config.express.port, config.express.ip, (error) => {
  if (error) {
    log.error('Unable to listen for connections', error);
    process.exit(10);
  }
  log.info(`express is listening on http://${config.express.ip}:${config.express.port}`);
});
