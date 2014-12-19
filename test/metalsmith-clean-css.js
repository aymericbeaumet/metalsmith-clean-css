'use strict';

var chai = require('chai');

var cleanCSS = require('../lib');

var expect = chai.expect;

describe('metalsmith-clean-css', function() {


  it('should not match any file if an empty string is given', function(done) {
    var files = {
      'main.css': { contents: '  * { display: none; }  ' }
    };

    cleanCSS({ files: '' })(files, null, function() {
      expect(files['main.css'].contents).to.equal('  * { display: none; }  ');
      done();
    });
  });


  it('should match any CSS file with the default pattern', function(done) {
    var files = {
      'main.css':           { contents: '  * { display: none; }  ' },
      'long/path/main.css': { contents: '  * { display: none; }  ' }
    };

    cleanCSS()(files, null, function() {
      Object.keys(files).forEach(function(filename) {
        expect(files[filename].contents).to.equal('*{display:none}');
      });
      done();
    });
  });


  it('should only match the desired CSS files if a pattern is given', function(done) {
    var files = {
      'main.css':           { contents: '  * { display: none; }  ' },
      'long/path/main.css': { contents: '  * { display: none; }  ' }
    };

    cleanCSS({ files: '*.css' })(files, null, function() {
      expect(files['main.css'].contents).to.equal('*{display:none}');
      expect(files['long/path/main.css'].contents).to.equal('  * { display: none; }  ');
      done();
    });
  });


  it('should correctly pass options to clean-css', function(done) {
    var files = {
      'main.css': { contents: '/*! special comment */' }
    };

    cleanCSS({ cleanCSS: { keepSpecialComments: 0 } })(files, null, function() {
      expect(files['main.css'].contents).to.be.empty;
      done();
    });
  });


});
