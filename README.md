[Control_de_Documentos_DBS_1.html](https://github.com/user-attachments/files/29352453/Control_de_Documentos_DBS_1.html)
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Control de Documentos DBS</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--azul:#003366;--azul-med:#005599;--azul-claro:#e8f0f8;--acento:#f0a500;
--bg:#f0f3f8;--blanco:#fff;--gris1:#dde3ed;--gris2:#8899aa;--texto:#1a2a3a;
--raya:#c8d4e4;--rojo:#cc2233;--verde:#1a7a44;}
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'Barlow',sans-serif;background:var(--bg);color:var(--texto);min-height:100vh;}
#login-screen{display:flex;align-items:center;justify-content:center;min-height:100vh;
background:linear-gradient(135deg,#001f44 0%,#003875 60%,#005599 100%);}
#login-screen.hidden{display:none;}
.login-card{background:#fff;border-radius:16px;padding:40px 44px;width:400px;max-width:95vw;box-shadow:0 12px 50px rgba(0,0,0,.4);}
.login-logo{display:flex;align-items:center;gap:14px;margin-bottom:28px;}
.login-logo .l-box{width:52px;height:52px;border-radius:10px;background:#003366;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:20px;color:#f0a500;}
.login-logo .l-txt h2{font-family:'Barlow Condensed',sans-serif;font-size:17px;font-weight:700;color:#003366;text-transform:uppercase;}
.login-logo .l-txt p{font-size:11px;color:#8899aa;margin-top:2px;}
.login-card h3{font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:700;color:#003366;margin-bottom:22px;text-transform:uppercase;border-bottom:2px solid #dde3ed;padding-bottom:12px;}
.lc{margin-bottom:16px;}
.lc label{display:block;font-size:11px;font-weight:600;color:#003366;text-transform:uppercase;letter-spacing:.4px;margin-bottom:5px;}
.lc select,.lc input{width:100%;font-family:'Barlow',sans-serif;font-size:14px;padding:10px 13px;border:1.5px solid #dde3ed;border-radius:8px;background:#f0f3f8;color:#1a2a3a;outline:none;}
.btn-login{width:100%;margin-top:8px;font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:12px;border:none;border-radius:8px;background:#003366;color:#fff;cursor:pointer;}
.btn-login:hover{background:#005599;}
.login-error{display:none;margin-top:12px;background:#fde8e8;border:1px solid #f0b0b0;border-radius:6px;padding:9px 13px;font-size:13px;color:#cc2233;text-align:center;}
#app{display:none;}
header{background:#003366;color:#fff;padding:13px 24px;display:flex;align-items:center;gap:14px;box-shadow:0 3px 12px rgba(0,0,0,.35);}
.h-logo{width:44px;height:44px;background:#f0a500;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:17px;color:#003366;flex-shrink:0;}
.h-title h1{font-family:'Barlow Condensed',sans-serif;font-size:19px;font-weight:700;text-transform:uppercase;}
.h-title p{font-size:11px;color:#aac4e0;font-weight:300;margin-top:1px;}
.user-pill{margin-left:auto;display:flex;align-items:center;gap:10px;}
.avatar{width:34px;height:34px;border-radius:50%;background:#f0a500;display:flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#003366;}
.uinfo{text-align:right;}.uinfo strong{display:block;font-size:13px;}.uinfo small{font-size:11px;color:#aac4e0;}
.btn-hdr{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:600;padding:6px 14px;border-radius:6px;cursor:pointer;}
.btn-usu{border:none;background:#f0a500;color:#003366;}.btn-usu:hover{background:#e09500;}
.btn-sal{border:1.5px solid rgba(255,255,255,.3);background:transparent;color:#fff;}.btn-sal:hover{background:rgba(255,255,255,.12);}
.tabs-bar{background:#fff;border-bottom:3px solid #dde3ed;padding:0 24px;display:flex;gap:2px;overflow-x:auto;}
.tab-btn{font-family:'Barlow Condensed',sans-serif;font-size:13px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;padding:11px 16px 9px;border:none;background:transparent;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-3px;display:flex;align-items:center;gap:7px;white-space:nowrap;color:#8899aa;}
.tab-btn:hover{color:#1a2a3a;}
.tab-btn.active{color:#fff!important;border-bottom-color:transparent;}
.tab-btn .ti{font-size:22px;line-height:1;transition:transform .2s,filter .2s;filter:grayscale(30%) opacity(70%);}
.tab-btn:hover .ti{filter:grayscale(0%) opacity(100%);transform:scale(1.15);}
.tab-btn.active .ti{filter:grayscale(0%) opacity(100%) drop-shadow(0 0 6px rgba(255,255,255,.8));transform:scale(1.2);}
.tab-btn .tl{font-size:13px;}
.tab-btn .tc{font-size:11px;font-weight:700;padding:2px 7px;border-radius:20px;background:rgba(0,0,0,.12);}
.tab-btn[data-t="Memorando"].active{background:#003366;}
.tab-btn[data-t="Oficio"].active{background:#1a6b3a;}
.tab-btn[data-t="Instruccion"].active{background:#7a3a00;}
.tab-btn[data-t="Dictamenes"].active{background:#5a0080;}
.tab-btn[data-t="Circulares"].active{background:#006680;}
.tab-btn[data-t="Cirugia"].active{background:#990022;}
.toolbar{background:#fff;border-bottom:2px solid #dde3ed;padding:10px 24px;display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;}
.tlabel{display:block;font-size:10px;font-weight:600;color:#8899aa;text-transform:uppercase;letter-spacing:.3px;margin-bottom:4px;}
.toolbar input,.toolbar select{font-family:'Barlow',sans-serif;font-size:13px;padding:7px 11px;border:1.5px solid #dde3ed;border-radius:6px;background:#f0f3f8;color:#1a2a3a;outline:none;}
.toolbar input[type="text"]{width:230px;}.toolbar select{width:165px;}
.btn{font-family:'Barlow Condensed',sans-serif;font-size:14px;font-weight:600;padding:7px 15px;border:none;border-radius:6px;cursor:pointer;letter-spacing:.4px;}
.btn-primary{background:#003366;color:#fff;}.btn-primary:hover{background:#005599;}
.btn-acento{background:#f0a500;color:#003366;}.btn-acento:hover{background:#e09500;}
.btn-danger{background:#cc2233;color:#fff;}.btn-danger:hover{background:#aa1122;}
.btn-verde{background:#1a7a44;color:#fff;}.btn-verde:hover{background:#145f34;}
.btn-morado{background:#e8e0f8;color:#5530a0;}
.btn-sm{padding:4px 10px;font-size:12px;}
.info-bar{padding:5px 24px;font-size:12px;color:#8899aa;display:flex;gap:16px;align-items:center;flex-wrap:wrap;}
.info-bar strong{color:#003366;}
.tipo-badge{font-family:'Barlow Condensed',sans-serif;font-size:12px;font-weight:700;padding:3px 10px;border-radius:20px;color:#fff;}
.sync-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px;}
.s-ok{background:#1a7a44;}.s-load{background:#f0a500;animation:pulse .8s infinite;}.s-err{background:#cc2233;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
.tabla-wrap{padding:14px 24px 40px;overflow-x:auto;}
table{width:100%;border-collapse:collapse;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 16px rgba(0,30,80,.08);font-size:13px;}
thead tr{background:#003366;color:#fff;}
thead th{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:13px;letter-spacing:.6px;text-transform:uppercase;padding:11px 13px;white-space:nowrap;cursor:pointer;border-right:1px solid rgba(255,255,255,.2);}
thead th:last-child{border-right:none;}
thead th:hover{background:#005599;}
tbody tr{border-bottom:1px solid #c8d4e4;}
tbody tr:nth-child(even){background:#e8f0f8;}
tbody tr:hover{background:#d0e4f7!important;}
tbody tr.nueva{background:#fff8e6!important;}
td{padding:8px 13px;vertical-align:middle;border-right:1px solid #c8d4e4;}
td:last-child{border-right:none;}
td.num{font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:15px;color:#003366;text-align:center;width:50px;}
td.fecha{white-space:nowrap;color:#8899aa;font-size:12px;width:90px;}
td.realizado{color:#8899aa;}
td.asunto{max-width:300px;}
.badge{display:inline-block;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;padding:2px 7px;border-radius:20px;background:#e8f0f8;color:#005599;margin-left:5px;}
.badge.c40{background:#dff0e8;color:#1a7a44}.badge.c57{background:#fde8d8;color:#c05000}
.badge.c55{background:#e8e0f8;color:#5530a0}.badge.c77{background:#fde0e0;color:#b02020}
.badge.c66{background:#e0f4fd;color:#0070a0}.badge.c75{background:#f4ffe0;color:#507000}
.empty-row td{text-align:center;padding:30px;color:#8899aa;font-style:italic;}
.loading-overlay{display:none;position:fixed;inset:0;background:rgba(0,20,50,.45);z-index:300;align-items:center;justify-content:center;}
.loading-overlay.show{display:flex;}
.loading-box{background:#fff;border-radius:12px;padding:28px 36px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.3);}
.spinner{width:40px;height:40px;border:4px solid #dde3ed;border-top-color:#003366;border-radius:50%;animation:spin .7s linear infinite;margin:0 auto 14px;}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-box p{font-family:'Barlow Condensed',sans-serif;font-size:16px;font-weight:600;color:#003366;text-transform:uppercase;}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,20,50,.55);z-index:200;align-items:center;justify-content:center;}
.modal-overlay.show{display:flex;}
.modal{background:#fff;border-radius:12px;padding:28px 32px;width:540px;max-width:95vw;box-shadow:0 8px 40px rgba(0,0,0,.3);}
.modal-hdr{display:flex;align-items:center;gap:12px;margin-bottom:20px;padding-bottom:14px;border-bottom:2px solid #dde3ed;}
.modal-hdr .mi{font-size:24px;}.modal-hdr h2{font-family:'Barlow Condensed',sans-serif;font-size:20px;font-weight:700;text-transform:uppercase;color:#003366;}
.campo{margin-bottom:14px;}
.campo label{display:block;font-size:11px;font-weight:600;color:#003366;margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;}
.campo input,.campo textarea,.campo select{width:100%;font-family:'Barlow',sans-serif;font-size:13px;padding:8px 12px;border:1.5px solid #dde3ed;border-radius:6px;background:#f0f3f8;color:#1a2a3a;outline:none;}
.campo textarea{resize:vertical;min-height:70px;}
.campo-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.modal-btns{display:flex;gap:10px;justify-content:flex-end;margin-top:20px;}
.no-field{background:#e8f0f8!important;color:#003366!important;font-weight:700!important;font-family:'Barlow Condensed',sans-serif!important;font-size:16px!important;}
.u-wrap{max-height:300px;overflow-y:auto;border:1px solid #dde3ed;border-radius:8px;margin-bottom:18px;}
.u-table{width:100%;border-collapse:collapse;font-size:13px;}
.u-table thead tr{background:#003366;color:#fff;position:sticky;top:0;}
.u-table thead th{font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:12px;letter-spacing:.5px;text-transform:uppercase;padding:9px 12px;white-space:nowrap;}
.u-table tbody tr{border-bottom:1px solid #c8d4e4;}
.u-table tbody tr:nth-child(even){background:#e8f0f8;}
.u-table tbody tr:hover{background:#d0e4f7;}
.u-table td{padding:8px 12px;vertical-align:middle;}
.u-av{width:28px;height:28px;border-radius:50%;background:#003366;display:inline-flex;align-items:center;justify-content:center;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:13px;color:#f0a500;}
.rol-admin{background:#fff0cc;color:#8a5800;display:inline-block;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;padding:2px 9px;border-radius:20px;}
.rol-usuario{background:#e8f0f8;color:#005599;display:inline-block;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;padding:2px 9px;border-radius:20px;}
.u-form{background:#e8f0f8;border-radius:10px;padding:16px 18px;border:1.5px solid #dde3ed;}
.u-form h4{font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:700;color:#003366;text-transform:uppercase;margin-bottom:14px;}
.u-grid{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:10px;align-items:end;}
.u-grid .campo{margin-bottom:0;}.u-grid .campo label{font-size:10px;}.u-grid .campo input,.u-grid .campo select{font-size:12px;padding:7px 10px;}
.toast{position:fixed;bottom:24px;right:24px;z-index:400;font-family:'Barlow Condensed',sans-serif;font-size:15px;font-weight:600;padding:12px 20px;border-radius:8px;color:#fff;box-shadow:0 4px 20px rgba(0,0,0,.25);transform:translateY(80px);opacity:0;transition:all .3s ease;pointer-events:none;}
.toast.show{transform:translateY(0);opacity:1;}
.toast.success{background:#1a7a44;}.toast.error{background:#cc2233;}.toast.warn{background:#c07000;}
</style>
</head>
<body>

<div id="login-screen">
  <div class="login-card">
    <div class="login-logo">
      <div class="l-box">ENEE</div>
      <div class="l-txt"><h2>Bienestar Social</h2><p>Direccion de Desarrollo Humano</p></div>
    </div>
    <h3>Iniciar Sesion</h3>
    <div class="lc"><label>Usuario</label>
      <select id="l-usuario">
        <option value="">Seleccione su nombre</option>
      </select>
    </div>
    <div class="lc"><label>Contrasena</label>
      <input type="password" id="l-pass" placeholder="Ingrese su contrasena">
    </div>
    <button class="btn-login" id="btn-ingresar">Ingresar</button>
    <div class="login-error" id="login-error"></div>
  </div>
</div>

<div id="app">
  <header>
    <div class="h-logo">ENEE</div>
    <div class="h-title">
      <h1>Control de Documentos DBS</h1>
      <p>Departamento de Bienestar Social | Direccion de Desarrollo Humano</p>
    </div>
    <div class="user-pill">
      <div class="uinfo"><strong id="hdr-nombre"></strong><small id="hdr-rol"></small></div>
      <div class="avatar" id="hdr-avatar">G</div>
      <button class="btn-hdr btn-usu" id="btn-usuarios" style="display:none" onclick="abrirUsuarios()">Usuarios</button>
      <button class="btn-hdr" id="btn-actividad" style="display:none;background:#1a7a44;color:#fff;border:none;" onclick="abrirActividad()">Actividad</button>
      <button class="btn-hdr btn-sal" onclick="doLogout()">Salir</button>
    </div>
  </header>

  <div class="tabs-bar" id="tabs-bar"></div>

  <div class="toolbar">
    <div><span class="tlabel">Buscar</span><input type="text" id="buscar" placeholder="N, destinatario, asunto..."></div>
    <div><span class="tlabel">Responsable</span><select id="filtro-resp"><option value="">Todos</option></select></div>
    <div><span class="tlabel">Clausula</span>
      <select id="filtro-clausula">
        <option value="">Todas</option>
        <option value="40">Clausula 40</option>
        <option value="55">Clausula 55</option>
        <option value="57">Clausula 57</option>
        <option value="66">Clausula 66</option>
        <option value="75">Clausula 75</option>
        <option value="77">Clausula 77</option>
      </select>
    </div>
    <div><span class="tlabel">Año</span>
      <select id="filtro-anio"><option value="">Todos</option></select>
    </div>
    <div style="margin-left:auto;display:flex;align-items:flex-end;gap:8px;">
      <button class="btn btn-acento" onclick="abrirModal()">+ Nuevo</button>
      <button class="btn btn-primary" onclick="recargar()">Actualizar</button>
      <button class="btn btn-primary" onclick="exportarCSV()">CSV</button>
    </div>
  </div>

  <div class="info-bar">
    <span>Mostrando: <strong id="vis-count">0</strong></span>
    <span>Total: <strong id="total-count">0</strong></span>
    <span id="tipo-label"></span>
    <span><span class="sync-dot s-load" id="sync-dot"></span><span id="sync-txt">Conectando...</span></span>
  </div>

  <div class="tabla-wrap">
    <table><thead id="t-head"></thead><tbody id="t-body"></tbody></table>
  </div>
</div>

<!-- MODAL DOCUMENTO -->
<div class="modal-overlay" id="modal-doc">
  <div class="modal">
    <div class="modal-hdr"><span class="mi" id="m-icon"></span><h2 id="m-titulo"></h2></div>
    <div class="campo-row">
      <div class="campo"><label>N (automatico)</label><input type="text" id="m-no" class="no-field" readonly></div>
      <div class="campo"><label>Fecha</label>
        <div style="position:relative;">
          <input type="text" id="m-fecha" placeholder="dd/mm/aa" maxlength="8" style="padding-right:38px;letter-spacing:1px;font-weight:600;width:100%;">
          <input type="date" id="m-fecha-picker" tabindex="-1" style="position:absolute;top:0;right:0;width:36px;height:100%;opacity:0;cursor:pointer;border:none;">
          <span onclick="document.getElementById('m-fecha-picker').showPicker()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:18px;cursor:pointer;">&#128197;</span>
        </div>
      </div>
    </div>

    <div id="campos-std">
      <div class="campo"><label>A quien se remite</label><input type="text" id="m-remite" placeholder="Destinatario"></div>
      <div class="campo"><label>Realizado por</label><input type="text" id="m-resp"></div>
      <div class="campo"><label>Asunto</label><textarea id="m-asunto" placeholder="Descripcion del asunto"></textarea></div>
      <div class="campo" id="campo-fact" style="display:none;">
        <label>Fecha de Actividad</label>
        <div style="position:relative;">
          <input type="text" id="m-fact" placeholder="dd/mm/aa" maxlength="8" style="padding-right:38px;letter-spacing:1px;font-weight:600;width:100%;">
          <input type="date" id="m-fact-picker" tabindex="-1" style="position:absolute;top:0;right:0;width:36px;height:100%;opacity:0;cursor:pointer;border:none;">
          <span onclick="document.getElementById('m-fact-picker').showPicker()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:18px;cursor:pointer;">&#128197;</span>
        </div>
      </div>
    </div>

    <div id="campos-cirug" style="display:none;">
      <div class="campo-row">
        <div class="campo"><label>A Quien</label><input type="text" id="m-cir-remite" placeholder="Nombre del paciente"></div>
        <div class="campo"><label>Clave</label><input type="text" id="m-cir-clave" placeholder="Clave"></div>
      </div>
      <div class="campo-row">
        <div class="campo"><label>Centro de Trabajo</label><input type="text" id="m-cir-centro" placeholder="Centro de trabajo"></div>
        <div class="campo"><label>Hospital</label><input type="text" id="m-cir-hospital" placeholder="Hospital"></div>
      </div>
      <div class="campo"><label>Monto Cotizacion</label>
        <div style="position:relative;">
          <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);font-weight:700;color:#003366;font-size:14px;">L.</span>
          <input type="text" id="m-cir-monto" placeholder="0.00" style="padding-left:30px;">
        </div>
      </div>
      <div class="campo"><label>Diagnostico</label><textarea id="m-cir-diag" placeholder="Descripcion del diagnostico"></textarea></div>
    </div>

    <div class="modal-btns">
      <button class="btn btn-danger" onclick="cerrarModal()">Cancelar</button>
      <button class="btn btn-primary" id="btn-guardar" onclick="guardar()">Guardar</button>
    </div>
  </div>
</div>

<!-- MODAL USUARIOS -->
<div class="modal-overlay" id="modal-usu">
  <div class="modal" style="width:720px;max-width:98vw;">
    <div class="modal-hdr"><span class="mi">&#128101;</span><h2>Gestion de Usuarios</h2></div>
    <div class="u-wrap">
      <table class="u-table">
        <thead><tr><th></th><th>Nombre</th><th>ID</th><th>Contrasena</th><th>Rol</th><th>Acciones</th></tr></thead>
        <tbody id="u-body"></tbody>
      </table>
    </div>
    <div class="u-form">
      <h4>Agregar usuario</h4>
      <div class="u-grid">
        <div class="campo"><label>Nombre</label><input type="text" id="u-nombre" placeholder="Maria Lopez"></div>
        <div class="campo"><label>ID</label><input type="text" id="u-id" placeholder="maria"></div>
        <div class="campo"><label>Contrasena</label><input type="text" id="u-pass" placeholder="maria2026"></div>
        <div class="campo"><label>Rol</label>
          <select id="u-rol"><option value="usuario">Usuario</option><option value="admin">Administrador</option></select>
        </div>
      </div>
      <div style="margin-top:12px;text-align:right;">
        <button class="btn btn-verde" onclick="agregarUsuario()">Agregar</button>
      </div>
    </div>
    <div class="modal-btns"><button class="btn btn-primary" onclick="cerrarUsuarios()">Cerrar</button></div>
  </div>
</div>

<!-- MODAL PERMISOS -->
<div class="modal-overlay" id="modal-permisos">
  <div class="modal" style="width:460px;">
    <div class="modal-hdr"><span class="mi">&#128274;</span><h2>Permisos de acceso</h2></div>
    <p style="font-size:13px;color:#8899aa;margin-bottom:16px;">Selecciona las pestanas que puede ver <strong id="perm-nombre"></strong>:</p>
    <div id="perm-checks" style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;"></div>
    <div class="modal-btns">
      <button class="btn btn-danger" onclick="cerrarPermisos()">Cancelar</button>
      <button class="btn btn-verde" onclick="guardarPermisos()">Guardar permisos</button>
    </div>
  </div>
</div>

<!-- MODAL ACTIVIDAD -->
<div class="modal-overlay" id="modal-actividad">
  <div class="modal" style="width:780px;max-width:98vw;">
    <div class="modal-hdr"><span class="mi">&#128202;</span><h2>Actividad por Usuario</h2></div>
    <div style="margin-bottom:14px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
      <div><span class="tlabel">Usuario</span>
        <select id="act-usuario" style="font-family:'Barlow',sans-serif;font-size:13px;padding:7px 11px;border:1.5px solid #dde3ed;border-radius:6px;background:#f0f3f8;outline:none;width:180px;"><option value="">Todos</option></select>
      </div>
      <div><span class="tlabel">Año</span>
        <select id="act-anio" style="font-family:'Barlow',sans-serif;font-size:13px;padding:7px 11px;border:1.5px solid #dde3ed;border-radius:6px;background:#f0f3f8;outline:none;width:120px;"><option value="">Todos</option></select>
      </div>
      <div><span class="tlabel">Seccion</span>
        <select id="act-tipo" style="font-family:'Barlow',sans-serif;font-size:13px;padding:7px 11px;border:1.5px solid #dde3ed;border-radius:6px;background:#f0f3f8;outline:none;width:180px;"><option value="">Todas</option></select>
      </div>
    </div>
    <div id="act-cards" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px;margin-bottom:12px;max-height:180px;overflow-y:auto;"></div>
    <div style="display:flex;gap:4px;margin-bottom:8px;">
      <button id="act-tab-resumen" onclick="actTab('resumen')" style="font-family:Barlow Condensed,sans-serif;font-size:13px;font-weight:700;padding:6px 16px;border:none;border-radius:6px;background:#003366;color:#fff;cursor:pointer;">Resumen</button>
      <button id="act-tab-bitacora" onclick="actTab('bitacora')" style="font-family:Barlow Condensed,sans-serif;font-size:13px;font-weight:700;padding:6px 16px;border:none;border-radius:6px;background:#dde3ed;color:#8899aa;cursor:pointer;">Ultimas Modificaciones</button>
    </div>
    <div id="act-resumen-tabla" style="max-height:300px;overflow-y:auto;border:1px solid #dde3ed;border-radius:8px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead><tr style="background:#003366;color:#fff;position:sticky;top:0;">
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Usuario</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Seccion</th>
          <th style="padding:9px 12px;text-align:center;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Total</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Ultimo registro</th>
        </tr></thead>
        <tbody id="act-tbody"></tbody>
      </table>
    </div>
    <div id="act-bitacora-tabla" style="display:none;max-height:300px;overflow-y:auto;border:1px solid #dde3ed;border-radius:8px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead><tr style="background:#003366;color:#fff;position:sticky;top:0;">
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Fecha</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Usuario</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Accion</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Seccion</th>
          <th style="padding:9px 12px;text-align:left;font-family:Barlow Condensed,sans-serif;font-size:12px;text-transform:uppercase;">Detalle</th>
        </tr></thead>
        <tbody id="bit-tbody"></tbody>
      </table>
    </div>
    <div class="modal-btns" style="margin-top:14px;">
      <button class="btn btn-primary" onclick="cerrarActividad()">Cerrar</button>
    </div>
  </div>
</div>

<div class="loading-overlay" id="loading">
  <div class="loading-box"><div class="spinner"></div><p id="load-txt">Procesando...</p></div>
</div>

<div class="toast" id="toast"></div>

<script>

var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyiDADKdDyWg9G9W6bKyWG4BDDtDOYs9G2kQOEZRxgUwfZ7QNkku0qWF7R7sxJiSdSy/exec';

var TIPOS = [
  {id:'Memorando', label:'Memorando', icon:'&#x1F4CB;', color:'#003366'},
  {id:'Oficio', label:'Oficio', icon:'&#x1F4C4;', color:'#1a6b3a'},
  {id:'Instruccion', label:'Hoja de Instruccion', icon:'&#x1F4DD;', color:'#7a3a00'},
  {id:'Dictamenes', label:'Dictamen', icon:'&#x2696;', color:'#5a0080'},
  {id:'Circulares', label:'Circular', icon:'&#x1F514;', color:'#006680'},
  {id:'Cirugia', label:'Autorizacion Cirugia', icon:'&#x1F3E5;', color:'#990022'}
];

var TODOS_TIPOS = ['Memorando','Oficio','Instruccion','Dictamenes','Circulares','Cirugia'];

var USUARIOS = [
  {id:'sara', nombre:'Sara', pass:'sara2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'gustavo', nombre:'Gustavo D.', pass:'gustavo2026', rol:'admin', tabs:TODOS_TIPOS.slice()},
  {id:'wendy', nombre:'Wendy', pass:'wendy2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'oponce', nombre:'O. Ponce', pass:'oponce2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'rosa', nombre:'Rosa', pass:'rosa2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'adriana', nombre:'Adriana', pass:'adriana2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'carmen', nombre:'Carmen Caceres', pass:'carmen2026', rol:'usuario', tabs:TODOS_TIPOS.slice()},
  {id:'admin', nombre:'Administrador', pass:'admin2026', rol:'admin', tabs:TODOS_TIPOS.slice(), protegido:true}
];

var DB = {};
for(var ti=0; ti<TIPOS.length; ti++){ DB[TIPOS[ti].id] = []; }

var BITACORA = [];
var usuarioActual = null;
var tipoActual = 'Memorando';
var editIdx = null;
var sortCol = null;
var sortAsc = true;
var reloadTimer = null;

function showLoad(txt){ document.getElementById('load-txt').textContent = txt||'Procesando...'; document.getElementById('loading').classList.add('show'); }
function hideLoad(){ document.getElementById('loading').classList.remove('show'); }
function toast(msg, tipo){ var t=document.getElementById('toast'); t.textContent=msg; t.className='toast '+(tipo||'success')+' show'; setTimeout(function(){ t.classList.remove('show'); },3000); }
function syncStatus(e,txt){ document.getElementById('sync-dot').className='sync-dot s-'+e; document.getElementById('sync-txt').textContent=txt; }
function getTipo(id){ for(var i=0;i<TIPOS.length;i++){if(TIPOS[i].id===id)return TIPOS[i];}return TIPOS[0]; }

function rebuildLoginSelect(){
  var sel = document.getElementById('l-usuario');
  var prev = sel.value;
  sel.innerHTML = '<option value="">Seleccione su nombre</option>';
  for(var i=0;i<USUARIOS.length;i++){
    var u=USUARIOS[i];
    var o=document.createElement('option');
    o.value=u.id; o.textContent=u.nombre+(u.rol==='admin'?' (Admin)':'');
    sel.appendChild(o);
  }
  if(prev) sel.value=prev;
}

function apiGet(tipo,cb){
  var url=SCRIPT_URL+'?accion=leer&tipo='+tipo+'&_='+Date.now();
  fetch(url,{redirect:'follow'})
    .then(function(r){return r.text();})
    .then(function(txt){try{cb(null,JSON.parse(txt));}catch(e){cb(e);}})
    .catch(function(e){cb(e);});
}

function apiPost(body,cb){
  // Usar POST con mode no-cors (evita bloqueo CORS en GitHub Pages)
  // Como no-cors no devuelve respuesta, simulamos ok:true y recargamos para confirmar
  fetch(SCRIPT_URL, {
    method:'POST',
    mode:'no-cors',
    redirect:'follow',
    headers:{'Content-Type':'text/plain'},
    body:JSON.stringify(body)
  })
  .then(function(){ cb(null,{ok:true}); })
  .catch(function(e){ cb(e); });
}

function cargarUsuarios(cb){
  apiGet('Usuarios', function(err, rows){
    if(err){ if(cb) cb(); return; }
    if(!Array.isArray(rows) || rows.length === 0){
      guardarUsuariosEnSheets();
      rebuildLoginSelect();
      if(cb) cb();
      return;
    }
    var lista = [];
    for(var i=0; i<rows.length; i++){
      var r=rows[i];
      if(!r[0]||String(r[0]).trim()==='') continue;
      if(String(r[0]).toLowerCase()==='id') continue;
      var tabsStr = String(r[5]||'');
      var tabsArr = tabsStr ? tabsStr.split('|') : TODOS_TIPOS.slice();
      if(!tabsArr || tabsArr.length===0 || (tabsArr.length===1 && tabsArr[0]==='')) {
        tabsArr = TODOS_TIPOS.slice();
      }
      lista.push({
        id: String(r[0]),
        nombre: String(r[1]||''),
        pass: String(r[2]||''),
        rol: String(r[3]||'usuario'),
        protegido: r[4]==='true'||r[4]===true,
        tabs: tabsArr
      });
    }
    USUARIOS = lista.length > 0 ? lista : USUARIOS;
    rebuildLoginSelect();
    if(cb) cb();
  });
}

function guardarUsuariosEnSheets(){
  var filas = [];
  for(var i=0; i<USUARIOS.length; i++){
    var u=USUARIOS[i];
    var tabsStr=(u.tabs||TODOS_TIPOS).join('|');
    filas.push([u.id, u.nombre, u.pass, u.rol, u.protegido?'true':'false', tabsStr]);
  }
  apiPost({accion:'reescribir', tipo:'Usuarios', filas:filas}, function(err,res){
    if(!err&&res&&res.ok) syncStatus('ok','Sincronizado');
    else syncStatus('err','Error guardando usuarios');
  });
}

document.getElementById('l-usuario').innerHTML = '<option value="">Cargando usuarios...</option>';
document.getElementById('btn-ingresar').disabled = true;
cargarUsuarios(function(){
  rebuildLoginSelect();
  document.getElementById('btn-ingresar').disabled = false;
});

document.getElementById('btn-ingresar').addEventListener('click', function(){ doLogin(); });
document.getElementById('l-pass').addEventListener('keydown', function(e){ if(e.key==='Enter') doLogin(); });

function doLogin(){
  var uid = document.getElementById('l-usuario').value;
  var pass = document.getElementById('l-pass').value;
  var err = document.getElementById('login-error');
  if(!uid){ err.textContent='Seleccione un usuario.'; err.style.display='block'; return; }
  if(!pass){ err.textContent='Ingrese su contrasena.'; err.style.display='block'; return; }
  document.getElementById('btn-ingresar').disabled=true;
  err.style.display='none';
  cargarUsuarios(function(){
    var u=null;
    for(var i=0;i<USUARIOS.length;i++){
      if(USUARIOS[i].id===uid && USUARIOS[i].pass===pass.trim()){ u=USUARIOS[i]; break; }
    }
    document.getElementById('btn-ingresar').disabled=false;
    if(!u){ err.textContent='Usuario o contrasena incorrectos.'; err.style.display='block'; return; }
    err.style.display='none';
    usuarioActual=u;
    document.getElementById('hdr-nombre').textContent=u.nombre;
    document.getElementById('hdr-rol').textContent=u.rol==='admin'?'Administrador':'Usuario';
    document.getElementById('hdr-avatar').textContent=u.nombre.charAt(0).toUpperCase();
    document.getElementById('btn-usuarios').style.display=u.rol==='admin'?'':'none';
    document.getElementById('btn-actividad').style.display=u.rol==='admin'?'':'none';
    document.getElementById('login-screen').style.display='none';
    document.getElementById('app').style.display='block';
    construirTabs();
    var permitidos2=tiposPermitidos();
    if(permitidos2.length>0) cambiarTab(permitidos2[0].id);
    reloadTimer=setInterval(function(){ try{cargarDatos(true);}catch(e){} },30000);
  });
}

function doLogout(){
  clearInterval(reloadTimer);
  usuarioActual=null;
  document.getElementById('app').style.display='none';
  document.getElementById('login-screen').style.display='flex';
  document.getElementById('l-pass').value='';
  document.getElementById('l-usuario').value='';
  document.getElementById('login-error').style.display='none';
}

function tiposPermitidos(){
  if(!usuarioActual) return TIPOS;
  if(usuarioActual.rol==='admin') return TIPOS;
  var tabs = usuarioActual.tabs;
  if(typeof tabs === 'string') tabs = tabs ? tabs.split('|') : TODOS_TIPOS.slice();
  if(!tabs || tabs.length===0) tabs = TODOS_TIPOS.slice();
  return TIPOS.filter(function(t){ return tabs.indexOf(t.id)!==-1; });
}

function construirTabs(){
  var bar=document.getElementById('tabs-bar');
  bar.innerHTML='';
  var permitidos=tiposPermitidos();
  for(var i=0;i<permitidos.length;i++){
    var t=permitidos[i];
    var btn=document.createElement('button');
    btn.className='tab-btn'; btn.setAttribute('data-t',t.id);
    btn.innerHTML='<span class="ti">'+t.icon+'</span><span class="tl">'+t.label+'</span><span class="tc">0</span>';
    (function(tid){ btn.onclick=function(){ cambiarTab(tid); }; })(t.id);
    bar.appendChild(btn);
  }
  actualizarTabs();
}

function actualizarTabs(){
  var bar=document.getElementById('tabs-bar');
  if(!bar) return;
  var btns=bar.getElementsByTagName('button');
  for(var i=0;i<btns.length;i++){
    var tid=btns[i].getAttribute('data-t');
    var t=getTipo(tid);
    btns[i].innerHTML='<span class="ti">'+t.icon+'</span><span class="tl">'+t.label+'</span><span class="tc">'+(DB[tid]?DB[tid].length:0)+'</span>';
    btns[i].className='tab-btn'+(tid===tipoActual?' active':'');
  }
}

function actualizarCabeceras(){
  var th=document.getElementById('t-head');
  var esHoja=(tipoActual==='Instruccion'), esCirug=(tipoActual==='Cirugia');
  var r='<tr>';
  if(esCirug){
    r+='<th onclick="ord(\'no\')">N</th><th onclick="ord(\'remite\')">A Quien</th><th onclick="ord(\'clave\')">Clave</th><th onclick="ord(\'centro\')">Centro de Trabajo</th><th onclick="ord(\'fecha\')">Fecha</th><th onclick="ord(\'hospital\')">Hospital</th><th onclick="ord(\'monto\')">Monto Cotizacion</th><th onclick="ord(\'diagnostico\')">Diagnostico</th><th>Acciones</th>';
  } else {
    r+='<th onclick="ord(\'no\')">N</th><th onclick="ord(\'remite\')">A quien se remite</th><th onclick="ord(\'resp\')">Realizado por</th><th onclick="ord(\'fecha\')">Fecha</th><th onclick="ord(\'asunto\')">Asunto</th>';
    if(esHoja) r+='<th onclick="ord(\'fact\')">Fecha Actividad</th>';
    r+='<th>Acciones</th>';
  }
  th.innerHTML=r+'</tr>';
}

function cambiarTab(tipo){
  tipoActual=tipo; sortCol=null; sortAsc=true;
  document.getElementById('buscar').value='';
  document.getElementById('filtro-clausula').value='';
  document.getElementById('filtro-resp').value='';
  document.getElementById('filtro-anio').value=String(new Date().getFullYear());
  var t=getTipo(tipo);
  document.getElementById('tipo-label').innerHTML='<span class="tipo-badge" style="background:'+t.color+'">'+t.icon+' '+t.label+'</span>';
  actualizarCabeceras(); actualizarTabs(); poblarResp(); render();
  setTimeout(function(){ try{cargarDatos(true);}catch(e){} },100);
}

function limpiarFecha(v){
  if(!v) return '';
  var s = String(v);
  if(s.indexOf('T') !== -1) {
    var d = new Date(s);
    if(!isNaN(d)){
      var dd=String(d.getUTCDate()).padStart(2,'0');
      var mm=String(d.getUTCMonth()+1).padStart(2,'0');
      var yy=String(d.getUTCFullYear()).slice(2);
      return dd+'/'+mm+'/'+yy;
    }
  }
  return s;
}

function filaAObj(f){
  return {
    no:          Number(f[0])||0,
    remite:      String(f[1]||''),
    resp:        String(f[2]||''),
    fecha:       limpiarFecha(f[3]),
    asunto:      String(f[4]||''),
    fact:        limpiarFecha(f[5]),
    clave:       '',
    centro:      '',
    hospital:    '',
    monto:       String(f[6]||''),
    diagnostico: String(f[7]||''),
    anio:        String(f[11]||f[8]||''),
    nueva:       false
  };
}

function filaAObjCirug(f){
  return {
    no:          Number(f[0])||0,
    remite:      String(f[1]||''),
    clave:       String(f[2]||''),
    centro:      String(f[3]||''),
    fecha:       limpiarFecha(f[4]),
    hospital:    String(f[5]||''),
    monto:       String(f[6]||''),
    diagnostico: String(f[7]||''),
    anio:        String(f[8]||''),
    resp:'', asunto:'', fact:'', nueva:false
  };
}

function cargarDatos(silencioso){
  if(!silencioso) showLoad('Cargando datos...');
  syncStatus('load','Sincronizando...');
  var pending=TIPOS.length, errs=0;
  for(var i=0;i<TIPOS.length;i++){
    (function(t){
      apiGet(t.id,function(err,rows){
        if(!err&&Array.isArray(rows)){
          DB[t.id]=rows.filter(function(r){
            if(!r[0]) return false;
            var v=String(r[0]).trim().toLowerCase();
            if(v===''||v==='no'||v==='n'||v==='n°'||isNaN(Number(r[0]))) return false;
            return true;
          }).map(t.id==='Cirugia'?filaAObjCirug:filaAObj);
        } else errs++;
        pending--;
        if(pending===0){
          syncStatus(errs===0?'ok':'err',errs===0?'Sincronizado':'Sin conexion');
          actualizarTabs(); poblarResp(); render();
          if(!silencioso) hideLoad();
        }
      });
    })(TIPOS[i]);
  }
}

function recargar(){ cargarDatos(false); toast('Datos actualizados'); }

function obtenerSiguienteNo(tipo,cb){
  var anioActual=String(new Date().getFullYear());
  var local=DB[tipo]?DB[tipo].filter(function(d){return (!d.anio||d.anio===anioActual)&&d.no>0;}).map(function(d){return d.no;}):[];
  var noLocal=local.length?Math.max.apply(null,local)+1:1;
  apiGet(tipo,function(err,rows){
    if(err||!Array.isArray(rows)){cb(noLocal);return;}
    var nums=rows.filter(function(r){
      if(!r[0]||isNaN(Number(r[0]))) return false;
      var rAnio=String(r[11]||r[8]||'');
      return !rAnio||rAnio===anioActual;
    }).map(function(r){return Number(r[0]);});
    var noSheets=nums.length?Math.max.apply(null,nums)+1:1;
    cb(Math.max(noLocal,noSheets));
  });
}

function formatMonto(v){
  if(!v) return '';
  var n = parseFloat(String(v).replace(/[^0-9.]/g,''));
  if(isNaN(n)) return 'L. '+v;
  return 'L '+n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
}

function poblarResp(){
  var resps=[];
  var datos=DB[tipoActual]||[];
  for(var i=0;i<datos.length;i++){
    if(datos[i].resp&&resps.indexOf(datos[i].resp.trim())===-1) resps.push(datos[i].resp.trim());
  }
  resps.sort();
  var sel=document.getElementById('filtro-resp');
  var prev=sel.value;
  sel.innerHTML='<option value="">Todos</option>';
  for(var j=0;j<resps.length;j++) sel.innerHTML+='<option value="'+resps[j]+'">'+resps[j]+'</option>';
  sel.value=prev;
  poblarAnios();
}

function poblarAnios(){
  var datos=DB[tipoActual]||[];
  var anios=[];
  var anioActual=String(new Date().getFullYear());
  for(var i=0;i<datos.length;i++){
    var a=datos[i].anio||anioActual;
    if(anios.indexOf(a)===-1) anios.push(a);
  }
  anios.sort().reverse();
  var sel=document.getElementById('filtro-anio');
  var prev=sel.value||anioActual;
  sel.innerHTML='<option value="">Todos</option>';
  for(var j=0;j<anios.length;j++) sel.innerHTML+='<option value="'+anios[j]+'">'+anios[j]+'</option>';
  if(anios.indexOf(anioActual)!==-1) sel.value=prev||anioActual;
  else sel.value=prev;
}

function getBadge(asunto){
  var m=(asunto||'').match(/cl[aá]usula\s+(\d+)/i);
  if(!m) return '';
  var n=m[1], cls=['40','55','57','66','75','77'].indexOf(n)!==-1?' c'+n:'';
  return '<span class="badge'+cls+'">Clausula '+n+'</span>';
}

function render(){
  var q=document.getElementById('buscar').value.toLowerCase();
  var resp=document.getElementById('filtro-resp').value;
  var claus=document.getElementById('filtro-clausula').value;
  var anioFil=document.getElementById('filtro-anio').value;
  var anioActual2=String(new Date().getFullYear());
  var datos=DB[tipoActual]||[];
  var esHoja=(tipoActual==='Instruccion'), esCirug=(tipoActual==='Cirugia');
  var filtrados=[];
  for(var i=0;i<datos.length;i++){
    var d=datos[i];
    var txt=(d.no+' '+d.remite+' '+d.resp+' '+d.fecha+' '+(d.asunto||'')+(d.diagnostico||'')+(d.clave||'')+(d.hospital||'')).toLowerCase();
    var dAnio = d.anio || anioActual2;
    if(
      (!q||txt.indexOf(q)!==-1) &&
      (!resp||d.resp.trim()===resp) &&
      (!claus||(d.asunto||'').match(new RegExp('cl[aá]usula\\s+'+claus,'i'))) &&
      (!anioFil||dAnio===anioFil)
    ) filtrados.push(d);
  }
  if(sortCol){
    filtrados.sort(function(a,b){
      var va=a[sortCol],vb=b[sortCol];
      if(sortCol==='no') return sortAsc?va-vb:vb-va;
      return sortAsc?String(va||'').localeCompare(String(vb||''),'es'):String(vb||'').localeCompare(String(va||''),'es');
    });
  } else {
    filtrados.reverse();
  }
  var tbody=document.getElementById('t-body');
  tbody.innerHTML='';
  var cols=esCirug?9:(esHoja?7:6);
  if(!filtrados.length){
    tbody.innerHTML='<tr class="empty-row"><td colspan="'+cols+'">Sin registros en esta seccion.</td></tr>';
  } else {
    for(var j=0;j<filtrados.length;j++){
      var d=filtrados[j];
      var ri=datos.indexOf(d);
      var tr=document.createElement('tr');
      if(d.nueva) tr.classList.add('nueva');
      var btnE='<button class="btn btn-primary btn-sm" onclick="editar('+ri+')">Editar</button>';
      var btnD='<button class="btn btn-danger btn-sm" style="margin-left:4px" onclick="eliminar('+ri+')">Borrar</button>';
      var html='<td class="num">'+d.no+'</td>';
      if(esCirug){
        html+='<td>'+(d.remite||'')+'</td><td>'+(d.clave||'')+'</td><td>'+(d.centro||'')+'</td><td class="fecha">'+(d.fecha||'')+'</td><td>'+(d.hospital||'')+'</td><td style="text-align:right;font-weight:600">'+(d.monto?formatMonto(d.monto):'')+'</td><td class="asunto">'+(d.diagnostico||'')+'</td>';
      } else {
        html+='<td style="font-weight:500">'+(d.remite||'')+'</td><td class="realizado">'+(d.resp||'')+'</td><td class="fecha">'+(d.fecha||'')+'</td><td class="asunto">'+(d.asunto||'')+getBadge(d.asunto||'')+'</td>';
        if(esHoja) html+='<td class="fecha">'+(d.fact||'')+'</td>';
      }
      html+='<td style="white-space:nowrap">'+btnE+btnD+'</td>';
      tr.innerHTML=html;
      tbody.appendChild(tr);
    }
  }
  document.getElementById('vis-count').textContent=filtrados.length;
  document.getElementById('total-count').textContent=datos.length;
}

function ord(col){ if(sortCol===col) sortAsc=!sortAsc; else{sortCol=col;sortAsc=true;} render(); }

function abrirModal(idx){
  editIdx=(idx!==undefined)?idx:null;
  var datos=DB[tipoActual]||[];
  var m=editIdx!==null?datos[editIdx]:null;
  var t=getTipo(tipoActual);
  document.getElementById('m-icon').innerHTML=t.icon;
  document.getElementById('m-titulo').textContent=m?'Editar '+t.label:'Nuevo '+t.label;
  var esCirug=(tipoActual==='Cirugia'), esHoja=(tipoActual==='Instruccion');
  document.getElementById('campos-std').style.display=esCirug?'none':'';
  document.getElementById('campos-cirug').style.display=esCirug?'':'none';
  document.getElementById('campo-fact').style.display=esHoja?'':'none';

  var _hoy=(function(){
    var d=new Date();
    var dd=String(d.getDate()).padStart(2,'0');
    var mm=String(d.getMonth()+1).padStart(2,'0');
    var yy=String(d.getFullYear()).slice(2);
    return dd+'/'+mm+'/'+yy;
  })();

  if(esCirug){
    document.getElementById('m-fecha').value=m?(m.fecha||''):_hoy;
    document.getElementById('m-cir-remite').value=m?(m.remite||''):'';
    document.getElementById('m-cir-clave').value=m?(m.clave||''):'';
    document.getElementById('m-cir-centro').value=m?(m.centro||''):'';
    document.getElementById('m-cir-hospital').value=m?(m.hospital||''):'';
    document.getElementById('m-cir-monto').value=m?(m.monto||''):'';
    document.getElementById('m-cir-diag').value=m?(m.diagnostico||''):'';
  } else {
    document.getElementById('m-remite').value=m?m.remite:'';
    document.getElementById('m-resp').value=m?m.resp:(usuarioActual?usuarioActual.nombre:'');
    document.getElementById('m-fecha').value=m?m.fecha:_hoy;
    document.getElementById('m-asunto').value=m?m.asunto:'';
    document.getElementById('m-fact').value=m?(m.fact||''):'';
  }

  if(m){
    document.getElementById('m-no').value=m.no;
    document.getElementById('btn-guardar').disabled=false;
  } else {
    var local=datos.map(function(d){return d.no;}).filter(function(n){return n>0;});
    var noI=local.length?Math.max.apply(null,local)+1:1;
    document.getElementById('m-no').value=noI;
    document.getElementById('btn-guardar').disabled=false;
    syncStatus('load','Verificando N...');
    obtenerSiguienteNo(tipoActual,function(n){
      if(n>=noI){ document.getElementById('m-no').value=n; }
      syncStatus('ok','Sincronizado');
    });
  }
  document.getElementById('modal-doc').classList.add('show');
}

function cerrarModal(){ document.getElementById('modal-doc').classList.remove('show'); editIdx=null; }
function editar(idx){ abrirModal(idx); }

function guardar(){
  var noVal=parseInt(document.getElementById('m-no').value)||0;
  var esCirug=(tipoActual==='Cirugia');
  var anioActual=String(new Date().getFullYear());
  var remite,resp,fecha,asunto,fact,clave,centro,hospital,monto,diagnostico;
  if(esCirug){
    remite=document.getElementById('m-cir-remite').value.trim();
    clave=document.getElementById('m-cir-clave').value.trim();
    centro=document.getElementById('m-cir-centro').value.trim();
    fecha=document.getElementById('m-fecha').value.trim();
    hospital=document.getElementById('m-cir-hospital').value.trim();
    monto=document.getElementById('m-cir-monto').value.trim();
    diagnostico=document.getElementById('m-cir-diag').value.trim();
    resp=''; asunto=''; fact='';
    if(!remite){toast('Complete el campo A Quien','warn');return;}
  } else {
    remite=document.getElementById('m-remite').value.trim();
    resp=document.getElementById('m-resp').value.trim();
    fecha=document.getElementById('m-fecha').value.trim();
    asunto=document.getElementById('m-asunto').value.trim();
    fact=document.getElementById('m-fact').value.trim();
    clave=''; centro=''; hospital=''; monto=''; diagnostico='';
    if(!remite||!resp){toast('Complete destinatario y responsable','warn');return;}
  }
  if(!noVal){toast('Error en el N de registro','error');return;}
  cerrarModal();
  var datos=DB[tipoActual];
  if(editIdx===null){
    showLoad('Guardando...');
    obtenerSiguienteNo(tipoActual,function(noFinal){
      var esCirugPost=(tipoActual==='Cirugia');
      var postData={accion:'agregar',tipo:tipoActual,no:noFinal,remite:remite,resp:resp,fecha:fecha,asunto:asunto,fact:fact,clave:clave,centro:centro,hospital:hospital,monto:monto,diagnostico:diagnostico};
      if(esCirugPost) postData.cols=[noFinal,remite,clave,centro,fecha,hospital,monto,diagnostico,anioActual];
      postData.anio=anioActual;
      apiPost(postData,function(err,res){
        if(!err&&res&&res.ok){
          DB[tipoActual].push({no:noFinal,remite:remite,resp:resp,fecha:fecha,asunto:asunto,fact:fact,clave:clave,centro:centro,hospital:hospital,monto:monto,diagnostico:diagnostico,anio:anioActual,nueva:true});
          actualizarTabs(); poblarResp(); render();
          syncStatus('ok','Sincronizado'); toast('Registro N '+noFinal+' guardado');
          registrarBitacora('Agrego', getTipo(tipoActual).label, noFinal, 'Nuevo registro');
          // Recargar desde Sheets para confirmar persistencia
          setTimeout(function(){ cargarDatos(true); }, 4000);
        } else { toast('Error al guardar. Verifique conexion.','error'); syncStatus('err','Error al guardar'); }
        hideLoad();
      });
    });
  } else {
    var orig=datos[editIdx];
    var anioEdit = orig.anio || anioActual;
    showLoad('Actualizando...');
    var esCirugEdit=(tipoActual==='Cirugia');
    var editData={accion:'editar',tipo:tipoActual,no_original:orig.no,no:noVal,remite:remite,resp:resp,fecha:fecha,asunto:asunto,fact:fact,clave:clave,centro:centro,hospital:hospital,monto:monto,diagnostico:diagnostico,anio:anioEdit};
    if(esCirugEdit) editData.cols=[noVal,remite,clave,centro,fecha,hospital,monto,diagnostico];
    apiPost(editData,function(err,res){
      if(!err&&res&&res.ok){
        datos[editIdx]={no:noVal,remite:remite,resp:resp,fecha:fecha,asunto:asunto,fact:fact,clave:clave,centro:centro,hospital:hospital,monto:monto,diagnostico:diagnostico,anio:anioEdit,nueva:false};
        poblarResp(); render(); syncStatus('ok','Sincronizado'); toast('Registro N '+noVal+' actualizado');
        registrarBitacora('Edito', getTipo(tipoActual).label, noVal, 'Registro modificado');
      } else { toast('Error al actualizar','error'); }
      hideLoad();
    });
  }
}

function eliminar(idx){
  var d=DB[tipoActual][idx];
  var t=getTipo(tipoActual);
  if(!confirm('Eliminar registro N '+d.no+' de '+t.label+'?\nEsta accion no se puede deshacer.')) return;
  showLoad('Eliminando...');
  apiPost({accion:'eliminar',tipo:tipoActual,no:d.no},function(err,res){
    if(!err&&res&&res.ok){
      DB[tipoActual].splice(idx,1); actualizarTabs(); poblarResp(); render();
      syncStatus('ok','Sincronizado'); toast('Registro N '+d.no+' eliminado','warn');
      registrarBitacora('Elimino', getTipo(tipoActual).label, d.no, 'Registro eliminado');
    } else { toast('Error al eliminar','error'); }
    hideLoad();
  });
}

document.getElementById('m-cir-monto').addEventListener('blur',function(){
  var v=this.value.replace(/[^0-9.]/g,'');
  if(!v) return;
  var n=parseFloat(v);
  if(!isNaN(n)) this.value=n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
});

document.getElementById('m-fecha').addEventListener('input',function(){
  var v=this.value.replace(/\D/g,'');
  if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2);
  if(v.length>5) v=v.slice(0,5)+'/'+v.slice(5,7);
  this.value=v;
});

document.getElementById('m-fact').addEventListener('input',function(){
  var v=this.value.replace(/\D/g,'');
  if(v.length>2) v=v.slice(0,2)+'/'+v.slice(2);
  if(v.length>5) v=v.slice(0,5)+'/'+v.slice(5,7);
  this.value=v;
});

document.getElementById('m-fecha-picker').addEventListener('change',function(){
  if(!this.value) return;
  var p=this.value.split('-');
  document.getElementById('m-fecha').value=p[2]+'/'+p[1]+'/'+p[0].slice(2);
});

document.getElementById('m-fact-picker').addEventListener('change',function(){
  if(!this.value) return;
  var p=this.value.split('-');
  document.getElementById('m-fact').value=p[2]+'/'+p[1]+'/'+p[0].slice(2);
});

function exportarCSV(){
  var t=getTipo(tipoActual);
  var csv='Tipo,N,A quien se remite,Realizado por,Fecha,Asunto,Fecha Actividad,Clave,Centro,Hospital,Monto,Diagnostico,Ano\n';
  var datos=DB[tipoActual]||[];
  for(var i=0;i<datos.length;i++){
    var d=datos[i];
    csv+='"'+t.label+'","'+d.no+'","'+(d.remite||'')+'","'+(d.resp||'')+'","'+(d.fecha||'')+'","'+(d.asunto||'')+'","'+(d.fact||'')+'","'+(d.clave||'')+'","'+(d.centro||'')+'","'+(d.hospital||'')+'","'+(d.monto||'')+'","'+(d.diagnostico||'')+'","'+(d.anio||'')+'"\n';
  }
  var blob=new Blob(['﻿'+csv],{type:'text/csv;charset=utf-8;'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='control_'+tipoActual+'_'+String(new Date().getFullYear())+'.csv'; a.click();
}

function abrirUsuarios(){ renderUsuarios(); document.getElementById('modal-usu').classList.add('show'); }
function cerrarUsuarios(){ document.getElementById('modal-usu').classList.remove('show'); }

function renderUsuarios(){
  var tbody=document.getElementById('u-body');
  tbody.innerHTML='';
  for(var i=0;i<USUARIOS.length;i++){
    var u=USUARIOS[i];
    var esSelf=(u.id===usuarioActual.id), esProt=u.protegido;
    var rolHtml='<span class="'+(u.rol==='admin'?'rol-admin':'rol-usuario')+'">'+(u.rol==='admin'?'Admin':'Usuario')+'</span>';
    var acciones='';
    if(!esSelf && !esProt){
      acciones+='<button class="btn btn-primary btn-sm" style="margin-right:4px" data-uid="'+u.id+'" onclick="cambiarPass(this.dataset.uid)">Clave</button>';
      acciones+='<button class="btn btn-morado btn-sm" style="margin-right:4px" data-uid="'+u.id+'" onclick="toggleRol(this.dataset.uid)">Rol</button>';
      acciones+='<button class="btn btn-sm" style="background:#e0f4fd;color:#006680;margin-right:4px" data-uid="'+u.id+'" onclick="abrirPermisos(this.dataset.uid)">Acceso</button>';
      acciones+='<button class="btn btn-danger btn-sm" data-uid="'+u.id+'" onclick="borrarUsuario(this.dataset.uid)">Borrar</button>';
    } else {
      acciones='<span style="font-size:11px;color:#8899aa">'+(esSelf?'(sesion activa)':'(protegido)')+'</span>';
    }
    var tr=document.createElement('tr');
    tr.innerHTML='<td><div class="u-av">'+u.nombre.charAt(0).toUpperCase()+'</div></td>'
      +'<td><strong>'+u.nombre+'</strong></td>'
      +'<td><code style="font-size:12px;color:#005599">'+u.id+'</code></td>'
      +'<td><span style="font-family:monospace;font-size:12px;color:#8899aa">'+u.pass+'</span></td>'
      +'<td>'+rolHtml+'</td>'
      +'<td style="white-space:nowrap">'+acciones+'</td>';
    tbody.appendChild(tr);
  }
}

function agregarUsuario(){
  var nombre=document.getElementById('u-nombre').value.trim();
  var id=document.getElementById('u-id').value.trim().toLowerCase().replace(/\s+/g,'');
  var pass=document.getElementById('u-pass').value.trim();
  var rol=document.getElementById('u-rol').value;
  if(!nombre||!id||!pass){toast('Complete todos los campos','warn');return;}
  for(var i=0;i<USUARIOS.length;i++){if(USUARIOS[i].id===id){toast('El ID ya existe','error');return;}}
  USUARIOS.push({id:id,nombre:nombre,pass:pass,rol:rol,tabs:TODOS_TIPOS.slice()});
  rebuildLoginSelect(); renderUsuarios(); guardarUsuariosEnSheets();
  document.getElementById('u-nombre').value='';
  document.getElementById('u-id').value='';
  document.getElementById('u-pass').value='';
  document.getElementById('u-rol').value='usuario';
  toast('Usuario '+nombre+' agregado');
}

function borrarUsuario(uid){
  var idx=-1;
  for(var i=0;i<USUARIOS.length;i++){if(USUARIOS[i].id===uid){idx=i;break;}}
  if(idx===-1){toast('Usuario no encontrado','error');return;}
  var u=USUARIOS[idx];
  if(u.protegido){toast('Usuario protegido','error');return;}
  if(u.id===usuarioActual.id){toast('No puedes eliminar tu cuenta activa','error');return;}
  if(!confirm('Eliminar usuario '+u.nombre+'?')) return;
  USUARIOS.splice(idx,1);
  rebuildLoginSelect(); renderUsuarios(); guardarUsuariosEnSheets();
  toast('Usuario '+u.nombre+' eliminado','warn');
}

function toggleRol(uid){
  for(var i=0;i<USUARIOS.length;i++){
    if(USUARIOS[i].id===uid){
      USUARIOS[i].rol=USUARIOS[i].rol==='admin'?'usuario':'admin';
      renderUsuarios(); guardarUsuariosEnSheets();
      toast('Rol de '+USUARIOS[i].nombre+' cambiado a '+USUARIOS[i].rol);
      return;
    }
  }
}

function cambiarPass(uid){
  for(var i=0;i<USUARIOS.length;i++){
    if(USUARIOS[i].id===uid){
      var nueva=prompt('Nueva contrasena para '+USUARIOS[i].nombre+':');
      if(!nueva||nueva.trim().length<4){toast('Contrasena muy corta (min 4 caracteres)','warn');return;}
      USUARIOS[i].pass=nueva.trim();
      renderUsuarios(); guardarUsuariosEnSheets();
      toast('Contrasena de '+USUARIOS[i].nombre+' actualizada');
      return;
    }
  }
}

var permisosUID = null;

function abrirPermisos(uid){
  permisosUID = uid;
  var u = null;
  for(var i=0;i<USUARIOS.length;i++){ if(USUARIOS[i].id===uid){u=USUARIOS[i];break;} }
  if(!u){ toast('Usuario no encontrado','error'); return; }
  if(!u.tabs || u.tabs.length===0) u.tabs = TODOS_TIPOS.slice();
  document.getElementById('perm-nombre').textContent = u.nombre;
  var tabs = u.tabs;
  var div = document.getElementById('perm-checks');
  div.innerHTML = '';
  for(var j=0;j<TIPOS.length;j++){
    var t=TIPOS[j];
    var checked=tabs.indexOf(t.id)!==-1 ? 'checked' : '';
    div.innerHTML += '<label style="display:flex;align-items:center;gap:8px;font-size:13px;cursor:pointer;background:#f0f3f8;padding:8px 12px;border-radius:8px;border:1.5px solid #dde3ed;">'
      +'<input type="checkbox" value="'+t.id+'" '+checked+'>'
      +'<span>'+t.icon+' '+t.label+'</span></label>';
  }
  document.getElementById('modal-usu').classList.remove('show');
  document.getElementById('modal-permisos').classList.add('show');
}

function cerrarPermisos(){
  document.getElementById('modal-permisos').classList.remove('show');
  document.getElementById('modal-usu').classList.add('show');
  permisosUID = null;
}

function guardarPermisos(){
  if(!permisosUID) return;
  var checks = document.getElementById('perm-checks').querySelectorAll('input[type=checkbox]');
  var tabs = [];
  for(var i=0;i<checks.length;i++){
    if(checks[i].checked) tabs.push(checks[i].value);
  }
  if(tabs.length===0){ toast('Selecciona al menos una pestana','warn'); return; }
  for(var j=0;j<USUARIOS.length;j++){
    if(USUARIOS[j].id===permisosUID){
      USUARIOS[j].tabs = tabs;
      if(usuarioActual && usuarioActual.id===permisosUID){
        usuarioActual.tabs = tabs; construirTabs();
      }
      break;
    }
  }
  guardarUsuariosEnSheets();
  toast('Permisos guardados.','success');
  cerrarPermisos();
}

function registrarBitacora(accion, tipo, no, detalle){
  var fecha = new Date().toLocaleString('es-HN');
  var usuario = usuarioActual ? usuarioActual.nombre : 'Desconocido';
  BITACORA.unshift({fecha:fecha,usuario:usuario,accion:accion,tipo:tipo,no:no,detalle:detalle||''});
  apiPost({accion:'agregar',tipo:'bitacora',cols:[fecha,usuario,accion,tipo,String(no),detalle||'']},
    function(err,res){ if(err||!res||!res.ok) console.log('Bitacora error'); });
}

function cargarBitacora(cb){
  apiGet('bitacora', function(err, rows){
    if(err || !Array.isArray(rows)){ if(cb) cb(); return; }
    BITACORA = [];
    rows.filter(function(r){ return r[0] && String(r[0]).trim()!==''; })
      .forEach(function(r){
        BITACORA.push({fecha:String(r[0]||''),usuario:String(r[1]||''),accion:String(r[2]||''),tipo:String(r[3]||''),no:String(r[4]||''),detalle:String(r[5]||'')});
      });
    if(cb) cb();
  });
}

function abrirActividad(){
  var selU=document.getElementById('act-usuario');
  var selA=document.getElementById('act-anio');
  var selT=document.getElementById('act-tipo');
  var resps=[];
  TIPOS.forEach(function(t){ (DB[t.id]||[]).forEach(function(d){ if(d.resp&&resps.indexOf(d.resp.trim())===-1) resps.push(d.resp.trim()); }); });
  resps.sort();
  selU.innerHTML='<option value="">Todos</option>';
  resps.forEach(function(r){ selU.innerHTML+='<option value="'+r+'">'+r+'</option>'; });
  var anios=[]; var anioA=String(new Date().getFullYear());
  TIPOS.forEach(function(t){ (DB[t.id]||[]).forEach(function(d){ var a=d.anio||anioA; if(anios.indexOf(a)===-1) anios.push(a); }); });
  anios.sort().reverse();
  selA.innerHTML='<option value="">Todos</option>';
  anios.forEach(function(a){ selA.innerHTML+='<option value="'+a+'">'+a+'</option>'; });
  selT.innerHTML='<option value="">Todas</option>';
  TIPOS.forEach(function(t){ selT.innerHTML+='<option value="'+t.id+'">'+t.label+'</option>'; });
  renderActividad();
  cargarBitacora(function(){ renderBitacora(); });
  document.getElementById('modal-actividad').classList.add('show');
}

function cerrarActividad(){ document.getElementById('modal-actividad').classList.remove('show'); }

function renderActividad(){
  var filtU=document.getElementById('act-usuario').value;
  var filtA=document.getElementById('act-anio').value;
  var filtT=document.getElementById('act-tipo').value;
  var anioA=String(new Date().getFullYear());
  var mapa={};
  TIPOS.forEach(function(t){
    if(filtT && t.id!==filtT) return;
    (DB[t.id]||[]).forEach(function(d){
      var resp=(d.resp||'Sin asignar').trim();
      var anio=d.anio||anioA;
      if(filtU && resp!==filtU) return;
      if(filtA && anio!==filtA) return;
      var key=resp+'|'+t.id;
      if(!mapa[key]) mapa[key]={resp:resp,tipo:t.id,label:t.label,count:0,ultima:''};
      mapa[key].count++;
      if(!mapa[key].ultima||d.fecha>mapa[key].ultima) mapa[key].ultima=d.fecha;
    });
  });
  var totales={};
  Object.keys(mapa).forEach(function(k){ var r=mapa[k].resp; totales[r]=(totales[r]||0)+mapa[k].count; });
  var cards=document.getElementById('act-cards');
  cards.innerHTML='';
  Object.keys(totales).sort().forEach(function(r){
    cards.innerHTML+='<div style="background:#e8f0f8;border-radius:6px;padding:8px;text-align:center;border:1.5px solid #c8d4e4;">'
      +'<div style="font-family:Barlow Condensed,sans-serif;font-weight:700;font-size:20px;color:#003366;">'+totales[r]+'</div>'
      +'<div style="font-size:10px;color:#8899aa;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+r+'</div></div>';
  });
  if(!Object.keys(totales).length) cards.innerHTML='<div style="color:#8899aa;font-style:italic;padding:10px;">Sin registros.</div>';
  var tbody=document.getElementById('act-tbody');
  tbody.innerHTML='';
  var filas=Object.values(mapa).sort(function(a,b){ if(a.resp!==b.resp) return a.resp.localeCompare(b.resp,'es'); return b.count-a.count; });
  if(!filas.length){
    tbody.innerHTML='<tr><td colspan="4" style="text-align:center;padding:20px;color:#8899aa;font-style:italic;">Sin registros.</td></tr>';
  } else {
    filas.forEach(function(f){
      tbody.innerHTML+='<tr style="border-bottom:1px solid #c8d4e4;">'
        +'<td style="padding:8px 12px;font-weight:500;">'+f.resp+'</td>'
        +'<td style="padding:8px 12px;color:#8899aa;">'+f.label+'</td>'
        +'<td style="padding:8px 12px;text-align:center;font-family:Barlow Condensed,sans-serif;font-weight:700;font-size:16px;color:#003366;">'+f.count+'</td>'
        +'<td style="padding:8px 12px;color:#8899aa;font-size:12px;">'+f.ultima+'</td></tr>';
    });
  }
}

function renderBitacora(){
  var tbody=document.getElementById('bit-tbody');
  if(!BITACORA.length){ tbody.innerHTML='<tr><td colspan="5" style="text-align:center;padding:20px;color:#8899aa;font-style:italic;">Sin modificaciones registradas.</td></tr>'; return; }
  tbody.innerHTML='';
  BITACORA.forEach(function(b){
    var color=b.accion==='Elimino'?'#fde0e0':b.accion==='Edito'?'#fff8e6':'#dff0e8';
    var tcolor=b.accion==='Elimino'?'#b02020':b.accion==='Edito'?'#c07000':'#1a7a44';
    tbody.innerHTML+='<tr style="border-bottom:1px solid #c8d4e4;">'
      +'<td style="padding:8px 12px;font-size:12px;color:#8899aa;">'+b.fecha+'</td>'
      +'<td style="padding:8px 12px;font-weight:500;">'+b.usuario+'</td>'
      +'<td style="padding:8px 12px;"><span style="background:'+color+';color:'+tcolor+';padding:2px 8px;border-radius:10px;font-size:11px;font-weight:700;">'+b.accion+'</span></td>'
      +'<td style="padding:8px 12px;color:#8899aa;">'+b.tipo+'</td>'
      +'<td style="padding:8px 12px;font-size:12px;">'+b.detalle+' (N '+b.no+')</td></tr>';
  });
}

function actTab(tab){
  var isResumen = tab==='resumen';
  document.getElementById('act-resumen-tabla').style.display = isResumen?'':'none';
  document.getElementById('act-bitacora-tabla').style.display = isResumen?'none':'';
  document.getElementById('act-tab-resumen').style.background = isResumen?'#003366':'#dde3ed';
  document.getElementById('act-tab-resumen').style.color = isResumen?'#fff':'#8899aa';
  document.getElementById('act-tab-bitacora').style.background = isResumen?'#dde3ed':'#003366';
  document.getElementById('act-tab-bitacora').style.color = isResumen?'#8899aa':'#fff';
}

document.getElementById('act-usuario').addEventListener('change', renderActividad);
document.getElementById('act-anio').addEventListener('change', renderActividad);
document.getElementById('act-tipo').addEventListener('change', renderActividad);
document.getElementById('modal-actividad').addEventListener('click',function(e){if(e.target===this)cerrarActividad();});
document.getElementById('modal-doc').addEventListener('click',function(e){if(e.target===this)cerrarModal();});
document.getElementById('modal-usu').addEventListener('click',function(e){if(e.target===this)cerrarUsuarios();});
document.getElementById('modal-permisos').addEventListener('click',function(e){if(e.target===this)cerrarPermisos();});
document.getElementById('buscar').addEventListener('input', render);
document.getElementById('filtro-resp').addEventListener('change', render);
document.getElementById('filtro-clausula').addEventListener('change', render);
document.getElementById('filtro-anio').addEventListener('change', render);

cargarDatos(false);

</script>
</body>
</html>
