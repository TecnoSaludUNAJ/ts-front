import {convertDate} from "../utils.js"
import {getHistoriaClinica} from "../services/historiaClinicaService.js"
import {getPacientebyDNI, getPacientebyID} from '../services/pacienteService.js';

//Getting paciente ID
const querystring = window.location.search;
const urlparams = new URLSearchParams(querystring);
const pacienteid = urlparams.get("pacienteId");

let pacienteIDResult = pacienteid;

document.getElementById("pacienteId").innerHTML = pacienteid;

window.addEventListener(
  "load",
  () => {
    buscadorPaciente.onsubmit = function (e) {
      e.preventDefault();
      loadPacienteByDNI($("#dniFind").val());
    }
    if(pacienteid){
      $("#buscadorPaciente").addClass("d-none")
      loadPaciente(pacienteid)
      getHC();
    }
  },
  false
);

const getHC = async () => {
 const historiaclinica = await getHistoriaClinica(pacienteIDResult);
if(historiaclinica){
  mostrarDatos(historiaclinica)
}
}

function mostrarDatos(historialclinico) {
  const container = document.getElementById("containerhistoria");

  if (!historialclinico.length) {
    container.innerHTML = `
      <h3 class="font-weight-normal text-secondary py-2 text-center mt-4">No encontramos registros del paciente en la base de datos.</h3>
    `;
  } else {
    container.innerHTML = '<div id="accordion">';
    historialclinico.forEach((historial, index) => {
      const fechaRegistro = `${convertDate(historial.fechaRegistro)} `;
      container.innerHTML += `
        <div class="card mb-3 border-primary bg-transparent">
          <div class="card-header bg-transparent" id="heading-${index}">
            <h5 class="mb-0">
              <button class="btn btn-link ${ index != 0 ? "collapsed" : "" } text-decoration-none" data-toggle="collapse" data-target="#collapse-${index}" aria-expanded="${!Boolean(index)}" aria-controls="collapse-${index}">
              <i class="far fa-calendar"></i> ${fechaRegistro} - <i class="fas fa-notes-medical"></i> Motivo: ${historial.motivoConsulta}
              </button>
            </h5>
          </div>

          <div id="collapse-${index}" class="collapse ${ index == 0 ? "show" : "" }" aria-labelledby="heading-${index}" data-parent="#accordion">
            <div class="card-body">
              <span  class="  d-block border-bottom">Fecha de la consulta:  ${fechaRegistro}</span><br>
              <span class="  d-block border-bottom">Motivo de la consulta:  ${historial.motivoConsulta}</span><br>
              <span  class='d-block border-bottom'>Diagnostico: ${historial.diagnostico}</span><br>
              <span  class='d-block border-bottom'>Detalle de analisis: <span class="d-block py-2">${historial.analisis}</span></span><br>
              <span class='d-block border-bottom'>Detalle de receta: <span class="d-block py-2">${historial.receta}</span></span><br>
              <span class='d-block border-bottom'>Proxima revision: ${convertDate(historial.proximaRevision)}</span><br>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML += '</div>';
  }
}

const loadPaciente = async (pacienteId) => {
  let paciente = await getPacientebyID(pacienteId);
  if(paciente.paciente_Id){
    $("#datosPaciente").removeClass("d-none")
    $("#nombrecompleto").text(paciente.nombre + " " + paciente.apellido);
    $("#dni").text(paciente.dni);
    $("#pacienteId").text(paciente.paciente_Id);
    $('#btnSubmit').attr("disabled", false);
  }
  else{
    showError("No se ha encontrado ningún paciente con ID " + pacienteId)
  }
};


const loadPacienteByDNI = async (dni) => {
  $("#showError").addClass("d-none")
  $("#infoSearch").addClass("d-none")
  let paciente = await getPacientebyDNI(dni);
  if(paciente.paciente_Id){
    pacienteIDResult = paciente.paciente_Id;
    $("#datosPaciente").removeClass("d-none")
    $("#nombrecompleto").text(paciente.nombre + " " + paciente.apellido);
    $("#dni").text(paciente.dni);
    $("#pacienteId").text(paciente.paciente_Id);
    $('#btnSubmit').attr("disabled", false);
    getHC();
  }
  else{
    showError("No se ha encontrado ningún paciente con el DNI ingresado.")
  }
};

const showError = (text) => {
  $("#showError").text(text)
  $("#showError").removeClass("d-none")
}