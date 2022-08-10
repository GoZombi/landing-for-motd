import express from 'express';
import { engine } from 'express-handlebars';
import config from 'config';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = config.has('Server.port') ? config.get('Server.port') : 3334;
const title = config.has('App.title') ? config.get('App.title') : 'Counter-Strike';

const app = express();

app.engine('hbs', engine({ extname: 'hbs', partialsDir: __dirname + '/views/partials' }));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  let lang = req.query.lang;

  if (!lang)
    lang = 'ru';

  res.render('lang/' + lang + '/rules', {
    title: title,
    page: lang == 'ru' ? 'Правила' : 'Rules'
  });
});

app.get('/info', (req, res) => {
  let lang = req.query.lang;

  if (!lang)
    lang = 'ru';

  res.render('lang/' + lang + '/info', {
    title: title,
    page: lang == 'ru' ? 'Инфо' : 'Info'
  });
});

app.use(express.static(__dirname + '/views'));

app.listen(port, () => console.log(`Server started at http://localhost:${port}`));