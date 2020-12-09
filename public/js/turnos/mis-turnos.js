import turnoService from "../services/turnosService.js";
import { ESPECIALIDADES_API_URL, ESPECIALISTAS_API_URL} from '../constants.js';
import { formatHoursTwoDigits } from "../utils.js";


const mapResultsToObject = (array) => {
  return array.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {});
};

const getEspecialidades = () => {
  return fetch(ESPECIALIDADES_API_URL)
    .then((response) => response.json());
};


const getEspecialistas = () => {
  return fetch(ESPECIALISTAS_API_URL)
    .then((response) => response.json());
};

const showTurnosInTable = async (turnos) => {
  const especialidades = await getEspecialidades().then(mapResultsToObject);
  const especialistas = await getEspecialistas().then(mapResultsToObject);
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
        ${especialistas[turno.idEspecialista] ? especialistas[turno.idEspecialista].nombre + " " + especialistas[turno.idEspecialista].apellido : "Otro"}
      </td>
      <td>
        ${ especialidades[turno.idEspecialidad] ? especialidades[turno.idEspecialidad].tipoEspecialidad : "Otro" }
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