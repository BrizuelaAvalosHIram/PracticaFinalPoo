import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)
  modal!: IonModal;
  usuarios:any=[];
  clientes: any[] = [];
  productos: any[] = [];
  filteredCliente: any[] = [];
  filteredProducto:any[] = [];

  elemento:{usuario:string,
    nombre:string,
    contrasena:string,
    tienda:string,
    fotografia:string,
    id:number}={
      usuario: '',
      nombre: '',
      contrasena: '',
      tienda: '',
      fotografia: '',
      id:0
    };
  usuario=""
  contrasena=""
  MenuPrincipal  = true;
  ClientesModal = false;
  ProductosModal = false;
  agregarClientesModal = false;
  agregarProductosModal=false;
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
  producto = {
    nombre: "",
    fotografia: "",
    cantidad: "",
    precio: "",
    id: 0
  }
  eregistro=this.registro;

  constructor() {
    this.usuarios.push({
      usuario:"uno",
      nombre:"uno perez",
      contrasena:"uno",
      tienda:"Mi tiendita",
      fotografia:"https://www.ceupe.com/images/easyblog_articles/3625/b2ap3_large_que-es-un-tienda-online.png",
      id:1
    });
  }

  setOpen(isOpen: boolean) {
    this.MenuPrincipal = isOpen;
  }
  cerrarClientes()
  {
    this.ClientesModal=false;
  }
  cerrarProductos()
  {
    this.ProductosModal=false;
  }
  clientesModal()
  {
    this.ClientesModal=true;
  }
  productosModal()
  {
    this.ProductosModal=true;
  }
  AgregarClientesModal()
  {
    this.agregarClientesModal=true;
  }
  AgregarProductosModal()
  {
    this.agregarProductosModal=true;
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
  editarProducto(producto: any) {
    alert(producto);
  }
  CancelarAgregarClientesModal(){
    this.agregarClientesModal=false;
  }
  CancelarAgregarProductosModal(){
    this.agregarProductosModal=false;
  }

  CancelarActualizarClientesModal(){
    this.editarClientesModal=false;
  }


  login(){
    const indice = this.usuarios.findIndex((usuario: { usuario: any; contrasena: any; }) => {
      return usuario.usuario === this.usuario && usuario.contrasena === this.contrasena;
    });

    if (indice !== -1) {
       this.elemento = this.usuarios[indice];
      console.log(this.elemento);
      this.setOpen(true);
    } else {
      alert("No se encontró el usuario");
    }

  }
  register(){}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  guardarusuario() {
    let id=0;
    if (this.usuarios.length>0)
    id=this.usuarios[this.usuarios.length-1].id++;
    else
    id=1;

    this.usuarios.push({
      usuario:this.username,
      nombre:this.username,
      contrasena:this.password,
      tienda:this.storeName,
      fotografia:this.imageUrl,
      id:id
    });
    this.username = "";
    this.username="";
    this.password="";
    this.storeName="";
    this.imageUrl="";
    this.modal.dismiss(null, 'guardarusuario');
  }

  guardarProducto() {
    let id=0;
    if (this.productos.length>0)
    id=this.productos[this.productos.length-1].id++;
    else
    id=1;

    this.productos.push({
      nombre:this.producto.nombre,
      fotografia:this.producto.fotografia,
      cantidad:this.producto.cantidad,
      precio:this.producto.precio,
      id:id
    });
    this.producto = {
    nombre: "",
    fotografia: "",
    cantidad: "",
    precio: "",
    id: 0
  }
    this.agregarProductosModal = false;
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    /*
    if (ev.detail.role === 'guardarusuario') {


    }
    */
  }

}
