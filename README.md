# Portal DBS — Bienestar Social ENEE

Acceso unificado a los sistemas del Departamento de Bienestar Social (DBS/DDH) de la ENEE.

**Entrada:** [index.html](index.html)

Un solo login abre los siete módulos. Cada usuario ve únicamente los que tiene asignados,
y quien intente abrir un archivo por URL directa sin permiso queda bloqueado.

## Módulos

| Módulo | Archivo |
|---|---|
| Control de Documentos | `Control_de_Documentos_DBS.html` |
| Correspondencia | `Correspondencia_Bienestar_Social_ENEE.html` |
| Solicitudes de Pago | `Solicitudes_Pago_DBS2026.html` |
| Financiamiento de Cuotas | `Financiamiento_Cuotas_DBS.html` |
| Generador de Memorandums | `Generador_Memorandums_DBS.html` |
| Generador de Constancias | `Generador_Constancias_ENEE_v5_3.html` |
| Generador Cláusula 40 | `Generador_Clausula40_DBS.html` |

## Usuarios y permisos

Viven en la hoja **Usuarios** del Google Sheets del departamento. Se administran desde el
propio portal (botón **Usuarios**, solo para administradores): crear, editar, eliminar,
cambiar contraseñas y marcar qué módulos ve cada quien. Los cambios se aplican en todas
las computadoras.

## Aviso

Este repositorio es público y el control de acceso ocurre en el navegador. Sirve para
ordenar quién usa qué, **no** para proteger información confidencial de alguien decidido
a obtenerla. Ningún dato que deba permanecer reservado debería depender solo de este
mecanismo.

## Archivos de apoyo

- `guard.js` — sesión, permisos y protección de cada página
- `GUIA_PORTAL.md` — cómo administrar usuarios y resolver problemas
