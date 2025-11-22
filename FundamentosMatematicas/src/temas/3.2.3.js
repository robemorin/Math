// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Triángulos rectángulos y razones trigonométricas';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
        
        return PP(numeroPregunta);

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}

function PP(numeroPregunta){
					function pitagorasSVG(a,b,c,angulo){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="180" y="140" fill="blue">'+angulo+'°</text>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
							
						return P
					}
					function pitagorasSVG2(a,b,c,angulo){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+b+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="50" y="30" fill="blue">'+angulo+'°</text>'
							P+='<text x="140" y="170" fill="blue">'+a+'</text></svg></center>'
							
						return P
					}
					function P1(numeroPregunta){
						var op=Math.random()
						if(op<1/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=Math.round(Math.random()*20+1)
							var c='x'
							var b=''
							var q=eval(a)/Math.sin(eval(angulo)*Math.PI/180)
						}else if(op<2/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=Math.round(Math.random()*20+1)
							var c=''
							var b='x'
							var q=eval(a)/Math.tan(eval(angulo)*Math.PI/180)
						}else if(op<3/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=''
							var c='x'
							var b=Math.round(Math.random()*20+1)
							var q=eval(b)/Math.cos(eval(angulo)*Math.PI/180)
						}else if(op<4/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a='x'
							var c=''
							var b=Math.round(Math.random()*20+1)
							var q=eval(b)*Math.tan(eval(angulo)*Math.PI/180)
						}else if(op<5/6){
							var angulo=(Math.random()*70+10).toFixed(2)
							var a='x'
							var c=Math.round(Math.random()*20+1)
							var b=''
							var q=eval(c)*Math.sin(eval(angulo)*Math.PI/180)
						}else{
							var angulo=(Math.random()*70+10).toFixed(2)
							var a=''
							var c=Math.round(Math.random()*20+1)
							var b='x'
							var q=eval(c)*Math.cos(eval(angulo)*Math.PI/180)
						}
						
						var P=numeroPregunta+".- Obtenga el valor de $x$ <br>"+(Math.random()<0.5?pitagorasSVG(a,b,c,angulo):pitagorasSVG2(a,b,c,angulo))
							
						var R=[];
						
						R[0]=q.toFixed(2)
						for(var i=1;i<6;++i){
							do{
								R[i]=(q+Math.random()*2-1).toFixed(2)
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
					
					return P1(numeroPregunta+1)
					
				}