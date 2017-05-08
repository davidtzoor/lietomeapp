import express from 'express';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import siteRouter from 'app/site/router'; // eslint-disable-line import/no-extraneous-dependencies
import modelRouter from 'app/model/router'; // eslint-disable-line import/no-extraneous-dependencies
import { notFound, serverError } from 'app/middleware/error-handlers'; // eslint-disable-line import/no-extraneous-dependencies

const app = express();
// View engine
app.set('views', __dirname);
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  layoutsDir: __dirname,
}));
app.set('view engine', 'handlebars');

// Parse application/json
app.use(bodyParser.json());

// Load routes
app.use(siteRouter);
app.use('/api', modelRouter);

// Error handlers
app.use(notFound);
app.use(serverError);

export default app;
