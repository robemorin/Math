const points_revisor = 10
const points_AutorSinRespuesta = 20
const points_AutorConRespuesta = 30

function autenticar(){
    const usuario=document.getElementById('usuario').value.trim()
    const contrasenna=document.getElementById('contrasenna').value.trim()
//const site=`https://d1-tutorial.robertomorin2.workers.dev/load_user?user=${usuario}&pass=${contrasenna/*.hashCode()*/}`
    const site=`https://d1-tutorial.robertomorin2.workers.dev/load_user?user=${usuario}&pass=${contrasenna.hashCode()}`

    if(!document.getElementById("remember-me").checked){
        localStorage.removeItem("remember_me")
    }
    fetch(site).then((response) => {
        if (response.ok) {
          return response.json();
        }
        document.getElementById('warning').textContent = "Error en autenticación"
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        console.log(responseJson)
        if(responseJson.length==0){
          document.getElementById('warning').textContent = "Usuario o contraseña no corresponden."
        }else{
          for(let key in responseJson[0]) {
            if(responseJson[0].hasOwnProperty(key)) {
              localStorage.setItem(key,responseJson[0][key])
              console.log(`${key}: ${responseJson[0][key]}`)
            }
          }
          if(document.getElementById("remember-me").checked){
            localStorage.remember_me = 'ON'
          }else{
            localStorage.remember_me = 'OFF'
          }


          if(localStorage.nivel >-1){//---------------------------------------------------------Hay que tomar otro número al azar
            window.location.href = 'docente.html'
          }
        }

        // Do something with the response
      })
      .catch((error) => {
        console.log(error)
        document.getElementById('warning').textContent = "Error en autenticación"
      });
  }
  function start(){
    if( (typeof localStorage.remember_me != 'undefined') &&
        (typeof localStorage.user != 'undefined') &&
        (typeof localStorage.pass != 'undefined')){
          document.getElementById('usuario').value = localStorage.user
          document.getElementById('contrasenna').value = localStorage.pass
          document.getElementById("remember-me").checked = true
    }
  }


