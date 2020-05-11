#!/usr/bin/env node

const metalsmith = require('metalsmith');
const metalsmithCleanCSS = require('..');

metalsmith(__dirname)
	.use(
		metalsmithCleanCSS({
			files: 'main.css',
			cleanCSS: {
				rebase: true
			}
		})
	)
	.build(error => {
		if (error) {
			throw error;
		}
	});
