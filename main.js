$(document).ready(function () {
    
        $('nav a#toggle').click(function () {
            $('ul').slideToggle(200, function () { });
        });
    
        $('#about').click(function () {
    
            $('ul').slideToggle(200, function () { });
    
            var html = '';
            html += '<h3 class="title">Sobre</h3>';
            html += '<div>&nbsp;</div>';
            html += '<div class="content-text">';
            html += '	&nbsp;&nbsp;&nbsp;Desenvolvido pelos alunos Diogo Schuarz, Enrico Oliveira Rocheti, Lucas de Luca, Pedro Dedin Neto e ';
            html += '	Victor Marques de Souza Cardoso atrav&eacute;s do 1&ordm; Concurso Smart Campus criado pela Faculdade de Engenharia El&eacute;trica e de ';
            html += '	Computa&ccedil;&atilde;o da UNICAMP. ';
            html += '</div>';
            html += '<div>&nbsp;</div>';
    
            write_content(html);
        });
    
        $('#help').click(function () {
    
            $('ul').slideToggle(200, function () { });
    
            var html = '';
            html += '<h3 class="title">Ajuda</h3>';
            html += '<div>&nbsp;</div>';
            html += '<div class="content-text">';
            html += '	&nbsp;&nbsp;&nbsp;Na guia &quot;Principal&quot; voc&ecirc; consegue escolher o modo de opera&ccedil;&atilde;o do CLI: manual, ';
            html += '	onde voc&ecirc; mesmo escolhe a luminosidade em porcentagem que a l&acirc;mpada deve permanecer acesa, ou autom&aacute;tico, onde uma leitura ';
            html += '	da luminosidade do ambiente &eacute; realizada e, com base nisso, a l&acirc;mpada acende com uma pot&ecirc;ncia determinada por um algoritmo de luminosidade.';
            html += '</div>';
            html += '<div>&nbsp;</div>';
            html += '<div class="content-text">';
            html += '	&nbsp;&nbsp;&nbsp; Na guia &quot;Gr&aacute;ficos&quot; voc&ecirc; pode visualizar a pot&ecirc;ncia demandada pelas l&acirc;mpadas em um';
            html += '	per&iacute;odo de 24 horas.';
            html += '</div>';
    
            write_content(html);
        });
    
    });
    
    function write_content(html, page = '') {
    
        $('.content').empty();
        $('.content').append(html);
    
        if (page == 'home') {
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
                    location.href = '/#manual';
                    $('.op-mode-manual').css('display', 'inline');
                } else {
                    location.href = '/#auto';
                    $('.op-mode-manual').css('display', 'none');
                }
            });
        }
    }