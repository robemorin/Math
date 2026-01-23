import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js';

export function name() {
  return "Derivadas directas I";
}

export function tipo() {
  return 0;
}

export async function pregunta(i, code, esImprimible = false) {
  let a=1,b=1,p, dummy
							while(b==1 || a==1){
								a=Math.ceil(Math.random()*10)*(Math.random() > 0.5 ? 1 : -1)
								b=Math.ceil(Math.random()*10+1)
								dummy = tlacu.mcm([a,b])
								a=Math.round(dummy/a)
								b=Math.round(dummy/b)
							}

							p=Math.ceil(Math.random()*5+1)*(Math.random() > 0.5 ? 1 : -1)
							dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
							

  const P = `
    <div class="pregunta-abierta" >
      <p>${i + 1}.- Determine la derivada de $${dummy}$.</p>
    </div>
  `;
  a *= p
							p -= 1
							dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
							const R=[];
							//let ans=[a*p,b*q,p-q,q]
							const op=Math.floor(Math.random()*3)
							
							R[0]=`$ ${dummy} $`
							if(!esImprimible){
							for(let k=1;k<6;++k){
								do{
									switch(op){
										case 0:
											a += Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
											break;
										case 1:
											b +=Math.abs( Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1))
											break;
										case 2:
											p += Math.ceil(Math.random()*4)*(Math.random() > 0.5 ? 1 : -1)
											break;
									}
								dummy = (p>0)?`${a<0?'-':''} \\frac{ ${Math.abs(a)} x${p==1?'':`^{${p}}`}}{${b}}`:`${a<0?'-':''}\\frac{ ${Math.abs(a)} }{${b} x${p==-1?'':`^{${-p}}`} }`
								R[k]=`$ ${dummy} $`
								}while(tlacu.pregunta.hayRepetidos(R))
							}
							return [P,R]
            }


  if (esImprimible) {
    return [Pregunta, `$f'(x)=${R[0]}$`];
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
