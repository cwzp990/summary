const fs = require("fs-extra");

function merge(options) {
  const params = process.argv.slice(2).reduce((options, argv) => {
    const [key, value] = argv.split("=");

    if (key && vale) {
      const parseKey = key.slice(2);
      options[parseKey] = value;
    }

    return options;
  }, {});

  return { ...options, ...params };
}

function tryExtensions(modulePath, extensions, originModulePath, moduleContext) {
  extensions.unshift("");
  for (let extension of extensions) {
    if (fs.existsSync(modulePath + extension)) {
      return modulePath + extension;
    }
  }

  throw new Error(`No module file found for ${originModulePath} in ${moduleContext}`)
}

function getSourceCode(chunk) {
  const { entryModule, modules } = chunk;
  return `  (() => {    var __webpack_modules__ = {      ${modules        .map((module) => {          return `          '${module.id}': (module) => {            ${module._source}
      }        `;        })        .join(',')}
    };    var __webpack_module_cache__ = {};    function __webpack_require__(moduleId) {      var cachedModule = __webpack_module_cache__[moduleId];      if (cachedModule !== undefined) {        return cachedModule.exports;      }      var module = (__webpack_module_cache__[moduleId] = {        exports: {},      });      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);      return module.exports;    }    (() => {      ${entryModule._source}
    })();  })();  `;
}

module.exports = {
  merge,
  tryExtensions,
  getSourceCode
};
