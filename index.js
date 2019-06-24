'use strict';

var JSXTransformer = require('./broccoli-jsx');

JSXCaster.prototype = Object.create(JSXTransformer.prototype);

function JSXCaster(options) {
  this.name = 'ember-cli-jsx-templates';
  this.options = options || {};
}

JSXCaster.prototype.baseDir = function() {
  return __dirname;
};
JSXCaster.prototype.ext = JSXCaster.prototype.extensions;
JSXCaster.prototype.toTree = function(tree, inputPath, outputPath) {

  var options = {
    bare: true,
    srcDir: inputPath,
    destDir: outputPath
  };
  return JSXTransformer(tree, options);
};


module.exports = {
  name: require('./package').name,
  setupPreprocessorRegistry: function(type, registry) {
    var plugin = new JSXCaster();
    registry.add('template', plugin);
  },
};
