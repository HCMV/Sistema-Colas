// comando para la conexión
var socket = io();

var seachparams = new URLSearchParams(window.location.search);

if (!seachparams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = seachparams.get('escritorio');
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        if (resp === 'No hay tickets') {
            alert(resp);
            return;
        }

        label.text('Ticket' + resp.numero);

    });

});

socket.on('connect', function() {

    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {

    console.log('Desconectado del servidor');

});