//1.1.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'

export function name(){
  return 'Depreciación';
}
export function tipo(){
  return 0
  /*
  0 - Opción múltiple
  1 - Abierto
  2 - Geogebra
  */
}
export async function pregunta(np) { 
    function P1(){
	const PV = Math.round(Math.random() * 100000 + 10000); // Valor inicial del activo
	const I = Math.round(Math.random() * 10 + 5); // Tasa de depreciación anual (5% a 15%)
	
	const annos =Math.round(Math.random() * 15 + 5)
	const N = annos// Periodos totales (1 a 5 años)
	const FV = tlacu.financiera(N, -I, PV, 0, null, 1, 1); // Valor final (depreciado)

	const P = `Un activo con valor inicial de \\$${PV} MXN se deprecia a una tasa anual del ${I}% anual. 
	¿Cuál será su valor al final de ${annos} años?`;

	let R = [FV.toFixed(2)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.30 + 0.85); // Entre 85% y 100% del valor real
			R[k] = (FV * variacion).toFixed(2);
		} while (tlacu.pregunta.hayRepetidos(R));
	}
	return [P, R];
}
function P2(){
	const FV = Math.round(Math.random() * 50000 + 5000); // Valor final del activo (depreciado)
	const I = Math.round(Math.random() * 10 + 5); // Tasa de depreciación anual (5% a 15%)
	const annos = Math.round(Math.random() * 15 + 5); // Años de depreciación (5 a 20 años)
	const CY = 1; // Depreciación compuesta anual (frecuencia = 1)
	const N = annos * CY; // Total de periodos (igual a los años)
	const PV = tlacu.financiera(N, -I, null, 0, FV, 1, 1); // Valor inicial a calcular

	const P = `Un activo se deprecia a una tasa anual del ${I}% anual durante ${annos} años, y su valor final es de $${FV.toFixed(2)} MXN. 
	¿Cuál era su valor inicial?`;

	let R = [PV.toFixed(2)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.6 + 0.7); // Opciones entre 70% y 100% del valor real
			R[k] = (PV * variacion).toFixed(2);
		} while (tlacu.pregunta.hayRepetidos(R));
	}
	return [P, R];
}
function P3(){
	const PV = Math.round(Math.random() * 100000 + 10000); // Valor inicial del activo ($10,000 a $110,000 MXN)
	const FV = Math.round(PV * (0.1 + Math.random() * 0.3)); // Valor final (10% a 40% del valor inicial)
	const annos = Math.round(Math.random() * 15 + 5); // Años de depreciación (5 a 20 años)
	const CY = 1; // Depreciación compuesta anual
	const N = annos * CY; // Total de periodos
	const I = -tlacu.financiera(N, null, PV, 0, FV, 1, 1); // Tasa de depreciación anual a calcular

	const P = `Un activo con valor inicial de \\$${PV.toFixed(2)} MXN se deprecia a un valor final de $${FV.toFixed(2)} MXN después de ${annos} años. 
	¿Cuál es la tasa de depreciación anual?`;

	let R = [I.toPrecision(3)];
	for (let k = 1; k < 6; ++k) {
		do {
			const variacion = (Math.random() * 0.4 + 0.8); // Opciones entre 80% y 120% del valor real
			R[k] = (I * variacion).toPrecision(3);
		} while (tlacu.pregunta.hayRepetidos(R));
	}
	return [P, R];
}
  try {

    return Math.random()<0.66? (Math.random()<0.5?P1():P2()) : P3()

  } catch (error) {
    console.error('Error loading r2p_core.js:', error);
  }
}
