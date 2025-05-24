async function Ingresar(){
    //var: Variable global para la página
    //let: Variable local para la página
    //const: Constante local para la página
    //Se define la ruta donde está el servicio para ejecutar
    let BaseURL = "http://appwebmie1820.runasp.net/";
    let URL = BaseURL + "api/Login/Ingresar";
    //Para crear una instancia del objeto en js, se crea con const NombreObjeto = new NombreClase(Datos del constructor)
    const login = new Login($("#txtUsuario").val(), $("#txtClave").val(), "");
    //Se invoca el servicio, y se espera la respuesta
    const Respuesta = await EjecutarComandoServicioRpta("POST", URL, login);
    //Se evalua la respuesta
    if (Respuesta === undefined) {
        document.cookie = "token=0;path=/";
        //Hubo un error al procesar el comando
        $("#dvMensaje").removeClass("alert alert-success");
        $("#dvMensaje").addClass("alert alert-danger");
        $("#dvMensaje").html("No se obtuvo respuesta por parte del servicio");
    }
    else {
        if (Respuesta[0].Autenticado == false) {
            document.cookie = "token=0;path=/";
            //Hubo un error al procesar el comando
            $("#dvMensaje").removeClass("alert alert-success");
            $("#dvMensaje").addClass("alert alert-danger");
            $("#dvMensaje").html(Respuesta[0].Mensaje);
        }
        else {
            const extdays = 0.2;
            const d = new Date();
            d.setTime(d.getTime() + (extdays * 24 * 60 * 60 * 1000));
            let expires = ";expires=" + d.toUTCString();
            document.cookie = "token=" + Respuesta[0].Token + expires + ";path=/";
            $("#dvMensaje").removeClass("alert alert-danger");
            $("#dvMensaje").addClass("alert alert-success");
            $("#dvMensaje").html(Respuesta[0].Mensaje);
            document.cookie = "Perfil=" + Respuesta[0].Perfil;
            document.cookie = "Usuario=" + Respuesta[0].Usuario;
            window.location.href = Respuesta[0].PaginaInicio;
        }
    }
}
class Login {
    constructor(Usuario, Clave, PaginaSolicitud) {
        this.Usuario = Usuario;
        this.Clave = Clave;
        this.PaginaSolicitud = PaginaSolicitud;
    }
}