function Datos_update(P){
  let getdata=''
  for(var key in P){
    getdata += `${key}=${P[key]}&`
 }
 

  //const site=`https://d1-tutorial.robertomorin2.workers.dev/d_update?${getdata.slice(0, getdata.length - 1)}`
  const site=`https://d1-tutorial.robertomorin2.workers.dev/d_update?${getdata.slice(0, getdata.length - 1)}`
  console.log(site)
    fetch(site).then((response) => {
        if (response.ok) {
          return response.json();
        }
        alert('Error en conexión: M001')
        throw new Error('Something went wrong');
      })
      .then((responseJson) => {
        console.log(responseJson)
        localStorage.nombre= P.nombre
        localStorage.titulo=P.titulo
        localStorage.Escuela=P.Escuela,
        localStorage.logo=P.logo
        localStorage.PU=0
        localStorage.PT=100
        alert('Datos guardados exitosamente\n Recargue la página para actualizar')
        // Do something with the response
      })
      .catch((error) => {
        console.log(error)
        alert('Error en conexión: M002')
      });
}
String.prototype.hashCode = function() {
  var hash = 0,
    i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
function language(){
  
  const lan = document.getElementById("Lang").value
  let tagOff = document.getElementsByClassName(lan=='EN'?'ES':'EN')
  let tagON = document.getElementsByClassName(lan=='ES'?'ES':'EN')
  
  for(let k=0; k<tagOff.length;++k){
    tagOff[k].classList.add('langOFF')
    tagOff[k].classList.remove('langON')
  }
  for(let k=0; k<tagON.length;++k){
    tagON[k].classList.add('langON')
    tagON[k].classList.remove('langOFF')
  } 
  localStorage.lang=lan
}
function nav_docente(q){
  const divs = ['materiales','mismateriales','revision']
  for(let k=0;k<divs.length;++k){
    if(divs[k]!=q)
      document.getElementById(divs[k]).style.display="none"
    else
      document.getElementById(divs[k]).style.display="block"
  }
}

function reviewQuestions(){
  if(localStorage.nivel<1){
    console.log('No tiene los suficientes privilegios')
    document.getElementById("warning_revprob").textContent = "No tienes los suficientes privilegios"
    return

  }

  const site=`https://d1-tutorial.robertomorin2.workers.dev/porevaluar`
  //const site=`https://d1-tutorial.robertomorin2.workers.dev/porevaluar`

  fetch(site).then((response) => {
    if (response.ok) {
      return response.json();
    }
    document.getElementById('warning_revprob').textContent = "Error, inténtelo más tarde"
    throw new Error('Something went wrong');
  })
  .then((responseJson) => {
    //console.log(responseJson)
    
    let tr=''
    for(let k=0;k<responseJson.length;++k){
//Debo pensar en cómo asignarle un puntaje0
      if(responseJson[k].idA != localStorage.Id && responseJson[k].S == 'R' ){
        tr += `<tr id="tr${responseJson[k].idA}"><td>${revisionShowQuestion(responseJson[k],1)}</td><td style="vertical-align:top">${dialog_revision(responseJson[k])}</td></tr>
        <tr><td colspan="2"><center>--------------- Separador --------------</center></td></tr>`
      }
    }
    document.getElementById('rev_questions').innerHTML = tr
    
  language()
  })
  .catch((error) => {
    console.log(error)
    document.getElementById('warning_revprob').textContent = "Error, inténtelo más tarde"
  });
}
function revisionShowQuestion(json){
  let wS=Math.round(window.screen.width*0.6)
  let hS=Math.round(wS*1.27173418298)

  const img1 = `<img class="revQuest" width="${wS}" style="height:${hS}px; width:${wS}px;background: url('https://drive.google.com/thumbnail?id=${json.L1}&sz=w${wS}');background-repeat: no-repeat;background-position:0px 0px ;background-size: ${wS}px ${hS}px;" >`
  const img2 = json.L2 != '-1'?`<br><img class="revQuest" width="${wS}" style="height:${hS}px; width:'${wS}';background: url('https://drive.google.com/thumbnail?id=${json.L2}&sz=w${wS}');background-repeat: no-repeat;background-position:0px 0px ;background-size: ${wS}px ${hS}px;" >`:''
  const img3 = json.L3 != '-1'?`<br><img class="revQuest" width="${wS}" style="height:${hS}px; width:'${wS}';background: url('https://drive.google.com/thumbnail?id=${json.L3}&sz=w${wS}');background-repeat: no-repeat;background-position:0px 0px ;background-size: ${wS}px ${hS}px;" >`:''
  return img1+img2+img3
}
function readMyQuestions(){
  let data 
  const site=`https://d1-tutorial.robertomorin2.workers.dev/load_myquestions?id=${localStorage.Id}`
  //const site=`https://d1-tutorial.robertomorin2.workers.dev/load_myquestions?user=${usuario}&pass=${contrasenna}`

  fetch(site).then((response) => {
    if (response.ok) {
      return response.json();
    }
    document.getElementById('warning_myprob').textContent = "Error, inténtelo más tarde"
    throw new Error('Something went wrong');
  })
  .then((responseJson) => {
    //console.log(responseJson)
    
    let tr=''
    for(let k=0;k<responseJson.length;++k){
      top=responseJson[k].t1

      tr += `<tr><td>${preview(responseJson[k],1)}</td><td>${info_myquestion(responseJson[k])}</td></tr>`
    }
    document.getElementById('my_questions').innerHTML = tr
  })
  .catch((error) => {
    console.log(error)
    document.getElementById('warning_myprob').textContent = "Error, inténtelo más tarde"
  });
}
function load_all_courses(){
  fetch("./indice.JSON")
                .then((res) => {
                    if (!res.ok) {
                        throw new Error
                            (`HTTP error! Status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => 
                      console.log(data))
                .catch((error) => 
                       console.error("Unable to fetch data:", error));
}
function dialog_revision(json){
  function tableInfo(json){
    function getInfoCourse(qwertry){
      let c={}
      c.raw=qwertry
      //let curso = JSON.parse(load_all_courses())
      let curso = courses_data
      
      const numbers=[]
      let n = c.raw.indexOf('.')
      c.programa = c.raw.substring(0,n)
      curso = curso[c.programa]
      console.log('Curso')
      console.log(curso)
      if(curso == undefined) return true
      c.nombre = curso.nombre
      console.log('Polo')
      let residual = c.raw.substring(n+1)
      n = residual.indexOf('.')
      numbers[0]=residual.substring(0,n)
      c.tema = curso.tema[numbers[0]].nombre
      residual = residual.substring(n+1)
      n = residual.indexOf('.')
      numbers[1]=residual.substring(0,n)
      c.subtema = curso.tema[numbers[0]].subtema[numbers[1]].nombre
      return c
    }
    const data1 = getInfoCourse(json.P1)
    const data2 = json.P2=='null'?'null':getInfoCourse(json.P2)
    if(data1===true || data2===true) return true
    return `<div style="border:#988 solid 3px"><center>${data1.nombre}<br>&#11049;${data1.tema}<br>&#11049;&#11049;${data1.subtema}</center></div>
            ${data2=='null'?'':`<div style="border:#988 solid 3px"><center>${data2.nombre}<br>&#11049;${data2.tema}<br>&#11049;&#11049;${data2.subtema}</center></div>`}`

  }
  function dialog(json){
    let s = tableInfo(json)
    if(s===true) return ''
    s += `<br><center><div style="border:#988 solid 3px"><span class="ES">Modificar solo si es incorrecto<br>Puntos: </span><span class="EN">Modify if it's wrong<br>Marks:</span><input type="number" id="totalpoints${json.Id}" value="${json.puntos}" style="width:60px"> <br>${json.L3==-1?'<span class="ES">No incluye solución</span><span class="EN">Not includes solution</span>':''}</div><br><label for="MSM${json.Id}"><span class="ES">Observaciones:</span><span class="EN">Comments:</span></label><br><br>
    <textarea class="msm_rev" id="MSM${json.Id}" rows="5" width="100%"></textarea><br><label for="Veredicto${json.Id}"><span class="ES">Veredicto:</span><span class="EN">Veredict:</span></label>
    <select id="Veredicto${json.Id}">
      <option value="N" class="ES">Rechazado</option>
      <option value="N" class="EN">Rejected</option>
      <option value="A" class="ES">Admitido</option>
      <option value="A" class="EN">Accepted</option>
      <option value="C" class="ES">Corregir</option>
      <option value="C" class="EN">To correct</option>
    </select><br><input type="hidden" id="json${json.Id}" value='${JSON.stringify(json)}'><br>
    <button onclick="save_revision(${json.Id})"><span class="ES">Guardar</span><span class="EN">Save</span></button>
    <div id="AlertRev${json.Id}"></div>
    </center>`
    return s
  }
  return dialog(json)
}
function addPoints(id,points){
  const link=`https://d1-tutorial.robertomorin2.workers.dev/add_points?puntos=${points}&id=${id}`
  fetch(link).then((response) => {
    if (response.ok) {
      return response.json();
    }
    console.log('algo salio mal')
    throw new Error('Something went wrong');
  })
  .then((responseJson) => {
    if(responseJson.success){
      console.log("Puntos añadidos")
    }else{
      console.log("Error funcion addpoints")
    }
  })
  .catch((error) => {
    console.log(error)
    console.log('algo salio mal')
  });
}
function save_revision(id){
  
  const ver = document.getElementById(`Veredicto${id}`).value
  const puntos = document.getElementById(`totalpoints${id}`).value
  const MSM = document.getElementById(`MSM${id}`).value
  const json = JSON.parse(document.getElementById(`json${id}`).value)
  //let link=`https://d1-tutorial.robertomorin2.workers.dev/revnofavorable?S=${ver}&MSM=${MSM}&puntos=${puntos}&idA=${localStorage.Id}&R=${localStorage.user}&id=${id}${ver=='A'?`&json=${document.getElementById(`json${id}`).value}`:''}`
  let link=`https://d1-tutorial.robertomorin2.workers.dev/revnofavorable?S=${ver}&MSM=${MSM}&puntos=${puntos}&idA=${localStorage.Id}&R=${localStorage.user}&id=${id}${ver=='A'?`&json=${document.getElementById(`json${id}`).value}`:''}`
  console.log(link)
  addPoints(localStorage.Id,15)
  if(ver == 'A'){ 
    addPoints(json.idA, json.L3 == "-1"?25:30 )
  }
//////////////////////////

  fetch(link).then((response) => {
    if (response.ok) {
      return response.json();
    }
    document.getElementById(`AlertRev${id}`).textContent = "Error, inténtelo más tarde"
    throw new Error('Something went wrong');
  })
  .then((responseJson) => {
    if(responseJson.sucess){
      document.getElementById('tr'+id).style.display = 'none'
    }
  })
  .catch((error) => {
    console.log(error)
    document.getElementById(`AlertRev${id}`).textContent = "Error, inténtelo más tarde."
  });
///////////////////////////

  
}
function info_myquestion(json){
  function tableInfo(json){
    function getInfoCourse(qwertry){
      let c={}
      c.raw=qwertry
      let curso = courses_data
      
      const numbers=[]
      let n = c.raw.indexOf('.')
      c.programa = c.raw.substring(0,n)
      curso = curso[c.programa]
      
      c.nombre = curso.nombre
      //console.log(curso)
      //console.log(c.nombre)

      let residual = c.raw.substring(n+1)
      n = residual.indexOf('.')
      numbers[0]=residual.substring(0,n)
      c.tema = curso.tema[numbers[0]].nombre
      residual = residual.substring(n+1)
      n = residual.indexOf('.')
      numbers[1]=residual.substring(0,n)
      c.subtema = curso.tema[numbers[0]].subtema[numbers[1]].nombre
      return c
    }
    const data1 = getInfoCourse(json.P1)
    const data2 = json.P2=='null'?'null':getInfoCourse(json.P2)

    return `<center>Estado: ${json.S}<br>${json.R=='null'?'':`Revisor: ${json.R}`}</center><div style="border:#988 solid 3px"><center>${data1.nombre}<br>&#11049;${data1.tema}<br>&#11049;&#11049;${data1.subtema}</center></div>
            ${data2=='null'?'':`<div style="border:#988 solid 3px"><center>${data2.nombre}<br>&#11049;${data2.tema}<br>&#11049;&#11049;${data2.subtema}</center></div>`}`

  }
  

  return tableInfo(json)
}
function preview(json,n_img=1){
  let wS=Math.round(window.screen.width*0.6)
  let hS=Math.round(wS*1.27173418298)

  let top = json.t1, alto = json.b1
  top= top.substring(0,top.length-1)*hS/100
  alto= alto.substring(0,alto.length-1)*hS/100
  //console.log("top: "+top+" alto: "+alto)
  if(n_img==1){
    
    return `<img width="${wS}" style="height:${alto}px; width:'${wS}';background: url('https://drive.google.com/thumbnail?id=${json.L1}&sz=w${wS}');background-repeat: no-repeat;background-position:0px -${top}px ;background-size: ${wS}px ${hS}px;" >`
  }
}
function display_profes(json){
    //tabla_admin
    let tabla = document.getElementById("tabla_admin")

    let s=''
    for(let k=1;k<json.length;++k){
      s += `<tr><td>${json[k].Id}</td><td>${json[k].user}</td><td id="privilegio${json[k].Id}"><button onclick="privilegios(${json[k].Id},${json[k].nivel},'-')">-</button> ${json[k].nivel} <button onclick="privilegios(${json[k].Id},${json[k].nivel},'+')">+</button></td><td>${json[k].PT}</td></tr>`
    }
    tabla.innerHTML += s
}
function privilegios(id,n,op){
  //vamos a darle más o menos privilegios
  let newLevel = n
  if(op=='+' && n<2){
    ++newLevel
  }
  if(op=='-' && n>0){
    --newLevel
  }


  const site=`https://d1-tutorial.robertomorin2.workers.dev/privilegios?id=${id}&nivel=${newLevel}`
    //const site=`https://d1-tutorial.robertomorin2.workers.dev/privilegios?id=${localStorage.Id}&nivel=${newLevel}`
    fetch(site).then((response) => {
      if (response.ok) {
        return response.json();
      }
      console.log("Error, inténtelo más tarde")
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      console.log(responseJson)
      let td = document.getElementById(`privilegio${id}`)
      td.innerHTML = `<button onclick="privilegios(${id},${newLevel},'-')">-</button> ${newLevel} <button onclick="privilegios(${id},${newLevel},'+')">+</button>`
      
    })
    .catch((error) => {
      console.log(error)
      console.log("Error, inténtelo más tarde")
    });
}