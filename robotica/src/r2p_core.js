//r2p_core.js
let revisarHandlerInitialized = false;
export function generarCodigo(){
    const n=79
    function det(A){//*
        let f=A[0][0]*(A[1][1]*A[2][2]-A[2][1]*A[1][2])
            f=f-A[0][1]*(A[1][0]*A[2][2]-A[2][0]*A[1][2])
            f=f+A[0][2]*(A[1][0]*A[2][1]-A[2][0]*A[1][1])
            f=f%n;
            f=(f<0)?f+n:f;
        return f;
    }
    let A
    do{
        A=[ [Math.floor(Math.random()*n),Math.floor(Math.random()*n),Math.floor(Math.random()*n)],
                [Math.floor(Math.random()*n),Math.floor(Math.random()*n),Math.floor(Math.random()*n)],
                [Math.floor(Math.random()*n),Math.floor(Math.random()*n),Math.floor(Math.random()*n)]];
    }while(det(A)==0)
    return A[0].concat(A[1], A[2]);
}

export function encriptar(msm,code){
    //const n=79
    if (typeof msm == "string") {
        //console.log('es un string')
        return r2pCore.encriptarString(msm,code);
    }
    if (Array.isArray(msm)) {
        //console.log('es un array')
        return r2pCore.encriptarArray(msm,code);
    }
    return -1
    
}
export function desencriptar(emsm,code,op='s'){
    // ver al último
    if (op == "s") {
        console.log('es un string')
        return r2pCore.desencriptarString(emsm,code);
    }else if(op='raw'){
        let cadena2 = decodeURIComponent(emsm)
        //console.log("código A*: ",cadena2)
        let code2 = cadena2.substring(0,9)
        code2 = r2pCore.symbols2array(code2)
        cadena2 = cadena2.substring(9)
        //console.log(`code2 ${code2}`)
        //console.log(`cadena 2: ${cadena2}`)
        const msm = r2pCore.desencriptarString(cadena2,code2)
        //console.log('Test invesa de encriptar',msm)

        return r2pCore.symbols2array( msm)
    }
    return r2pCore.desencriptarArray(emsm,code);
}

