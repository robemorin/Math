// 17.1.js
import * as tlacu from 'https://robemorin.github.io/tlacuache/src/tlacuache-modulo.mjs';
import 'https://robemorin.github.io/tlacuache/src/tlacuache-elements.js'
import { desencriptar, encriptar, generarCodigo } from '../src/r2p_core.js'

export function name() {
    return 'Conociendo el Diagrama de Voronoi';
}

export function tipo() {
    return 3;
}

export async function pregunta() {
    try {
        const Pregunta = `
      <div class="pregunta-abierta" data-paso="1" data-puntos="0">
        <p>Vamos a generar el Diagrama de Voronoi paso a paso sobre el plano físico de GeoGebra.</p>
        
        <div id="paso1">
          <p><b>Paso 1:</b> ¿Cuántos puntos (restaurantes) deseas graficar en total? Llámales $P_i$. (Escribe un número, se recomiendan de 3 a 5 para esta práctica manual).</p>
          <table>
            <tr><td>Número de puntos: </td><td><math-field id="input-puntos-0"></math-field></td></tr>
          </table>
        </div>
        
        <div id="paso2" style="display: none;">
          <p><b>Paso 2:</b> Observa los puntos generados en el plano de GeoGebra de abajo. Distribúyelos y colócalos en donde desees utilizarlos.</p>
          <p><span id="resultado_0" name="question"></span></p>
        </div>

        <div id="paso3_container" style="display: none; padding-top: 20px; border-top: 1px solid #ccc; margin-top:20px;">
          <h3 id="lbl_titulo_paso3">Paso 3: Deduciendo la región de <span id="lbl_i_base1">$P_1$</span></h3>
          <p>Analizaremos las mediatrices de <span id="lbl_i_base2">$P_1$</span> respecto a los demás puntos. Para deducir la región debes estimar las mediatrices de la siguiente forma:</p>
          <div style="background:#f9f9f9; padding: 10px; border-radius: 5px;">
              <h4 style="margin-top:0;">Mediatriz entre <span id="lbl_i_base3">$P_1$</span> y <span id="lbl_k">$P_2$</span></h4>
              <div id="sub3_1">
                 <p>3.1 Calcula el punto medio entre <span id="lbl_i_base4">$P_1$</span> y <span id="lbl_k2">$P_2$</span>: <br> X = <math-field id="mf_mid_x"></math-field> , Y = <math-field id="mf_mid_y"></math-field></p>
              </div>
              <div id="sub3_2" style="display:none;">
                 <p>3.2 Apareció un punto rojo sin etiqueta en el origen. Muévelo en GeoGebra hacia tu punto medio calculado.</p>
              </div>
              <div id="sub3_3" style="display:none;">
                 <p>3.3 Escribe la pendiente entre <span id="lbl_i_base5">$P_1$</span> y <span id="lbl_k3">$P_2$</span> (fracción): <math-field id="mf_m"></math-field></p>
              </div>
              <div id="sub3_4" style="display:none;">
                 <p>3.4 Escribe la pendiente perpendicular de la mediatriz (fracción): <math-field id="mf_m_perp"></math-field></p>
              </div>
              <div id="sub3_5" style="display:none;">
                 <p>3.5 Estima otro punto en la mediatriz usando el punto medio y pendiente perpendicular (distancia > 1, dentro de -10 a 10): <br> X = <math-field id="mf_p2_x"></math-field> , Y = <math-field id="mf_p2_y"></math-field></p>
              </div>
              <div id="sub3_6" style="display:none;">
                 <p>3.6 Apareció un punto azul sin etiqueta en el origen. Muévelo en GeoGebra hacia las coordenadas de la mediatriz que estimaste en el paso 3.5.</p>
              </div>
              <div id="sub3_7" style="display:none; margin-top: 15px; padding: 10px; border-left: 4px solid #fdad00; background-color: #fffaf0;">
                 <p><b>3.7 Región Completada:</b> Observa en GeoGebra la célula formada. Asegúrate de copiar las ecuaciones de las mediatrices correspondientes a <span id="lbl_i_base6">$P_1$</span> en tu ficha impresa. Presiona revisar cuando estés listo para el siguiente punto.</p>
              </div>
              <p id="error_paso3" style="font-weight:bold;"></p>
          </div>
        </div>
        
        <div id="paso4_container" style="display: none; padding-top: 20px; border-top: 1px solid #ccc; margin-top:20px;">
          <h3>Paso 4: El Diagrama de Voronoi</h3>
          <p>Se ha calculado automáticamente el diagrama de Voronoi completo utilizando la herramienta de GeoGebra. Podrás comparar tus aproximaciones con el resultado.</p>
          <div style="background:#e8f4f8; padding: 10px; border-radius: 5px; border-left: 4px solid #17a2b8;">
              <p><b>Evidencia final:</b> Toma una <b>captura de pantalla</b> que abarque toda esta página (incluyendo el diagrama y tu nombre en la parte superior) para enviarla como evidencia de tu práctica.</p>
          </div>
        </div>
        
        <div id="contenedor_boton_0" style="margin-top: 10px;">
            <button id="btn_revisar_0" onclick="window.accionR2P(0)" style="padding: 8px 16px; cursor: pointer; background-color: var(--color-primary, #fdad00); border: none; border-radius: 4px; font-weight: bold; color: #fff;">Terminar paso 1</button>
        </div>
        <div id="applet_container_0" class="ggb-container" style="margin-top: 20px; margin-bottom: 20px; display: none;"></div>

        
      </div>
    `;

        // As alway one question, render can wait for DOM injection or be called from r2p
        return Pregunta;

    } catch (error) {
        console.error('Error al carga la pregunta:', error);
    }
}

