

$(document).ready(function(){
    var queryString = new Array();
  if (queryString.length == 0) {
            if (window.location.search.split('?').length > 1) {
                var params = window.location.search.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var key = params[i].split('=')[0];
                    var value = decodeURIComponent(params[i].split('=')[1]);
                    queryString[key] = value;
                }
            }
        }
        if (queryString["latdes"] != null &&queryString["londes"] != null &&queryString["latori"] != null && queryString["lonori"] != null) {
           var topic = queryString["arrivo"];
           if (topic.split(',').length > 1) {
            debugger;
            var destino = topic.split(',')[0];
           }
           debugger;
        }

    var title = document.querySelector('h2');
    function ellipsis_box(elemento, max_chars)
    {
        limite_text = $(elemento).text();
        if (limite_text.length > max_chars){
            limite = limite_text.substr(0, max_chars)+" ...";
            $(elemento).text(limite);
        }
    }


 
    $.ajax({
        type: "GET",
        url: 'http://es.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page='+destino+'&callback=?',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.parse.text["*"];
            var blurb = $('<div></div>').html(markup);
 
            // remove links as they will not work
            blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
 
            // remove any references
            blurb.find('sup').remove();

            blurb.find('img').remove();
             blurb.find('span').remove();
 
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('p').html($(blurb).find('p'));
            title.innerHTML = data.parse.title;
            ellipsis_box("p", 300);
 
        },
        error: function (errorMessage) {
        }
    });
});



/*$(document).ready(function(){
 
    $.ajax({
        type: "GET",
        url: 'https://es.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=París&callback=?',
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.query.pages['7634'].extract;
            var blurb = $('<div></div>').html(markup);
 
            // remove links as they will not work
            //blurb.find('a').each(function() { $(this).replaceWith($(this).html()); });
 
            // remove any references
            //blurb.find('sup').remove();
 
            // remove cite error
            blurb.find('.mw-ext-cite-error').remove();
            $('.contenido').html($(blurb).find('p'));
 
        },
        error: function (errorMessage) {
        }
    });
});
*/
/*
$(document).ready(function(){
 var title = document.querySelector('h2');
 var contenido = document.querySelector('p');

    $.ajax({
        type: "GET",
        url: 'https://es.wikipedia.org/w/api.php?action=parse&format=json&prop=wikitext&section=0&page=París&callback=?',
        //url: "http://en.wikipedia.org/w/api.php?action=query&prop=info&titles=París&callback=?",
        //"http://es.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=París&callback=?"
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            //title.innerHTML = data.parse.title;
            //contenido.innerHTML = data.parse.text['*'];
            //console.log(data.parse.text['*']);
        },
        error: function (errorMessage) {
        }
    });
});
*/