export function pregunta(Q,code,numeroPregunta){
    const [P,Rt] = Q
    const msmt =[r2pCore.encriptarArray([78],code)]
    for(let i=1;i<6;++i){
        msmt[i]=r2pCore.encriptarArray([Math.floor(Math.random()*78)],code)
    }

    //console.log(`msmt: ${msmt}`)
    const [R,msm] = r2pCore.pregunta.revolver(Rt,msmt)
    
    let S = `<div class="r2pi-pregunta" style="display: none;">
        <p>${P}</p>
        `
        for(let k=0; k<R.length;++k){
            S += `
            <div class="col-4 themed-grid-col">
                <input type="radio" class="r2p-input-radio" name="Resp_${numeroPregunta}" id="radio_${numeroPregunta}_${k}" msm="${msm[k]}" >
                <label for="radio_${numeroPregunta}_${k}">${R[k]}</label>
            </div>
            `
        }
        S += "</div>"
        return S
}
export function iniciaTest(inputAlumno){
    inputAlumno.disabled = true;
    const contenedor = inputAlumno.closest('.r2pi-contenedor')

    if (!contenedor) {
        console.error('Error en el código: r2p.js -> iniciaTest');
        return;
    }
    const date = new Date();

    contenedor.setAttribute('data-fecha', `${date.getDate()},${date.getMonth() + 1}`);
    contenedor.setAttribute('data-Hi', `${date.getHours()},${date.getMinutes()}`);
    
    
    let preguntas = contenedor.querySelectorAll('.r2pi-pregunta')
    preguntas.forEach(p => p.style.display = '');
    preguntas = contenedor.querySelectorAll('.pregunta-abierta')
    preguntas.forEach(p => p.style.display = '');
    preguntas = contenedor.querySelectorAll('.pregunta-geogebra')
    preguntas.forEach(p => p.style.display = '');

    contenedor.querySelector('#revisar').style.display = '';

}
export async function revisarOP(botonRevisar){
    //console.log('TRabajando en el boton')
    const contenedor = botonRevisar.closest('.r2pi-contenedor')

    if (!contenedor) {
        console.error('Error en el código: r2p.js -> revisarOP');
        return;
    }
    
    let temporal = contenedor.getAttribute('code');
    const code = temporal.split(',').map(Number);
    const tipo = Number(contenedor.getAttribute('type'));
    const modo = Number(contenedor.getAttribute('modo'));
    const r2pElement = contenedor.closest('r2p-dinamico')
    let fecha = contenedor.getAttribute('data-fecha');
    fecha = fecha.split(',').map(Number);
    let horaInicio = contenedor.getAttribute('data-hi');
    horaInicio = horaInicio.split(',').map(Number);
    let tema = r2pElement.getAttribute('tema')
    tema = tema.split('.').map(Number);
    //console.log(`*tema: ${r2pElement.getAttribute('tema')} *** ${tema}`)
    //console.log('Modo', modo);
    //Vamos a revisar las preguntas
    const preguntas = contenedor.querySelectorAll('.r2p-input-radio');
    const numeroPreguntas = contenedor.querySelectorAll('.r2pi-pregunta').length;
    let correctas = 0
    //console.log(`Número de preguntas: ${numeroPreguntas}`);
    preguntas.forEach(p => {
        p.disabled = true; // Deshabilitar el input
        const msmValue = r2pCore.desencriptarString(p.getAttribute('msm'),code)
        //console.log(`${p.id}: ${p.getAttribute('msm')}--->${msmValue} -- ${p.checked}`);
        if( msmValue=='_' && p.checked){
            p.parentElement.style.border = '2px solid green';
            ++correctas
        }else if( p.checked){
            p.parentElement.style.border = '2px solid red';
        }else if( msmValue=='_' && modo != '1'){
            p.parentElement.style.border = '2px dashed green';
        }
    })
    console.log(`Correctas: ${correctas} de ${numeroPreguntas}`);
    let calificacion = Math.ceil((correctas/numeroPreguntas)*10)
    contenedor.querySelector('#r2p-calificacion').innerHTML = `Aciertos ${correctas} de ${numeroPreguntas}. Calificación: ${calificacion}`;
    const date = new Date();
let boton = contenedor.querySelector('#revisar')
    boton.id=''
    boton.disabled=true
    let stringQR = r2pCore.pregunta.encriptar( code,
                                                tema,
                                                correctas,
                                                numeroPreguntas,
                                                tipo,
                                                [horaInicio[0],horaInicio[1]],
                                                [date.getHours(),date.getMinutes()],
                                                [fecha[0],fecha[1]]   )
                                                
    console.log(`cadena Encriptada: ${stringQR}`)    
    /*
    Organización de la información
    Pendiente
    [0-8]codigo
    [9-11] tema
    [12] aciertos
    [13] total
    [14] tipo 
    [15-16] Hora de inicio 
    [17-18] Hora de fin
    [19-21] fecha  
    */
    const currentURL = getURL()
    stringQR = `${currentURL}revisar.html?a=${stringQR}`

    const divEvidencia = contenedor.querySelector('#r2p-evidencia');
    divEvidencia.innerHTML = stringQR;
    const divQR = contenedor.querySelector('#r2p-qr');

    console.log(`URL: ${currentURL}`)
    generarQR(stringQR, divQR);

   

}

