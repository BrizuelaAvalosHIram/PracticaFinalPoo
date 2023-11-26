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
  tiendas: any = [];
  id_tienda_actual: string = "";
  clientes: any[] = [];
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
  MenuPrincipal  = false;
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

  username: string = "";
  correo: string = "";
  password: string="";
  rememberMe: boolean=false;
  name: string="";
  storeName: string = "";
  id_tienda: string = "";
  imageUrl: string="";
  notiendas=0;

  cliente_nombre = ""
  cliente_domicilio = ""
  cliente_telefono = ""
  cliente_fotografia = ""
  cliente_correo = ""
  cliente_cuando_cobrar = ""
  cliente_dia = ""
  cliente_hora = ""
  selected_cliente = false

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
    this.llenarProductos();
    //this.llenarCatalogoTiendas();
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
        console.log(this.productos)
      })
  }


  llenarUsuarios(id_local: string) {
    console.log(id_local)
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/clientes/listar.php?id_local=${id_local}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((cliente: any) => {
          cliente.selected = false;
        });
        this.clientes = data;
        console.log(this.clientes);
      })
  }

  llenarCatalogoTiendas() {
    const selectTienda = document.getElementById('selectTienda');
    fetch("https://apiesteban.000webhostapp.com/ucol_api/locales/listar.php")
      .then(response => response.json())
      .then(data => {
        this.tiendas = data;
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

    fetch(`https://apiesteban.000webhostapp.com/ucol_api/clientes/crear.php?id_local=${this.id_tienda_actual}&nombre=${this.cliente_nombre}&domicilio=${this.cliente_domicilio}&correo=${this.cliente_correo}&telefono=${this.cliente_telefono}&fotografia=${this.cliente_fotografia}&cuando_cobrar=${this.cliente_cuando_cobrar}&dia=${this.cliente_dia}&hora=${this.cliente_hora}`)
      .then(response => response.json())
      .then(data => {
        this.cliente_nombre = ""
        this.cliente_domicilio = ""
        this.cliente_telefono = ""
        this.cliente_fotografia = ""
        this.cliente_correo = ""
        this.cliente_cuando_cobrar = ""
        this.cliente_dia = ""
        this.cliente_hora = ""
        this.selected_cliente = false
        this.agregarClientesModal = false;
        this.llenarUsuarios(this.id_tienda_actual);
      })
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

  login() {
    const url = `https://apiesteban.000webhostapp.com/ucol_api/login.php?credencial=${this.usuario}&pass=${this.contrasena}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length>0) {
          console.log(data)
          this.id_tienda_actual = data[0].id_local;
          this.llenarUsuarios(this.id_tienda_actual);
          this.setOpen(true);
        } else {
          alert("No se encontró el usuario");
        }
      });

  }
  register(){}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  guardarusuario() {
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/register.php?nombre=${this.name}&apellido=${this.username}&correo=${this.correo}&no_cuenta=0&facultad=poo&telefono=0&tipo=poo&pass=${this.password}&url_imagen=${this.imageUrl}&id_local=${this.id_tienda}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
    this.username = "";
    this.name="";
    this.password="";
    this.storeName="";
    this.imageUrl = "";
    this.id_tienda = "";
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
