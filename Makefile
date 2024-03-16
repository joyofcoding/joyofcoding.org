serve: web
	npm run serve

web: jekyll_build
	cp -a jekyll/_site/* docs

jekyll_build: 
	jekyll build --source jekyll --destination jekyll/_site

