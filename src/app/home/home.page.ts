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

  producto_nombre = ""
  producto_descripcion = ""
  producto_precio = ""
  producto_disponibles = ""
  producto_url = ""

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
  eregistro = {
    Nombre: "",
    Domicilio: "",
    Correo: "",
    Telefono: "",
    id: 0,
    Cuando_cobrar: "",
    Dia: "",
    Hora: "",
    Fotografia: ""
  }
  eproducto = {
    Nombre: "",
    Descripcion: "",
    Dispomibles: "",
    Precio: "",
    Url_imagen: "",
    id: 0
  }

  constructor() {
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

  llenarProductos(id_local: any) {
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/productos/listar_id.php?id_local=${id_local}`)
      .then(response => response.json())
      .then(data => {
        data.forEach((producto: any) => {
          producto.selected = false;
        });
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
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/clientes/eliminar.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        this.llenarUsuarios(this.id_tienda_actual);
        this.editarClientesModal=false;
      })
  }
  eliminarProducto(id:number){
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/productos/eliminar.php?id=${id}`)
      .then(response => response.json())
      .then(data => {
        this.llenarProductos(this.id_tienda_actual);
        this.editarProductosModal=false;
      })
  }
  actualizarCliente(eregistro: any){
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/clientes/editar.php?id_local=${this.id_tienda_actual}&nombre=${this.cliente_nombre}&domicilio=${this.cliente_domicilio}&correo=${this.cliente_correo}&telefono=${this.cliente_telefono}&fotografia=${this.cliente_fotografia}&cuando_cobrar=${this.cliente_cuando_cobrar}&dia=${this.cliente_dia}&hora=${this.cliente_hora}&id=${eregistro.id}`)
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
        this.editarClientesModal=false;
        this.llenarUsuarios(this.id_tienda_actual);
      })
  }
  actualizarProducto(eproducto:any){
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/productos/editar.php?nombre=${this.producto_nombre}&descripcion=${this.producto_descripcion}&disponibles=${this.producto_disponibles}&precio=${this.producto_precio}&fotografia=${this.producto_url}&id=${eproducto.id}`)
      .then(response => response.json())
      .then(data => {
        this.producto_nombre = ""
        this.producto_descripcion = ""
        this.producto_precio = ""
        this.producto_disponibles = ""
        this.producto_url = ""
        this.llenarProductos(this.id_tienda_actual)
        this.editarProductosModal=false;
      })
  }

  editarCliente(cliente:any){
    this.eregistro = cliente;
    this.cliente_nombre = cliente.Nombre
        this.cliente_domicilio = cliente.Domicilio
        this.cliente_telefono = cliente.Telefono
        this.cliente_fotografia = cliente.Fotografia
        this.cliente_correo = cliente.Correo
        this.cliente_cuando_cobrar = cliente.Cuando_cobrar
        this.cliente_dia = cliente.Dia
        this.cliente_hora = cliente.Hora
        this.editarClientesModal=true;
  }
  editarProducto(producto: any) {
    this.eproducto = producto;
    this.producto_nombre = producto.Nombre
    this.producto_descripcion = producto.Descripcion
    this.producto_precio = producto.Precio
    this.producto_disponibles = producto.Disponibles
    this.producto_url = producto.Url_imagen
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
          this.llenarProductos(this.id_tienda_actual);
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
    fetch(`https://apiesteban.000webhostapp.com/ucol_api/productos/crear.php?nombre=${this.producto_nombre}&descripcion=${this.producto_descripcion}&disponibles=${this.producto_disponibles}&precio=${this.producto_precio}&url_imagen=${this.producto_url}&id_local=${this.id_tienda_actual}`)
      .then(response => response.json())
      .then(data => {
        this.llenarProductos(this.id_tienda_actual);
        this.agregarProductosModal = false;
      });
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    /*
    if (ev.detail.role === 'guardarusuario') {


    }
    */
  }

}
