﻿var BaseURL = "http://appwebmie1820.runasp.net/";//"http://localhost:44323/";
var TotalFactura;
var BaseURL;
jQuery(function () {
    TotalFactura = 0;
    //Select2
    $('#cboTipoProducto').select2();
    $('#cboProducto').select2();
    $("#txtTotalCompra").val(TotalFactura);
    $("#txtNumeroFactura").val(0);
    $("#txtFechaCompra").val(FechaHoy());
    ConsultarDatosUsuario();
    ListarTipoProductos();
});
async function GrabarProducto() {
    const detalles = new DetalleFactura(0, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val());
    //const DetalleFactura = [0, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val()];
    const factura = new Factura($("#txtNumeroFactura").val(), $("#txtDocumento").val(), $("#txtFechaCompra").val(), $("#txtidEmpleado").val(), detalles);
    const facturaDetalle = new FacturaDetalle(factura, detalles);
    let URL = BaseURL + "api/Facturas/GrabarFactura";
    let NumeroFactura = await EjecutarComandoServicioRptaAuth("POST", URL, facturaDetalle);
    $("#txtNumeroFactura").val(NumeroFactura);
    LlenarDetalleFactura(NumeroFactura);
    //Habilita el botón de terminar factura
    $("#btnGrabarFactura").prop("disabled", false);
    CalcularTotal($("#txtCantidad").val(), $("#txtValorUnitario").val(), "Suma");
}
function CalcularTotal(Cantidad, ValorUnitario, Operacion) {
    /*
    if (Operacion == "Suma") {
        Total += (Cantidad * ValorUnitario);
    }
    else {
        Total -= (Cantidad * ValorUnitario);
    }*/
    TotalFactura = Operacion == "Suma" ? TotalFactura + (Cantidad * ValorUnitario) : TotalFactura - (Cantidad * ValorUnitario);
    $("#txtTotalCompra").val(FormatoMiles(TotalFactura));
}
async function Eliminar(idDetalle, Cantidad, ValorUnitario) {
    //const DetalleFactura = [0, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val()];
    const factura = new Factura($("#txtNumeroFactura").val(), $("#txtDocumento").val(), $("#txtFechaCompra").val(), $("#txtidEmpleado").val(), [0, $("#txtNumeroFactura").val(), $("#txtCodigoProducto").val(), $("#txtCantidad").val(), $("#txtValorUnitario").val()]);
    let URL = BaseURL + "api/Facturas/Eliminar?NumeroDetalle=" + idDetalle;
    await EjecutarComandoServicioRptaAuth("DELETE", URL, factura);
    LlenarDetalleFactura($("#txtNumeroFactura").val());
    CalcularTotal(Cantidad, ValorUnitario, "Resta");
}
function GrabarFactura() {
    //Limpia los datos
    TotalFactura = 0;
    $("#txtTotalCompra").val(TotalFactura);
    $("#txtNumeroFactura").val(0);
    $("#txtFechaCompra").val(FechaHoy());
    $("#txtDocumento").val("");
    $("#txtNombreCliente").val("");
    var tabla = new DataTable('#tblFactura');
    tabla.clear().draw();
}
async function LlenarDetalleFactura(NumeroFactura) {
    let URL = BaseURL + "api/Facturas/ListarProductos?NumeroFactura=" + NumeroFactura;
    LlenarTablaXServiciosAuth(URL, "#tblFactura");
}
class Factura {
    constructor(Numero, Documento, Fecha, CodigoEmpleado, DEtalleFActuras) {
        this.Numero = Numero;
        this.Documento = Documento;
        this.Fecha = Fecha;
        this.CodigoEmpleado = CodigoEmpleado;
        this.DEtalleFActuras = DEtalleFActuras;
    }
}
class DetalleFactura {
    constructor(Codigo, Numero, CodigoProducto, Cantidad, ValorUnitario) {
        this.Codigo = Codigo;
        this.Numero = Numero;
        this.CodigoProducto = CodigoProducto;
        this.Cantidad = Cantidad;
        this.ValorUnitario = ValorUnitario;
    }
}
class FacturaDetalle {
    constructor(Factura, Detalle) {
        this.factura = Factura;
        this.detalle = Detalle;
    }
}
async function ListarTipoProductos() {
    let URL = BaseURL + "api/TipoProductos/LlenarCombo";
    await LlenarComboXServiciosAuth(URL, "#cboTipoProducto");
    ListarProductos($("#cboTipoProducto").val())
}
async function ListarProductos(TipoProducto) {
    let idTipoProducto = TipoProducto == 0 ? $("#cboTipoProducto").val() : TipoProducto;
    let URL = BaseURL + "api/Productos/ListarProductosXTipo?TipoProducto=" + idTipoProducto;
    await LlenarComboXServiciosAuth(URL, "#cboProducto");
    CalcularSubtotal();
}
function CalcularSubtotal() {
    let DatosCombo = $("#cboProducto").val();
    $("#txtCodigoProducto").val(DatosCombo.split('|')[0]);
    let ValorUnitario = DatosCombo.split('|')[1];
    $("#txtValorUnitario").val(ValorUnitario);
    $("#txtValorUnitarioTexto").val(FormatoMiles(ValorUnitario));
    let Cantidad = $("#txtCantidad").val();
    if (Cantidad <= 0) {
        $("#txtCantidad").val(1);
        Cantidad = 1;
    }
    $("#txtSubtotal").val(FormatoMiles(Cantidad * ValorUnitario));
}
async function ConsultarDatosUsuario() {
    let Usuario = getCookie("Usuario");
    let URL = BaseURL + "api/Empleados/ConsultarXUsuario?Usuario=" + Usuario;
    const DatosEmpleado = await ConsultarServicioAuth(URL);
    $("#txtidEmpleado").val(DatosEmpleado[0].idEmpleado);
    //alert(DatosEmpleado[0].idEmpleado);
    $("#idTitulo").html("FACTURA DE COMPRA - EMPLEADO: " + DatosEmpleado[0].Empleado + " - CARGO: " + DatosEmpleado[0].Cargo + " - USUARIO: " + Usuario);
}
async function Consultar() {
    let Documento = $("#txtDocumento").val();
    let URL = BaseURL + "api/Clientes/ConsultarXDocumento?Documento=" + Documento;
    const Cliente = await ConsultarServicioAuth(URL);
    $("#txtNombreCliente").val(Cliente.Nombre + " " + Cliente.PrimerApellido + " " + Cliente.SegundoApellido);
}