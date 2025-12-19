# Contexto Arquitectura - Plataforma Matemáticas NM

## 📋 Resumen General
Plataforma educativa para **Matemáticas NM (Aplicaciones e Interpretaciones)** del Diploma del Bachillerato Internacional. Sistema modular que genera ejercicios aleatorios de múltiples temas con validación automática.

---

## 🏗️ Estructura de Carpetas

```
Math/
├── FundamentosMatematicas/    (Fundamentos - Temas 1.x a 3.x)
├── mate1/                       (Matemáticas 1)
├── mate2/                       (Matemáticas 2)
├── robotica/                    (Robótica - con integración GeoGebra)
└── src/                         (Recursos compartidos)
    ├── package.json
    ├── index.html
    └── ...
```

Cada carpeta de nivel contiene:
```
nivel/
├── index.html                  (Página principal)
├── actividad.html              (Vista de actividades)
├── imp.html                    (Impresión/reporte)
├── revisar.html                (Revisión de respuestas)
├── Tarea2.html                 (Tarea específica)
└── src/
    ├── main.js                 (Lógica principal del curso)
    ├── r2p.js                  (Sistema de renderizado)
    ├── r2p_core.js             (Core - utilidades y encriptación)
    ├── impresion.mjs           (Módulo de impresión)
    ├── raiz2pi.css             (Estilos)
    └── temas/
        ├── 1.1.1.js            (Tema específico)
        ├── 1.1.2.js
        ├── ...
        ├── index.js            (Registro de temas)
        └── index.json          (Catálogo de temas)
```

---

## 📚 Sistema de Temas

### Estructura Base de un Archivo de Tema
Cada archivo en `temas/` exporta 4 funciones principales:

```javascript
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

// ❌ Nombre del tema (usado en UI y reportes)
export function name() {
  return 'Nombre del Tema';
}

// ❌ Tipo de ejercicio
export function tipo() {
  return 0;  // 0=Opción múltiple, 1=Abierto, 2=GeoGebra, 3=Híbrido
}

// ✅ Función principal que genera la pregunta
export async function pregunta(numeroPregunta, code, esImprimible) {
  // Retorna: [preguntaHTML, [respuesta_correcta, ...opciones_incorrectas]]
  // O HTML para tipos 1 y 2
}

// ✅ Función de renderizado (para tipos 1, 2, 3)
export async function render(container, n, code) {
  // Renderiza preguntas interactivas
  // Define window.accionR2P para validación
}

// ✅ Función GeoGebra (solo para tipo 2)
export async function renderGeoGebra(container, n, code) {
  // Integra applet GeoGebra
  // Define window.accionGeoGebra para validación
}
```

### Ejemplo: Tema de Opción Múltiple (tipo 0)
```javascript
// mate2/src/temas/1.1.1.js - Redondeo de números I
export async function pregunta(numeroPregunta) { 
  const numero = Math.random() * 10 ** (Math.random() * 5 + 3);
  const opciones = [2, 5, 10, 20, 50, 100, 200, 500];
  const opcion = Math.floor(Math.random() * opciones.length);
  const q = opciones[opcion];
  
  const P = `${numeroPregunta + 1}.- Redondea ${numero} al ${q} más cercano.`;
  const R = [Math.round(numero / q) * q]; // Respuesta correcta
  
  // Generar 5 opciones incorrectas
  for (let i = 1; i < 6; ++i) {
    do {
      R[i] = Math.round(numero / q) * q + Math.round(q * (Math.random() * 6 - 3)) * q;
    } while (tlacu.pregunta.hayRepetidos(R));
  }
  
  return [P, R];
}
```

### Ejemplo: Tema Abierto con Validación (tipo 1)
```javascript
// mate2/src/temas/1.1.2.js - con math-field
export async function pregunta(i, code, esImprimible = false) {
  const numero = Math.round(Math.random() * 10 ** (Math.random() * 5 + 3));
  const q = [2, 5, 10, 20, 50, 100, 200, 500];
  const dummy = Math.floor(Math.random() * q.length);
  
  const Pregunta = `
    <div class="pregunta-abierta" data-numero="${numero}" data-red="${q[dummy]}">
      <p>${i + 1}.- Redondea ${numero} al ${q[dummy]} más cercano.</p>
      <p>$${numero}\\approx $<math-field></math-field></p>
    </div>
  `;
  
  if (esImprimible) {
    const respuesta = Math.round(numero / q[dummy]) * q[dummy];
    return [Pregunta, respuesta];
  }
  return Pregunta;
}

export async function render(container, n, code) {
  window.accionR2P = function(i) {
    let pregunta = document.getElementsByClassName('pregunta-abierta')[i];
    const mathField = pregunta.getElementsByTagName('math-field')[0];
    const respuesta = Number(mathField.value);
    
    const numero = Number(pregunta.dataset.numero);
    const q = Number(pregunta.dataset.red);
    const correcta = Math.round(numero / q) * q;
    
    return respuesta === correcta;
  };
}
```

