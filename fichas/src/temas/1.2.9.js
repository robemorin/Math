import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

export function name() {
    return 'Sucesiones y Series Aritméticas (Aplicaciones)';
}

function CR(n) {
    let s = "";
    for (let i = 0; i < n; i++) s += "<br>";
    return s;
}

export async function pregunta() {
    // Problema 1: Fábrica de autos (Similar al ej 17)
    let prod_inicial = Math.floor(Math.random() * 5) + 3; // 3 a 7
    let aumento = Math.floor(Math.random() * 5) + 8; // 8 a 12
    
    let Pregunta = `<div class="problema2"><h3>1. Contexto de producción</h3>
    Una fábrica de vehículos comienza produciendo $${prod_inicial}$ unidades en el primer mes. A partir de entonces, la producción aumenta en $${aumento}$ unidades cada mes.
    <ol class="FT_ol_a">
        <li>Determine el número de vehículos fabricados en el mes 6. <div>2</div></li>${CR(2)}
        <li>Justifique por qué la producción total de cada mes forma una progresión aritmética. <div>2</div></li>${CR(2)}
        <li>¿En qué mes la producción mensual superará por primera vez las 150 unidades? <div>3</div></li>${CR(3)}
    </ol></div>`;

    let Solucion = `<div class="ans"><b>P1:</b> (a) $u_6 = ${prod_inicial} + (6-1)${aumento} = ${prod_inicial + 5 * aumento}$ (b) Diferencia constante $d=${aumento}$. (c) $${prod_inicial} + (n-1)${aumento} > 150 \\Rightarrow n > ${Math.ceil((150 - prod_inicial)/aumento + 1)}$. El mes es ${Math.ceil((150 - prod_inicial)/aumento + 1)}$.</div><br>`;

    // Problema 2: Consumo de agua (Similar al ej 18)
    let capacidad = 2000 + Math.floor(Math.random() * 5) * 500; // 2000 a 4000
    let consumo = 100 + Math.floor(Math.random() * 5) * 25; // 100 a 200
    
    Pregunta += `<div class="problema2"><h3>2. Gestión de recursos</h3>
    Yafiah tiene un tanque de agua con ${capacidad} litros. Ella utiliza ${consumo} litros cada semana para regar su jardín.
    <ol class="FT_ol_a">
        <li>Escriba una fórmula para $u_n$, la cantidad de litros restantes después de $n$ semanas. <div>2</div></li>${CR(2)}
        <li>¿Cuánta agua quedará en el tanque después de 8 semanas? <div>2</div></li>${CR(2)}
        <li>¿En qué semana el tanque tendrá menos de 500 litros? <div>3</div></li>${CR(3)}
    </ol></div>`;

    Solucion += `<div class="ans"><b>P2:</b> (a) $u_n = ${capacidad} - ${consumo}n$ (b) $u_8 = ${capacidad - consumo * 8}$ (c) ${capacidad} - ${consumo}n < 500 \\Rightarrow n > ${((capacidad - 500)/consumo).toFixed(1)}$. Semana ${Math.floor((capacidad - 500)/consumo) + 1}$.</div><br>`;

    // Problema 3: Aproximaciones (Similar a la tabla de personas en ascensor)
    let base = 50 + Math.floor(Math.random() * 20);
    let diff = 70 + Math.floor(Math.random() * 10);
    
    Pregunta += `<div class="problema2"><h3>3. Modelización mediante aproximación</h3>
    La masa total de un grupo de estudiantes que sube a un ascensor sigue un comportamiento aproximadamente aritmético. Se sabe que para 1 estudiante la masa es ${base} kg y para 2 es ${base + diff} kg.
    <ol class="FT_ol_a">
        <li>Determine el modelo lineal $u_n = dn + c$ que estima la masa para $n$ estudiantes. <div>3</div></li>${CR(3)}
        <li>Estime la masa total para un grupo de 8 estudiantes utilizando su modelo. <div>2</div></li>${CR(2)}
        <li>¿Por qué este modelo es una "aproximación" y no una medida exacta? <div>2</div></li>${CR(2)}
    </ol></div><div class="page"></div>`;

    Solucion += `<div class="ans"><b>P3:</b> (a) $d=${diff}, u_1 = ${base} \\Rightarrow c = ${base - diff}$. $u_n = ${diff}n + ${base - diff}$. (b) $u_8 = ${diff * 8 + (base - diff)}$. (c) La masa de las personas es variable y no incrementa de forma constante.</div>`;

    return [Pregunta, Solucion];
}

// Nota técnica: Fuente original de los ejercicios: [7].pdf
// Este archivo contiene problemas de progresiones aritméticas y modelización.