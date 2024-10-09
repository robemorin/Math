function start(){
    let contenedor = document.getElementById('menu')
    contenedor.innerHTML=""
    let n0 = Ficha.length
    for (let k0 = 0; k0<n0 ; ++k0){
        let D0 = document.createElement('details')
        D0.setAttribute("name","D0")
        let M0 =  document.createElement('main')
        let T0 =  document.createElement('summary')
        T0.textContent = Ficha[k0].Nombre
        D0.appendChild(T0)
        let n1 = Ficha[k0].subtema.length
        for(let k1=0; k1<n1; ++k1){
            let D1 = document.createElement('details')
            D1.setAttribute("name","D1")
            let M1 =  document.createElement('main')
            let T1 =  document.createElement('summary')
            T1.textContent = Ficha[k0].subtema[k1].Nombre
            D1.appendChild(T1)
            let n2 = Ficha[k0].subtema[k1].topico.length
            for(let k2=0; k2<n2; ++k2){
                let ficha = document.createElement('div')
                ficha.innerHTML = `<a onclick="generar(${k0},${k1},${k2})">${Ficha[k0].subtema[k1].topico[k2].Nombre}</a>`
                
                M1.appendChild(ficha)
            }
            D1.appendChild(M1)
            M0.appendChild(D1)
        }
        D0.appendChild(M0)
        contenedor.appendChild(D0)
    }
}
function generar(k0,k1,k2,profesor = "MC Roberto Morin Romero"){
    function encabezado(profesor,k,K){
        let date = new Date()
        return `<div class="header">
        <table class="info" width="100%">
        <tr><td><div class="logo">
            <img src="../src/icon2.png" alt="raiz2pi.cc"><br>https://raiz2pi.cc
        </div></td>
        <td style="width:80%">
            <div><strong>Nombre del Alumno:</strong> ______________________</div>
            <div><strong>Nombre del Profesor:</strong><u>${profesor}</u></div>
            <div><strong>Tema:</strong>${Ficha[K[0]].Nombre} > ${Ficha[k0].subtema[K[1]].Nombre} > ${Ficha[k0].subtema[K[1]].topico[K[2]].Nombre} </div>
        </td><td style="width:20%">
            <div><strong>Fecha: <u>${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}</u> <br>id: <u>${k}</u></strong> 
            </div>
        </td>
        </tr>
        </table>
        
    </div>`
    }
    
    const nFichas=document.getElementById("NCopias").value
    const contenedor = document.getElementById("Fichas")
    contenedor.innerHTML=''
    const Soluciones = document.getElementById("Respuestas")
    Soluciones.innerHTML='<div class="page"></div>'

    let ficha, respuesta
    for(let k=0; k<nFichas; ++k ){
        //console.log(`Generando examen ${k}`)
        [ficha,respuesta] = Ficha[k0].subtema[k1].topico[k2].func()
        let div0 = document.createElement('div')
        div0.innerHTML = encabezado(profesor,k+1,[k0,k1,k2])+ficha+`${k != (nFichas-1)?'<div class="page"></div>':''}`
        contenedor.appendChild(div0)

        div0 = document.createElement('div')
        div0.innerHTML = `<span>[${k+1}]</span>`+respuesta+`<br>`
        Soluciones.appendChild(div0)

    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function CR(n=1){
    let S=''
    let s=`<tr><td></td><td ></td><td></td></tr>`
    for (let k=0; k<n; ++k){
        S += s
    }
    return `<table width="100%" class="cuadroRespuesta"> ${S}</table>`
}