/**
 * @description 批量生成字体图标数据
*/
var createThrottle = require('async-throttle');
var defaultMetadataProvider = require('svgicons2svgfont/src/metadata');
var fs = require('fs');
const { pinyin } = require('pinyin-pro');

module.exports = function getGlyphDatas(files, options) {
    const throttle = createThrottle(options.maxConcurrency);

    var orderedFiles = files.sort((f1, f2) => f1 > f2 ? 1 : -1);

    return Promise.all(
        orderedFiles.map((srcPath, index) => {
            return throttle(() => {
                // 读取svg数据
                return new Promise((resolve, reject) => {
                    let glyphContents = '';

                    fs.createReadStream(srcPath).on('error', glyphError => reject(glyphError))
                        .on('data', data => {
                            glyphContents += data.toString();
                        })
                        .on('end', () => {
                            if (glyphContents.length === 0) {
                                reject(new Error(`Empty file ${srcPath}`));
                                return
                            }

                            const glyphData = {
                                contents: glyphContents,
                                srcPath
                            };

                            resolve(glyphData);
                        });
                })
            }).then(glyphData =>
                new Promise((resolve, reject) => {
                    // 转换
                    var metadataProvider = options.metadataProvider ||
                        defaultMetadataProvider({
                            prependUnicode: options.prependUnicode,
                            startUnicode: options.startUnicode + index
                        });
                        metadataProvider(glyphData.srcPath, (error, metadata) => {
                            // 对名字进行拼音转化,并且去掉空格
                            const name = metadata.name
                            if (name) {
                              const newName = pinyin(name, { toneType: 'none', v: true })
                              metadata.name = newName.split(' ').join('')
                            }
                            if (error) {
                                return reject(error);
                            }
                            glyphData.metadata = metadata;
                            return resolve(glyphData);
                        });
                })
            )
        })
    );
}
