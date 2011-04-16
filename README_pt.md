# jquery.qrcode.js

<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a>
é *jquery plugin for a pure browser qrcode generation*.
Isto permite a você adicionar qrcode facilmente a sua página web.
Ele roda independente, fica menor que 4k após minify+gzip, sem imagens para download.
It doesnt rely on external services which go on and off, or add latency while loading.
É baseado em uma <a href='http://www.d-project.com/qrcode/index.html'>biblioteca</a>
que cria qrcode em várias linguagens. <a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> inclui
isto para facilitar a inclusão no seu próprio código.

Mostre, não fale, aqui está um <a href='examples/basic.html'>exemplo</a>

## Como Usar

Deixe-me mostrar o caminho para você. Primeiramente inclua ele em sua página com a tag padrão

    <script type="text/javascript" src="jquery.qrcode.min.js"></script>

Então crie um elemento DOM que irá conter a imagem do qrcode gerada. Vamos usar uma div

    <div id="qrcode"></div>

Então você adiciona o *qrcode* neste container

    jquery('#qrcode').qrcode("this plugin is great");

É isto. veja em <a href='examples/basic.html'>ação</a>.

## Conclusão
<a href='http://jeromeetienne.github.com/jquery-qrcode'>jquery.qrcode.js</a> está disponível no github
<a href='https://github.com/jeromeetienne/jquery-qrcode'>aqui</a>
sob uma <a href='https://github.com/jeromeetienne/jquery-qrcode/blob/master/MIT-LICENSE.txt'>licença MIT</a>.
Se achar algum bug, modifique-as no github.
Sinta-se livre para forkar, modificar e se divertir com isto :)