export function revisarAbiertas(contenedor) {
  const preguntas = contenedor.querySelectorAll('.pregunta-abierta');
  const numeroPreguntas = preguntas.length;
  let correctas = 0;
//Todas la respuestas se esperan que esten encriptadas
  preguntas.forEach(p => {
    const mf = p.querySelector('math-field');
    const valor = mf.getValue()
    let code = mf.dataset.code
    let tipo = mf.dataset.tipo
    code = code.split(',').map(Number);
    //console.log(`code: ${code}`)
    const esperado = desencriptar(mf.dataset.respuesta_e,code)
    if(tipo == 'expresion'){
        if(desencriptar(encriptar(valor,code),code)==esperado){
           p.style.border = '2px solid green';
            correctas++;
        } else {
            p.style.border = '2px solid red';
        }
        //Falta para numeros
    }
    //console.log(`esperado: ${esperado}`)
    //console.log(`code: ${code}, esperado:${esperado}`)
    console.log(`uno:${desencriptar(encriptar(valor,code),code)}-> dos${esperado}`)
    
    mf.disabled = true;
  });

  contenedor.querySelector('#r2p-calificacion').innerHTML = 
    `Aciertos ${correctas} de ${preguntas.length}. Calificación: ${Math.ceil((correctas / preguntas.length) * 10)}`;
    let boton = contenedor.querySelector('#revisar')
    boton.id=''
    boton.disabled=true
//--------------------------
let temporal = contenedor.getAttribute('code');
    const code = temporal.split(',').map(Number);
    const tipo = Number(contenedor.getAttribute('type'));
    const modo = Number(contenedor.getAttribute('modo'));
    const r2pElement = contenedor.closest('r2p-dinamico')
    let fecha = contenedor.getAttribute('data-fecha');
    fecha = fecha.split(',').map(Number);
    let horaInicio = contenedor.getAttribute('data-hi');
    horaInicio = horaInicio.split(',').map(Number);
    let tema = r2pElement.getAttribute('tema')
    tema = tema.split('.').map(Number);

    const date = new Date();

    let stringQR = r2pCore.pregunta.encriptar( code,
                                                tema,
                                                correctas,
                                                numeroPreguntas,
                                                tipo,
                                                [horaInicio[0],horaInicio[1]],
                                                [date.getHours(),date.getMinutes()],
                                                [fecha[0],fecha[1]]   )
                                                
    console.log(`cadena Encriptada: ${stringQR}`)    
    /*
    Organización de la información
    Pendiente
    [0-8]codigo
    [9-11] tema
    [12] aciertos
    [13] total
    [14] tipo 
    [15-16] Hora de inicio 
    [17-18] Hora de fin
    [19-21] fecha  
    */
    const currentURL = getURL()
    stringQR = `${currentURL}revisar.html?a=${stringQR}`

    const divEvidencia = contenedor.querySelector('#r2p-evidencia');
    divEvidencia.innerHTML = stringQR;
    const divQR = contenedor.querySelector('#r2p-qr');

    console.log(`URL: ${currentURL}`)
    generarQR(stringQR, divQR);
}
export function revisarAbiertasII(contenedor) {
  const preguntas = contenedor.querySelectorAll('.pregunta-abierta');
  const numeroPreguntas = preguntas.length;
  let correctas = 0;
  let totalCorrectas=0
//Todas la respuestas se esperan que esten encriptadas
  for(let i = 0; i<numeroPreguntas; ++i){
    //console.log(`pregunta ${i}`)
    const dummy = window.accionR2P(i)
    //console.log(`revision ${dummy}`)
    correctas += dummy[0]
    totalCorrectas += dummy[1]
  }

  contenedor.querySelector('#r2p-calificacion').innerHTML = 
    `Aciertos ${correctas} de ${totalCorrectas}. Calificación: ${Math.ceil((correctas / totalCorrectas) * 100)}`;
let boton = contenedor.querySelector('#revisar')
    boton.id=''
    boton.disabled=true
//--------------------------
let temporal = contenedor.getAttribute('code');
    const code = temporal.split(',').map(Number);
    const tipo = Number(contenedor.getAttribute('type'));
    const modo = Number(contenedor.getAttribute('modo'));
    const r2pElement = contenedor.closest('r2p-dinamico')
    let fecha = contenedor.getAttribute('data-fecha');
    fecha = fecha.split(',').map(Number);
    let horaInicio = contenedor.getAttribute('data-hi');
    horaInicio = horaInicio.split(',').map(Number);
    let tema = r2pElement.getAttribute('tema')
    tema = tema.split('.').map(Number);

    const date = new Date();

    let stringQR = r2pCore.pregunta.encriptar( code,
                                                tema,
                                                correctas,
                                                totalCorrectas,
                                                tipo,
                                                [horaInicio[0],horaInicio[1]],
                                                [date.getHours(),date.getMinutes()],
                                                [fecha[0],fecha[1]]   )
                                                
    console.log(`cadena Encriptada: ${stringQR}`)    
    /*
    Organización de la información
    Pendiente
    [0-8]codigo
    [9-11] tema
    [12] aciertos
    [13] total
    [14] tipo 
    [15-16] Hora de inicio 
    [17-18] Hora de fin
    [19-21] fecha  
    */
    const currentURL = getURL()
    stringQR = `${currentURL}revisar.html?a=${stringQR}`

    const divEvidencia = contenedor.querySelector('#r2p-evidencia');
    divEvidencia.innerHTML = stringQR;
    const divQR = contenedor.querySelector('#r2p-qr');

    console.log(`URL: ${currentURL}`)
    generarQR(stringQR, divQR);
}
export function revisarGeoGebra(contenedor) {
    //Probablemente esto vaya a cambiar
    const n = contenedor.querySelectorAll('.pregunta-geogebra').length;
    let code = contenedor.getAttribute('code')
    code = code.split(',').map(Number);
    console.log(`numero de preguntas: ${n}`)
    let correctas = 0;
    //const boton = contenedor.getElementsByName('geogebraButton')
    for (let i = 0; i < n; i++) {
        const api = window.ggbApps?.[i];
        if (!api) continue;
        
        if (window.accionGeoGebra(i) === true){
            //console.log(`Ejercicio ${i} correcto`)
            contenedor.querySelector(`#resultado_${i}`).innerText="✅"
            //<span id="resultado_${i}" name="question"></span>
            correctas++;
        }else{ 
            contenedor.querySelector(`#resultado_${i}`).innerText="❌"
            //console.log(`Ejercicio ${i} x`)

        }
    }
  contenedor.querySelector('#r2p-calificacion').innerText = 
    `Aciertos ${correctas} de ${n}. Calificación: ${Math.ceil((correctas / n) * 10)}`;
    //--------------------------------
    let boton = contenedor.querySelector('#revisar')
    boton.id=''
    boton.disabled=true
    const tipo = Number(contenedor.getAttribute('type'));
    const modo = Number(contenedor.getAttribute('modo'));
    const r2pElement = contenedor.closest('r2p-dinamico')
    let fecha = contenedor.getAttribute('data-fecha');
    fecha = fecha.split(',').map(Number);
    let horaInicio = contenedor.getAttribute('data-hi');
    horaInicio = horaInicio.split(',').map(Number);
    let tema = r2pElement.getAttribute('tema')
    tema = tema.split('.').map(Number);

    const date = new Date();

    let stringQR = r2pCore.pregunta.encriptar( code,
                                                tema,
                                                correctas,
                                                n,
                                                tipo,
                                                [horaInicio[0],horaInicio[1]],
                                                [date.getHours(),date.getMinutes()],
                                                [fecha[0],fecha[1]]   )
                                                
    console.log(`cadena Encriptada: ${stringQR}`)    
    /*
    Organización de la información
    Pendiente
    [0-8]codigo
    [9-11] tema
    [12] aciertos
    [13] total
    [14] tipo 
    [15-16] Hora de inicio 
    [17-18] Hora de fin
    [19-21] fecha  
    */
    const currentURL = getURL()
    stringQR = `${currentURL}revisar.html?a=${stringQR}`

    const divEvidencia = contenedor.querySelector('#r2p-evidencia');
    divEvidencia.innerHTML = stringQR;
    const divQR = contenedor.querySelector('#r2p-qr');

    console.log(`URL: ${currentURL}`)
    generarQR(stringQR, divQR);
}
export function recuperaCodigo(cadena){
    return r2pCore.symbols2array(cadena)
}


