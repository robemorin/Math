// 3.1.3.js (Fracciones Parciales TIL - Denominador Cúbico Factorizado)
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
    return 'división de números complejos';
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
function PP(x){
	const a = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
	const b = new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))

	const P=`Sea $a=${a.toString()}$ y $b=${b.toString()}$, calcule $a\\div b$`
	
	const R=[];
	R[0]=`$${a.dividir(b).toString()}$`//`$|${b.toString()}|^2 =(${b.toString()})(${b.conjugado().toString()}) = ${b.multiplicar(b.conjugado()).toString()}$`
	for(let i=1;i<6;++i){
		do{
			let c=new Complejo(Math.round(Math.random()*19-9.5),Math.round(Math.random()*19-9.5))
			R[i]=`$${a.dividir(c).toString()}$`
		}while(tlacu.pregunta.hayRepetidos(R))
	}
	return [P,R]
}

function simplify_frac(a){
	/* [5,3] <- simplify_frac([10,6]) solo dos valores*/
	let mcd = tlacu.mcd(a)
	mcd *= mcd*a[1]<0?-1:1
	return [a[0]/mcd,a[1]/mcd]
}
class Complejo {
    constructor(re, im, red = 1, imd = 1) {
        this.re = simplify_frac([re,red])
        this.im = simplify_frac([im,imd])
    }
	
    // Suma de números complejos
    sumar(otro) {
		let dummy=[	simplify_frac([this.re[0]*otro.re[1]+this.re[1]*otro.re[0],this.re[1]*otro.re[1]]),
					simplify_frac([this.im[0]*otro.im[1]+this.im[1]*otro.im[0],this.im[1]*otro.im[1]])]
		return new Complejo(
			dummy[0][0],dummy[1][0],
			dummy[0][1],dummy[1][1]
		);
    }

    // Resta de números complejos
    restar(otro) {
        let dummy=[	simplify_frac([this.re[0]*otro.re[1]-this.re[1]*otro.re[0],this.re[1]*otro.re[1]]),
					simplify_frac([this.im[0]*otro.im[1]-this.im[1]*otro.im[0],this.im[1]*otro.im[1]])]
		return new Complejo(
			dummy[0][0],dummy[1][0],
			dummy[0][1],dummy[1][1]
		);
    }

    // Multiplicación de números complejos
    multiplicar(otro) {
        let dummy=[	simplify_frac([this.re[0]*otro.re[0]*this.im[1]*otro.im[1]-this.im[0]*otro.im[0]*this.re[1]*otro.re[1],this.re[1]*otro.re[1]*this.im[1]*otro.im[1]]),
					simplify_frac([this.re[0]*otro.im[0]*this.im[1]*otro.re[1]+this.im[0]*otro.re[0]*this.re[1]*otro.im[1],this.re[1]*otro.re[1]*this.im[1]*otro.im[1]])]
		return new Complejo(
			dummy[0][0],dummy[1][0],
			dummy[0][1],dummy[1][1]
		);
    }

    // División de números complejos
    dividir(otro) {
        let c = this.multiplicar(otro.conjugado())
        const div = otro.modulo2()
        c.re[1] *= div
        c.im[1] *= div
        let dummy=[	simplify_frac([c.re[0],c.re[1]]),
                    simplify_frac([c.im[0],c.im[1]])]
        return new Complejo(
            dummy[0][0],dummy[1][0],
			dummy[0][1],dummy[1][1]
        );
    }

    // Módulo (magnitud) de un número complejo
    modulo2() {
        return ((this.re[0]/this.re[1]) ** 2 + (this.im[0]/this.im[1]) ** 2);
    }

    // Conjugado de un número complejo
    conjugado() {
        return new Complejo(this.re[0], -this.im[0],this.re[1], this.im[1]);
    }

    // Representación en forma de cadena
    toString() {
		let stringReal, stringImg
		if(this.re == 0 && this.im == 0){
			return '0'
		}

		if(this.re[0]==0){
			stringReal=''
			stringImg = `${(this.im[0]>0?'':'-')} ${this.im[1]==1?(Math.abs(this.im[0])==1?'':Math.abs(this.im[0]))+'j':`\\frac{${Math.abs(this.im[0])}}{${this.im[1]}}j`}`
			return stringReal+stringImg
		}else{
			stringReal = `${(this.re[0]>0?'':'-')} ${this.re[1]==1?Math.abs(this.re[0]):`\\frac{${Math.abs(this.re[0])}}{${this.re[1]}}`}`
		}

		if(this.im[0]==0){
			stringImg=''
		}else{
			stringImg = `${(this.im[0]>0?'+':'-')} ${this.im[1]==1?(Math.abs(this.im[0])==1?'':Math.abs(this.im[0]))+'j':`\\frac{${Math.abs(this.im[0])}}{${this.im[1]}}j`}`
		}
		return stringReal+stringImg

        //return `${this.real[1]==1?this.real[0]:`\\frac{${Math.abs(this.real[0])}}{${this.real[0]}}`} ${this.imaginario >= 0 ? '+' : '-'} ${Math.abs(this.imaginario)}i`;
    }
}
