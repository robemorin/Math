/**
 * fichas-ai.js - Utilidades y Estilos para Fichas Matemáticas AI NM
 * Centraliza la lógica de diseño y funciones matemáticas comunes.
 */

import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';

// --- ESTILOS COMUNES ---
export const FICHA_CSS = `
    .ficha-container { font-family: 'Inter', sans-serif; background: white; padding: 1cm; border: 1px solid #eee; min-height: 27cm; }
    .header-ficha { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2c3e50; margin-bottom: 1rem; }
    .tema-tag { font-weight: 700; color: #2c3e50; text-transform: uppercase; font-size: 0.85rem; }
    .mark { float: right; font-weight: bold; border: 1px solid #333; padding: 0 4px; font-size: 0.75rem; background: #f0f0f0; margin-left: 5px; }
    .seccion-title { background: #ecf0f1; padding: 5px; font-weight: bold; margin: 15px 0 10px; border-left: 5px solid #2980b9; color: #2c3e50; }
    .ti-84-tip { background: #e8f4fd; border: 1px dashed #2980b9; padding: 10px; margin: 15px 0; font-size: 0.85rem; border-radius: 6px; position: relative; }
    .ti-84-tip::before { content: '💡'; margin-right: 8px; }
    .exercise-step { margin-bottom: 1.2rem; clear: both; }
    .contexto-especial { background: #fffcf0; border: 1px solid #f1c40f; padding: 10px; border-radius: 4px; margin: 10px 0; }
    @media print { .ficha-container { border: none; padding: 0; min-height: auto; } .page-break { page-break-after: always; } }
`;

// --- FUNCIONES MATEMÁTICAS ---
export function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { a %= b; [a, b] = [b, a]; }
    return a;
}

export function gcd_list(list) {
    return list.reduce((a, b) => gcd(a, b));
}

/**
 * Genera la estructura HTML base para una sección
 */
export function getHeader(id, titulo, subtema) {
    return `
    <style>${FICHA_CSS}</style>
    <div class="ficha-container">
        <div class="header-ficha">
            <span class="tema-tag">${subtema}</span>
            <span class="tema-tag">ID: ${id}</span>
        </div>
    `;
}

/**
 * Genera un tip de TI-84 formateado
 */
export function getTiTip(content) {
    return `<div class="ti-84-tip"><b>TI-84 Hint:</b> ${content}</div>`;
}

/**
 * Carga dinámica de tlacuache elements si no existen
 */
export function initTlacuache() {
    if (!customElements.get('tlacuache-renglon')) {
        import('https://robemorin.github.io/tlacuache/src/tlacuache-elements.js');
    }
}
