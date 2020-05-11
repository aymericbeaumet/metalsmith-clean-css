const path = require('path');
const test = require('ava');
const metalsmithCleanCSS = require('.');

function metalsmithFixture() {
	return {
		_directory: path.resolve(__dirname, 'fixture')
	};
}

test.cb(
	'metalsmith-clean-css should not match any file if an empty string is given',
	t => {
		t.plan(2);
		const files = {
			'main.css': {
				contents: Buffer.from('  * { display: none }  ')
			}
		};
		metalsmithCleanCSS({files: ''})(files, metalsmithFixture(), errors => {
			t.falsy(errors);
			t.deepEqual(files, {
				'main.css': {
					contents: Buffer.from('  * { display: none }  ')
				}
			});
			t.end();
		});
	}
);

test.cb(
	'metalsmith-clean-css should match any CSS file with the default pattern',
	t => {
		t.plan(2);
		const files = {
			'main.css': {
				contents: Buffer.from('  * { display: none }  ')
			},
			'deep/path/main.css': {
				contents: Buffer.from('  * { display: none }  ')
			}
		};
		metalsmithCleanCSS()(files, metalsmithFixture(), errors => {
			t.falsy(errors);
			t.deepEqual(files, {
				'main.css': {
					contents: Buffer.from('*{display:none}')
				},
				'deep/path/main.css': {
					contents: Buffer.from('*{display:none}')
				}
			});
			t.end();
		});
	}
);

test.cb(
	'metalsmith-clean-css should only match the desired CSS files if a pattern is given',
	t => {
		t.plan(2);
		const files = {
			'main.css': {
				contents: Buffer.from('  * { display: none }  ')
			},
			'deep/path/main.css': {
				contents: Buffer.from('  * { display: none }  ')
			}
		};
		metalsmithCleanCSS({files: '*.css'})(
			files,
			metalsmithFixture(),
			errors => {
				t.falsy(errors);
				t.deepEqual(files, {
					'main.css': {
						contents: Buffer.from('*{display:none}')
					},
					'deep/path/main.css': {
						contents: Buffer.from('  * { display: none }  ')
					}
				});
				t.end();
			}
		);
	}
);

test.cb(
	'metalsmith-clean-css should correctly pass options to clean-css',
	t => {
		t.plan(2);
		const files = {
			'main.css': {contents: Buffer.from('/*! special comment */')}
		};
		metalsmithCleanCSS({cleanCSS: {level: {1: {specialComments: 0}}}})(
			files,
			metalsmithFixture(),
			errors => {
				t.falsy(errors);
				t.deepEqual(files, {
					'main.css': {
						contents: Buffer.from('')
					}
				});
				t.end();
			}
		);
	}
);

test.cb('metalsmith-clean-css should forward clean-css errors', t => {
	t.plan(2);
	const files = {
		'main.css': {contents: Buffer.from('@import url(https://not/found);')}
	};
	metalsmithCleanCSS({cleanCSS: {inline: 'all'}})(
		files,
		metalsmithFixture(),
		errors => {
			t.true(Array.isArray(errors));
			t.is(errors.length, 1);
			t.end();
		}
	);
});

test.cb(
	'metalsmith-clean-css should not generate source maps by default',
	t => {
		t.plan(3);
		const files = {
			'main.css': {contents: Buffer.from(' * { display: none } ')}
		};
		metalsmithCleanCSS({})(files, metalsmithFixture(), errors => {
			t.falsy(errors);
			t.false(Boolean(files['main.css'].sourceMap));
			t.deepEqual(Object.keys(files), ['main.css']);
			t.end();
		});
	}
);

test.cb(
	'metalsmith-clean-css should expose both a `sourceMap` property and a `.map` file',
	t => {
		t.plan(3);
		const files = {
			'main.css': {contents: Buffer.from(' * { display: none } ')}
		};
		metalsmithCleanCSS({sourceMap: true})(
			files,
			metalsmithFixture(),
			errors => {
				t.falsy(errors);
				t.true(Boolean(files['main.css'].sourceMap));
				t.deepEqual(Object.keys(files), ['main.css', 'main.css.map']);
				t.end();
			}
		);
	}
);

test.cb(
	'metalsmith-clean-css should not expose a .map when `options.sourceMapInlineSources` is set',
	t => {
		t.plan(3);
		const files = {
			'main.css': {contents: Buffer.from(' * { display: none } ')}
		};
		metalsmithCleanCSS({sourceMap: true, sourceMapInlineSources: true})(
			files,
			metalsmithFixture(),
			errors => {
				t.falsy(errors);
				t.true(Boolean(files['main.css'].sourceMap));
				t.deepEqual(Object.keys(files), ['main.css']);
				t.end();
			}
		);
	}
);