export async function render() {
    console.log('Ejecutar render')
    window.ggbApps = [];

    const params = {
        appName: 'classic',
        width: 600,
        height: 600,
        showToolBar: false,
        showAlgebraInput: false,
        showMenuBar: false,
        material_id: 'uaxkzmpb',
        id: 'ggbApplet_0',
        appletOnLoad(api) {
            window.ggbApps[0] = api;
            api.setCoordSystem(-10, 10, -10, 10);
        }
    };
    new GGBApplet(params, true).inject('applet_container_0');

    console.log('vamos a publicar la revisión')
    window.accionR2P = function (i) {
        // Al quitar el for y usar solo un ejercicio, forzamos usar el indice 0 localmente.
        i = 0;
        const api = window.ggbApps[i];
        if (!api) return alert("Applet no listo");

        const preguntaDiv = document.getElementsByClassName('pregunta-abierta')[i];
        let paso = parseInt(preguntaDiv.dataset.paso, 10);
        let puntosActuales = parseInt(preguntaDiv.dataset.puntos, 10);
        const totalPuntos = 2; // 1 punto por validación del paso 1, 1 punto por el final

        if (paso === 1) {
            const mathFields = preguntaDiv.getElementsByTagName('math-field');
            const numPuntosDeseados = parseInt(mathFields[0].value.trim(), 10);

            if (isNaN(numPuntosDeseados) || numPuntosDeseados < 3 || numPuntosDeseados > 5) {
                alert("Por favor introduce un número válido entre 3 y 5.");
                return [puntosActuales, totalPuntos];
            }

            // Generar puntos aleatorios asegurando que no compartan X o Y
            let p_coords = [];
            for (let j = 1; j <= numPuntosDeseados; j++) {
                let x, y, valid;
                do {
                    x = (Math.floor(Math.random() * 9) - 4); // entre -4 y 4
                    y = (Math.floor(Math.random() * 9) - 4);
                    valid = true;
                    for (let c of p_coords) {
                        if (c.x === x || c.y === y) valid = false; // evitar mismas coordenadas verticales u horizontales
                    }
                } while (!valid);
                p_coords.push({ x: x, y: y });
                api.evalCommand(`P_${j} = (${x}, ${y})`);
                api.evalCommand(`SetPointStyle(P_${j}, 4)`);
            }

            // Avanzar al paso 2
            puntosActuales += 1;
            preguntaDiv.dataset.puntos = puntosActuales;
            preguntaDiv.dataset.paso = 2;

            document.getElementById(`paso1`).style.display = "none";
            document.getElementById(`paso2`).style.display = "block";
            document.getElementById(`applet_container_0`).style.display = "block";

            // Actualizar botón para el siguiente paso
            const btn = document.getElementById(`btn_revisar_${i}`);
            btn.innerText = "Terminar paso 2";

            return [puntosActuales, totalPuntos];
        }

        if (paso === 2) {
            const mathFields = preguntaDiv.getElementsByTagName('math-field');
            const numPuntosDeseados = parseInt(mathFields[0].value.trim(), 10);

            // 1. Fijar los puntos para que ya no se muevan
            for (let j = 1; j <= numPuntosDeseados; j++) {
                api.evalCommand(`SetFixed(P_${j}, true)`);
            }

            // 2. Transición al paso 3
            preguntaDiv.dataset.paso = 3;
            preguntaDiv.dataset.i_base = 1;
            preguntaDiv.dataset.k = 2; // Iniciaremos recursivamente con P_2
            preguntaDiv.dataset.n = numPuntosDeseados;
            preguntaDiv.dataset.subpaso = 1;

            document.getElementById('paso3_container').style.display = "block";

            document.getElementById(`resultado_${i}`).innerHTML = "<br><b>¡Correcto!</b> Los puntos están fijos. Procede con el Paso 3.";
            const btn = document.getElementById(`btn_revisar_${i}`);
            btn.innerText = "Revisar (Paso 3)";

            return [puntosActuales, totalPuntos];
        }

        if (paso === 3) {
            // Bloquear nombre del alumno
            let cellAlumno = document.getElementById('alumno');
            if (cellAlumno) {
                cellAlumno.disabled = true;
            }
            let i_base = parseInt(preguntaDiv.dataset.i_base || 1, 10);
            let k = parseInt(preguntaDiv.dataset.k, 10);
            let n = parseInt(preguntaDiv.dataset.n, 10);
            let subpaso = parseInt(preguntaDiv.dataset.subpaso || 1, 10);

            let x1 = api.getXcoord("P_" + i_base);
            let y1 = api.getYcoord("P_" + i_base);
            let xk = api.getXcoord("P_" + k);
            let yk = api.getYcoord("P_" + k);

            let midX_real = (x1 + xk) / 2;
            let midY_real = (y1 + yk) / 2;
            let dx = xk - x1;
            let dy = yk - y1;

            function parseMath(str) {
                if (!str) return NaN;
                let s = str.replace(/\\frac{([^}]+)}{([^}]+)}/g, "($1)/($2)");
                s = s.replace(/\\left|\\right/g, '');
                s = s.replace(/−/g, '-');
                s = s.replace(/ /g, '');
                try { return Function('"use strict";return (' + s + ')')(); }
                catch (e) { return NaN; }
            }

            let msg = "";
            let errorFlag = false;

            if (subpaso === 1) {
                let midX_user = parseMath(document.getElementById('mf_mid_x').value);
                let midY_user = parseMath(document.getElementById('mf_mid_y').value);
                if (Math.abs(midX_user - midX_real) > 0.05 || Math.abs(midY_user - midY_real) > 0.05) {
                    msg = "- El punto medio calculado es incorrecto (3.1)."; errorFlag = true;
                } else {
                    preguntaDiv.dataset.subpaso = 2;
                    document.getElementById('sub3_2').style.display = "block";
                    // Crear A_aux rojo sin etiqueta
                    api.evalCommand("A_{aux} = (0,0)");
                    api.evalCommand(`SetPointStyle(A_{aux}, 4)`);
                    api.evalCommand("SetColor(A_{aux}, 1, 0, 0)");
                    api.evalCommand("ShowLabel(A_{aux}, false)");
                    msg = "¡Punto medio correcto! Sigue con el 3.2.";
                }
            } else if (subpaso === 2) {
                let aux_x = api.getXcoord("A_{aux}");
                let aux_y = api.getYcoord("A_{aux}");
                let err_aux = Math.sqrt((aux_x - midX_real) ** 2 + (aux_y - midY_real) ** 2);
                if (err_aux > 0.3) {
                    msg = "- El punto rojo no está correctamente ubicado en el punto medio (Error > 0.3) (3.2)."; errorFlag = true;
                } else {
                    preguntaDiv.dataset.subpaso = 3;
                    document.getElementById('sub3_3').style.display = "block";
                    api.evalCommand("SetFixed(A_{aux}, true)");
                    msg = "¡Bien ubicado! Sigue con la pendiente en el 3.3.";
                }
            } else if (subpaso === 3) {
                let m_user = parseMath(document.getElementById('mf_m').value);
                let m_real = (dx !== 0) ? (dy / dx) : Infinity;
                if (Math.abs(m_real) !== Infinity && Math.abs(m_user - m_real) > 0.05) {
                    msg = "- La pendiente calculada entre puntos es incorrecta (3.3)."; errorFlag = true;
                } else {
                    preguntaDiv.dataset.subpaso = 4;
                    document.getElementById('sub3_4').style.display = "block";
                    msg = "¡Pendiente correcta! Sigue con la perpendicular en el 3.4.";
                }
            } else if (subpaso === 4) {
                let m_perp_user = parseMath(document.getElementById('mf_m_perp').value);
                let m_perp_real = (dy !== 0) ? (-dx / dy) : Infinity;
                if (Math.abs(m_perp_real) !== Infinity && Math.abs(m_perp_user - m_perp_real) > 0.05) {
                    msg = "- La pendiente perpendicular es incorrecta (3.4)."; errorFlag = true;
                } else {
                    preguntaDiv.dataset.subpaso = 5;
                    document.getElementById('sub3_5').style.display = "block";
                    msg = "¡Pendiente perpendicular correcta! Calcula el nuevo punto en el 3.5.";
                }
            } else if (subpaso === 5) {
                let p2_x = parseMath(document.getElementById('mf_p2_x').value);
                let p2_y = parseMath(document.getElementById('mf_p2_y').value);

                let dx_p2 = p2_x - midX_real;
                let dy_p2 = p2_y - midY_real;
                let dist_p2 = Math.sqrt(dx_p2 * dx_p2 + dy_p2 * dy_p2);
                let is_perp = Math.abs(dx_p2 * dx + dy_p2 * dy) < 0.1;

                if (isNaN(p2_x) || isNaN(p2_y)) {
                    msg = "- Ingresa las coordenadas del punto."; errorFlag = true;
                } else if (dist_p2 < 1.0) {
                    msg = "- Tu punto estimado debe estar más separado del punto medio (distancia > 1)."; errorFlag = true;
                } else if (Math.abs(p2_x) > 10 || Math.abs(p2_y) > 10) {
                    msg = "- Tu punto estimado se sale de los límites de visión (-10 a 10)."; errorFlag = true;
                } else if (!is_perp) {
                    msg = "- El punto estimado NO pertenece verdaderamente a la mediatriz."; errorFlag = true;
                } else {
                    preguntaDiv.dataset.subpaso = 6;
                    document.getElementById('sub3_6').style.display = "block";
                    // Crear B_aux azul sin etiqueta
                    api.evalCommand("B_{aux} = (0.1,0)");
                    api.evalCommand(`SetPointStyle(B_{aux}, 4)`);
                    api.evalCommand("SetColor(B_{aux}, 0, 0, 1)");
                    api.evalCommand("ShowLabel(B_{aux}, false)");

                    // Crear línea temporal de ayuda entre A_aux y B_aux
                    api.evalCommand("L_{aux} = Line(A_{aux}, B_{aux})");
                    api.evalCommand("SetColor(L_{aux}, 0, 0, 0)"); // Negra
                    api.evalCommand("SetLineThickness(L_{aux}, 2)");
                    api.evalCommand("ShowLabel(L_{aux}, false)");

                    msg = "¡Coordenadas válidas! Localiza tu punto moviendo el punto azul en GeoGebra (Paso 3.6).";
                }
            } else if (subpaso === 6) {
                let p2_x = parseMath(document.getElementById('mf_p2_x').value);
                let p2_y = parseMath(document.getElementById('mf_p2_y').value);
                //api.evalCommand("B_{aux}:(0, .01)");

                let b_x = api.getXcoord("B_{aux}");
                let b_y = api.getYcoord("B_{aux}");
                let err_b = Math.sqrt((b_x - p2_x) ** 2 + (b_y - p2_y) ** 2);

                if (err_b > 0.3) {
                    msg = "- El punto azul no está ubicado en las coordenadas que estimaste en 3.5 (Error > 0.3)."; errorFlag = true;
                } else {
                    api.evalCommand(`SetFixed(B_{aux}, true)`);
                    api.evalCommand(`Med_${i_base}_${k} = PerpendicularBisector(P_${i_base}, P_${k})`);
                    api.evalCommand(`SetColor(Med_${i_base}_${k}, 0, 0, 0)`);
                    api.evalCommand(`SetLineOpacity(Med_${i_base}_${k}, 0.3)`);
                    api.evalCommand(`SetLineThickness(Med_${i_base}_${k}, 5)`);

                    api.evalCommand(`Reg_${i_base}_${k} = (${dx}) * (x - (${midX_real})) + (${dy}) * (y - (${midY_real})) > 0`);
                    let r = i_base === 1 ? 1 : (i_base === 2 ? 0 : (i_base === 3 ? 0.5 : (i_base === 4 ? 1 : 0)));
                    let g = i_base === 1 ? 0 : (i_base === 2 ? 1 : (i_base === 3 ? 0.5 : (i_base === 4 ? 0 : 1)));
                    let b = i_base === 1 ? 0 : (i_base === 2 ? 0 : (i_base === 3 ? 1 : (i_base === 4 ? 1 : 1)));
                    api.evalCommand(`SetColor(Reg_${i_base}_${k}, ${r}, ${g}, ${b})`);
                    api.evalCommand(`SetFilling(Reg_${i_base}_${k}, 0.15)`);

                    k++;
                    if (k === i_base) k++;

                    if (k <= n) {
                        preguntaDiv.dataset.k = k;
                        preguntaDiv.dataset.subpaso = 1;

                        document.getElementById('lbl_k').innerText = `$P_${k}$`;
                        document.getElementById('lbl_k2').innerText = `$P_${k}$`;
                        document.getElementById('lbl_k3').innerText = `$P_${k}$`;

                        ['sub3_2', 'sub3_3', 'sub3_4', 'sub3_5', 'sub3_6'].forEach(id => {
                            document.getElementById(id).style.display = "none";
                        });

                        document.getElementById('mf_mid_x').value = "";
                        document.getElementById('mf_mid_y').value = "";
                        document.getElementById('mf_m').value = "";
                        document.getElementById('mf_m_perp').value = "";
                        document.getElementById('mf_p2_x').value = "";
                        document.getElementById('mf_p2_y').value = "";

                        api.evalCommand("Delete(A_{aux})");
                        api.evalCommand("Delete(B_{aux})");
                        api.evalCommand("Delete(L_{aux})");

                        msg = `¡Mediatriz correcta! Sombreado con color la región excluida. Intenta el siguiente punto.`;
                    } else {
                        // Iniciar subpaso 7 de revisión de célula completa
                        preguntaDiv.dataset.subpaso = 7;

                        document.getElementById('lbl_i_base6').innerText = `$P_${i_base}$`;
                        ['sub3_1', 'sub3_2', 'sub3_3', 'sub3_4', 'sub3_5', 'sub3_6'].forEach(id => {
                            document.getElementById(id).style.display = "none";
                        });
                        document.getElementById('sub3_7').style.display = "block";

                        api.evalCommand("Delete(A_{aux})");
                        api.evalCommand("Delete(B_{aux})");
                        api.evalCommand("Delete(L_{aux})");

                        msg = `¡Célula de $P_${i_base}$ completada! Tómate tu tiempo para observar y transcribir.`;
                    }
                }
            } else if (subpaso === 7) {
                i_base++;
                if (i_base <= n) {
                    preguntaDiv.dataset.i_base = i_base;
                    k = 1;
                    if (k === i_base) k++;
                    preguntaDiv.dataset.k = k;
                    preguntaDiv.dataset.subpaso = 1;

                    document.getElementById('lbl_i_base1').innerText = `$P_${i_base}$`;
                    document.getElementById('lbl_i_base2').innerText = `$P_${i_base}$`;
                    document.getElementById('lbl_i_base3').innerText = `$P_${i_base}$`;
                    document.getElementById('lbl_i_base4').innerText = `$P_${i_base}$`;
                    document.getElementById('lbl_i_base5').innerText = `$P_${i_base}$`;

                    document.getElementById('lbl_k').innerText = `$P_${k}$`;
                    document.getElementById('lbl_k2').innerText = `$P_${k}$`;
                    document.getElementById('lbl_k3').innerText = `$P_${k}$`;

                    ['sub3_2', 'sub3_3', 'sub3_4', 'sub3_5', 'sub3_6', 'sub3_7'].forEach(id => {
                        document.getElementById(id).style.display = "none";
                    });
                    document.getElementById('sub3_1').style.display = "block";

                    document.getElementById('mf_mid_x').value = "";
                    document.getElementById('mf_mid_y').value = "";
                    document.getElementById('mf_m').value = "";
                    document.getElementById('mf_m_perp').value = "";
                    document.getElementById('mf_p2_x').value = "";
                    document.getElementById('mf_p2_y').value = "";

                    // Ocultar mediatrices y regiones de la iteración anterior
                    for (let m = 1; m <= n; m++) {
                        if (m !== (i_base - 1)) {
                            api.setVisible(`Reg_${i_base - 1}_${m}`, false);
                            api.setVisible(`Med_${i_base - 1}_${m}`, false);
                        }
                    }

                    msg = `Ahora determinaremos la región para el nuevo punto base $P_${i_base}$.`;
                } else {
                    document.getElementById('sub3_7').style.display = "none";
                    document.getElementById('paso3_container').style.display = "none";
                    msg = ``;

                    // Ocultar mediatrices y regiones de la última iteración
                    for (let m = 1; m <= n; m++) {
                        if (m !== (i_base - 1)) {
                            api.setVisible(`Reg_${i_base - 1}_${m}`, false);
                            api.setVisible(`Med_${i_base - 1}_${m}`, false);
                        }
                    }

                    // Transición a Paso 4
                    preguntaDiv.dataset.paso = 4;
                    document.getElementById('paso4_container').style.display = "block";

                    // Ejecutar función Voronoi en GeoGebra
                    let lstPts = [];
                    for (let pt_idx = 1; pt_idx <= n; pt_idx++) {
                        lstPts.push(`P_${pt_idx}`);
                    }
                    let voronoiCmd = `Voronoi_1 = Voronoi({${lstPts.join(',')}})`;
                    try {
                        api.evalCommand(voronoiCmd);
                        api.evalCommand(`SetColor(Voronoi_1, 0, 0, 1)`);
                        api.evalCommand(`SetLineThickness(Voronoi_1, 5)`);
                    } catch (e) {
                        // Si falla porque el módulo discreto de GeoGebra no ha cargado, intentamos de nuevo después de medio segundo
                        setTimeout(() => {
                            api.evalCommand(voronoiCmd);
                            api.evalCommand(`SetColor(Voronoi_1, 0, 0, 1)`);
                            api.evalCommand(`SetLineThickness(Voronoi_1, 5)`);
                        }, 500);
                    }

                    // Bloquear nombre del alumno
                    let cellAlumno = document.getElementById('alumno');
                    if (cellAlumno) {
                        cellAlumno.disabled = true;
                    }

                    document.getElementById(`btn_revisar_${i}`).style.display = "none";
                    if (puntosActuales < totalPuntos) puntosActuales += 1;
                    preguntaDiv.dataset.puntos = puntosActuales;
                }
            }

            let errElem = document.getElementById("error_paso3");
            if (errorFlag) {
                errElem.style.color = "red";
                errElem.innerHTML = msg;
            } else {
                errElem.style.color = "green";
                errElem.innerHTML = msg;
                // Renderizar mathjax si es que existe algún elemento
                if (window.MathJax) MathJax.typesetPromise([document.getElementById('paso3_container')]);
            }

            return [puntosActuales, totalPuntos];
        }

        return [puntosActuales, totalPuntos];
    };
}
