

var BaseURL = "http://appwebmie1820.runasp.net/";
jQuery(function () {
    $("#dvMenu").load("../Paginas/Menu.html");
    LlenarTablaEmpleados();
});

function LlenarTablaEmpleados() {
    let URL = BaseURL + "api/Empleados/ConsultarTodos";
    LlenarTablaXServiciosAuth(URL, "#tblEmpleados");
}
async function EjecutarComando(Metodo, Funcion) {
    //Creamos la dirección URL
    let URL = BaseURL + "api/Empleados/" + Funcion;
    //Creamos el objeto empleado
    const empleado = new Empleado($("#txtDocumento").val(), $("#txtNombre").val(), $("#txtPrimerApellido").val(),
        $("#txtSegundoApellido").val(), $("#txtDireccion").val(), $("#txtTelefono").val());
    const Rpta = await EjecutarComandoServicioRptaAuth(Metodo, URL, empleado);
    LlenarTablaEmpleados();
}
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    let URL = BaseURL + "api/Empleados/ConsultarXDocumento?Documento=" + Documento;
    const empleado = await ConsultarServicioAuth(URL);
    if (empleado == null) {
        //No existe, se borran los datos
        $("#txtNombre").val("");
        $("#txtPrimerApellido").val("");
        $("#txtSegundoApellido").val("");
        $("#txtDireccion").val("");
        $("#txtTelefono").val("");
    }
    else {
        $("#txtNombre").val(empleado.Nombre);
        $("#txtPrimerApellido").val(empleado.PrimerApellido);
        $("#txtSegundoApellido").val(empleado.SegundoApellido);
        $("#txtDireccion").val(empleado.Direccion);
        $("#txtTelefono").val(empleado.Telefono);
    }
}
class Empleado {
    constructor(Documento, Nombre, PrimerApellido, SegundoApellido, Direccion, Telefono) {
        this.Documento = Documento;
        this.Nombre = Nombre;
        this.PrimerApellido = PrimerApellido;
        this.SegundoApellido = SegundoApellido;
        this.Direccion = Direccion;
        this.Telefono = Telefono;
    }
}