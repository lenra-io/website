'use strict';
const fs = require('fs-extra');
const Path = require('path');
const pug = require('pug');
const common = require('./i18n/common.json');
const Translations = require('./utils/i18n');
const Views = require('./utils/views');
const Utils = require('./utils/common');
// const minify = require('minify');

const { languagePriority } = require('./config.json');
const minify = require('minify');
const { generateNginxConf } = require('./utils/nginx.js');

const srcPath = Path.join(__dirname);
const buildPath = Path.join(__dirname, '..', 'build');
const wwwPath = Path.join(buildPath, 'www');
const staticSrcPath = Path.join(srcPath, 'static');
const staticDestPath = Path.join(wwwPath, 'static');
const languageFileRegex = /^(.+)[.]([a-z]{2})([.]pug)$/

fs.mkdirsSync(Path.join(wwwPath));
// copy static directory
getFilesRecursively(staticSrcPath)
    .map(file => {
        const relativePath = Path.relative(staticSrcPath, file);
        const destinationPath = Path.join(staticDestPath, relativePath);
        const destinationDir = Path.dirname(destinationPath);
        const ext = Path.extname(file).toLowerCase();
        if (/^.*\/\.[^/]+$/.test(file)) return;
        fs.mkdirsSync(destinationDir);
        switch (ext) {
            case '.html':
            case '.js':
                return minify(file)
                    .then(content => fs.writeFile(destinationPath, content));
            case '.css':
                const content = minify.css(`@import "${Path.relative(process.cwd(), file)}";`, {
                    css: {
                        rebase: false
                    },
                    img: {
                        maxSize: 1
                    }
                });
                return fs.writeFile(destinationPath, content);
            default:
                return fs.copyFile(file, destinationPath);
        }
    });
// list pug files
const viewsDirPath = Path.join(srcPath, 'views');
const langViews = {};
const views = getFilesRecursively(viewsDirPath)
    .filter(file => !Path.basename(file).startsWith('.'))
    .map(file => Path.relative(viewsDirPath, file))
    .filter(file => {
        const match = file.match(languageFileRegex);
        if (!match) return true;
        const lang = match[2];
        const f = match[1] + match[3];
        if (!langViews[lang]) langViews[lang] = {};
        langViews[lang][f] = file;
    });
// list all the available languages
Translations.loadTranslations()
    .then(ts => {
        const languages = Object.keys(ts);
        for (const lang in ts) {
            fs.mkdirs(Path.join(wwwPath, lang)).then(() => {
                const props = Utils.mergeDeep({}, common, ts[lang], { language: lang, languages: languages, otherLanguages: languages.filter(l => l != lang) });
                views.map(file => ({
                    file: file.replace(/[.]pug$/, ""),
                    pugFile: (lang in langViews && file in langViews[lang])
                        ? langViews[lang][file]
                        : file
                }))
                    .map(({ file, pugFile }) => ({
                        file,
                        html: pug.renderFile(Path.join(viewsDirPath, pugFile), { ...props, currentPage: { ...props.page[file], path: file } })
                    }))
                    .map(async ({ file, html }) => {
                        const filePath = Path.join(wwwPath, lang, `${file}.html`);
                        html = await minify.html(html);
                        await fs.writeFile(filePath, html);
                    });
                // TODO: generate page previews "index.html.jpg" for each social network dimension
            });
        }


        // generate the nginx.conf file
        const langs = Object.keys(ts).sort((a, b) => {
            const posA = languagePriority.indexOf(a);
            const posB = languagePriority.indexOf(b);
            if (posA != -1 && posB != -1) return posA - posB;
            if (posA != -1) return -1;
            if (posB != -1) return +1;
            if (a < b) return -1;
            return 1;
        });

        fs.writeFile(Path.join(buildPath, `nginx.conf`), generateNginxConf(langs, {
            'default-src': ['unsafe-inline', 'analytics.lenra.io']
        }));

        // generate the sitemap.txt file
        fs.writeFile(Path.join(staticDestPath, `sitemap.txt`),
            common.pages
                .filter(page => !page.disabled)
                .map(page => page.path ? `!BASE_URL!${page.path}` : `!BASE_URL!/${page.name}.html`)
                .join('\n')
        );
        // TODO: manage page modifications to create a sitemap.xml
    });

/**
 * 
 * @param {string[]} langs The available langs
 * @param {string} lang The lang
 * @param {int} i Position in langs
 * @returns 
 */
function acceptLangMapper(langs, lang, i) {
    return `~${i < langs.length - 1
        ? `^(((?!(${langs.slice(i + 1).join('|')})).)+,)*`
        : ''
        }${lang}.* ${lang};`;
}

/**
 * Get all files in the given directory recursively
 * @param {string} dir The directory
 * @returns {string[]}
 */
function getFilesRecursively(dir) {
    return fs.readdirSync(dir)
        .map(f => Path.join(dir, f))
        .flatMap(p => {
            const stat = fs.statSync(p);
            if (stat.isDirectory())
                return getFilesRecursively(p);
            else if (stat.isFile())
                return [p];
            return [];
        });
}