/**
 * @description 构造方法
*/
var md5 = require('./md5');
var defaultOptions = require('./defaultOptions')
var globbyFiles = require('./globbyFiles')
var getGlyphDatas = require('./getGlyphDatas')
var glyphs2svgFont = require('./glyphs2svgFont')
var svgFont2otherFonts = require('./svgFont2otherFonts')
var glyphs2cssAndHtml = require('./glyphs2cssAndHtml')

// 根据glob文件路径规范进行打包
exports.byGlobby = function (userOptions) {
    return globbyFiles(userOptions.svgs)
        .then(foundFiles => {
            return exports.byFiles(foundFiles, userOptions)
        })
}

// 根据数组文件路径规范进行打包
exports.byFiles = function (inputSvgFiles, userOptions) {
    let options = Object.assign({}, defaultOptions, userOptions);
    return getGlyphDatas(inputSvgFiles, options)
        .then(glyphDatas => {
            return exports.byGlyphDatas(glyphDatas, options)
        })
}

/*
glyphDatas:
 [{
    "contents": "<?xml version=\"1.0\" encoding=\"UTF-8\"?><svg ...... </svg>",
    "srcPath": "test/web_project/src/svgs/bookmark.svg",
    "metadata": {
        "path": "test/web_project/src/svgs/bookmark.svg",
        "name": "bookmark",
        "unicode": [""],
        "renamed": false
    }
  }...]
*/
// 根据文件内容规范进行打包
exports.byGlyphDatas = function (glyphDatas, userOptions) {
    let options = Object.assign(
        {},
        defaultOptions,
        userOptions,
        {
            cssPrefix: userOptions.cssPrefix || userOptions.fontName
        }
    );
    var result = {options};

    result.glyphDatas = glyphDatas;
    return glyphs2svgFont(glyphDatas, options)
        .then(svg => {
            result.fileMark = md5(svg).slice(0, 8);
            return svgFont2otherFonts(svg, options)
        })
        .then(fonts => {
            Object.assign(result, fonts)
            return glyphs2cssAndHtml(result.fileMark, result.glyphDatas, options)
        })
        .then(cssHtmlJs => {
            return Object.assign(result, cssHtmlJs)
        })
        .catch(e => {
            console.error(e)
        })
}
