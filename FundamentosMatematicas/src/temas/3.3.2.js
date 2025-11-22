import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'Forma cartesiana a forma polar de números complejos';
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
	const z = [Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5)]
	const r = Math.sqrt(z[0]**2+z[1]**2).toFixed(2)
	const theta = (Math.atan2(z[1],z[0])*(180/Math.PI)).toFixed(2)

	const P=`${numeroPregunta+1}.- Exprese a $${z[0]} ${z[1]<0?'-':'+'} ${Math.abs(z[1])}j$ en forma exponencial $re^{\\theta j}$`
	const op = Math.round(Math.random())
	const R=[];
	R[0]=`$${r}e^{${theta}°j}$`
	for(let i=1;i<6;++i){
		do{
			R[i]=`$${(eval(r)+(op==0?0:1)*3*(Math.random()-0.5)).toFixed(2)}e^{${(eval(theta)+(op==0?1:0)*20*(Math.random()-.5)).toFixed(2)}°j}$`
		}while(tlacu.pregunta.hayRepetidos(R))
	}
	return [P,R]
}

