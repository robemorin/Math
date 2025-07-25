//0.0.0.js
export function name(){
  return '0.0.0: prueba 0 solo ver si encripta y desencripta';
}
export async function renderTo(container, n, code) {
  try {
    const coreModule = await import('../r2p_core.js');
    const encriptar = coreModule.encriptar;
    const desencriptar = coreModule.desencriptar;

    let S = `<div class="r2pi-contenedor" code="${code}">`;
    let q=[]
    for (let i = 0; i < n; i++) {
      q = generarCadenaAleatoria();
      let encrypted = encriptar(q, code);
      let decrypted = desencriptar(encrypted, code,);
      S += `
        <p>Vamos a probar el encriptamiento</p>
        <p>original ${q}<p>
        <p>encriptado ${encrypted}<p>
        <p>desencriptado ${decrypted} igual? ${q==decrypted}<p>
        <p>$$x_s=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}$$</p>
        <p>El valor de n es: ${n}</p>
      `;
    }
    S += `</div>`;
    container.innerHTML += S;
    
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise([container]);
    }
  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function generarCadenaAleatoria() {
  let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789aáéíóúñÁÉÍÓÚÑ-_+*?';
  let resultado = '';
  const q=[]
  const longitud = 10
  for (let i = 0; i < longitud; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    q[i] = (Math.floor(Math.random() * caracteres.length))
  }
  return resultado;
  //return q
}