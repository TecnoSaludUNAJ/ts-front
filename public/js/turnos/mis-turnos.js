import turnoService from "../services/turnosService.js";
import { formatHoursTwoDigits } from "../utils.js";

const getEspecialista = (especialistaId) => {
  const especialistas = [{
    idEspecialista: 1,
    nom_profesional: "Dr Oscar Mendez",
    nom_especialidad: "Clínico",
  },
  {
    idEspecialista: 2,
    nom_profesional: "Dra Lucia Ramos",
    nom_especialidad: "Traumatología",
  }];

  return especialistas.find((especialista) => especialista.idEspecialista === especialistaId);
};

const showTurnosInTable = (turnos) => {
  const table = document.getElementById("tablaDeTurnos");
  const tableBody = table.getElementsByTagName('tbody')[0];
  tableBody.innerHTML = "";

  turnos.forEach((turno, index) => {
    const row = tableBody.insertRow(index);
    const {nom_profesional, nom_especialidad} = getEspecialista(turno.idEspecialista);
    row.innerHTML = `
      <th scope="row">
        ${turno.id}
      </th>
      <td>
        ${nom_profesional}
      </td>
      <td>
        ${nom_especialidad}
      </td>
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