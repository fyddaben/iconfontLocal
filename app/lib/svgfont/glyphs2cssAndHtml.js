var nunjucks = require('nunjucks');
var os = require('os');
var fs = require('fs');
var path = require('path');

module.exports = function (fileMark, glyphDatas, options) {
    let cssTemplateFile = options.template;

    if (!fs.existsSync(cssTemplateFile)) {
        cssTemplateFile = path.resolve(__dirname, `templates/${options.template}.njk`);
    }

    let htmlTemplateFile = path.resolve(__dirname, `templates/html.njk`);

    // options.cssOutput = path.resolve(options.cssOutput);
    if (options.htmlOutput === undefined) {
        options.htmlOutput = path.join(path.dirname(options.cssOutput), '_font-preview.html');
    }
    if (options.htmlOutput) {
        // html模板中css文件的相对文件名
        options.htmlCssFile = path.relative(path.dirname(options.htmlOutput), options.cssOutput);
    }
    // css模板中的字体文件的相对路径
    if(!options.cssFontPath) {
        options.cssFontPath = path.relative(path.dirname(options.cssOutput), options.fontsOutput);
    }
    if (options.cssFontPath !== '') {
        options.cssFontPath += '/'
    }

    options.fileMark = fileMark;

    const nunjucksOptions = Object.assign(
        {
            glyphs: glyphDatas.map(glyphData => {
                if (typeof options.glyphTransformFn === 'function') {
                    options.glyphTransformFn(
                        glyphData.metadata
                    );
                }
                return glyphData.metadata;
            })
        },
        JSON.parse(JSON.stringify(options))
    );
    nunjucks.configure(cssTemplateFile, { autoescape: true });
    nunjucksOptions.clsList = nunjucksOptions.glyphs.map(glyph => {
        return '.' + nunjucksOptions.cssPrefix + '-' + glyph.name;
    })
    var cssHtml = {
        css: nunjucks.render(cssTemplateFile, nunjucksOptions),
    }
    if (options.htmlOutput) {
        nunjucks.configure(htmlTemplateFile, { autoescape: true });
        cssHtml.html = nunjucks.render(htmlTemplateFile, nunjucksOptions)
    }
    if (options.jsOutput) {
        var json = JSON.stringify(glyphDatas.map(g => {
            return {
                name: g.metadata.name,
                unicode: g.metadata.unicode[0].charCodeAt(0).toString(16),
                svg: g.contents,
            }
        }), null, 4)
        var prefix = options.jsPrefix || '/* eslint-disable */\n';
        cssHtml.js = prefix + 'export default ' + json + '\n'
    }

    return cssHtml;
}
