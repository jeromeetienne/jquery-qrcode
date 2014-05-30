PROJECT_NAME ?= jquery-qrcode
USER_NAME    ?= jeromeetienne

ALL += jquery.qrcode.min.js
ALL += index.html

CLEAN += $(ALL)
CLEAN += jquery.qrcode.js

all: $(ALL)

clean:
	rm -f $(CLEAN)

server:
	which python || sudo apt-get install python
	python -m SimpleHTTPServer

build: minify

minify: jquery.qrcode.min.js

jquery.qrcode.js: src/jquery.qrcode.js src/qrcode.js
	(head -2 src/jquery.qrcode.js; cat src/qrcode.js; tail -n +3 src/jquery.qrcode.js) > $@

%.min.js: %.js
	which closure-compiler || sudo apt-get install libclosure-compiler-java
	closure-compiler --compilation_level SIMPLE_OPTIMIZATIONS $< > $@

homepage_build: index.html

~/.pandoc.header.html:
	touch $@

index.html: README.md ~/.pandoc.header.html
	which pandoc || sudo apt-get install pandoc
	pandoc -A ~/.pandoc.header.html -s README.md | sed "s|github.com/you|github.com/$(USER_NAME)/$(PROJECT_NAME)|g" > $@

#################################################################################
#		deploy								#
#################################################################################

deploy: build
	# assume there is something to commit
	# use "git diff --exit-code HEAD" to know if there is something to commit
	# so two lines: one if no commit, one if something to commit 
	git commit -a -m "New deploy" && git push -f origin HEAD:gh-pages && git reset HEAD~
