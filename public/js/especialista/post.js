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
    .then((response) => {
      especialistaId = response.id;

      calendarioturnos.calendarioTurnos.forEach((element) => {
        element.idEspecialista = especialistaId;
      });
      PostCalendarioTurnos(calendarioturnos);
    });
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
    .then((res) => console.log(res))
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
      let iddia;
      if (element.value !== "") {
        switch (element.value) {
          case "Lunes":
            iddia = 1;
            break;
          case "Martes":
            iddia = 2;
            break;
          case "Miercoles":
            iddia = 3;
            break;
          case "Jueves":
            iddia = 4;
            break;
          case "Viernes":
            iddia = 5;
            break;
        }
        listadias.push(iddia);
      }
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

    console.log(listadias[0]);
    var calendarioturnos = new CalendarioTurnos(
      especialistaId,
      listadias[0],
      horarios[0],
      horarios[1]
    );
    listacalendarios.calendarioTurnos.push(calendarioturnos);

    console.log(listacalendarios);

    getId(profesionalname, especialidad, listacalendarios);
  };
}

const btndias = document.getElementById("btndias");

btndias.onclick = (e) => {
  e.preventDefault();

  const place = document.getElementById("agregardias");
  const element = document.createElement("div");

  element.innerHTML = `
  <div class="row mt-5">
  <div class="col">
<h6 for="dias" class="font-weight-bolder col-form-label-lg ">Seleccione los dias:</h6>

  <select  class="form-control"  >
  <option value="">-----</option>
  <option value="Lunes">Lunes</option>
  <option value="Martes">Martes</option>
  <option value="Miercoles">Miercoles</option>
  <option value="Jueves">Jueves</option>
      <option value="viernes">Viernes</option>
  </select>
     </div>      
       <div class="col align-content-center">
      <label  class="font-weight-bolder col-form-label-lg" for="appt">Hora de inicio de jornada:</label>
  <input type="time"  class="form-control"  >
  </div>
   
   <div class="col">
  <label class="font-weight-bolder col-form-label-lg" for="appt">Hora de finalización de jornada:</label>
  <input  type="time"  class="form-control"  >
</div>
</div>
  `;
  place.appendChild(element);
};
