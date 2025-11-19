//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Factor de correlación de Spearman';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(numeroPregunta) { 
  try {
    return PP(numeroPregunta+1)

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}

function PP(numeroPregunta){
						function P1(){
							const a=[], b=[], n=Math.round(Math.random()*5+4)
							const ml=Math.random()*5-2.5
							const bl=Math.random()*20-10
							let Sx="<center><table style='border-spacing: 20px 20px;'><tr><td>$x$</td>"
							let Sy="</tr><tr><td>$y$</td>"
							for(let k=0;k<n;++k){
								a[k]=Math.round(Math.random()*100+3)
								b[k]=Math.round((ml*a[k]+bl)*(0.6+Math.random()*0.8))
								Sx+="<td>"+a[k]+"</td>"
								Sy+="<td>"+b[k]+"</td>"
							}
              let P=''
              if(numeroPregunta===1){
                P = `<center><h3>Factor de correlación de Spearman</h3><br>$\\rho =  1-\\frac{6\\sum d_i^2}{n(n^2-1)}$</center><br><br>`
              }
							P+=numeroPregunta+'.- Calcule el factor de correlación de Spearman de la siguiente tabla'+Sx+Sy+"</table></center>"
							
						
					var R=[];
					const ans=tlacu.stat.spearman(a,b)
					R[0]=`$r_s=${ans.toFixed(3)}$`

					for(var i=1;i<6;++i){
						do{
							let dummy=ans*(.8+Math.random()*.4)
							R[i]=`$r_s=${(dummy<-1?-1:(dummy>1?1:dummy)).toFixed(3)}$`
						}while(tlacu.pregunta.hayRepetidos(R))
					
					}
					return [P,R]
						}
						return P1()
					}
			