### Ejemplo: Tema GeoGebra (tipo 2)
```javascript
// robotica/src/temas/2.1.1.js
export function tipo() {
  return 2;  // GeoGebra
}

export async function pregunta(i, code) {
  return `
    <div class="pregunta-geogebra" data-r="0" data-arg="0">
      <p>${i + 1}.- Pregunta con figura...</p>
      <div id="applet_container_${i}" class="ggb-container"></div>
      <p>$v = $ <math-field>(a,b)</math-field></p>
    </div>
  `;
}

export async function renderGeoGebra(container, n, code) {
  const material_id = "xwqqu9em";  // ID del applet GeoGebra
  window.ggbApps = [];
  
  for (let i = 0; i < n; i++) {
    const params = {
      appName: 'classic',
      width: 600,
      height: 400,
      material_id,
      id: `ggbApplet_${i}`,
      appletOnLoad(api) {
        window.ggbApps[i] = api;
        api.setValue("a", Math.round(Math.random() * 10 - 5));
        api.setValue("b", Math.round(Math.random() * 10 - 5));
      }
    };
    new GGBApplet(params, true).inject(`applet_container_${i}`);
  }
  
  window.accionGeoGebra = function(i) {
    const api = window.ggbApps[i];
    let pregunta = document.getElementsByClassName('pregunta-geogebra')[i];
    const mathFields = pregunta.getElementsByTagName('math-field');
    
    const a = api.getValue("a");
    const v = mathFields[0].value;
    
    return v === `(${a},${b})`;  // Validación
  };
}
```

---

## 🛠️ Librerías Importadas

### 1. **Tlacuache** (https://robemorin.github.io/tlacuache/)
Librería de utilidades matemáticas modificable. Proporciona:

```javascript
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

// Funciones disponibles:
tlacu.financiera()           // Cálculos financieros (VP, VF, tasa, períodos)
tlacu.poli.print()           // Imprime polinomios de forma legible
tlacu.pregunta.hayRepetidos() // Valida si hay duplicados en arrays
// + muchas más...
```

**Uso típico:**
```javascript
// Cálculos financieros
const FV = tlacu.financiera(N, I, PV, 0, null, CY, PY);

// Validar respuestas duplicadas
while (tlacu.pregunta.hayRepetidos(R)) { /* generar nuevas */ }

// Formatear polinomios
const P = `$${tlacu.poli.print([a, b, c])}=0$`;
```

### 2. **MathLive** (math-field HTML element)
Elemento personalizado para entrada de expresiones matemáticas:

```html
<math-field></math-field>

<!-- JavaScript -->
const mathField = document.getElementsByTagName('math-field')[0];
const valor = mathField.value;  // Obtiene valor en LaTeX
```

### 3. **GeoGebra** (para robotica/)
Applet de geometría dinámica integrado:

```javascript
// En HTML:
<script src="https://www.geogebra.org/apps/deployggb.js"></script>

// En código:
new GGBApplet(params, true).inject(`container_id`);
window.ggbApps[i] = api;  // API del applet
api.getValue("variable");  // Obtener valores
api.setValue("variable", value);  // Establecer valores
```

---

## 🔄 Flujo de Ejecución

### 1. Carga Inicial (`main.js`)
```
1. Importa r2p.js (sistema de renderizado)
2. Importa r2p_core.js (core de utilidades)
3. Define nombreCurso e informacionCurso
4. Función info() → carga datos de tema
5. Función autenticar() → desencripta parámetros de URL
```

### 2. Cargar Tema (`r2p.js` - clase R2P)
```
1. cargarTema(tema)
   ├─ Lee módulo tema (ej: "./temas/1.1.1.js")
   ├─ Obtiene tipo() [0, 1, 2, 3]
   ├─ Genera código encriptación (generarCodigo())
   └─ Según tipo:
      ├─ Tipo 0: Opción múltiple
      │  ├─ Llama pregunta() para cada ejercicio
      │  ├─ Usa r2pCore.pregunta() para estructura HTML
      │  └─ Espera selección de radio buttons
      │
      ├─ Tipo 1: Respuesta abierta
      │  ├─ Llama pregunta() para HTML base
      │  ├─ Llama render() para renderizado interactivo
      │  └─ Define window.accionR2P para validación
      │
      ├─ Tipo 2: GeoGebra
      │ ├─ Carga script GeoGebra
      │  ├─ Llama renderGeoGebra()
      │  └─ Define window.accionGeoGebra para validación
      │
      └─ Tipo 3: Híbrido (pregunta + render)
         └─ Combina pregunta() y render()
```

