import { HISTORIA_API_URL } from "../constants.js";

function getHistoriaClinica(idpaciente) {
  fetch(HISTORIA_API_URL + `?pacienteid=${idpaciente}`)
  .then((res) =>res.json())
  .then(data => {mostrarDatos(data)})
  .catch(err=>console.log(err))
}

//Getting paciente ID
const querystring = window.location.search;
const urlparams = new URLSearchParams(querystring);
const pacienteid = urlparams.get("pacienteid");

getHistoriaClinica(pacienteid);

function mostrarDatos(historialclinico) {

  const container=document.getElementById("containerhistoria");
  historialclinico.forEach(historial => {
   
    if (historial.descripcionReceta===null) {
      historial.descripcionReceta= "Sin información";
    }
    if (historial.descripcionAnalisis===null) {
      historial.descripcionAnalisis= "Sin información";
    }

    container.innerHTML+=`
    <div class='card mb-3 border-primary'>
        <div class="card-body">
        <span  class="  d-block border-bottom">Fecha de la consulta:  ${historial.fechaRegistro}

        </span><br>

        <span class="  d-block border-bottom">Motivo de la consulta:  ${historial.motivoConsulta}
            
        </span><br>

        <span  class='  d-block border-bottom'>Diagnostico: ${historial.diagnostico}
            
        </span><br>

        <span  class='d-block border-bottom'>Detalle de los analisis: ${historial.descripcionAnalisis}
            
        </span><br>

        <span class='d-block border-bottom'>Detalle de recetas: ${historial.descripcionReceta}
            
        </span><br>

        <span  class='  d-block border-bottom'>Proxima revision: ${historial.proximaRevision}
            
        </span><br>
        
        </div>
    </div>`

  });

}