export function setupEvents() {
  if (revisarHandlerInitialized) return;
  
  document.addEventListener('click', (event) => {
    if (event.target.matches('#revisar')) {
        const revisar = event.target; // ¡Ya tenemos el elemento aquí!
        
        const contenedor = revisar.closest('.r2pi-contenedor');
        const tipo = contenedor.getAttribute('type');
        //revisarOP(revisar);
        if (tipo === '0') revisarOP(revisar);
        else if (tipo === '1') revisarAbiertas(contenedor);
        else if (tipo === '2') revisarGeoGebra(contenedor);
        else if (tipo === '3') revisarAbiertasII(contenedor);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.target.matches('#alumno') && event.key === 'Enter') {
        const alumno = event.target; // ¡Ya tenemos el elemento aquí!
        iniciaTest(alumno)
    }
  });
  document.addEventListener('dblclick', (event) => {
    if (event.target.matches('#alumno')) {
        const alumno = event.target; // ¡Ya tenemos el elemento aquí!
        alumno.value = 'Modo prueba';
        iniciaTest(alumno)
    }
});
  
  revisarHandlerInitialized = true;
}
setupEvents();
async function generarQR(contenidoLargo, contenedor) {
  await cargarQRCodeJS(); // Asegúrate de que esté cargado

  //const contenedor = document.getElementById(idElemento);
  if (!contenedor) {
    console.error(`Elemento con id ${idElemento} no encontrado.`);
    return;
  }

  contenedor.innerHTML = ''; // Limpia el contenido previo si ya había un QR

  new QRCode(contenedor, {
    text: contenidoLargo,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.M // nivel de corrección medio
  });
}
function getURL(){
    const currentURL = window.location.href;
    return currentURL.substring(0, currentURL.lastIndexOf('/') + 1);
}