### 3. Revisión (`r2p_core.js` - función revisar())
```
1. Obtiene tipo de contenedor
2. Valida respuestas:
   ├─ Tipo 0: revisa radio seleccionados
   ├─ Tipo 1: llama window.accionR2P(i)
   ├─ Tipo 2: llama window.accionGeoGebra(i)
   └─ Tipo 3: llama window.accionR2P(i)
3. Encripta resultado
4. Genera código QR con resultado
```

---

## 🔐 Encriptación

El sistema usa encriptación para:
- Proteger respuestas en URLs
- Generar reportes verificables
- Crear códigos QR con resultados

```javascript
// En r2p_core.js
const code = generarCodigo();  // Matriz 3x3 con determinante ≠ 0 (mod 79)

// Encriptar respuesta
const encriptado = encriptar([aciertos, total, tipo, ...], code);

// Desencriptar (para revisar resultados)
const [aciertos, total, tipo, ...] = desencriptar(encriptado, code);
```

---

## 📊 index.json - Catálogo de Temas

Cada nivel tiene `temas/index.json` con estructura:

```json
[
  ["1.1.1", "Redondeo de números I"],
  ["1.1.2", "Redondeo de números II"],
  ["1.2.1", "Notación científica"],
  ...
]
```

Mapea código de tema → nombre para UI.

---

## 🎯 Flujo de Creación de Nuevo Tema

### Paso 1: Crear archivo `temas/X.Y.Z.js`
```javascript
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name() { return 'Título del Tema'; }
export function tipo() { return 0; }  // 0, 1, 2 o 3
export async function pregunta(numeroPregunta) {
  // Lógica de generación
  return [P, R];  // Para tipo 0
}
export async function render(container, n, code) {
  // Para tipos 1, 2, 3 (si es necesario)
}
```

### Paso 2: Actualizar `temas/index.json`
```json
[
  ...
  ["X.Y.Z", "Título del Tema"],
  ...
]
```

### Paso 3: Actualizar `temas/index.js` (si existe registro)
```javascript
import * as tema from './X.Y.Z.js';
export const XYZ = tema;
```

---

## 🖨️ Impresión (`impresion.mjs`)

Módulo que:
1. Genera todas las preguntas con respuestas
2. Formatea para PDF
3. Incluye espacio para respuestas manual del estudiante

```javascript
// Llamada en revisar.html
const impresion = await import('./impresion.mjs');
await impresion.generarPDF(tema, numEjercicios);
```

---

## 🎨 Elementos HTML Personalizados

- `<math-field>` - Campo de entrada LaTeX (MathLive)
- `.r2pi-pregunta` - Contenedor pregunta opción múltiple
- `.pregunta-abierta` - Contenedor pregunta abierta
- `.pregunta-geogebra` - Contenedor GeoGebra
- `.ggb-container` - Contenedor applet GeoGebra

---

## 🔧 Herramientas y Configuración

### package.json
```json
{
  "name": "math-platform",
  "type": "module",  // ES6 modules
  "main": "src/main.js"
}
```

### Servidor Local
Para desarrollo, ejecutar servidor que soporte módulos ES6:
```bash
npx http-server -p 8000  # Requiere CORS
```

### Librerías Externas
- **Tlacuache**: Matemáticas y utilidades
- **MathLive**: Entrada LaTeX
- **GeoGebra**: Geometría dinámica (solo robotica/)
- **QRCode.js**: Generación códigos QR

---

## 📝 Convenciones

### Nombres de Temas
- Formato: `X.Y.Z.js` (3 números separados por punto)
- Ejemplo: `1.1.1.js`, `2.3.5.js`, `11.1.2.js`

### Estructura de Respuestas
```javascript
const R = [
  opcion_correcta,      // R[0]
  opcion_incorrecta_1,  // R[1]
  opcion_incorrecta_2,  // R[2]
  opcion_incorrecta_3,  // R[3]
  opcion_incorrecta_4,  // R[4]
  opcion_incorrecta_5   // R[5]
];
```

### IDs y Clases
- Preguntas: `pregunta-abierta`, `pregunta-geogebra`, `r2pi-pregunta`
- Inputs: `r2p-input-radio`, `math-field`
- Botones: `r2p-revisar`, `r2p-imprimir`

---

## 🚀 Mejoras Futuras Sugeridas

1. **Validación de Tlacuache**: Documentar funciones disponibles
2. **Templates**: Crear templates reutilizables para tipos comunes
3. **Testing**: Agregar suite de tests para nuevos temas
4. **Analytics**: Registrar intento de estudiantes
5. **Mobile**: Optimizar UI para dispositivos móviles
6. **Cache**: Cachear temas cargados frecuentemente

---

**Última actualización**: Diciembre 17, 2025
**Versión del proyecto**: 2.0+ (Multi-nivel, GeoGebra integrado)
