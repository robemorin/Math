const f_analisis = {
	Nombre:"Análisis",
	subtema:[
        {
            Nombre:"Cálculo diferencial",
            topico:[{
                Nombre:"Línea tangente y normal",
                func:function(){
                    let dummy = Math.round(Math.random()*3-3)
                    let a = Math.ceil(Math.random()*4)*Math.pow(10,dummy)*(Math.random()<0.5?1:-1)
                    let q = Math.ceil((Math.random()*6+2))*(Math.random()<0.5?1:-1)
                    let x0 = Math.round((q<0?-1:1)*(Math.random()*(Math.abs(q)-1)+0.5))
                    
                    let Pregunta=`<div class="problema2">1.- Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}x$
                    <ol class="FT_ol_a">
                    <li>Escriba las raíces de $f(x)$ <div>1</div></li>
                    <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
                    <li>Escriba el valor de $f(${x0}).$<div>1</div></li>${CR(1)}
                    <li>Escriba el valor de $f'(${x0}).$<div>1</div></li>${CR(1)}
                    <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>3</div></li>${CR(5)}
                     </ol></div>`
                     let m = 2*a*x0-2*a*q
                     let y0 = a*x0**2-2*a*q*x0
                     let Solucion = `<div class="ans"><div>(1a) $x=0,${2*q}$</div><div>(1c)$f'(x) = ${(2*a).toFixed(-dummy)}x${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}$</div><div>(1d)$f(${x0}) = ${(y0.toFixed(-dummy))}$</div><div>(1e)$f'(${x0}) = ${(m).toFixed(-dummy)}$</div><div>$y = ${m.toFixed(-2*dummy)}x+(${(y0-m*x0).toFixed(-2*dummy)})$</div>`


                    dummy = Math.round(Math.random()*3-3)
                    a = Math.ceil(Math.random()*4)*Math.pow(10,dummy)*(Math.random()<0.5?1:-1)
                    q = Math.ceil((Math.random()*6+2))*(Math.random()<0.5?1:-1)
                    x0 = Math.round((q<0?-1:1)*(Math.random()*(Math.abs(q)-1)+0.5))

                    Pregunta += `<div class="page"></div><div class="problema2">2.- Considere a $f(x) = ${a.toFixed(-dummy)}x^2${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}x$
                    <ol class="FT_ol_a">
                    <li>Escriba las raíces de $f(x)$ <div>1</div></li>
                    <li>Grafique la función en el siguiente espacio de tal manera que aparezcan las dos raices en la gráfica<div>2</div></li>${Milimetrado(600,[10, 20,.2] )}
                    <li>Escriba la derivada de $f(x)$<div>2</div></li>${CR(1)}
                    <li>Calcule y dibuje la ecuación de la línea tangente para $x=${x0}$.<div>1</div></li>${CR(5)}
                    <li>Calcule la ecuación de la línea normal para $x=${x0}$.<div>2</div></li>${CR(5)}
                    <li>Dibuje la línea normal a $f(x)$ en el punto $(${x0},f(${x0}))$<div>2</div></li>
                    </ol></div>`
                    m = 2*a*x0-2*a*q
                    let mp = -1/m
                    y0 = a*x0**2-2*a*q*x0
                    Solucion += `<div>(2a) $x=0,${2*q}$</div><div>(2c)$f'(x) = ${(2*a).toFixed(-dummy)}x${(a*q<0?'+':'-')+Math.abs(2*a*q).toPrecision(2)}$</div><div>(1d)$y = ${m.toFixed(-2*dummy)}x+(${(y0-m*x0).toFixed(-2*dummy)})$</div><div>(1e)$y = ${mp.toFixed(-2*dummy)}x+(${(y0-mp*x0).toFixed(-2*dummy)})$</div></div>`

                    return [Pregunta,Solucion]
                }
            }
            ]
            
        }
    ]

};
