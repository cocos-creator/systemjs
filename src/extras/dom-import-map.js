(function (global) {
  const System = global.System;
  const systemJSPrototype = System.constructor.prototype;
  
  const hasDocument = systemJSPrototype.patches.common.hasDocument;
  const resolveAndComposeImportMap = systemJSPrototype.patches.common.resolveAndComposeImportMap;
  const baseUrl = systemJSPrototype.patches.common.baseUrl;

  if (hasDocument) {
    Array.prototype.forEach.call(document.querySelectorAll('script[type="systemjs-importmap"][src]'), function (script) {
      script._j = fetch(script.src).then(function (res) {
        return res.json();
      });
    });
  }
  
  systemJSPrototype.prepareImport = (() => {
    let importMapPromise;
    return function () {
      if (!importMapPromise) {
        importMapPromise = Promise.resolve();
        if (hasDocument)
          Array.prototype.forEach.call(document.querySelectorAll('script[type="systemjs-importmap"]'), function (script) {
            importMapPromise = importMapPromise.then(function () {
              return (script._j || script.src && fetch(script.src).then(function (resp) { return resp.json(); }) || Promise.resolve(JSON.parse(script.innerHTML)))
              .then(function (json) {
                systemJSPrototype.patches.importMap = resolveAndComposeImportMap(json, script.src || baseUrl, systemJSPrototype.patches.importMap);
              });
            });
          });
      }
      return importMapPromise;
    };
  })();
})(typeof self !== 'undefined' ? self : global);