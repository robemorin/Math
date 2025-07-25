//0.0.2.js
export function name(){
  return '0.0.1: prueba 1 Plantilla Cuestionario abierto';
}
export function tipo(){
  return 1
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta, code) {
  try {    
    const a = Math.round(Math.random() * 9 + 1);
    const b = Math.round(Math.random() * 9 + 1);
    const c = a + b;
    
    return `
      <div class="pregunta-abierta" style="display:none" data-respuesta="${c}">
        <p>${numeroPregunta+1}.- Resultado de ${a}+${b} = </p>
        <math-field 
          id="math-field-${numeroPregunta}" 
          name="campo-${numeroPregunta}"
          data-respuesta="${c}"
        ></math-field>
      </div>
    `;
  } catch (error) {
    console.error('Error al generar pregunta:', error);
    return '<p>Error al cargar la pregunta</p>';
  }
}

