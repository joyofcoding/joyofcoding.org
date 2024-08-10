serve: web
	npm run serve

web: jekyll_build
	cp -a jekyll/_site/* docs

jekyll_build: jekyll/vendor node_modules
	cd jekyll; bundle exec jekyll build --source . --destination _site

jekyll/vendor:
	cd jekyll; bundle config set --local path vendor
	cd jekyll; bundle install

node_modules:
	npm install
