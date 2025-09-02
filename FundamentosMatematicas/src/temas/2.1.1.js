//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Interés compuesto';
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
    
    return Math.random()<0.5? (Math.random()<0.5?P1():P2()) : (Math.random()<0.5?P3():P4())

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}


function P1(){
	const cortes = [1,2,3,4,6,12]
	const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual']

	const PV = Math.round(Math.random() * 10000 + 1000); // Valor del préstamo
	//const FV = Math.round(PV*(1.2+0.25*Math.random()) ); // Valor del préstamo
	const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual en %
	const PMT = 0
	const dummy= Math.floor(cortes.length * Math.random()); // Corte de pago
	const CY = cortes[dummy]; // Corte de pago
	const PY = CY
	let N = (Math.random() * 10 + 3)*CY; // Número de años (1 a 10)
	const FV = tlacu.financiera(N, I, PV, 0, null, CY, PY); // Valor Futuro a calcular
	N = tlacu.financiera(null,I, PV,PMT,eval(FV.toFixed(2)),CY,PY); // Número de meses


    const P = `Se invierte \\$${PV} a una tasa de interés anual del ${I}% compuesto anualmente ${Cortes[dummy]}. 
    ¿Cuántos periodos se necesitarán para que la inversión crezca a $${FV.toFixed(2)}?`;

    let R = [Math.ceil(N)];
    for (let k = 1; k < 6; ++k) {
        do {
            R[k] = Math.floor(N +Math.random()*10-5); // Valores cercanos a N
        } while (tlacu.pregunta.hayRepetidos(R));
    }
    return [P, R];
}
function P2(){
	const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const PV = Math.round(Math.random() * 10000 + 1000); // Valor presente (inversión inicial)
const FV = Math.round(PV * (1 + Math.random() * 2)); // Valor futuro (meta)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (aleatorio entre 1 y 10)
const I = tlacu.financiera(N*CY, null, PV, 0, FV, CY, PY); // Tasa de interés a calcular

const P = `Se invierte \\$${PV} MXN durante ${N} años con un interés compuesto ${Cortes[dummy]}, y se espera obtener $${FV}. 
¿Qué tasa de interés anual se requiere?`;

let R = [I.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (I*(0.8+.2*Math.random())).toFixed(2); // Opciones cercanas a I
    } while (tlacu.pregunta.hayRepetidos(R));
}
return [P, R];
}
function P3(){const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const FV = Math.round(Math.random() * 20000 + 1000); // Valor futuro deseado
const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual (%)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (1 a 10)
const PV = tlacu.financiera(N*CY, I, null, 0, FV, CY, PY); // Valor Presente a calcular

const P = `Se desea acumular $${FV} en ${N} años con una tasa de interés anual del ${I}% compuesto ${Cortes[dummy]}. 
¿Cuánto debe invertir hoy?`;

let R = [PV.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (PV*(0.9+0.2*Math.random())).toFixed(2) // Opciones cercanas a PV
    } while (tlacu.pregunta.hayRepetidos(R));
}
return [P, R];
}
function P4(){
	const cortes = [1, 2, 3, 4, 6, 12];
const Cortes = ['anual', 'semestral', 'cuatrimestral', 'trimestral', 'bimestral', 'mensual'];
const PV = Math.round(Math.random() * 10000 + 1000); // Inversión inicial
const I = Math.round(Math.random() * 10 + 1); // Tasa de interés anual (%)
const dummy = Math.floor(cortes.length * Math.random()); // Frecuencia de capitalización
const CY = cortes[dummy]; // Capitalizaciones por año
const PY = CY; // Pagos por año (igual a CY)
const N = Math.round(Math.random() * 10 + 1); // Número de años (1 a 10)
const FV = tlacu.financiera(N*CY, I, PV, 0, null, CY, PY); // Valor Futuro a calcular

const P = `Se invierte $${PV} a una tasa de interés ${I}% compuesto  anual ${Cortes[dummy]} durante ${N} años. 
¿Cuál será el valor futuro de la inversión?`;

let R = [FV.toFixed(2)];
for (let k = 1; k < 6; ++k) {
    do {
        R[k] = (PV * (1 + Math.random() * 2)).toFixed(2); // Opciones cercanas a FV
    } while (tlacu.pregunta.hayRepetidos(R));
}
return [P, R];
}
