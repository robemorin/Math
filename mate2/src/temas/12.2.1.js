import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return "Derivadas directas I";
}

export function tipo() {
  return 0;
}

export async function pregunta(i, code, esImprimible = false) {
  let a,b,p,q, dummy
  a=Math.ceil(Math.random()*10)*(Math.random() > 0.5 ? 1 : -1)
  b=Math.ceil(Math.random()*10)
  dummy = tlacu.mcm([a,b])
  a=Math.round(dummy/a)
  b=Math.round(dummy/b)
  
  do{
    p=Math.ceil(Math.random()*5+1)*(Math.random() > 0.5 ? 1 : -1)
    q=Math.ceil(Math.random()*6+1)	
    dummy = tlacu.mcm([Math.round(p),Math.round(q)])
    p=Math.round(dummy/p)
    q=Math.round(dummy/q)
    console.log("p: "+p+", q: "+q)
  }while(q==1)

  const P = `
    <div class="pregunta-abierta" >
      <p>${i + 1}.- Determine la derivada de ${tlacu.poli.raiz(a, b, "x", p, q)}.</p>
    </div>
  `;
  const R=[];
  let ans=[a*p,b*q,p-q,q]
  const op=Math.floor(Math.random()*4)

  R[0]=tlacu.poli.raiz(ans[0], ans[1], "x", ans[2], ans[3])
  if (!esImprimible){
  for(let k=1;k<6;++k){
  do{
    ans[op]+=Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
    R[k]=tlacu.poli.raiz(ans[0], ans[1], "x", ans[2], ans[3])
  }while(tlacu.pregunta.hayRepetidos(R))
  }
    return [P, R];
  }


  if (esImprimible) {
    return [Pregunta, `$f'(x)=${fp_txt}$`];
  }
  return Pregunta;
}

export async function render(container, n, code) {
  window.accionR2P = function(i) {
    const el = document.getElementsByClassName('pregunta-abierta')[i];
    const mf = el.getElementsByTagName('math-field')[0];
    let val = mf.value;
    let expected = el.dataset.deriv;
    
    // Normalización para comparar LaTeX
    const clean = (s) => s.replace(/\s+/g, '')
                          .replace(/\left/g, '')
                          .replace(/\right/g, '')
                          .replace(/[{}]/g, ''); 
    
    // Comparación directa o normalizada
    if (val === expected) return true;
    if (clean(val) === clean(expected)) return true;

    return false;
  };
}
