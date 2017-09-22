#include <ESP8266WiFi.h>
 
const char* ssid = "Cativeiro";
const char* password = "bonobo13";
 
WiFiServer server(80);
 
void setup() {
  Serial.begin(115200);
  delay(10);
 
  // prepare GPIO2
  pinMode(14, OUTPUT);
  digitalWrite(14, 1);
 
  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
 
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
  Serial.println(WiFi.localIP());
}
 
void loop() {
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
 
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }
 
  String req = client.readStringUntil('\r');
  Serial.println(req);
  client.flush();
 
  String html = "";
  html += "HTTP/1.1 200 OK\r\n";
  html += "Content-Type: text/html\r\n\r\n";
  html += "<!DOCTYPE HTML>\r\n";

  html += "<html>";
  html += "<header>";
  html += "<title>CLI - Smart Campus</title>";
  html += "<meta name='viewport' content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'/>";
  html += "<link href = 'https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css' rel = 'stylesheet'>";
  html += "<link href = 'https://rawgit.com/enricorocheti/smart_campus/master/style.css' rel = 'stylesheet' type='text/css'>";
  html += "<script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>";
  html += "<script src='https://code.jquery.com/ui/1.12.0/jquery-ui.min.js'></script>";
  html += "<script type='text/javascript' src='https://www.gstatic.com/charts/loader.js'></script>";
  html += "<script type='text/javascript' src='https://rawgit.com/enricorocheti/smart_campus/master/main.js'></script>";
  html += "<script type='text/javascript'>";
  html += "  $(document).ready(function () {";
  html += "    setTimeout(function() {";
  html += "      $('#home').trigger('click');";
  html += "    },10);";  
  html += "    $('#home').click(function ($event) {";
  html += "      if ($event.originalEvent) $('ul').slideToggle(200, function () { });";
  html += "      var html = '';";
  html += "      html += '<meta name=\"viewport\" content=\"width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;\"/>';";
  html += "      html += '<h3 class=\"title\">Controle de Luminosidade Inteligente</h3>';";
  html += "      html += '<div>&nbsp;</div>';";
  html += "      html += '<div class=\"content-text\">Conectado a rede: <strong>Eduroam</strong></div>';";
  html += "      html += '<div>&nbsp;</div>';";
  html += "      html += '<div class=\"content-text\">Endere&ccedil;o (IP): <strong>"+WiFi.localIP().toString()+"</strong></div>';";
  html += "      html += '<div>&nbsp;</div>';";
  html += "      html += '<hr>';";
  html += "      html += '<div>&nbsp;</div>';";
  html += "      html += '<div class=\"content-text\">Modo de opera&ccedil;&atilde;o:</div>';";
  html += "      html += '<input type=\"radio\" name=\"op-mode\" value=\"auto\" class=\"input-radio\" checked><span class=\"input-radio\">Autom&aacute;tico</span><br>';";
  html += "      html += '<input type=\"radio\" name=\"op-mode\" value=\"manual\" class=\"input-radio\"><span class=\"input-radio\">Manual</span><br>';";
  html += "      html += '<div class=\"op-mode-manual\">';";
  html += "      html += ' <div>&nbsp;</div>';";
  html += "      html += ' <div>Pot&ecirc;ncia da l&acirc;mpada: <span id=\"slider-value\">50</span>%</div>';";
  html += "      html += ' <div id=\"slider-range\"></div>';";
  html += "      html += ' <div style=\"float:left; margin-top:5px;\">0%</div><div style=\"float: right;margin-top:5px;\">100%</div>';";
  html += "      html += ' <div>&nbsp;</div>';";
  html += "      html += '</div>';";
  html += "      html += '<div>&nbsp;</div>';";
  html += "      html += '<hr>';";
  html += "      write_content(html, 'home');";
  html += "    });";
  html += "  });";
  html += "</script>";
  html += "<nav role='navigation' style='padding: 0.7rem;'><a href='#' id='toggle'>=</a>";
  html += "  <ul>";
  html += "    <li class='menu-item'><a href='#' id='home'>Principal</a></li>";
  html += "    <li class='menu-item'><a href='#' id='charts'>Gr&aacute;ficos</a></li>";
  html += "    <li class='menu-item'><a href='#' id='help'>Ajuda</a></li>";
  html += "    <li class='menu-item'><a href='#' id='about'>Sobre</a></li>";
  html += "  </ul>";
  html += "</nav>";
  html += "</header>";
  html += "<body>";
  html += "  <div class='content'></div>";
  html += "</body>";
  html += "</html>";

  /*html += "<html>\r\n";
  html += "   <head>";
  html += "     <title>CLI - Smart Campus</title>";
  html += "     <meta name='viewport' content='width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;'/>";
  html += "     <style>*{ margin: 0; padding: 0; box-sizing: border-box; } #toggle{font-size: 24px;} nav{background-color:#333;text-align: center;}  nav ul{display: none;} a{color: #ccc;text-decoration: none;}</style>";
  html += "     <script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>";
  html += "     <script type='text/javascript' src='https://www.gstatic.com/charts/loader.js'></script>";
  html += "     <script>";
  html += "       google.charts.load('current', { 'packages': ['corechart'] }); google.charts.setOnLoadCallback(drawChart);";
  html += "       function drawChart() {";
  html += "         var data = google.visualization.arrayToDataTable([";
  html += "           ['Horário', 'Potencia', 'Energia'],";
  html += "           ['15:00', 6.5, 39],";
  html += "           ['16:00', 7.1, 45],";
  html += "           ['17:00', 10.3, 74],";
  html += "           ['18:00', 12.0, 112],";
  html += "           ['19:00', 13.6, 124],";
  html += "           ['20:00', 13.8, 121],";
  html += "           ['21:00', 13.65, 135],";
  html += "         ]);";
  html += "         var options = { title: 'Medias ao longo do dia', legend: { position: 'bottom' } };";
  html += "         var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));";
  html += "         chart.draw(data, options);";
  html += "       }";
  html += "     </script>";
  html += "     <nav role='navigation'><a href='#' id='toggle'>=</a>";
  html += "         <ul>";
  html += "             <li><a href='#'>Home</a></li>";
  html += "             <li><a href='#'>About</a></li>";
  html += "             <li><a href='#'>Clients</a></li>";
  html += "             <li><a href='#'>Contact Us</a></li>";
  html += "         </ul>";
  html += "     </nav>";
  html += "     <script>";
  html += "         $('nav a#toggle').click(function () {";
  html += "             $('ul').slideToggle(200, function () {});";
  html += "         });";
  html += "     </script>";
  html += "   </head>";
  html += "   <body>";
  html += "     <h3>Controle de Luminosidade Inteligente</h3>";
  html += "     <input type='radio' name='op_mode' value='manual'> Manual<br>";
  html += "     <input type='radio' name='op_mode' value='auto'> Autom&aacute;tico<br>";
  html += "     <br><input type=\"button\" value=\"Ligar LED\" onclick=\"location.href='/on'\">";
  html += "     <br><br>";
  html += "     <input type=\"button\" value=\"Desligar LED\" onclick=\"location.href='/off'\">";
  html += "     <div id='curve_chart' style='width: 900px; height: 500px'></div>";
  html += "   </body>";
  html += "</html>\n";*/
 
  client.print(html);
  client.flush();
 
  if (req.indexOf("/off") != -1){
    digitalWrite(14, LOW);
  } else if (req.indexOf("/on") != -1){
    digitalWrite(14, HIGH);
  } else {
    Serial.println("invalid request");
    client.stop();
  }
  Serial.println("Client disonnected");
}
