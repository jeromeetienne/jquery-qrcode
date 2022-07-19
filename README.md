# jquery.qrcode.js

<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a>
is a standalone jQuery plugin that generates QR codes.
It lets you easily add QR codes to your website.
It doesn't rely on external services which can go offline or add loading time. Also, it weighs less than 4 KB after minify + gzip, and it doesn't download any images.

This library is based on <a href='https://kazuhikoarase.github.io/qrcode-generator/'>qrcode-generator</a>, a library that generates QR codes in various programming languages. jquery.qrcode.js acts as a wrapper for this library, letting you easily include it in your own code.

## Example

First, include jquery.qrcode.js in your website with a script tag:
    
    <script type="text/javascript" src="jquery.qrcode.min.js"></script>

Second, create a container to hold the generated QR code:

    <div id="qrcode"></div>

To finish, add the QR code in the container using:

    jquery('#qrcode').qrcode("this plugin is great");

See a finished example <a href='examples/basic.html'>here</a>.

You can also set the width and height of the generated QR code:

    jquery('#qrcode').qrcode({width: 64,height: 64,text: "size doesn't matter"});


## Support
<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> is available on GitHub
<a href='https://github.com/jeromeetienne/jquery-qrcode'>here</a>
under the <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/MIT-LICENSE.txt'>MIT license</a>.
If you find bugs, please open issues on GitHub.
Feel free to fork, modify, and have fun with the library :)
