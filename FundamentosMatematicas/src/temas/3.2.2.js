// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Relaciones trigonométricas en triángulos rectángulos';
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
					function pitagorasSVG(a,b,c){
						var P='<center><svg width="340" height="200"  fill="none" xmlns="http://www.w3.org/2000/svg">'
							P+='<polyline points="20,20 20,150 300,150 20,20"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							P+='<polyline points="20,140 30,140 30, 150"'
							P+='style="fill:none;stroke:black;stroke-width:3" />'
							
							P+='<text x="25" y="90" fill="blue">'+a+'</text>'
							P+='<text x="180" y="75" fill="blue">'+c+'</text>'
							P+='<foreignObject x="200" y="125" width="50" height="50">    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Times; font-size:15px">   $\\theta$    </div></foreignObject>'
							P+='<text x="140" y="170" fill="blue">'+b+'</text></svg></center>'
							
						return P
					}
					function P1(numeroPregunta){
						if(Math.random()<1/3){
							var a=Math.round(Math.random()*20+1)
							var c=a+Math.round(Math.random()*20+1)
							var b=''
							var at=a
							var bt="\\sqrt{"+(c*c-a*a)+"}"
							var ct=c
							var x=[at, bt, ct, "\\sqrt{"+(c*c+a*a)+"}"]
						}else if(Math.random()<1/2){
							var a=''
							var b=Math.round(Math.random()*20+1)
							var c=b+Math.round(Math.random()*20+1)
							var at="\\sqrt{"+(c*c-b*b)+"}"
							var bt=b
							var ct=c
							var x=[at, bt, ct, "\\sqrt{"+(c*c+b*b)+"}"]
						}else{
							var a=Math.round(Math.random()*20+1)
							var c=''
							var b=Math.round(Math.random()*20+1)
							var at=a
							var bt=b
							var ct="\\sqrt{"+(b*b+a*a)+"}"
							var x=[at, bt, ct, "\\sqrt{"+(b*b-a*a)+"}"]
						}
						var op=Math.random()
						if(op<1/6){
							var ftrig="$\\sin(\\theta)$"
							var q="$\\frac{"+at+"}{"+ct+"}$"
						}else if(op<2/6){
							var ftrig="$\\cos(\\theta)$"
							var q="$\\frac{"+bt+"}{"+ct+"}$"
						}else if(op<3/6){
							var ftrig="$\\tan(\\theta)$"
							var q="$\\frac{"+at+"}{"+bt+"}$"
						}else if(op<4/6){
							var ftrig="$\\cot(\\theta)$"
							var q="$\\frac{"+bt+"}{"+at+"}$"
						}else if(op<5/6){
							var ftrig="$\\sec(\\theta)$"
							var q="$\\frac{"+ct+"}{"+bt+"}$"
						}else{
							var ftrig="$\\csc(\\theta)$"
							var q="$\\frac{"+ct+"}{"+at+"}$"
						}
						
						var P=numeroPregunta+".- Obtenga el valor "+ftrig+" según el siguiente triángulo<br>"+pitagorasSVG(a,b,c)
							
						var R=[];
						
						R[0]=q
						for(var i=1;i<6;++i){
							do{
								R[i]="$\\frac{"+x[Math.floor(Math.random()*4)]+"}{"+x[Math.floor(Math.random()*4)]+"}$"
							}while(tlacu.pregunta.hayRepetidos(R))
						
						}
						return [P,R]
					}
					return P1(numeroPregunta+1)	
				}