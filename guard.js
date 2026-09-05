/* ============================================================================
   PORTAL DBS — guard.js  (v2)

   Fuente de verdad: la hoja "Usuarios" del Google Sheets que ya usa
   Control_de_Documentos_DBS. Se lee y se escribe por JSONP contra el mismo
   Apps Script, asi que los cambios se ven en todas las computadoras.

   Formato de fila en la hoja "Usuarios":
     0 id | 1 nombre | 2 pass | 3 rol | 4 protegido | 5 tabs | 6 permisos | 7 claves
   Las columnas 0-5 son las que ya usaba Control de Documentos (no se tocan).
   Columna 6 (permisos): claves de modulo separadas por "|", o "*" para todo.
   Columna 7 (claves):   contrasenas por app cuando difieren, "app:clave|app:clave".

   USO EN UN HTML PROTEGIDO — una linea dentro del <head>:
       <script src="guard.js"></script>
       <script src="guard.js" data-barra="no"></script>   (sin barra superior)
   ========================================================================== */
(function (global) {
  'use strict';

  /* ==========================================================================
     1. CONFIGURACION
     ========================================================================== */
  var CONFIG = {
    // Mismo Apps Script que usa Control_de_Documentos_DBS.html
    scriptUrl:      'https://script.google.com/macros/s/AKfycbwMTxIe4c53mrNg2EAKiQ3ohY3I_9nfoneuB5BSlNXh8RxJMWBEhe1Rfnc-x7lYRlQ9JA/exec',
    hoja:           'Usuarios',
    loginPage:      'index.html',
    claveSesion:    'dbs_sesion',
    claveCache:     'dbs_usuarios_cache',
    claveSSO:       'enee_sso_v1',   // convencion que ya leen Financiamiento y Constancias
    semilla:        'ENEE-DBS-2026-CAMBIA-ESTO',
    duracionMin:    480,   // 8 h
    inactividadMin: 60,    // 1 h sin actividad
    cacheMin:       10     // refrescar usuarios cada 10 min
  };

  /* ==========================================================================
     2. CATALOGO DE MODULOS
     'clave' es el identificador corto que se guarda en la hoja.
     'app'   es la etiqueta de contrasena propia (solo si esa app tiene la suya).
     ========================================================================== */
  var ARCHIVOS = [
    { clave: 'cdd',  archivo: 'Control_de_Documentos_DBS.html',
      titulo: 'Control de Documentos',
      desc:   'Registro de memorandos, oficios, dictamenes, circulares y cirugias.',
      icon: '📋', color: '#003366', colorOsc: '#7db0e6', grupo: 'Control' },

    { clave: 'corr', archivo: 'Correspondencia_Bienestar_Social_ENEE.html',
      titulo: 'Correspondencia',
      desc:   'Entrada y salida de correspondencia de Bienestar Social.',
      icon: '📨', color: '#1a6b3a', colorOsc: '#5fc78c', grupo: 'Control', app: 'corr' },

    { clave: 'pago', archivo: 'Solicitudes_Pago_DBS2026.html',
      titulo: 'Solicitudes de Pago',
      desc:   'Control de solicitudes de pago del ejercicio 2026.',
      icon: '💰', color: '#7a3a00', colorOsc: '#d9a35e', grupo: 'Control', app: 'pago', backend: true },

    { clave: 'fin',  archivo: 'Financiamiento_Cuotas_DBS.html',
      titulo: 'Financiamiento de Cuotas',
      desc:   'Calculo y seguimiento de financiamientos y cuotas.',
      icon: '📊', color: '#006680', colorOsc: '#54b8d1', grupo: 'Control' },

    { clave: 'memo', archivo: 'Generador_Memorandums_DBS.html',
      titulo: 'Generador de Memorandums',
      desc:   'Redaccion e impresion de memorandums con formato oficial.',
      icon: '📝', color: '#5a0080', colorOsc: '#bb92db', grupo: 'Generadores', app: 'memo', backend: true },

    { clave: 'cons', archivo: 'Generador_Constancias_ENEE_v5_3.html',
      titulo: 'Generador de Constancias',
      desc:   'Emision de constancias de empleado (v5.3).',
      icon: '📄', color: '#1a7a44', colorOsc: '#63cb90', grupo: 'Generadores', app: 'cons' },

    { clave: 'c40',  archivo: 'Generador_Clausula40_DBS.html',
      titulo: 'Generador Clausula 40',
      desc:   'Documentos y calculos asociados a la Clausula 40.',
      icon: '⚖️', color: '#990022', colorOsc: '#ec7285', grupo: 'Generadores', app: 'c40' }
  ];

  var TODAS_CLAVES = ARCHIVOS.map(function (a) { return a.clave; });

  /* ==========================================================================
     3. USUARIOS DE RESPALDO
     Solo se usan si la hoja no responde y no hay copia local guardada.
     ========================================================================== */
  /* Sin lista de respaldo a proposito: este archivo se publica en un repo publico
     y no debe llevar contrasenas. Los usuarios se leen de la hoja "Usuarios" y
     quedan en cache local para las siguientes cargas. */
  var SEMILLA = [];

  var USUARIOS = [];      // lista viva
  var origenDatos = '';   // 'sheet' | 'cache' | 'semilla'

  /* ==========================================================================
     4. UTILIDADES
     ========================================================================== */
  function almacen() { try { return global.localStorage; } catch (e) { return null; } }

  var CLAVE_TEMA = 'dbs_tema';

  function tema() {
    var a = almacen();
    try {
      var t = a && a.getItem(CLAVE_TEMA);
      if (t === 'claro' || t === 'oscuro') return t;
    } catch (e) {}
    // Sin preferencia guardada: seguimos la del sistema.
    try {
      if (global.matchMedia && global.matchMedia('(prefers-color-scheme: dark)').matches) return 'oscuro';
    } catch (e) {}
    return 'claro';
  }

  function setTema(t) {
    var a = almacen();
    try { if (a) a.setItem(CLAVE_TEMA, t === 'oscuro' ? 'oscuro' : 'claro'); } catch (e) {}
    try { document.documentElement.setAttribute('data-tema', t); } catch (e) {}
  }
  function ahora() { return Date.now(); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function iniciales(nombre) {
    var p = String(nombre || '?').trim().split(/\s+/);
    return ((p[0] || '')[0] || '?').toUpperCase() + ((p[1] || '')[0] || '').toUpperCase();
  }

  function archivoActual() {
    var p = location.pathname.split('/').pop() || '';
    try { p = decodeURIComponent(p); } catch (e) {}
    return p || CONFIG.loginPage;
  }

  function esLogin() {
    return archivoActual().toLowerCase() === CONFIG.loginPage.toLowerCase();
  }

  function metaArchivo(nombre) {
    var k = String(nombre || '').toLowerCase();
    for (var i = 0; i < ARCHIVOS.length; i++) {
      if (ARCHIVOS[i].archivo.toLowerCase() === k || ARCHIVOS[i].clave === k) return ARCHIVOS[i];
    }
    return { clave:'?', archivo:nombre, titulo:nombre, desc:'', icon:'📁', color:'#003366', grupo:'Otros' };
  }

  // Firma corta (djb2). Detecta manipulacion casual del localStorage; no es criptografia.
  function firma(txt) {
    var h = 5381, s = txt + '|' + CONFIG.semilla;
    for (var i = 0; i < s.length; i++) { h = ((h * 33) ^ s.charCodeAt(i)) >>> 0; }
    return h.toString(36);
  }

  /* ==========================================================================
     5. API JSONP AL APPS SCRIPT
     Mismo contrato que usa Control_de_Documentos_DBS.html.
     ========================================================================== */
  function jsonp(url, cb, ms) {
    var nombre = '_dbs_' + Math.random().toString(36).slice(2) + '_' + Date.now();
    var s = document.createElement('script'), listo = false;
    var t = setTimeout(function () {
      if (!listo) { listo = true; cb(new Error('Timeout')); }
      limpiar();
    }, ms || 15000);

    function limpiar() {
      try { delete global[nombre]; } catch (e) { global[nombre] = undefined; }
      if (s.parentNode) s.parentNode.removeChild(s);
    }
    global[nombre] = function (data) {
      if (!listo) { listo = true; clearTimeout(t); cb(null, data); }
      limpiar();
    };
    s.onerror = function () {
      if (!listo) { listo = true; clearTimeout(t); cb(new Error('Sin conexion')); }
      limpiar();
    };
    s.src = url + (url.indexOf('?') === -1 ? '?' : '&') + 'callback=' + nombre + '&_=' + Date.now();
    (document.head || document.documentElement).appendChild(s);
  }

  function apiLeer(cb) {
    jsonp(CONFIG.scriptUrl + '?accion=leer&tipo=' + encodeURIComponent(CONFIG.hoja), cb);
  }

  function apiEscribir(filas, cb) {
    var cuerpo = { accion: 'reescribir', tipo: CONFIG.hoja, filas: filas };
    jsonp(CONFIG.scriptUrl + '?data=' + encodeURIComponent(JSON.stringify(cuerpo)), cb, 20000);
  }

  /* ==========================================================================
     6. CONVERSION FILA <-> USUARIO
     ========================================================================== */
  function filaAUsuario(r) {
    var permCol = String(r[6] == null ? '' : r[6]).trim();
    var permisos;
    if (permCol === '*') permisos = '*';
    else if (!permCol) permisos = [];                       // sin columna = sin modulos
    else permisos = permCol.split('|').filter(function (x) { return x; });

    var claves = {};
    String(r[7] == null ? '' : r[7]).split('|').forEach(function (par) {
      var i = par.indexOf(':');
      if (i > 0) claves[par.slice(0, i).trim()] = par.slice(i + 1);
    });

    var rol = String(r[3] || 'usuario').toLowerCase();
    if (rol === 'admin' && permCol === '') permisos = '*';  // admin sin columna = acceso total

    return {
      id:        String(r[0] || '').trim(),
      nombre:    String(r[1] || ''),
      pass:      String(r[2] == null ? '' : r[2]),
      rol:       rol === 'admin' ? 'admin' : 'usuario',
      protegido: r[4] === true || String(r[4]).toLowerCase() === 'true',
      tabs:      String(r[5] || '').split('|').filter(function (x) { return x; }),
      permisos:  permisos,
      claves:    claves
    };
  }

  function usuarioAFila(u) {
    var permCol = u.permisos === '*' ? '*' : (u.permisos || []).join('|');
    var clavesCol = Object.keys(u.claves || {})
      .filter(function (k) { return u.claves[k]; })
      .map(function (k) { return k + ':' + u.claves[k]; }).join('|');
    return [
      u.id, u.nombre, u.pass, u.rol, u.protegido ? 'true' : 'false',
      (u.tabs || []).join('|'), permCol, clavesCol
    ];
  }

  /* ==========================================================================
     7. CARGA Y GUARDADO DE USUARIOS
     ========================================================================== */
  function guardarCache(lista) {
    var a = almacen(); if (!a) return;
    try { a.setItem(CONFIG.claveCache, JSON.stringify({ ts: ahora(), lista: lista })); } catch (e) {}
  }

  function leerCache() {
    var a = almacen(); if (!a) return null;
    try {
      var c = JSON.parse(a.getItem(CONFIG.claveCache) || 'null');
      return (c && c.lista && c.lista.length) ? c : null;
    } catch (e) { return null; }
  }

  // Arranque sincrono: deja USUARIOS utilizable de inmediato.
  (function arrancar() {
    var c = leerCache();
    if (c) { USUARIOS = c.lista; origenDatos = 'cache'; }
    else   { USUARIOS = JSON.parse(JSON.stringify(SEMILLA)); origenDatos = 'semilla'; }
  })();

  // Refresco desde la hoja. cb(err, origen)
  function cargarUsuarios(cb) {
    apiLeer(function (err, filas) {
      if (err || !Array.isArray(filas)) { if (cb) cb(err || new Error('Respuesta invalida'), origenDatos); return; }

      var lista = [];
      for (var i = 0; i < filas.length; i++) {
        var r = filas[i];
        if (!r || !r[0] || String(r[0]).trim() === '') continue;
        if (String(r[0]).toLowerCase() === 'id') continue;   // encabezado
        lista.push(filaAUsuario(r));
      }
      if (!lista.length) { if (cb) cb(new Error('Hoja vacia'), origenDatos); return; }

      USUARIOS = lista; origenDatos = 'sheet';
      guardarCache(lista);
      if (cb) cb(null, 'sheet');
    });
  }

  function guardarUsuarios(lista, cb) {
    var filas = lista.map(usuarioAFila);
    apiEscribir(filas, function (err, res) {
      if (err) { if (cb) cb(err); return; }
      if (res && res.ok === false) { if (cb) cb(new Error(res.error || 'El servidor rechazo el guardado')); return; }
      USUARIOS = lista; origenDatos = 'sheet';
      guardarCache(lista);
      if (cb) cb(null, res);
    });
  }

  function buscarUsuario(id) {
    var k = String(id || '').trim().toLowerCase();
    for (var i = 0; i < USUARIOS.length; i++) {
      if (String(USUARIOS[i].id).toLowerCase() === k) return USUARIOS[i];
    }
    return null;
  }

  /* ==========================================================================
     8. SESION
     ========================================================================== */
  function guardarSesion(ses) {
    var a = almacen(); if (!a) return;
    var d = { id:ses.id, nombre:ses.nombre, rol:ses.rol, inicio:ses.inicio, exp:ses.exp, ult:ses.ult };
    a.setItem(CONFIG.claveSesion, JSON.stringify({ d: d, f: firma(JSON.stringify(d)) }));
  }

  // Publica la sesion para que las apps entren solas (convencion enee_sso_v1).
  function publicarSSO(u) {
    var a = almacen(); if (!a) return;
    try {
      a.setItem(CONFIG.claveSSO, JSON.stringify({
        id: String(u.id).toLowerCase(),
        nombre: u.nombre || u.id,
        rol: u.rol === 'admin' ? 'admin' : 'usuario',
        pass: u.pass || '',        // contrasena general del portal
        claves: u.claves || {},    // contrasenas por app cuando difieren
        ts: ahora()
      }));
    } catch (e) {}
  }

  function borrarSSO() {
    var a = almacen(); if (!a) return;
    try { a.removeItem(CONFIG.claveSSO); } catch (e) {}
  }

  function leerSesion() {
    var a = almacen(); if (!a) return null;
    var crudo = a.getItem(CONFIG.claveSesion);
    if (!crudo) return null;

    var caja;
    try { caja = JSON.parse(crudo); } catch (e) { a.removeItem(CONFIG.claveSesion); return null; }
    if (!caja || !caja.d || !caja.f) { a.removeItem(CONFIG.claveSesion); return null; }
    if (firma(JSON.stringify(caja.d)) !== caja.f) { a.removeItem(CONFIG.claveSesion); return null; }

    var s = caja.d, t = ahora();
    if (t > s.exp) { a.removeItem(CONFIG.claveSesion); borrarSSO(); return null; }
    if (t - s.ult > CONFIG.inactividadMin * 60000) { a.removeItem(CONFIG.claveSesion); borrarSSO(); return null; }

    var u = buscarUsuario(s.id);
    if (!u) { a.removeItem(CONFIG.claveSesion); borrarSSO(); return null; }

    // Permisos, rol y nombre SIEMPRE se releen de la lista viva.
    s.permisos = u.permisos; s.rol = u.rol; s.nombre = u.nombre; s.claves = u.claves;
    return s;
  }

  function tocar() { var s = leerSesion(); if (s) { s.ult = ahora(); guardarSesion(s); } }

  // Valida contra la lista en memoria. cb(resultado)
  function login(id, pass, cb) {
    function intentar() {
      if (!USUARIOS.length) {
        return { ok:false, msg:'Aun no se pudo leer la lista de usuarios. Revisa tu conexion e intenta de nuevo.' };
      }
      var u = buscarUsuario(id);
      if (!u) return { ok:false, msg:'Usuario no encontrado.' };
      if (String(pass) !== String(u.pass)) return { ok:false, msg:'Contrasena incorrecta.' };

      var t = ahora();
      var ses = { id:u.id, nombre:u.nombre, rol:u.rol, permisos:u.permisos, claves:u.claves,
                  inicio:t, exp:t + CONFIG.duracionMin * 60000, ult:t };
      guardarSesion(ses); publicarSSO(u);
      return { ok:true, sesion:ses };
    }

    var r = intentar();
    // Si falla y los datos no vienen de la hoja, refrescamos y reintentamos:
    // cubre la primera carga y tambien una clave cambiada desde otra computadora.
    if (!r.ok && origenDatos !== 'sheet') {
      cargarUsuarios(function () { cb(intentar()); });
      return;
    }
    cb(r);
  }

  function salir(motivo) {
    var a = almacen();
    if (a) { a.removeItem(CONFIG.claveSesion); }
    borrarSSO();
    location.replace(CONFIG.loginPage + (motivo ? '?motivo=' + encodeURIComponent(motivo) : ''));
  }

  /* Cerrar el modulo SIN cerrar la sesion: se cierra esta pestana y el
     usuario queda en la del portal, que sigue conectada. La sesion solo se
     cierra desde el boton SALIR del portal (o cuando vence sola).
     El navegador unicamente deja cerrar las pestanas que abrio el portal;
     si no puede, medio segundo despues volvemos al portal en esta misma
     pestana, que al haber sesion muestra el panel de modulos.
     Las salidas automaticas (sesion vencida, o cerrada desde otra pestana)
     siguen usando salir(): esas si borran la sesion y redirigen. */
  function cerrarModulo() {
    if (esLogin()) return;
    try { if (global.opener && !global.opener.closed) global.opener.focus(); } catch (e) {}
    try { global.close(); } catch (e) {}
    setTimeout(function () { location.replace(CONFIG.loginPage); }, 500);
  }

  /* ==========================================================================
     9. PERMISOS
     ========================================================================== */
  function puede(ses, ref) {
    if (!ses) return false;
    if (ses.rol === 'admin' || ses.permisos === '*') return true;
    if (!ses.permisos || !ses.permisos.length) return false;
    var meta = metaArchivo(ref);
    return ses.permisos.indexOf(meta.clave) !== -1;
  }

  function permitidos(ses) {
    return ARCHIVOS.filter(function (a) { return puede(ses, a.clave); });
  }

  /* ==========================================================================
     10. INTERFAZ DEL GUARD
     ========================================================================== */
  var ID_OCULTAR = 'guard-ocultar';

  function ocultarPagina() {
    if (document.getElementById(ID_OCULTAR)) return;
    var st = document.createElement('style');
    st.id = ID_OCULTAR; st.textContent = 'html{visibility:hidden!important}';
    (document.head || document.documentElement).appendChild(st);
  }
  function mostrarPagina() {
    var st = document.getElementById(ID_OCULTAR);
    if (st && st.parentNode) st.parentNode.removeChild(st);
  }

  function inyectarCSS() {
    if (document.getElementById('guard-css')) return;
    var st = document.createElement('style'); st.id = 'guard-css';
    st.textContent = [
      '.guard-bar{position:sticky;top:0;z-index:99999;display:flex;align-items:center;gap:12px;',
      ' padding:8px 16px;background:#003366;color:#fff;font-family:Barlow,system-ui,sans-serif;font-size:14px;',
      ' box-shadow:0 2px 10px rgba(0,30,80,.25)}',
      '.guard-bar .gb-logo{width:26px;height:26px;border-radius:6px;background:#f0a500;color:#003366;',
      ' display:flex;align-items:center;justify-content:center;font-weight:700;font-size:11px;flex:0 0 auto}',
      '.guard-bar .gb-tit{font-weight:600;letter-spacing:.5px;text-transform:uppercase;font-size:14px;',
      ' white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.guard-bar .gb-sp{flex:1 1 auto}',
      '.guard-bar .gb-user{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,.12);',
      ' padding:4px 11px;border-radius:20px;white-space:nowrap}',
      '.guard-bar .gb-av{width:22px;height:22px;border-radius:50%;background:#f0a500;color:#003366;',
      ' display:flex;align-items:center;justify-content:center;font-weight:600;font-size:11px}',
      '.guard-bar button{font-family:inherit;font-weight:600;font-size:12px;letter-spacing:.4px;',
      ' text-transform:uppercase;border:0;border-radius:6px;padding:6px 13px;cursor:pointer}',
      '.guard-bar .gb-back{background:rgba(255,255,255,.16);color:#fff}',
      '.guard-bar .gb-back:hover{background:rgba(255,255,255,.3)}',
      '.guard-bar .gb-out{background:#cc2233;color:#fff}.guard-bar .gb-out:hover{background:#e33646}',
      '@media(max-width:640px){.guard-bar .gb-tit,.guard-bar .gb-user span{display:none}}',
      '.guard-403{min-height:100vh;margin:0;display:flex;align-items:center;justify-content:center;',
      ' background:#f0f3f8;font-family:Barlow,system-ui,sans-serif;color:#1a2a3a;padding:24px}',
      '.guard-403 .card{background:#fff;border-radius:14px;padding:38px 34px;max-width:460px;width:100%;',
      ' text-align:center;box-shadow:0 8px 34px rgba(0,30,80,.13);border-top:5px solid #cc2233}',
      '.guard-403 .ico{font-size:46px;line-height:1}',
      '.guard-403 h1{font-size:26px;text-transform:uppercase;letter-spacing:1px;color:#cc2233;margin:14px 0 6px}',
      '.guard-403 p{margin:0 0 8px;color:#55677a;font-size:15px;line-height:1.5}',
      '.guard-403 code{background:#e8f0f8;padding:2px 7px;border-radius:5px;font-size:13px;color:#003366;word-break:break-all}',
      '.guard-403 .acts{display:flex;gap:10px;justify-content:center;margin-top:22px;flex-wrap:wrap}',
      '.guard-403 .acts button{font-family:inherit;font-weight:600;font-size:14px;letter-spacing:.5px;',
      ' text-transform:uppercase;border:0;border-radius:8px;padding:11px 20px;cursor:pointer}',
      '.guard-403 .b1{background:#003366;color:#fff}.guard-403 .b1:hover{background:#005599}',
      '.guard-403 .b2{background:#e8f0f8;color:#003366}.guard-403 .b2:hover{background:#d0e4f7}'
    ].join('');
    (document.head || document.documentElement).appendChild(st);
  }

  function alDom(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  function pantalla403(archivo, ses) {
    alDom(function () {
      inyectarCSS();
      if (tema() === 'oscuro') {
        var st = document.createElement('style');
        st.textContent = '.guard-403{background:#0e1621;color:#dce5ef}' +
                         '.guard-403 .card{background:#18222f;box-shadow:0 8px 34px rgba(0,0,0,.5)}' +
                         '.guard-403 p{color:#93a5b8}' +
                         '.guard-403 code{background:#1e2c3d;color:#8ec0ee}' +
                         '.guard-403 .b2{background:#1e2c3d;color:#8ec0ee}';
        document.head.appendChild(st);
      }
      document.title = 'Acceso denegado';
      document.body.className = 'guard-403';
      document.body.innerHTML =
        '<div class="card"><div class="ico">🔒</div><h1>Acceso denegado</h1>' +
        '<p>Hola <b>' + esc(ses.nombre) + '</b>, tu usuario no tiene permiso para abrir este modulo.</p>' +
        '<p><code>' + esc(archivo) + '</code></p>' +
        '<div class="acts"><button class="b1" id="g-ir">Ir al panel</button>' +
        '<button class="b2" id="g-out">Cerrar sesion</button></div></div>';
      document.getElementById('g-ir').onclick  = function () { location.replace(CONFIG.loginPage); };
      document.getElementById('g-out').onclick = function () { salir('salida'); };
      mostrarPagina();
    });
  }

  function montarBarra(ses, archivo) {
    if (document.querySelector('.guard-bar')) return;
    inyectarCSS();
    var meta = metaArchivo(archivo);
    var bar = document.createElement('div');
    bar.className = 'guard-bar';
    bar.innerHTML =
      '<div class="gb-logo">DBS</div><div class="gb-tit">' + esc(meta.titulo) + '</div>' +
      '<div class="gb-sp"></div>' +
      '<div class="gb-user"><div class="gb-av">' + esc(iniciales(ses.nombre)) + '</div>' +
      '<span>' + esc(ses.nombre) + '</span></div>' +
      '<button class="gb-back" type="button">Panel</button>' +
      '<button class="gb-out" type="button" title="Cierra este modulo. La sesion del portal sigue abierta.">Cerrar</button>';
    // Si esta pestana la abrio el portal, volvemos a esa pestana en vez de
    // reemplazar el modulo: asi se puede trabajar en varios a la vez.
    bar.querySelector('.gb-back').onclick = function () {
      try {
        if (window.opener && !window.opener.closed) { window.opener.focus(); return; }
      } catch (e) {}
      location.href = CONFIG.loginPage;
    };
    bar.querySelector('.gb-out').onclick  = function () { cerrarModulo(); };
    document.body.insertBefore(bar, document.body.firstChild);
  }

  /* ==========================================================================
     11. GUARD AUTOMATICO
     ========================================================================== */
  function proteger() {
    var archivo = archivoActual();
    var ses = leerSesion();

    if (!ses) {
      location.replace(CONFIG.loginPage + '?motivo=expirada&next=' + encodeURIComponent(archivo));
      return;
    }
    if (!puede(ses, archivo)) { pantalla403(archivo, ses); return; }

    ses.ult = ahora(); guardarSesion(ses);

    alDom(function () {
      var tag = document.currentScript || document.querySelector('script[src*="guard.js"]');
      if (!(tag && tag.getAttribute('data-barra') === 'no')) montarBarra(ses, archivo);
      mostrarPagina();
    });

    var ultTocado = 0;
    function actividad() {
      var t = ahora();
      if (t - ultTocado > 60000) { ultTocado = t; tocar(); }
    }
    ['click','keydown','scroll','mousemove'].forEach(function (ev) {
      global.addEventListener(ev, actividad, { passive: true });
    });

    setInterval(function () { if (!leerSesion()) salir('expirada'); }, 30000);
    global.addEventListener('storage', function (e) {
      if (e.key === CONFIG.claveSesion && !leerSesion()) salir('salida');
    });

    // Refresco silencioso de permisos: si el admin le quita un modulo, se entera.
    var c = leerCache();
    if (!c || ahora() - c.ts > CONFIG.cacheMin * 60000) {
      cargarUsuarios(function () {
        var s2 = leerSesion();
        if (!s2) { salir('expirada'); return; }
        if (!puede(s2, archivo)) location.reload();
      });
    }
  }

  if (!esLogin()) { ocultarPagina(); proteger(); }

  /* ==========================================================================
     12. API PUBLICA
     ========================================================================== */
  global.Portal = {
    CONFIG: CONFIG,
    ARCHIVOS: ARCHIVOS,
    TODAS_CLAVES: TODAS_CLAVES,
    usuarios:        function () { return USUARIOS; },
    origen:          function () { return origenDatos; },
    cargarUsuarios:  cargarUsuarios,
    guardarUsuarios: guardarUsuarios,
    buscarUsuario:   buscarUsuario,
    login:  login,
    salir:  salir,
    cerrarModulo: cerrarModulo,
    sesion: leerSesion,
    publicarSSO: publicarSSO,
    puede: puede,
    permitidos: permitidos,
    metaArchivo: metaArchivo,
    archivoActual: archivoActual,
    montarBarra: montarBarra,
    esc: esc,
    iniciales: iniciales,
    tema: tema,
    setTema: setTema
  };

})(window);
