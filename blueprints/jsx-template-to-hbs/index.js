'use strict';
const { extractJSXComponents } = require('ember-meta-explorer');
// eslint-disable-next-line node/no-extraneous-require
const  { print, preprocess }  = require('@glimmer/syntax'); // use version from ember-meta-explorer
const fs = require('fs');
const path = require('path');

module.exports = {
  description: 'converts jsx/tsx templates into hbs',

  locals(options) {
    return {
      filePath: options.entity.name
    };
  },
  log(text) {
    this.project.ui.writeLine(text);
  },
  afterInstall(options) {
    const line = (new Array(20)).fill('-----').join('');
    this.log(line);
    const filePath = options.entity.name;
    const removeFile = !('no-remove' in options.entity.options);
    const writeFile = !('no-write' in options.entity.options);
    const rewriteFile = !('no-rewrite' in options.entity.options);
    const hasCustomFileName = options.entity.options['new-path'] || false;
    const rootFolder = this.project.root;
    const possiblePaths = [
      path.join(rootFolder, filePath),
      path.join(rootFolder, 'app', 'templates', 'components', filePath),
      path.join(rootFolder, 'app', 'components', filePath),
      path.join(rootFolder, 'tests', 'dummy',  filePath),
      path.join(rootFolder, 'tests', 'dummy', 'app', 'templates', 'components', filePath),
      path.join(rootFolder, 'tests', 'dummy', 'app', 'components', filePath)
    ];
    const realFiles = possiblePaths.filter((filePath) => fs.existsSync(filePath));
    if (!realFiles.length) {
      this.log(`File ${filePath} not found`);
      return;
    }
    let validFilePath = realFiles[0];
    const fileContent = fs.readFileSync(validFilePath, { encoding: 'utf8' });
    this.log(line);
    this.log(fileContent);
    this.log(line);
    this.log('converting...');
    this.log(line);
    const components = extractJSXComponents(fileContent);
    const keys = Object.keys(components);
    const firstKey = keys[0];
    const declaratedKey = firstKey + '_declarated';
    const component = components[declaratedKey] ? components[declaratedKey] : components[firstKey];
    const ast = preprocess(component);
    const result = print(ast, { entityEncoding: 'transformed'});
    this.log(result);
    this.log(line);
    
    const prevExt = path.extname(validFilePath);
    const newFileName = hasCustomFileName ? path.join(rootFolder, hasCustomFileName) : validFilePath.replace(prevExt, '.hbs');
    

    if (writeFile) {
      this.log('saving...');
      this.log(line);
      if (fs.existsSync(newFileName)) {
        if (!rewriteFile) {
          this.log(`File ${newFileName} already created`);
          return;
        }
      }
      fs.writeFileSync(newFileName, result);
      this.log(`Template ${path.relative(rootFolder, newFileName)} created`);
      this.log(line);
    }

    if (removeFile) {
      fs.unlinkSync(validFilePath);
      this.log('Origingal file removed');
      this.log(line);
    }
    this.log('done');
  }
};
