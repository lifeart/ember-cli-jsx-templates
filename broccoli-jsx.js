'use strict';

var Filter = require('broccoli-persistent-filter')
// var stringify = require('json-stable-stringify')
var { extractJSXComponents } = require('ember-meta-explorer');

module.exports = JSXFilter;

JSXFilter.prototype = Object.create(Filter.prototype)
JSXFilter.prototype.constructor = JSXFilter
function JSXFilter (inputTree, options) {
  if (!options || typeof options !== 'object') {
    options = { persist: true };
  } else if (typeof options.persist === 'undefined') {
    options.persist = true;
  }

  if (!(this instanceof JSXFilter)) return new JSXFilter(inputTree, options)
  Filter.call(this, inputTree, options)
  options = options || {}
  this.bare = options.bare;
  this.options = options;
}

JSXFilter.prototype.extensions = ['jsx','tsx']
JSXFilter.prototype.targetExtension = 'hbs'
JSXFilter.prototype.baseDir = function() {
  return __dirname;
};

JSXFilter.prototype.optionsHash = function() {
  if (!this._optionsHash) {
    this._optionsHash = '{foo: bar}';
  }

  return this._optionsHash;
};

JSXFilter.prototype.cacheKeyProcessString = function(string, relativePath) {
    // return Math.random();
  return this.optionsHash() + Filter.prototype.cacheKeyProcessString.call(this, string, relativePath);
};

JSXFilter.prototype.processString = function (string) {
  try {
    let components = extractJSXComponents(string);
    let keys = Object.keys(components);
    let component = components[keys[0]];
    return component;
  } catch (err) {
    // first_line/first_column properties; pass them on
    // err.line = err.location && ((err.location.first_line || 0) + 1)
    // err.column = err.location && ((err.location.first_column || 0) + 1)
    // err.descriptions = err.description + ' template ' + string;
    throw new Error('ember-cli-jsx-templates: Unable to compile ' + string);
  }
}