function cargarQRCodeJS() {
  return new Promise((resolve, reject) => {
    if (window.QRCode) return resolve(); // ya está cargado
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcodejs/qrcode.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
const r2pCore = (function() {
    return {
        symbols2array: function(S){
            let N=[]
            const n=S.length
            for(let i=0;i<n;++i){
                N[i]=r2pCore.S2N(S[i].charCodeAt(0))
            }
            return N
        },
        array2symbols: function(N){
            let S="";
            for(let i=0;i<N.length;++i){
                S=S+this.N2S(N[i]);
            }	
        return S;
        },
        S2N: function(N){// caracter a numero
                    if( "a".charCodeAt(0)<=N &&  N <= "z".charCodeAt(0)) return N-"a".charCodeAt(0);
                    else if( "A".charCodeAt(0)<=N &&  N <= "Z".charCodeAt(0)) return N-"A".charCodeAt(0)+26;
                    else if( "0".charCodeAt(0)<=N && N <= "9".charCodeAt(0)) return N-"0".charCodeAt(0)+52;
                    else if("-".charCodeAt(0)==N) return 62;
                    else if("+".charCodeAt(0)==N) return 63;
                    else if("*".charCodeAt(0)==N) return 64;
                    else if("?".charCodeAt(0)==N) return 65;
                    else if("á".charCodeAt(0)==N) return 66;
                    else if("é".charCodeAt(0)==N) return 67;
                    else if("í".charCodeAt(0)==N) return 68;
                    else if("ó".charCodeAt(0)==N) return 69;
                    else if("ú".charCodeAt(0)==N) return 70;
                    else if("ñ".charCodeAt(0)==N) return 71;
                    else if("Á".charCodeAt(0)==N) return 72;
                    else if("É".charCodeAt(0)==N) return 73;
                    else if("Í".charCodeAt(0)==N) return 74;
                    else if("Ó".charCodeAt(0)==N) return 75;
                    else if("Ú".charCodeAt(0)==N) return 76;
                    else if("Ñ".charCodeAt(0)==N) return 77;
                    else if("_".charCodeAt(0)==N) return 78;
                    else 	return 78;
        },
        N2S: function(N) {
            if (0 <= N && N <= 25) return String.fromCharCode("a".charCodeAt(0) + N);
            else if (26 <= N && N <= 51) return String.fromCharCode("A".charCodeAt(0) + N - 26);
            else if (52 <= N && N <= 61) return String.fromCharCode("0".charCodeAt(0) + N - 52);
            else if (N === 62) return "-";
            else if (N === 63) return "+";
            else if (N === 64) return "*";
            else if (N === 65) return "?";
            else if (N === 66) return "á";
            else if (N === 67) return "é";
            else if (N === 68) return "í";
            else if (N === 69) return "ó";
            else if (N === 70) return "ú";
            else if (N === 71) return "ñ";
            else if (N === 72) return "Á";
            else if (N === 73) return "É";
            else if (N === 74) return "Í";
            else if (N === 75) return "Ó";
            else if (N === 76) return "Ú";
            else if (N === 77) return "Ñ";
            else if (N === 78) return "_";
            else return "_";
        },
        Sarray2Darray: function(x){//Single array to 2D array
            const B=[[],[],[]]
            for(let i=0;i<x.length;++i){
                B[0][i]=x[i]
                B[1][i]=i
                B[2][i]=Math.floor(Math.random()*79)//x[i]
            }
            return B
        },
        Darray2Sarray: function(x){//2D array to Single array uncrypted
            const B=[]
            for(let i=0;i<x[0].length;++i){
                if(x[1][i]!=i) {
                    console.log(`${x[0][i]}!=${x[2][i]} || ${x[1][i]!=i}`)
                    console.error('Error en la matriz de entrada');
                    return -1
                }
                B[i]=x[0][i]
            }
            return B
        },
        Darray2SarrayRaw: function(x){//2D array to Single array encrypted
            
            return [...x[0], ...x[1], ...x[2]]
        },
        Sarray2DarrayRaw: function(x){//Single array encrypted to 2D array
            if(x.length%3!=0){
                console.error('Error en la matriz de entrada: la longitud no es múltiplo de 3');
                return -1
            }
            const n=x.length/3;
            return [x.slice(0, n),
                    x.slice(n, 2*n),
                x.slice(2*n, 3*n)]
        },
        multiplica: function(A,B){			
            const C=[];
            const a=[A.length,A[0].length]
            const b=[B.length,B[0].length]
            if(a[1]!=b[0]){
                console.error('Error en la multiplicación de matrices: las dimensiones no coinciden');
                return
            }
            const n=a[1]
            //console.log(`a: ${a} b: ${b}`)
            
            for(let row=0;row<a[0];++row){
                C[row]=[];
                for(let col=0;col<b[1];++col){
                    C[row][col]=0;
                    for(let k=0;k<n;++k){
                        C[row][col]+= A[row][k]*B[k][col];
                    }
                    C[row][col]=C[row][col]%79;//Modulo 79
                }
            }
            return C;
        },
        encriptarString: function (txt,code){
            let N=this.symbols2array(txt)//Convertir a números
            /*N=this.Sarray2Darray(N);//Convertir a 2D array
            const A=[[code[0],code[1],code[2]],
                    [code[3],code[4],code[5]],
                    [code[6],code[7],code[8]]]
            N=this.multiplica(A,N);//Multiplicar por la matriz de encriptación
            N=this.Darray2SarrayRaw(N);//Convertir a Single array
            N=this.array2symbols(N);//Convertir a símbolos
            return N*/
            return this.encriptarArray(N,code);
        },
        desencriptarString: function (a,code){
            function inversaA(code){
                function inversodet(n){
                let e=0;
				if(n==0){
					return 0;
				}
				for (let i=1;i<79;++i){
					if(n*i%79==1){
						e=i; break;
					}
				}
				return e;
			}
            function det(A){//*
				var f=A[0][0]*(A[1][1]*A[2][2]-A[2][1]*A[1][2])
					f=f-A[0][1]*(A[1][0]*A[2][2]-A[2][0]*A[1][2])
					f=f+A[0][2]*(A[1][0]*A[2][1]-A[2][0]*A[1][1])
					f=f%79;
					f=(f<0)?f+79:f;
				return f;
			}
				const	A=[	[code[0],code[1],code[2]],
						[code[3],code[4],code[5]],
						[code[6],code[7],code[8]]]
				const d=inversodet(det(A));
				let As=new Array();
				As=[	[(A[1][1]*A[2][2]-A[1][2]*A[2][1]),-(A[0][1]*A[2][2]-A[0][2]*A[2][1]) ,(A[0][1]*A[1][2]-A[0][2]*A[1][1])],
						[-(A[1][0]*A[2][2]-A[1][2]*A[2][0]), (A[0][0]*A[2][2]-A[0][2]*A[2][0]),-(A[0][0]*A[1][2]-A[0][2]*A[1][0]) ],
						[(A[1][0]*A[2][1]-A[1][1]*A[2][0]), -(A[0][0]*A[2][1]-A[0][1]*A[2][0]), (A[0][0]*A[1][1]-A[0][1]*A[1][0])]]
				for(let i=0;i<3;++i) for(let j=0;j<3;++j) As[i][j]=(As[i][j]*d)%79;
				for(let i=0;i<3;++i) for(let j=0;j<3;++j) if(As[i][j]<0) As[i][j]+=79; 
                
				return As;
			}
            a= this.symbols2array(a);//Convertir a números
            a = this.Sarray2DarrayRaw(a);//Convertir a 2D array
            let A=inversaA(code);
            a= this.multiplica(A,a);//Multiplicar por la matriz inversa
            
            a= this.Darray2Sarray(a);//Convertir a Single array*/
            let S = this.array2symbols(a)
            return S;
        },
        encriptarArray: function (a,code){
            let N=this.Sarray2Darray(a);//Convertir a 2D array
            const A=[[code[0],code[1],code[2]],
                    [code[3],code[4],code[5]],
                    [code[6],code[7],code[8]]]
            N=this.multiplica(A,N);//Multiplicar por la matriz de encriptación
            N=this.Darray2SarrayRaw(N);//Convertir a Single array*/
            N=this.array2symbols(N);//Convertir a símbolos
            return N
        },
        desencriptarArray: function (a,code){
            function inversaA(code){
                function inversodet(n){
                let e=0;
				if(n==0){
					return 0;
				}
				for (let i=1;i<79;++i){
					if(n*i%79==1){
						e=i; break;
					}
				}
				return e;
			}
            function det(A){//*
				var f=A[0][0]*(A[1][1]*A[2][2]-A[2][1]*A[1][2])
					f=f-A[0][1]*(A[1][0]*A[2][2]-A[2][0]*A[1][2])
					f=f+A[0][2]*(A[1][0]*A[2][1]-A[2][0]*A[1][1])
					f=f%79;
					f=(f<0)?f+79:f;
				return f;
			}
				const	A=[	[code[0],code[1],code[2]],
						[code[3],code[4],code[5]],
						[code[6],code[7],code[8]]]
				const d=inversodet(det(A));
				let As=new Array();
				As=[	[(A[1][1]*A[2][2]-A[1][2]*A[2][1]),-(A[0][1]*A[2][2]-A[0][2]*A[2][1]) ,(A[0][1]*A[1][2]-A[0][2]*A[1][1])],
						[-(A[1][0]*A[2][2]-A[1][2]*A[2][0]), (A[0][0]*A[2][2]-A[0][2]*A[2][0]),-(A[0][0]*A[1][2]-A[0][2]*A[1][0]) ],
						[(A[1][0]*A[2][1]-A[1][1]*A[2][0]), -(A[0][0]*A[2][1]-A[0][1]*A[2][0]), (A[0][0]*A[1][1]-A[0][1]*A[1][0])]]
				for(let i=0;i<3;++i) for(let j=0;j<3;++j) As[i][j]=(As[i][j]*d)%79;
				for(let i=0;i<3;++i) for(let j=0;j<3;++j) if(As[i][j]<0) As[i][j]+=79; 
                
				return As;
			}
            a= this.symbols2array(a);//Convertir a números
            a = this.Sarray2DarrayRaw(a);//Convertir a 2D array
            let A=inversaA(code);
            a= this.multiplica(A,a);//Multiplicar por la matriz inversa
            
            return this.Darray2Sarray(a);//Convertir a Single array
            /*let S = this.array2symbols(a)
            return S;*/
        },
        pregunta:{
            revolver: function(R,msm){
                function revuelve(){// Orden aleatorio
                    let a=[0,1,2,3,4,5];
                    let b=[Math.floor(Math.random()*5.99),0];
                        
                        b[1]=a[0];
                        a[0]=a[b[0]];
                        a[b[0]]=b[1];
                    return a;
                }
                const orden = revuelve()
                //console.log("orden",orden)
                const Rcopy=[]
                const msmcopy=[]
                for(let k=0;k<orden.length;++k){
                    //console.log(`orden[${k}]`,orden[k])
                    Rcopy[k] = R[orden[k]]
                    msmcopy[k] = msm[orden[k]]
                }
                return [Rcopy,msmcopy]
            },
            encriptar: function(code,tema,aciertos, Ntotal,tipo,Hinicio,Hfin,fecha){
                /*
                Esta funcion se usa para encriptar la información para el QR
                
                    Organización de la información
                    [0-8]codigo
                    [9-11] tema
                    [12] aciertos
                    [13] total
                    [14] tipo 
                    [15-16] Hora de inicio 
                    [17-18] Hora de fin
                    [19-21] fecha  
    
                */
                const raw = []
                //code.forEach((k) => raw.push(k) ) //Código
                tema.forEach((k) => raw.push(k) ) //tema
                raw.push(aciertos)
                raw.push(Ntotal)
                raw.push(tipo)
                Hinicio.forEach((k) => raw.push(k) ) //Código
                Hfin.forEach((k) => raw.push(k) ) //Código
                fecha.forEach((k) => raw.push(k) ) //Código
                console.log("raw: ",raw)
                let cadena = r2pCore.array2symbols(raw)
                console.log("cadena raw: ",cadena)
                console.log("code array: ",code)
                const cadenaCode = r2pCore.array2symbols(code)
                //console.log("code en String: ",cadenaCode)
                cadena = r2pCore.encriptarString(cadena,code) 
                //let cadenaTemporal = cadena
                console.log("cadena Encriptada: ",cadena)
                cadena = cadenaCode+cadena
                //console.log("código A: ",cadena)
                cadena = encodeURIComponent(cadena)
                //console.log("código encodeURI: ",cadena)

                /*
                //Vamos a hacer el preoceso inverso
                let cadena2 = decodeURIComponent(cadena)
                //console.log("código A*: ",cadena2)
                let code2 = cadena2.substring(0,9)
                code2 = r2pCore.symbols2array(code2)
                cadena2 = cadena2.substring(9)
                console.log(`code2 ${code2}`)
                //console.log(`cadena 2: ${cadena2}`)
                console.log('Test invesa de encriptar',r2pCore.desencriptarString(cadena2,code2))
                */

                

               return cadena
            }
            

        },
}})();






