import {
  ESPECIALIDADES_API_URL,
  ESPECIALISTAS_API_URL,
  PROFESIONALES_API_URL,
} from "../constants.js";

class Especialista {
  constructor(profesionalid, especialidadid, calendarioturnos) {
    this.profesionalId = profesionalid;
    this.especialidadId = especialidadid;
    this.calendarioTurnos = calendarioturnos;
  }
}

var profesionalId;

function PostEspecialista(especialistajson) {
  fetch(ESPECIALISTAS_API_URL, {
    method: "POST",
    body: especialistajson,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  }).then((response) => response.json());
}

const getEspecialidades = function () {
  fetch(ESPECIALIDADES_API_URL)
    .then((response) => response.json())
    .then((lista) => {
      mostrarEspecialidades(lista);
    });
};

async function getProfesionales(
  profesionalname,
  calendarioTurnos,
  especialidadId
) {
  await fetch(PROFESIONALES_API_URL)
    .then((response) => response.json())
    .then((lista) => {
      if (profesionalname == null || profesionalname == undefined) {
        mostrarProfesionales(lista);
      } else {
        for (const item of lista) {
          if (profesionalname == `${item.nombre} ${item.apellido}`) {
            profesionalId = item.id;

            var especialista = new Especialista(
              profesionalId,
              especialidadId,
              calendarioTurnos
            );

            var especialistajson = JSON.stringify(especialista);

            PostEspecialista(especialistajson);

            break;
          }
        }
      }
    });
}

function mostrarEspecialidades(lista) {
  for (let i of lista) {
    const place = document.getElementById("listespecialidades");
    const element = document.createElement("div");
    element.innerHTML = `
    <option value="${i.tipoEspecialidad}">
    `;
    place.appendChild(element);
  }
}

function mostrarProfesionales(lista) {
  for (let i of lista) {
    const place = document.getElementById("listprofesionales");
    const element = document.createElement("div");
    element.innerHTML = `
    <option value="${i.nombre} ${i.apellido}">
    `;
    place.appendChild(element);
  }
}

window.onload = function () {
  getEspecialidades();
  getProfesionales(null, null, null);
};

//Obteniendo el id de la especialidad seleccionada y pasando los datos a getProsionales para obtener su Id
async function getId(profesionalname, calendarioTurnos, especialidad) {
  await fetch(ESPECIALIDADES_API_URL)
    .then((response) => response.json())
    .then((lista) => {
      for (const item of lista) {
        if (especialidad == item.tipoEspecialidad) {
          var especialidadId = item.id;

          getProfesionales(profesionalname, calendarioTurnos, especialidadId);
        }
      }
    });
}
//Obteniendo datos del form
const formespecialista = document.getElementById("form-especialista");
if (formespecialista) {
  formespecialista.onsubmit = (e) => {
    e.preventDefault();
    var profesionalname = formespecialista.elements.profesional.value;
    var calendarioTurnos = parseInt(
      formespecialista.elements.calendarioturnos.value
    );
    var especialidad = formespecialista.elements.especialidad.value;
    getId(profesionalname, calendarioTurnos, especialidad);
  };
}
