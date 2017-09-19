$(document).ready(function () {
    $('nav a#toggle').click(function () {
        $('ul').slideToggle(200, function () { });
    });

    $('#about').click(function () {
        $('ul').slideToggle(200, function () { });
        var html = '';
        $('.content').empty();
        html += '<h3 class="title">Sobre</h3>';
        html += '<div>&nbsp;</div>';
        html += '<div class="content-text">';
        html += '	&nbsp;&nbsp;&nbsp;Desenvolvido pelos alunos Diogo Schuarz, Enrico Oliveira Rocheti, Lucas de Luca, Pedro Dedin Neto e ';
        html += '	Victor Marques de Souza Cardoso atrav&eacute;s do 1&ordm; Concurso Smart Campus criado pela Faculdade de Engenharia El&eacute;trica e de ';
        html += '	Computa&ccedil;&atilde;o da UNICAMP. ';
        html += '</div>';
        html += '<div>&nbsp;</div>';
        $('.content').append(html);
    });

    $('#help').click(function () {
        $('ul').slideToggle(200, function () { });
        var html = '';
        $('.content').empty();
        html += '<h3 class="title">Ajuda</h3>';
        html += '<div>&nbsp;</div>';
        html += '<div class="content-text">';
        html += '	&nbsp;&nbsp;&nbsp;Na guia &quot;Principal&quot; voc&ecirc; consegue escolher o modo de opera&ccedil;&atilde;o do CLI, manual, ';
        html += '	onde voc&ecirc; mesmo escolhe a luminosidade em porcentagem que a l&acirc;mpada deve permanecer acesa, ou autom&aacute;tico, onde uma leitura ';
        html += '	da luminosidade do ambiente &eacute; realizada e, com base nisso, a l&acirc;mpada acende com uma pot&ecirc;ncia determinada por um algoritmo de luminosidade.';
        html += '</div>';
        html += '<div>&nbsp;</div>';
        html += '<div class="content-text">';
        html += '	&nbsp;&nbsp;&nbsp; Na guia &quot;Gr&aacute;ficos&quot; voc&ecirc; pode visualizar os dados do consumo de energia das l&acirc;mpadas nos &uacute;ltimos ';
        html += '	7 dias em um gr&aacute;fico e as medidas de corrente e pot&ecirc;ncia obtidas nas &uacute;ltimas 24 horas. ';
        html += '</div>';
        $('.content').append(html);
    });

    $('#home').click(function () {
        $('ul').slideToggle(200, function () { });
        var html = '';
        $('.content').empty();
        html += "<h3 class='title'>Controle de Luminosidade Inteligente</h3>";
		html += "<div>&nbsp;</div>";
		html += "<div class='content-text'>Conectado a rede: <strong>Eduroam</strong></div>";
		html += "<div>&nbsp;</div>";
		html += "<div class='content-text'>Endere&ccedil;o (IP): <strong>192.168.1.53</strong></div>";
        html += "<div>&nbsp;</div>";
		html += "<hr>";
		html += "<div>&nbsp;</div>";
		html += "<div class='content-text'>Modo de opera&ccedil;&atilde;o:</div>";
		html += "<input type='radio' name='op-mode' value='auto' class='input-radio' checked><span class='input-radio'>Autom&aacute;tico</span><br>";
		html += "<input type='radio' name='op-mode' value='manual' class='input-radio'><span class='input-radio'>Manual</span><br>";
		html += "<div class='op-mode-manual'>";
		html += "	<div>&nbsp;</div>";
		html += "	<div>Pot&ecirc;ncia da l&acirc;mpada: <span id='slider-value'>50</span>%</div>";
		html += "	<div id='slider-range'></div>";
		html += "	<div style='float:left; margin-top:5px;'>0%</div><div style='float: right;margin-top:5px;'>100%</div>";
		html += "	<div>&nbsp;</div>";
		html += "</div>";
		html += "<div>&nbsp;</div>";
		html += "<hr>";
        $('.content').append(html);
    });

    $('#slider-range').slider({
        value: 50,
        min: 0,
        max: 100,
        animate: 'fast',
        change: function (event, ui) {
            // AQUI DEVE ENTRAR O CÓDIGO location.href PARA REDIRECIONAR PARA O ARDUINO
            $('#slider-value').empty();
            $('#slider-value').append(ui.value);
        }
    });

    $('input[type=radio][name=op-mode]').change(function () {
        if (this.value == 'manual') {
            $('.op-mode-manual').css('display', 'inline');
        } else {
            $('.op-mode-manual').css('display', 'none');
        }
    });
});