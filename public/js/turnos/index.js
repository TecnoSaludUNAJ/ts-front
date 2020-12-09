import turnoService from "../services/turnosService.js";
import { formatHoursTwoDigits } from "../utils.js";
import { DAYS , ESPECIALIDADES_API_URL } from '../constants.js';
import { session } from "../usuario/session.js";

const compareHours = ([keya],  [keyb]) => {
  var time1 = parseFloat(keya.replace(':','.'));
  var time2 = parseFloat(keyb.replace(':','.'));
  if (time1 < time2) return -1;
  if (time1 > time2) return 1;
  return 0;
}

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

  return Object.entries(turnos).sort(compareHours);
}

const showDaysInHeaderTable = (response) => {
  const table = document.getElementById("tablaDeTurnos");
  const tableHead = table.getElementsByTagName('thead')[0];
  const fechas = response.map((turnoInfo) => turnoInfo.fecha);
  const days = fechas.map((fecha) => {
    const day = new Date(fecha).getUTCDay();
    return {
      fecha: new Date(fecha).toLocaleDateString(),
      day: DAYS[day]
    };
  });

  let header = '<tr><th class="align-middle" scope="col">Hora</th>';

  days.forEach(({fecha, day}) => {
    header += `<th scope="col">
      ${day}
      (${fecha})
    </th>`;
  });

  header += '</tr>';

  tableHead.innerHTML = header;
};

const showTurnosInTable = async (turnos) => {
  const table = document.getElementById("tablaDeTurnos");
  const tableBody = table.getElementsByTagName('tbody')[0];
  table.classList.remove("d-none");
  tableBody.innerHTML = "";

  turnos.forEach(([key, rowData], index) => {
    const row = tableBody.insertRow(index);
    row.innerHTML = `
      <th class="align-middle" scope="row">
        ${key}
      </th>
    `;
    rowData.forEach((column) => {
      row.innerHTML += column ? `<td>
        <button
          title="Reservar este turno."
          type="button"
          class="btn btn-success"
          onclick="reservar('${column.fecha}', '${column.horaInicio}',  ${column.idEspecialista}, ${column.idEspecialidad})"
        >
          <h4 class="m-0"><i class="fa fa-check"></i></h4>
        </button>
      </td>` : '<td></td>';
    });
  });

  document.getElementById("seccionTurnos").classList.remove("d-none");
};

window.reservar = (fecha, horaInicio, idEspecialista, idEspecialidad) => {
  const body = {
    fecha,
    horaInicio,
    idEspecialista,
    idEspecialidad,
    idPaciente: session.paciente.paciente_Id,
  };

  return turnoService.PostTurnos(body)
    .then(() => {
      $('.alert').toggle();
      $('#seccionSolicitudTurnos').toggle();
      setTimeout(() => {
        $('.alert').toggle();
        window.location.href = window.location.href + "/mis-turnos";
      }, 8000);
    });
};

const handleClickBuscarTurnos = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const especialidad = formData.get("especialidad");
  const today = new Date();
  document.getElementById("turnosDesde").value = today;
  await fetchAndRenderTable(especialidad, today);
};

const disableButtonInCurrentWeek = (weekDate) => $('#buscarTurnosAnteriorSemana').prop('disabled', weekDate.toLocaleDateString() === new Date().toLocaleDateString());

const fetchAndRenderTable = async (especialidad, date) =>{
  const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
  const response = await turnoService.GetTurnosDisponibles(especialidad, formatedDate);
  const turnos = processTurnos(response);
  showDaysInHeaderTable(response);
  showTurnosInTable(turnos);
  disableButtonInCurrentWeek(date);
};

const fetchAndRenderTableByWeek = async (operation) => {
  const especialidad = document.getElementById("selectEspecialidad").value;
  const turnosDesde = new Date(document.getElementById("turnosDesde").value);
  turnosDesde.setDate(operation(turnosDesde.getDate()));
  document.getElementById("turnosDesde").value = turnosDesde;
  await fetchAndRenderTable(especialidad, turnosDesde);
}

document.getElementById('especialidadForm').addEventListener('submit', handleClickBuscarTurnos);
document.getElementById('buscarTurnosAnteriorSemana').addEventListener('click', () => fetchAndRenderTableByWeek((date) => date - 5));
document.getElementById('buscarTurnosSiguienteSemana').addEventListener('click', () => fetchAndRenderTableByWeek((date) => date + 5));


/* Select Especialidades */
function mostrarEspecialidades(lista) {
  for (let i of lista) {
    const place = document.getElementById("selectEspecialidad");
    const option = document.createElement("option");
    option.value = i.id;
    option.text = i.tipoEspecialidad;

    place.appendChild(option);
  }
}

const getEspecialidades = () => {
  return fetch(ESPECIALIDADES_API_URL)
    .then((response) => response.json());
};

window.onload = function () {
  getEspecialidades()
    .then((lista) => {
      mostrarEspecialidades(lista);
    });
};