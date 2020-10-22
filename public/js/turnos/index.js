import turnoService from "../services/turnosService.js";
import { formatHoursTwoDigits } from "../utils.js";

const processTurnos = (turnosByDay) => {
  const turnos = {};

  turnosByDay.forEach((turnoByDay, index) => {
    (turnoByDay.turnos || []).forEach(turno => {
      if (turno) {
        const hora = formatHoursTwoDigits(turno.horaInicio);
        turnos[hora] = turnos[hora] ? turnos[hora] : [null, null, null, null, null];
        turnos[hora][index] = turno;
      }
    });
  });

  return turnos;
}

const showTurnosInTable = (turnos) => {
  const table = document.getElementById("tablaDeTurnos");
  const tableBody = table.getElementsByTagName('tbody')[0];
  table.classList.remove("d-none");
  tableBody.innerHTML = "";

  Object.entries(turnos).forEach(([key, rowData], index) => {
    const row = tableBody.insertRow(index);
    row.innerHTML = `
      <th scope="row">
        ${key}
      </th>
    `;
    rowData.forEach((column) => {
      row.innerHTML += column ? '<td><button type="button" class="btn btn-success">Reservar</button></td>' : '<td></td>';
    });
  });
};

const handleClickBuscarTurnos = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const especialidad = formData.get("especialidad");
  const fecha = "10-21-2020";
  const turnos = processTurnos(await turnoService.GetTurnosDisponibles(especialidad, fecha));
  showTurnosInTable(turnos);
};

document.getElementById('especialidadForm').addEventListener('submit', handleClickBuscarTurnos);