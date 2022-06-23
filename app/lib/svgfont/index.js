const nodify = require('nodeify');
const path = require('path');
const fs = require('fs');
const generate = require('./generate')
const writeFiles = require('./writeFiles')
var thro_debs = require('thro-debs')
var globby = require('globby');

module.exports = class IconfontPlugin {
    constructor(options = {}) {
        const required = ['svgs', 'fontsOutput', 'cssOutput'];

        for (let r of required) {
            if (!options[r]) {
                throw new Error(`Require '${r}' option`);
            }
        }
        this.options = Object.assign({}, options);
    }

    apply(compiler) {
        this.compile(compiler)
        this.watch();
    }

    build(callback) {
        return generate.byGlobby(this.options)
                .then(result => {
                    return writeFiles(result)
                })
                .then(ret => {
                    console.log('Font+css have been built with ' + ret.glyphDatas.length + ' svg-icons.');
                    this.options.success && this.options.success();
                    return ret
                })
                .catch(console.error.bind(console));
    }

    compile(compiler, callback) {
        this.build(callback)
    }

    watch() {
        var comileDebounce = thro_debs.debounce(800, this.build.bind(this));
        var svgs = [].concat(this.options.svgs);

        // 只有一个文件夹时，监视文件夹。支持新增。/ab/c/*.svg
        if (svgs.length === 1) {
            var dir = path.dirname(svgs[0]).replace('*.svg', '');
            if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
                fs.watch(dir, (event, filename) => {
                    if (filename.length > 4 && filename.slice(-4) === '.svg') {
                        comileDebounce()
                    }
                });
                return
            }
        }

        // 监视每个文件。/ab/c/**/*.svg
        globby(svgs).then(files => {
            files.map(file => {
                fs.watch(file, (event, filename) => {
                    comileDebounce()
                })
            })
        })
    }

}
