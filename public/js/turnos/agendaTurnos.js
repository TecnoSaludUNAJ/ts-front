import { GetTurnosEspecialista } from "../services/turnosService.js";
import { session } from "../usuario/session.js";

window.addEventListener(
  "load",
  () => {
    loadHeaderTurnos();
    loadTurnos();
  },
  false
);

const tBody = document.getElementById("tBodyAgenda");

const loadTurnos = async () => {
  let especialista = session.especialidadSelected.especialistaId;
  let especialidad = session.especialidadSelected.especialidadId;
  let fecha = "04-12-2020";
  console.log("Especialista: " + especialista);
  let turnos = await GetTurnosEspecialista(especialista, especialidad, fecha);
  console.log(turnos);
  turnos && turnos.length > 0
    ? ((tBody.innerHTML = ""), turnos.map((t) => addTurnoDOM(t)))
    : (tBody.innerHTML = emptyTurnos);
};

const addTurnoDOM = (turno) => {
  console.log(turno);
  let horaInicio = turno.horaInicio.slice(11, 16);
  let horaFin = turno.horaFin.slice(11, 16);
  tBody.innerHTML += `
  <tr>
    <td class="font-we" style="font-size: 1.5em;"><i class="fas fa-clock"></i> ${horaInicio} - ${horaFin}</th>
    <td><a class="btn btn-outline-secondary" href="/datosPaciente?pacienteId=${turno.idPaciente}"><i class="far fa-address-card"></i> Datos del paciente</a></td>
    <td>
      <div class="btn-group" role="group">
        <a class="btn btn-outline-primary" href="/historiaClinica?pacienteId=${turno.idPaciente}"><i class="fas fa-file-medical-alt"></i> Ver Historial Clínico</a>
        <a class="btn btn-outline-success" href="/historiaClinica/registrar?pacienteId=${turno.idPaciente}"><i class="fas fa-notes-medical"></i> Agregar Historial Clínico </a>
      </div>
    </td>
    <td><a class="btn btn-outline-danger" href="/turnos?pacienteId=${turno.idPaciente}"><i class="fas fa-hand-holding-medical"></i> Asignar turno</a></td>
  </tr>
  `;
};

const emptyTurnos = `
  <tr class="text-center">
  <td colspan="4">
  <i class="far fa-calendar-minus text-primary my-4" style="font-size: 4em"></i>
  <h3 class="font-weight-normal text-secondary py-2">Todavía no hay turnos asignados para el día de hoy.</h3>
  </td>
  </tr>
`;

const loadHeaderTurnos = () => {
  $("#fechaHoy").text(new Date().toLocaleDateString());
  $("#especialidad").text(session.especialidadSelected.tipoEspecialidad);
  $("#jornada").text("Cargando...");
};
