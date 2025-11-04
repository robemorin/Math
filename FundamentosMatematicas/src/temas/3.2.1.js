// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Pitágoras';
}

export function tipo(){
    return 0; // Opción múltiple
}

export async function pregunta(numeroPregunta) { 
    try {
        
        return PP();

    } catch (error) {
        console.error('Error al cargar la pregunta:', error);
        return [`${numeroPregunta+1}.- Error al generar la pregunta.`, ["Error"]];
    }
}

function PP(){
					function pitagorasSVG(a,b,c){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
						return P
					}
					function P1(x){
						if(Math.random()<1/3){
							var a=Math.round(Math.random()*20+1)
							var c=a+Math.round(Math.random()*20+1)
							var b='b'
							var q=Math.sqrt(c*c-a*a)
						}else if(Math.random()<1/2){
							var a='a'
							
							var b=Math.round(Math.random()*20+1)
							var c=b+Math.round(Math.random()*20+1)
							var q=Math.sqrt(c*c-b*b)
						}else{
							var a=Math.round(Math.random()*20+1)
							var c='c'
							var b=Math.round(Math.random()*20+1)
							var q=Math.sqrt(a*a+b*b)
						}
						
						var P="Obtenga el valor del lado faltante del siguiente  triángulo<br>"+pitagorasSVG(a,b,c)
							
						var R=[];
						
						R[0]=q.toFixed(2)
						for(var i=1;i<6;++i){
							do{
								R[i]=(q+Math.random()*8-4).toFixed(2)
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
                    return P1()
}