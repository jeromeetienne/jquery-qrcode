PROJECT_NAME=jquery-qrcode

all:


build: minify homepage_build

minify:
	echo -n 			> /tmp/jquery.qrcode.tmp.js
	head -2 src/jquery.qrcode.js	>> /tmp/jquery.qrcode.tmp.js
	cat src/qrcode.js		>> /tmp/jquery.qrcode.tmp.js
	tail -n +3 src/jquery.qrcode.js	>> /tmp/jquery.qrcode.tmp.js
	closurec --js /tmp/jquery.qrcode.tmp.js --js_output_file jquery.qrcode.min.js

homepage_build:
	pandoc -A ~/.pandoc.header.html -s README.md -o index.html
	sed -i "s/github.com\/you/github.com\/jeromeetienne\/$(PROJECT_NAME)/g" index.html

#################################################################################
#		deploy								#
#################################################################################

deploy:	build deployGhPage

deployGhPage:
	rm -rf /tmp/$(PROJECT_NAME)GhPages
	(cd /tmp && git clone git@github.com:jeromeetienne/$(PROJECT_NAME).git $(PROJECT_NAME)GhPages)
	(cd /tmp/$(PROJECT_NAME)GhPages && git checkout gh-pages || true )
	(cd /tmp/$(PROJECT_NAME)GhPages && git push origin :gh-pages || true )
	(cd /tmp/$(PROJECT_NAME)GhPages && git symbolic-ref HEAD refs/heads/gh-pages)
	(cd /tmp/$(PROJECT_NAME)GhPages && rm .git/index)
	(cd /tmp/$(PROJECT_NAME)GhPages && git clean -fdx)
	cp -a examples src Makefile *.* /tmp/$(PROJECT_NAME)GhPages
	(cd /tmp/$(PROJECT_NAME)GhPages && git add . && git commit -a -m "Another deployement" && git push origin gh-pages)
	#rm -rf /tmp/$(PROJECT_NAME)GhPages