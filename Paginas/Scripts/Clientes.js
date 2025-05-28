var BaseURL = "http://appwebmie1820.runasp.net/";
jQuery(function () {
    let URL = BaseURL + "api/TipoTelefonos/LlenarCombo";
    LlenarTablaClientes();
    LlenarComboXServiciosAuth(URL, "#cboTipoTelefono");
});
function LlenarTablaTelefonos() {
    let Documento = $("#txtDocumento").val();
    let URL = BaseURL + "api/Telefonos/ListadoTelefonosXCliente?Documento=" + Documento;
    $("#modTelefonosLabel").html("GESTIÓN DE TELÉFONOS - CLIENTE: " + $("#txtNombre").val() + " " + $("#txtPrimerApellido").val() + " " + $("#txtSegundoApellido").val());
    LlenarTablaXServiciosAuth(URL, "#tblTelefonos");
}
function LlenarTablaClientes() {
    let URL = BaseURL + "api/Clientes/ClientesConTelefonos";
    LlenarTablaXServiciosAuth(URL, "#tblClientes");
}
async function EjecutarComando(Metodo, Funcion) {
    event.preventDefault();
    let URL = BaseURL + "api/Telefonos/" + Funcion;
    const telefono = new Telefono($("#txtCodigo").val(), $("#txtNumero").val(), $("#txtDocumento").val(), $("#cboTipoTelefono").val());
    await EjecutarComandoServicioAuth(Metodo, URL, telefono);
    LlenarTablaTelefonos();
}
function Editar(Documento, Nombre, PrimerApellido, SegundoApellido, Direccion, Email, FechaNacimiento) {
    $("#txtDocumento").val(Documento);
    $("#txtNombre").val(Nombre);
    $("#txtPrimerApellido").val(PrimerApellido);
    $("#txtSegundoApellido").val(SegundoApellido);
    $("#txtDireccion").val(Direccion);
    $("#txtEmail").val(Email);
    $("#txtFechaNacimiento").val(FechaNacimiento);
}
function EditarTelefono(Codigo, idTipoTelefono, NumeroTelefono) {
    $("#txtCodigo").val(Codigo);
    $("#cboTipoTelefono").val(idTipoTelefono);
    $("#txtNumero").val(NumeroTelefono);
}
class Telefono {
    constructor(Codigo, Numero, Documento, CodigoTipoTelefono) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.Documento = Documento;
        this.CodigoTipoTelefono = CodigoTipoTelefono;
    }
}