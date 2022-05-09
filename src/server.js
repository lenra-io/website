const express = require('express');
const Path = require('path');
const pug = require('pug');
const common = require('./i18n/common.json');
const translations = require('./utils/i18n');
const views = require('./utils/views');
const utils = require('./utils/common');

const staticPath = Path.join(__dirname, 'static');

const {languagePriority} = require('./config.json');
const app = express();
const port = 8080;

app.get('/(*.html)?', async (req, res) => {
    const lang = req.query.lang || languagePriority[0];
    console.log(req.path, lang);
    const pTranslation = translations.loadTranslation(lang);
    const pLanguages = translations.getManagedLanguages();
    const path = req.path.replace(/^[/]/, '').replace(/[.]html$/, '') || 'index';
    const file = views.getViewFile(path, lang);
    if (!file) {
        res.sendStatus(404);
        return;
    }
    const languages = await pLanguages;
    const props = utils.mergeDeep({}, common, await pTranslation, {language: lang, languages: languages, otherLanguages: languages.filter(l => l!=lang)});
    res.send(pug.renderFile(file, { ...props, currentPage: { ...props.page[path], path }}));
})

app.use(express.static(staticPath, {dotfiles: 'allow'}));

app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening at http://localhost:${port}`);
})