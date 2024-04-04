install:
	npm install

gendiff:
	node bin/gendiff.js

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx jest
	
test-coverage:
    npm test -- --coverage --coverageProvider=v8