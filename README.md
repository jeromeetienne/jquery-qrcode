# jquery.qrcode.js

<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a>
is a *jquery plugin for pure browser qrcode generation*.
It allows you to easily add qrcodes to your webpages.
It is standalone, less than 4kb after minify+gzip, and no image downloads.
It doesn't rely on external services which go on and off, or add latency while loading.
It is based on a <a href='http://www.d-project.com/qrcode/index.html'>library</a>
which builds qrcodes in various languages. <a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> wraps it to make it easy to include in your own code.

Show, don't tell, here is an <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/examples/basic.html'>example</a>.

## How to Use It

Let me walk you through it. First include it in your webpage with the usual script tag
    
    <script type="text/javascript" src="jquery.qrcode.min.js"></script>

Then create a DOM element which will contain the generated qrcode image. Let's say
a div:

    <div id="qrcode"></div>

Then you add the *qrcode* in this container with: 

    jquery('#qrcode').qrcode("this plugin is great");

This is it. See it <a href='examples/basic.html'>live</a>.

You can set the height and width of the generated qrcode:

    jquery('#qrcode').qrcode({width: 64,height: 64,text: "size doesn't matter"});


## Conclusion
<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> is available on github
<a href='https://github.com/jeromeetienne/jquery-qrcode'>here</a>
under <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/MIT-LICENSE.txt'>MIT license</a>.
If you hit bugs, fill issues on github.
Feel free to fork, modify and have fun with it :)
