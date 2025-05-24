$(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    //Select2
    $('#cboPaises').select2();
    $('#cboEstados').select2();

    //Select 2 con funciones especiales
    $('#cboMultiple').select2({
        theme: 'bootstrap4'
    })
    //Calendario
    $('#dtmFecha').datetimepicker({
        format: 'L'
    });
    //Fecha y hora
    $('#dthFechaHora').datetimepicker({ icons: { time: 'far fa-clock' } });
    $('[data-mask]').inputmask();
    //Rango de horas
    $('#RangoFechas').daterangepicker();
    //Rango de fechas con hora
    $('#RangoFechaHora').daterangepicker({
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
            format: 'MM/DD/YYYY hh:mm A'
        }
    });
    //Timepicker
    $('#tmHoraInicio').datetimepicker({
        format: 'LT'
    });
})