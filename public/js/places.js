$(function(){

	$('.go').on('click', function(){

		 $('.go').on('click', mostrarFormulario);

		 debugger;

            function mostrarFormulario() {
            	debugger;
            	console.log('mmm');
                $('.principal').fadeOut(4000, function() {
				alert ('Efecto fadeOut terminado!');
				});
            }
	});

});