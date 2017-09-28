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

    function getTime() {
        return ['0h15','0h30','0h45','1h00','1h15','1h30','1h45','2h00','2h15','2h30','2h45','3h00',
        '3h15','3h30','3h45','4h00','4h15','4h30','4h45','5h00','5h15','5h30','5h45','6h00',
        '6h15','6h30','6h45','7h00','7h15','7h30','7h45','8h00','8h15','8h30','8h45','9h00',
        '9h15','9h30','9h45','10h00','10h15','10h30','10h45','11h00','11h15','11h30','11h45','12h00',
        '12h15','12h30','12h45','13h00','13h15','13h30','13h45','14h00','14h15','14h30','14h45','15h00',
        '15h15','15h30','15h45','16h00','16h15','16h30','16h45','17h00','17h15','17h30','17h45','18h00',
        '18h15','18h30','18h45','19h00','19h15','19h30','19h45','20h00','20h15','20h30','20h45','21h00',
        '21h15','21h30','21h45','22h00','22h15','22h30','22h45','23h00','23h15','23h30','23h45','0h00']
    }
    
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
                    $.get('?pot='+ui.value, function() { });
                }
            });
    
            $('input[type=radio][name=op-mode]').change(function () {
                if (this.value == 'manual') {
                    //location.href = '/#manual';
                    $.get('?manual', function() { });
                    $('.op-mode-manual').css('display', 'inline');
                } else {
                    //location.href = '/?auto';
                    $.get('?auto', function() { });
                    $('.op-mode-manual').css('display', 'none');
                }
            });

            $('#charts').click(function () {
                $.get('?chart', function() { });
            });
        }
    }