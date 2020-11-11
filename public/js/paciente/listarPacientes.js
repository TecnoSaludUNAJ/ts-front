import {getAllPacientes} from '../services/pacienteService.js';

window.addEventListener(
  "load",
  () => {
    loadPacientes()
  },
  false
);

const tBody = document.getElementById("bodyTPacientes");

const loadPacientes = async () => {
  let pacientes = await getAllPacientes();
  pacientes
    ? pacientes.map(p => addPacienteDOM(p))
    : console.warn("Error al cargar pacientes");
};

const addPacienteDOM = (paciente) => {
  tBody.innerHTML+= `
  <tr>
        <th scope="row">${paciente.paciente_Id}</th>
        <td>${paciente.nombre}</td>
        <td>${paciente.apellido}</td>
        <td>${paciente.dni}</td>
        <th>${paciente.usuario_Id}</th>
        </tr>
  `
}