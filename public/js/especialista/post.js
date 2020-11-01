class Especialista {
  constructor(profesionalid, especialidadid, calendarioturnos) {
    this.profesionalId = profesionalid;
    this.especialidadId = especialidadid;
    this.calendarioTurnos = calendarioturnos;
  }
}

function PostEspecialista(especialistajson) {
  fetch("https://localhost:44306/api/Especialistas", {
    method: "POST",
    body: especialistajson,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  }).then((response) => response.json());
}

const getEspecialidades = function () {
  fetch("https://localhost:44306/api/Especialidades")
    .then((response) => response.json())
    .then((lista) => {
      mostrarEspecialidades(lista);
    });
};

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

window.onload = function () {
  getEspecialidades();
};

//Post de Especialista obteniendo el id de la especialidad seleccionada
function getId(profesionalId, calendarioTurnos, especialidad) {
  fetch("https://localhost:44306/api/Especialidades")
    .then((response) => response.json())
    .then((lista) => {
      for (const item of lista) {
        if (especialidad == item.tipoEspecialidad) {
          var especialidadId = item.id;

          console.log(profesionalId, calendarioTurnos, especialidadId);

          var especialista = new Especialista(
            profesionalId,
            especialidadId,
            calendarioTurnos
          );

          var especialistajson = JSON.stringify(especialista);

          PostEspecialista(especialistajson);
        }
      }
    });
}

const formespecialista = document.getElementById("form-especialista");
if (formespecialista) {
  formespecialista.onsubmit = (e) => {
    e.preventDefault();
    var profesionalId = parseInt(formespecialista.elements.profesional.value);
    var calendarioTurnos = parseInt(
      formespecialista.elements.calendarioturnos.value
    );
    var especialidad = formespecialista.elements.especialidad.value;
    getId(profesionalId, calendarioTurnos, especialidad);
  };
}
