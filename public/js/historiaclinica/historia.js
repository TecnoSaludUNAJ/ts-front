import { HISTORIA_API_URL } from "../constants.js";
import {convertDate, formatHoursTwoDigits} from "../utils.js"

function getHistoriaClinica(idpaciente) {
  return fetch(HISTORIA_API_URL + `?pacienteid=${idpaciente}`)
    .then((res) =>res.json())
    .then(data => mostrarDatos(data))
    .catch(err=>console.log(err))
}

//Getting paciente ID
const querystring = window.location.search;
const urlparams = new URLSearchParams(querystring);
const pacienteid = urlparams.get("pacienteid");

document.getElementById("pacienteId").innerHTML = pacienteid;
getHistoriaClinica(pacienteid);

function mostrarDatos(historialclinico) {
  const container = document.getElementById("containerhistoria");

  if (!historialclinico.length) {
    container.innerHTML = `
      <h3 class="font-weight-normal text-secondary py-2 text-center mt-4">No encontramos registros del paciente en la base de datos.</h3>
    `;
  } else {
    container.innerHTML = '<div id="accordion">';
    historialclinico.forEach((historial, index) => {
      const fechaRegistro = `${convertDate(historial.fechaRegistro)} ${formatHoursTwoDigits(historial.fechaRegistro)}`;
      container.innerHTML += `
        <div class="card mb-3 border-primary">
          <div class="card-header" id="heading-${index}">
            <h5 class="mb-0">
              <button class="btn btn-link ${ index != 0 ? "collapsed" : "" }" data-toggle="collapse" data-target="#collapse-${index}" aria-expanded="${!Boolean(index)}" aria-controls="collapse-${index}">
                ${historial.motivoConsulta} - ${fechaRegistro}
              </button>
            </h5>
          </div>

          <div id="collapse-${index}" class="collapse ${ index == 0 ? "show" : "" }" aria-labelledby="heading-${index}" data-parent="#accordion">
            <div class="card-body">
              <span  class="  d-block border-bottom">Fecha de la consulta:  ${fechaRegistro}</span><br>
              <span class="  d-block border-bottom">Motivo de la consulta:  ${historial.motivoConsulta}</span><br>
              <span  class='  d-block border-bottom'>Diagnostico: ${historial.diagnostico}</span><br>
              <span  class='d-block border-bottom'>Detalle de los analisis: ${historial.analisis}</span><br>
              <span class='d-block border-bottom'>Detalle de recetas: ${historial.receta}</span><br>
              <span  class='  d-block border-bottom'>Proxima revision: ${convertDate(historial.proximaRevision)} ${formatHoursTwoDigits(historial.proximaRevision)}</span><br>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML += '</div>';
  }
}