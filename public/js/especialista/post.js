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
  getEspecialidades(null);
};



function getId(especialidad) {
  fetch("https://localhost:44306/api/Especialidades")
    .then((response) => response.json())
    .then((lista) => {
      for (const item of lista) {
        if (especialidad == item.tipoEspecialidad) {
          return item.id;
        }
      }
    });
}

const dom = document
  .getElementById("form-especialista")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var especialidad = document.getElementById(
      "input-especialista-especialidadid"
    ).value;

    var especialidadId= getId(especialidad);

    var profesionalId = Number.parseInt(
      document.getElementById("input-especialista-profesionalid").value
    );
    var calendarioTurnos = Number.parseInt(
      document.getElementById("input-especialista-calendarioturnosid").value
    );

    var especialista = new Especialista(
      profesionalId,
      especialidadId,
      calendarioTurnos
    );

    var especialistajson = JSON.stringify(especialista);

    PostEspecialista(especialistajson);
  });
