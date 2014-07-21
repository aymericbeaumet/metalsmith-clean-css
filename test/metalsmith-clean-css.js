var chai = require('chai');

var Metalsmith = require('metalsmith');
var cleanCSS = require('../lib');

var expect = chai.expect;

describe('metalsmith-clean-css', function() {


  it('should not match any file if an empty string is given', function(done) {
    var files = {
      'main.css': { content: '  * { display: none; }  ' }
    };

    cleanCSS({ files: '' })(files, null, function() {
      expect(files['main.css'].content).to.equal('  * { display: none; }  ');
      done();
    });
  });


  it('should match any CSS file with the default pattern', function(done) {
    var files = {
      'main.css':           { content: '  * { display: none; }  ' },
      'long/path/main.css': { content: '  * { display: none; }  ' }
    };

    cleanCSS()(files, null, function() {
      Object.keys(files).forEach(function(filename) {
        expect(files[filename].content).to.equal('*{display:none}');
      });
      done();
    });
  });


  it('should only match the desired CSS files if a pattern is given', function(done) {
    var files = {
      'main.css':           { content: '  * { display: none; }  ' },
      'long/path/main.css': { content: '  * { display: none; }  ' }
    };

    cleanCSS({ files: '*.css' })(files, null, function() {
      expect(files['main.css'].content).to.equal('*{display:none}');
      expect(files['long/path/main.css'].content).to.equal('  * { display: none; }  ');
      done();
    });
  });


  it('should correctly pass options to clean-css', function(done) {
    var files = {
      'main.css': { content: '/*! special comment */' }
    };

    cleanCSS({ cleanCSS: { keepSpecialComments: 0 } })(files, null, function() {
      expect(files['main.css'].content).to.be.empty;
      done();
    });
  });


});
