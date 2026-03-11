// Importamos tlacu de manera global
var tlacu;
import('https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs').then(module => {
    tlacu = module;
    window.tlacu = module;
});

const Ficha = [
    { Nombre: "Conocimientos previos", subtema: [] },
    { Nombre: "Aritmética y álgebra", subtema: [] },
    f_funciones,
    f_geometria,
    f_estadistica,
    f_analisis
];
