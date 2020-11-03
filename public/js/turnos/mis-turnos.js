import turnoService from "../services/turnosService.js";
import { formatHoursTwoDigits } from "../utils.js";

const showTurnosInTable = (turnos) => {
  const table = document.getElementById("tablaDeTurnos");
  const tableBody = table.getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  turnos.forEach((turno, index) => {
    const row = tableBody.insertRow(index);
    row.innerHTML = `
      <th scope="row">
        ${turno.id}
      </th>
      <td>
        ${turno.idConsultorio}
      </td>
      <td>
        ${new Date(turno.fecha).toISOString().split("T")[0]}
      </td>
      <td>
        ${formatHoursTwoDigits(turno.horaInicio)}
      </td>
      <td>
        ${formatHoursTwoDigits(turno.horaFin)}
      </td>
    `;
  });
};

const renderTurnos = () => {
  return turnoService.GetTurnos()
    .then((turnos) => {
      showTurnosInTable(turnos);
    });
};

renderTurnos();