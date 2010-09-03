main:
	cp src/*.js example/lib/
	cp -r src/websocket example/lib/
	mv ./example/index.html ./example/index.bak
	cat example/index.bak | sed 's/..\/src/lib/' > example/index.html
	scp -r example/* gamenao:~/public_html/gamenao.com/domingo/
	mv ./example/index.bak ./example/index.html
