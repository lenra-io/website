const fs = require('fs-extra');
const Path = require('path');

const viewsPath = Path.join(__dirname, '..', 'views');

/**
 * Get the view file for the given path and language
 * @param {string} path The view path
 * @param {string?} lang The language for specific views
 * @returns {string?}
 */
function getViewFile(path, lang) {
    let p;
    if (lang) {
        p = Path.join(viewsPath, `${path}.${lang}.pug`);
        if (fs.existsSync(p)) return p;
    }
    p = Path.join(viewsPath, `${path}.pug`);
    if (fs.existsSync(p)) return p;
    return null;
}

exports.getViewFile = getViewFile;