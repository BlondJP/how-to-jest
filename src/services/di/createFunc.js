const factory = (func, deps) => func.bind(null, deps);

module.exports = (func, deps) => factory(func, deps);
