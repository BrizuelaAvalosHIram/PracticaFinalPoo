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
  usuarios: any = [];
  clientes: any[] = [{
      nombre:"Esteban",
      domicilio:"Plutarco Elias Calles",
      correo:"ecortina@ucol.mx",
      telefono:"3121032760",
      fotografia:"url",
      periodocobrar:"mensual",
      diacobrar:"10",
      horacobrar:"5",
      idtienda:"1",
      id: 1,
      selected: false,
    }];
  productos: any[] = [
    {
    nombre: "Manzana",
    fotografia: "url",
    cantidad: "10",
    precio: "2",
    id: 1,
    selected: false,
    pedido: 0
    },
    {
    nombre: "Platano",
    fotografia: "url",
    cantidad: "15",
    precio: "5",
    id: 2,
    selected: false,
    pedido: 0
  }
  ];
  carrito: any[] = [];
  carritoClientes: any[] = [];
  ventas: any[] = [];
  id_venta = 0;
  filteredCliente: any[] = [];
  filteredProducto:any[] = [];
  total = 0;

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
  SeleccionarProductosModal = false;
  SeleccionarClientesModal = false;
  ProductosModal = false;
  VenderModal = false;
  VentasModal = false;
  ReportesModal = false;
  agregarClientesModal = false;
  agregarProductosModal = false;
  agregarVentaModal=false;
  editarClientesModal = false;
  editarProductosModal=false;

  username: string="";
  password: string="";
  rememberMe: boolean=false;
  name: string="";
  storeName: string="";
  imageUrl: string="";
  notiendas=0;

  venta = {
    id: 0,
    cliente: "",
    productos: "",
    total: 0
  }

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
    id: 0,
    selected: false
  }
  producto = {
    nombre: "",
    fotografia: "",
    cantidad: "",
    precio: "",
    id: 0,
    selected: false,
    pedido: 0
  }
  eregistro = this.registro;
  eproducto = this.producto;

  constructor() {
    this.llenarUsuarios();
    this.llenarProductos();
    /*
    this.usuarios.push({
      usuario:"uno",
      nombre:"uno perez",
      contrasena:"uno",
      tienda:"Mi tiendita",
      fotografia:"https://www.ceupe.com/images/easyblog_articles/3625/b2ap3_large_que-es-un-tienda-online.png",
      id:1
    });
    */
  }

  llenarProductos() {
    fetch("https://apiesteban.000webhostapp.com/api/productos/listar.php")
      .then(response => response.json())
      .then(data => {
        this.productos = data;
        console.log(data)
        console.log(this.productos)
      })
  }


  llenarUsuarios() {
    fetch("https://apiesteban.000webhostapp.com/ucol_api/usuarios/listar.php")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.usuarios = data;
        this.clientes = data;
      })
}
  toggleSelection(item: any) {
    item.selected = !item.selected;
  }


  setOpen(isOpen: boolean) {
    this.MenuPrincipal = isOpen;
  }
  cerrarClientes()
  {
    this.ClientesModal=false;
  }
  cerrarSeleccionarClientes()
  {
    this.SeleccionarClientesModal=false;
  }
  cerrarProductos()
  {
    this.ProductosModal=false;
  }
  cerrarVender() {
    this.SeleccionarClientesModal = false;
  }
  clientesModal()
  {
    this.ClientesModal=true;
  }
  productosModal()
  {
    this.ProductosModal=true;
  }
  venderModal() {
    this.SeleccionarClientesModal = true;
  }
  ventasModal() {
    this.ReportesModal = true;
  }
  reportesModal() {
    this.ReportesModal = true;
  }
  AgregarClientesModal()
  {
    this.agregarClientesModal=true;
  }
  AgregarProductosModal()
  {
    this.agregarProductosModal=true;
  }
  SeleccionarProductos() {
    this.carrito = [];
    this.total = 0;
    for(let i=0;i<this.productos.length;i++){
      if(this.productos[i].selected===true){
        this.total += parseInt(this.productos[i].pedido)
        this.carrito.push(this.productos[i])
      }
    }

    this.venta = { id: this.id_venta, cliente: JSON.stringify(this.carritoClientes), productos: JSON.stringify(this.carrito), total: this.total }
    this.SeleccionarProductosModal = false;
    this.SeleccionarClientesModal = false;
    this.ventas.push(this.venta);
    localStorage.setItem("ventasLocal", JSON.stringify(this.ventas))
  }

  SeleccionarCliente() {
    this.carritoClientes = [];
    for(let i=0;i<this.clientes.length;i++){
      if(this.clientes[i].selected===true){
        this.carritoClientes.push(this.clientes[i])
        this.id_venta += 1;
        this.SeleccionarProductosModal = true;
      }
    }
  }

  HacerVenta() {

  }

  guardarClientes()
  {
    let id=1;
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
      id: id,
      selected: false,
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
      id: 0,
      selected: false
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
  eliminarProducto(id:number){
    const index = this.productos.findIndex(item => item.id === id);
    this.productos.splice(index, 1);
    this.editarProductosModal=false;
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
  actualizarProducto(ecliente:any){
    for(let i=0;i<this.productos.length;i++){
      if(this.productos[i].id==ecliente.id)
      {
        this.productos[i]=ecliente;
        break;
      }
    }
    this.editarProductosModal=false;
  }

  editarCliente(cliente:any){
    this.eregistro=cliente;
    this.editarClientesModal=true;
  }
  editarProducto(producto: any) {
    this.eproducto=producto;
    this.editarProductosModal=true;
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
  CancelarActualizarProductosModal(){
    this.editarProductosModal=false;
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
    id: 0,
    selected: false,
    pedido: 0
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
