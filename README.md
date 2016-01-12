# jquery.qrcode.js

<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a>
is *jquery plugin for a pure browser qrcode generation*.
It allow you to easily add qrcode to your webpages.
It is standalone, less than 4k after minify+gzip, no image download.
It doesnt rely on external services which go on and off, or add latency while loading.
It is based on a <a href='http://www.d-project.com/qrcode/index.html'>library</a>
which build qrcode in various language. <a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> wraps
it to make it easy to include in your own code.

Show, don't tell, here is a <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/examples/basic.html'>example</a>

## How to Use It

Let me walk you thru it. First include it in your webpage with the usual script tag
    
    <script type="text/javascript" src="jquery.qrcode.min.js"></script>

Then create a DOM element which gonna contains the generated qrcode image. Lets say
a div

    <div id="qrcode"></div>

Then you add the *qrcode* in this container by

    jquery('#qrcode').qrcode("this plugin is great");

This is it. see it <a href='examples/basic.html'>live</a>.

You can set the height and width of the generated qrcode:

    jquery('#qrcode').qrcode({width: 64,height: 64,text: "size doesn't matter"});


## Conclusion
<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> is available on github
<a href='https://github.com/jeromeetienne/jquery-qrcode'>here</a>
under <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/MIT-LICENSE.txt'>MIT license</a>.
If you hit bugs, fill issues on github.
Feel free to fork, modify and have fun with it :)
