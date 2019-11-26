'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compilerCore = require('@vue/compiler-core');
var LRUCache = _interopDefault(require('lru-cache'));
var postcss = _interopDefault(require('postcss'));
var selectorParser = _interopDefault(require('postcss-selector-parser'));
var merge = _interopDefault(require('merge-source-map'));

const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
    const lines = source.split(/\r?\n/);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                res.push(`${j + 1}${' '.repeat(3 - String(j + 1).length)}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(0, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.min(end - count, lineLength);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}

const EMPTY_OBJ =  Object.freeze({})
    ;

const SFC_CACHE_MAX_SIZE = 500;
const sourceToSFC = new LRUCache(SFC_CACHE_MAX_SIZE);
function parse(source, { needMap = true, filename = 'component.vue', sourceRoot = '' } = {}) {
    const sourceKey = source + needMap + filename + sourceRoot;
    const cache = sourceToSFC.get(sourceKey);
    if (cache) {
        return cache;
    }
    const sfc = {
        filename,
        template: null,
        script: null,
        styles: [],
        customBlocks: []
    };
    const ast = compilerCore.parse(source, {
        isNativeTag: () => true,
        getTextMode: () => 2 /* RAWTEXT */
    });
    ast.children.forEach(node => {
        if (node.type !== 1 /* ELEMENT */) {
            return;
        }
        if (!node.children.length) {
            return;
        }
        switch (node.tag) {
            case 'template':
                if (!sfc.template) {
                    sfc.template = createBlock(node);
                }
                else {
                    warnDuplicateBlock(source, filename, node);
                }
                break;
            case 'script':
                if (!sfc.script) {
                    sfc.script = createBlock(node);
                }
                else {
                    warnDuplicateBlock(source, filename, node);
                }
                break;
            case 'style':
                sfc.styles.push(createBlock(node));
                break;
            default:
                sfc.customBlocks.push(createBlock(node));
                break;
        }
    });
    sourceToSFC.set(sourceKey, sfc);
    return sfc;
}
function warnDuplicateBlock(source, filename, node) {
    const codeFrame = generateCodeFrame(source, node.loc.start.offset, node.loc.end.offset);
    const location = `${filename}:${node.loc.start.line}:${node.loc.start.column}`;
    console.warn(`Single file component can contain only one ${node.tag} element (${location}):\n\n${codeFrame}`);
}
function createBlock(node) {
    const type = node.tag;
    const text = node.children[0];
    const attrs = {};
    const block = {
        type,
        content: text.content,
        loc: text.loc,
        attrs
    };
    node.props.forEach(p => {
        if (p.type === 6 /* ATTRIBUTE */) {
            attrs[p.name] = p.value ? p.value.content || true : true;
            if (p.name === 'lang') {
                block.lang = p.value && p.value.content;
            }
            else if (p.name === 'src') {
                block.src = p.value && p.value.content;
            }
            else if (type === 'style') {
                if (p.name === 'scoped') {
                    block.scoped = true;
                }
                else if (p.name === 'module') {
                    block.module = attrs[p.name];
                }
            }
            else if (type === 'template' && p.name === 'functional') {
                block.functional = true;
            }
        }
    });
    return block;
}

function compileTemplate() {
    // TODO
}

var trimPlugin = postcss.plugin('trim', () => (css) => {
    css.walk(({ type, raws }) => {
        if (type === 'rule' || type === 'atrule') {
            if (raws.before)
                raws.before = '\n';
            if (raws.after)
                raws.after = '\n';
        }
    });
});

var scopedPlugin = postcss.plugin('add-id', (options) => (root) => {
    const id = options;
    const keyframes = Object.create(null);
    root.each(function rewriteSelector(node) {
        if (!node.selector) {
            // handle media queries
            if (node.type === 'atrule') {
                if (node.name === 'media' || node.name === 'supports') {
                    node.each(rewriteSelector);
                }
                else if (/-?keyframes$/.test(node.name)) {
                    // register keyframes
                    keyframes[node.params] = node.params = node.params + '-' + id;
                }
            }
            return;
        }
        node.selector = selectorParser((selectors) => {
            selectors.each((selector) => {
                let node = null;
                // find the last child node to insert attribute selector
                selector.each((n) => {
                    // ">>>" combinator
                    // and /deep/ alias for >>>, since >>> doesn't work in SASS
                    if (n.type === 'combinator' &&
                        (n.value === '>>>' || n.value === '/deep/')) {
                        n.value = ' ';
                        n.spaces.before = n.spaces.after = '';
                        return false;
                    }
                    // in newer versions of sass, /deep/ support is also dropped, so add a ::v-deep alias
                    if (n.type === 'pseudo' && n.value === '::v-deep') {
                        n.value = n.spaces.before = n.spaces.after = '';
                        return false;
                    }
                    if (n.type !== 'pseudo' && n.type !== 'combinator') {
                        node = n;
                    }
                });
                if (node) {
                    node.spaces.after = '';
                }
                else {
                    // For deep selectors & standalone pseudo selectors,
                    // the attribute selectors are prepended rather than appended.
                    // So all leading spaces must be eliminated to avoid problems.
                    selector.first.spaces.before = '';
                }
                selector.insertAfter(node, selectorParser.attribute({
                    attribute: id,
                    value: id,
                    raws: {}
                }));
            });
        }).processSync(node.selector);
    });
    // If keyframes are found in this <style>, find and rewrite animation names
    // in declarations.
    // Caveat: this only works for keyframes and animation rules in the same
    // <style> element.
    if (Object.keys(keyframes).length) {
        root.walkDecls(decl => {
            // individual animation-name declaration
            if (/^(-\w+-)?animation-name$/.test(decl.prop)) {
                decl.value = decl.value
                    .split(',')
                    .map(v => keyframes[v.trim()] || v.trim())
                    .join(',');
            }
            // shorthand
            if (/^(-\w+-)?animation$/.test(decl.prop)) {
                decl.value = decl.value
                    .split(',')
                    .map(v => {
                    const vals = v.trim().split(/\s+/);
                    const i = vals.findIndex(val => keyframes[val]);
                    if (i !== -1) {
                        vals.splice(i, 1, keyframes[vals[i]]);
                        return vals.join(' ');
                    }
                    else {
                        return v;
                    }
                })
                    .join(',');
            }
        });
    }
});

// .scss/.sass processor
const scss = {
    render(source, map, options) {
        const nodeSass = require('sass');
        const finalOptions = Object.assign({}, options, {
            data: source,
            file: options.filename,
            outFile: options.filename,
            sourceMap: !!map
        });
        try {
            const result = nodeSass.renderSync(finalOptions);
            if (map) {
                return {
                    code: result.css.toString(),
                    map: merge(map, JSON.parse(result.map.toString())),
                    errors: []
                };
            }
            return { code: result.css.toString(), errors: [] };
        }
        catch (e) {
            return { code: '', errors: [e] };
        }
    }
};
const sass = {
    render(source, map, options) {
        return scss.render(source, map, Object.assign({}, options, { indentedSyntax: true }));
    }
};
// .less
const less = {
    render(source, map, options) {
        const nodeLess = require('less');
        let result;
        let error = null;
        nodeLess.render(source, Object.assign({}, options, { syncImport: true }), (err, output) => {
            error = err;
            result = output;
        });
        if (error)
            return { code: '', errors: [error] };
        if (map) {
            return {
                code: result.css.toString(),
                map: merge(map, result.map),
                errors: []
            };
        }
        return { code: result.css.toString(), errors: [] };
    }
};
// .styl
const styl = {
    render(source, map, options) {
        const nodeStylus = require('stylus');
        try {
            const ref = nodeStylus(source);
            Object.keys(options).forEach(key => ref.set(key, options[key]));
            if (map)
                ref.set('sourcemap', { inline: false, comment: false });
            const result = ref.render();
            if (map) {
                return {
                    code: result,
                    map: merge(map, ref.sourcemap),
                    errors: []
                };
            }
            return { code: result, errors: [] };
        }
        catch (e) {
            return { code: '', errors: [e] };
        }
    }
};
const processors = {
    less,
    sass,
    scss,
    styl,
    stylus: styl
};

// const postcss = require('postcss')
function compileStyle(options) {
    return doCompileStyle({ ...options, isAsync: false });
}
function compileStyleAsync(options) {
    return doCompileStyle({ ...options, isAsync: true });
}
function doCompileStyle(options) {
    const { filename, id, scoped = true, trim = true, preprocessLang, postcssOptions, postcssPlugins } = options;
    const preprocessor = preprocessLang && processors[preprocessLang];
    const preProcessedSource = preprocessor && preprocess(options, preprocessor);
    const map = preProcessedSource ? preProcessedSource.map : options.map;
    const source = preProcessedSource ? preProcessedSource.code : options.source;
    const plugins = (postcssPlugins || []).slice();
    if (trim) {
        plugins.push(trimPlugin());
    }
    if (scoped) {
        plugins.push(scopedPlugin(id));
    }
    const postCSSOptions = {
        ...postcssOptions,
        to: filename,
        from: filename
    };
    if (map) {
        postCSSOptions.map = {
            inline: false,
            annotation: false,
            prev: map
        };
    }
    let result;
    let code;
    let outMap;
    const errors = [];
    if (preProcessedSource && preProcessedSource.errors.length) {
        errors.push(...preProcessedSource.errors);
    }
    try {
        result = postcss(plugins).process(source, postCSSOptions);
        // In async mode, return a promise.
        if (options.isAsync) {
            return result
                .then(result => ({
                code: result.css || '',
                map: result.map && result.map.toJSON(),
                errors,
                rawResult: result
            }))
                .catch(error => ({
                code: '',
                map: undefined,
                errors: [...errors, error.message],
                rawResult: undefined
            }));
        }
        // force synchronous transform (we know we only have sync plugins)
        code = result.css;
        outMap = result.map;
    }
    catch (e) {
        errors.push(e);
    }
    return {
        code: code || ``,
        map: outMap && outMap.toJSON(),
        errors,
        rawResult: result
    };
}
function preprocess(options, preprocessor) {
    return preprocessor.render(options.source, options.map, Object.assign({
        filename: options.filename
    }, options.preprocessOptions));
}

exports.compileStyle = compileStyle;
exports.compileStyleAsync = compileStyleAsync;
exports.compileTemplate = compileTemplate;
exports.parse = parse;
