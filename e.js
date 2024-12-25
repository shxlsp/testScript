systemJSPrototype.import = function (id, parentUrl, meta) {
    var loader = this;
    parentUrl &&
        typeof parentUrl === "object" &&
        ((meta = parentUrl), (parentUrl = undefined));
    return Promise.resolve(loader.prepareImport())
        .then(function () {
            return loader.resolve(id, parentUrl, meta);
        })
        .then(function (id) {
            var load = getOrCreateLoad(loader, id, undefined, meta);
            return load.C || topLevelLoad(loader, load);
        });
};


systemJSPrototype.resolve = function (id, parentUrl) {
    parentUrl = parentUrl || !true || baseUrl;
    return (
        resolveImportMap(
            importMap,
            resolveIfNotPlainOrUrl(id, parentUrl) || id,
            parentUrl
        ) || throwUnresolved(id, parentUrl)
    );
};

function resolveImportMap(importMap, resolvedOrPlain, parentUrl) {
    var scopes = importMap.scopes;
    var scopeUrl = parentUrl && getMatch(parentUrl, scopes);
    console.log(importMap, "importMap???",scopeUrl,parentUrl);
    while (scopeUrl) {
        var packageResolution = applyPackages(resolvedOrPlain, scopes[scopeUrl]);
        if (packageResolution) return packageResolution;
        scopeUrl = getMatch(scopeUrl.slice(0, scopeUrl.lastIndexOf("/")), scopes);
    }
    return (
        applyPackages(resolvedOrPlain, importMap.imports) ||
        (resolvedOrPlain.indexOf(":") !== -1 && resolvedOrPlain)
    );
}

function applyPackages(id, packages) {
    var pkgName = getMatch(id, packages);
    if (pkgName) {
        var pkg = packages[pkgName];
        if (pkg === null) return;
        if (id.length > pkgName.length && pkg[pkg.length - 1] !== "/") {
            targetWarning("W2", pkgName, pkg, "should have a trailing '/'");
        } else return pkg + id.slice(pkgName.length);
    }
}


function getMatch(path, matchObj) {
    if (matchObj[path]) return path;
    var sepIndex = path.length;
    do {
        var segment = path.slice(0, sepIndex + 1);
        if (segment in matchObj) return segment;
    } while ((sepIndex = path.lastIndexOf("/", sepIndex - 1)) !== -1);
}