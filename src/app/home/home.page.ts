import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)
  modal!: IonModal;

  usuarios:any=[];
  clientes:any[] = [];
  productoEditado:any={};
  productos:any[] = [];
  producto:any={
    nombre:"",
    descripcion:"",
    cantidad:"",
    precioVenta:"",
    precioCosto:"",
    fotografia:"",
  };
  eproducto = this.producto;
  nombre="";
  logo="";
  correo = "";
  nombre_tienda = "";
  
  ProductosModal=false;
  agregarProductosModal=false;
  editarProductosModal=false;
  VentasModal=false;
  agregarVentasModal=false;


  filteredCliente:any[] = [];
  

  elemento:{usuario:string,
    nombre:string,
    pass:string,
    tienda:string,
    fotografia:string,
    id:number}={
      usuario: '',
      nombre: '',
      pass: '',
      tienda: '',
      fotografia: '',
      id:0
    };
  usuario=""
  pass=""

  

  MenuPrincipal  = false;
  ClientesModal=false;
  agregarClientesModal=false;
  editarClientesModal=false;


  username: string="";
  password: string="";
  rememberMe: boolean=false;
  name: string="";
  storeName: string="";
  imageUrl: string="";
  notiendas=0;
 
  registro={
    nombre:"",
    domicilio:"",
    correo:"",
    telefono:"",
    fotografia:"",
    periodocobrar:"",
    diacobrar:"",
    horacobrar:"",
    idtienda:this.elemento.id,
    id:0
  }
  eregistro=this.registro;
  

  constructor(private http:HttpClient) {
    this.usuarios.push({
      usuario:"uno",
      nombre:"uno perez",
      contrasena:"uno",
      tienda:"Mi tiendita",
      fotografia:"https://www.ceupe.com/images/easyblog_articles/3625/b2ap3_large_que-es-un-tienda-online.png",
      id:1
    });
  }
  async login() {
    const apiUrl = 'https://apiesteban.000webhostapp.com/api/login.php?usuario=' + this.usuario + '&pass=' + this.pass;
    try {
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();

        console.log(data)
        // Comprobar si la autenticación fue exitosa
        if (data) {
          // Actualizar el objeto "elemento" con los datos del usuario autenticado
          this.elemento = {
            usuario: data[0].usuario,
            nombre: data[0].nombre,
            pass: data[0].pass,
            tienda: data[0].tienda,
            fotografia: data[0].fotografia,
            id: data[0].id,
          };

          console.log(this.elemento);
          this.setOpen(true);
        } else {
          alert("Credenciales incorrectas");
        }
      } else {
        alert(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.");
    }
  }
  setOpen(isOpen: boolean) {
    this.MenuPrincipal = isOpen;
  }
  
cerrarClientes()
{
  this.ClientesModal=false;
}
  clientesModal()
  {
    this.ClientesModal=true;
  }
  
  AgregarClientesModal()
  {
    this.agregarClientesModal=true;
  }


  guardarClientes()
  {
    let id=0;
    if(this.clientes.length > 0) {
      id=(this.clientes[this.clientes.length-1].id)+1;
    }
    else
    id=1;
   
    this.clientes.push({
      nombre:this.registro.nombre,
      domicilio:this.registro.domicilio,
      correo:this.registro.correo,
      telefono:this.registro.telefono,
      fotografia:this.registro.fotografia,
      periodocobrar:this.registro.periodocobrar,
      diacobrar:this.registro.diacobrar,
      horacobrar:this.registro.horacobrar,
      idtienda:this.elemento.id,
      id:id
    });
   
    this.filteredCliente = this.clientes.filter((cliente: { idtienda: number; }) => {
      return cliente.idtienda === this.elemento.id;
    });
    console.log(this.clientes);
    console.log("Clientes filtrado:");
    console.log(this.filteredCliente);

    this.registro={
      nombre:"",
      domicilio:"",
      correo:"",
      telefono:"",
      fotografia:"",
      periodocobrar:"",
      diacobrar:"",
      horacobrar:"",
      idtienda:this.elemento.id,
      id:0
    }
    this.agregarClientesModal=false;
  }

  eliminarCliente(id:number){
    const index = this.clientes.findIndex(item => item.id === id);
    this.clientes.splice(index, 1);
    this.filteredCliente = this.clientes.filter((cliente: { idtienda: number; }) => {
      return cliente.idtienda === this.elemento.id;
    });
    this.editarClientesModal=false;
  }
  actualizarCliente(ecliente:any){
    for(let i=0;i<this.clientes.length;i++){
      if(this.clientes[i].id==ecliente.id)
      {
        this.clientes[i]=ecliente;
        break;
      }
    }
    this.filteredCliente = this.clientes.filter((cliente: { idtienda: number; }) => {
      return cliente.idtienda === this.elemento.id;
    });
    this.editarClientesModal=false;
  }

  editarCliente(cliente:any){
    this.eregistro=cliente;
    this.editarClientesModal=true;
  }

  CancelarAgregarClientesModal(){
    this.agregarClientesModal=false;
  }

  CancelarActualizarClientesModal(){
    this.editarClientesModal=false;
  }


  
  register(){}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async guardarUsuario() {
    const apiUrl = 'https://apiesteban.000webhostapp.com/api/usuarios/crear.php?usuario=' + this.usuario + '&nombre=' + this.nombre + '&correo=' + this.correo + '&nombre_tienda=' + this.nombre_tienda + '&logo=' + this.logo + '&pass=' + this.pass;
    try {
      const response = await fetch(apiUrl);
      console.log("Registrando usuario")
      if (response.ok) {
        const responseData = await response.text(); // Obtener el texto de la respuesta
  
        try {
          const jsonData = JSON.parse(responseData);
          console.log(jsonData);
  
          // Actualizar el objeto "elemento" con los datos del usuario creado
          this.elemento = {
            usuario: jsonData.usuario,
            nombre: jsonData.nombre,
            pass: jsonData.pass,
            tienda: jsonData.nombre_tienda,
            fotografia: jsonData.logo,
            id: 1, // Puedes ajustar el valor del ID según tu lógica
          };
  
          // El usuario se creó con éxito, puedes realizar las acciones necesarias aquí
          console.log(this.elemento);
          this.setOpen(true);
        } catch (jsonError) {
          console.error("Error al analizar JSON:", jsonError);
          console.log("Respuesta del servidor:", responseData);
          alert("Error al crear el usuario. Por favor, inténtalo de nuevo más tarde.");
        }
      } else {
        alert(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert("Error al intentar agregar un nuevo usuario. Por favor, inténtalo de nuevo más tarde.");
      this.setOpen(true);
    }
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    /*
    if (ev.detail.role === 'guardarusuario') {
     
     
    }
    */
  }

  
  abrirProductosModal(){
    this.ProductosModal=true;
  }
  cerrarProductos(){
    this.ProductosModal=false;
  }
  abrirAgregarProductosModal(){
    this.agregarProductosModal=true;
  }

  

  guardarProductos(){
    //Generar nuevo id para el producto
    let id = this.productos.length+1;

    //Agregar el producto a la lista de productos

    this.productos.push({

      id:id,
      nombre:this.producto.nombre,
      descripcion:this.producto.descripcion,
      cantidad:this.producto.cantidad,
      precioVenta:this.producto.precioVenta,
      precioCosto:this.producto.precioCosto,
      fotografia:this.producto.fotografia,
    });

    //Limpiar los campos después de agregar producto

    this.producto={
      nombre:"",
      descripcion:"",
      cantidad:"",
      precioVenta:"",
      precioCosto:"",
      fotografia:"",
    };

    this.agregarProductosModal=false;
  }


  CancelarAgregarProductosModal(){
  this.agregarProductosModal=false;
  }

  //Función para abrir la ventana modal de edición
  editarProducto(producto:any){
    this.eproducto = {...producto};//copiar el producto a editar
    this.editarProductosModal=true;
  }

  abrirEditarProductosModal(producto: any){
    this.productoEditado = {...producto};
    this.editarProductosModal=true;
  }
  //Función para guardar los cambios del producto editado
  guardarEdicionProducto(productoEditado: any) {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].id === productoEditado.id) {
        this.productos[i] = { ...productoEditado };
        break;
      }
    }
  
    this.editarProductosModal = false; // Cierra la ventana modal de edición
    this.productoEditado = {}; // Limpia el producto editado
  }
  CancelarEditarProductosModal(){
    this.editarProductosModal=false;
  }
  CancelarActualizarProductosModal(){
    this.editarProductosModal=false;
  }
  eliminarProducto(id:number){
    const index = this.productos.findIndex(item => item.id === id);
    this.productos.splice(index, 1);
    this.editarProductosModal=false;
  }


  
  //Abrir modal de ventas
  abrirVentasModal(){
    this.VentasModal=true;
  }
  //Cerrar modal de ventas
  cerrarVentas(){
    this.VentasModal=false;
  }
  //Abrir modal de agregar ventas
  abrirAgregarVentasModal(){
    this.agregarVentasModal=true;
  }
  //abrirProductosModal(){
  //  this.ProductosModal=true;
  //}
  //cerrarProductos(){
   // this.ProductosModal=false;
  //}
  //abrirAgregarProductosModal(){
    //this.agregarProductosModal=true;
 // }
}