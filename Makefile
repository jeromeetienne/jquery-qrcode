PROJECT_NAME=jquery-qrcode

all:

server:
	python -m SimpleHTTPServer

build: minify

minify:
	echo 	 			 > /tmp/jquery.qrcode.tmp.js
	head -2 src/jquery.qrcode.js	>> /tmp/jquery.qrcode.tmp.js
	cat src/qrcode.js		>> /tmp/jquery.qrcode.tmp.js
	tail -n +3 src/jquery.qrcode.js	>> /tmp/jquery.qrcode.tmp.js
	curl --data-urlencode "js_code@/tmp/jquery.qrcode.tmp.js" 	\
		-d "output_format=text&output_info=compiled_code&compilation_level=SIMPLE_OPTIMIZATIONS" \
		http://closure-compiler.appspot.com/compile		\
		> jquery.qrcode.min.js

homepage_build:
	pandoc -A ~/.pandoc.header.html -s README.md -o index.html
	sed -i "s/github.com\/you/github.com\/jeromeetienne\/$(PROJECT_NAME)/g" index.html

#################################################################################
#		deploy								#
#################################################################################

deploy: build
	# assume there is something to commit
	# use "git diff --exit-code HEAD" to know if there is something to commit
	# so two lines: one if no commit, one if something to commit 
	git commit -a -m "New deploy" && git push -f origin HEAD:gh-pages && git reset HEAD~