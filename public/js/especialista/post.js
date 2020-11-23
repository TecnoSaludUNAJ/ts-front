import {
  ESPECIALIDADES_API_URL,
  ESPECIALISTAS_API_URL,
  PROFESIONALES_API_URL,
  Especialista,
  CalendarioTurnos,
} from "../constants.js";

var profesionalId;
var especialistaId;

async function PostEspecialista(especialistajson, calendarioturnos) {
  await fetch(ESPECIALISTAS_API_URL, {
    method: "POST",
    body: especialistajson,
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((data) => {
      especialistaId = data.id;

      calendarioturnos.calendarioTurnos.forEach((element) => {
        element.idEspecialista = especialistaId;
      });
      PostCalendarioTurnos(calendarioturnos);
      formespecialista.innerHTML = `<div class="card text-center p-5 my-2">
      <div class="card-header bg-transparent text-success border-0">
        <i class="far fa-check-circle display-4 d-block"></i>
        <h5 class="card-title text-success display-4 d-block">Registro exitoso</h5>
      </div>
      <div class="card-body">
        <p class="card-text lead">El Especialista se ha sido registrado con éxito (ID: ${data.id}).</p>
        <a href="/" class="btn btn-primary m-auto">Ir al menu </a>
      </div>
    </div>`;
    })
    .catch((error) => console.log("Error: ", error));
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
  especialidadId,
  calendarioturnos
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

            var especialista = new Especialista(profesionalId, especialidadId);

            var especialistajson = JSON.stringify(especialista);

            PostEspecialista(especialistajson, calendarioturnos);

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

async function PostCalendarioTurnos(calendario) {
  await fetch("https://localhost:44307/api/CalendarioTurnos", {
    method: "POST",
    body: JSON.stringify(calendario),
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

window.onload = function () {
  getEspecialidades();
  getProfesionales(null, null);
};

//Obteniendo el id de la especialidad seleccionada y pasando los datos a getProsionales para obtener su Id
async function getId(profesionalname, especialidad, calendarioturnos) {
  await fetch(ESPECIALIDADES_API_URL)
    .then((response) => response.json())
    .then((lista) => {
      for (const item of lista) {
        if (especialidad == item.tipoEspecialidad) {
          var especialidadId = item.id;

          getProfesionales(profesionalname, especialidadId, calendarioturnos);
        }
      }
    })
    .catch((err) => console.log(err));
}
//Obteniendo datos del form
const formespecialista = document.getElementById("form-especialista");
if (formespecialista) {
  formespecialista.onsubmit = (e) => {
    e.preventDefault();
    var profesionalname = formespecialista.elements.profesional.value;
    var especialidad = formespecialista.elements.especialidad.value;

    var selectdias = formespecialista.querySelectorAll("select");
    var listadias = [];
    selectdias.forEach((element) => {
      let iddia = parseInt(element.value);

      listadias.push(iddia);
    });

    var times = formespecialista.querySelectorAll('input[type="time"]');
    var horarios = [];

    times.forEach((element) => {
      if (element.value !== "") {
        var hora = String(element.value);
        horarios.push(hora);
      }
    });

    var listacalendarios = {
      calendarioTurnos: [],
    };

    listadias.forEach((element) => {
      var calendarioturnos = new CalendarioTurnos(
        especialistaId,
        element,
        horarios[0],
        horarios[1]
      );
      listacalendarios.calendarioTurnos.push(calendarioturnos);
      horarios.shift();
      horarios.shift();
    });

    getId(profesionalname, especialidad, listacalendarios);
  };
}

const btndias = document.getElementById("btndias");

btndias.onclick = (e) => {
  e.preventDefault();

  const place = document.getElementById("agregardias");
  const element = document.createElement("div");

  element.innerHTML = `
  <div class="row mt-2">
  <div class="col">
<h6 for="dias" class="font-weight-bolder col-form-label-md ">Seleccione los dias:</h6>

  <select  class="form-control w-75"  >
  <option value="">Seleccione un dia</option>
  <option value=1>Lunes</option>
  <option value=2>Martes</option>
  <option value=3>Miercoles</option>
  <option value=4>Jueves</option>
  <option value=5>Viernes</option>
  </select>
     </div>      
       <div class="col align-content-center">
      <label  class="font-weight-bolder col-form-label-md" for="appt">Hora de inicio de jornada:</label>
  <input type="time"  class="form-control w-75"  >
  </div>
   
   <div class="col">
  <label class="font-weight-bolder col-form-label-md" for="appt">Hora de finalización de jornada:</label>
  <input  type="time"  class="form-control w-75"  >
</div>
</div>
  `;
  place.appendChild(element);
};
