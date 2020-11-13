import {getObrasSociales} from '../services/pacienteService.js';

window.addEventListener(
  "load",
  () => {
    loadObrasSociales()
  },
  false
);

const tBody = document.getElementById("bodyTableObras");

const loadObrasSociales = async () => {
  let obrassociales = await getObrasSociales();
  obrassociales
    ? obrassociales.map(o => addObraSocialDOM(o))
    : console.warn("Error al cargar obras sociales");
};

const addObraSocialDOM = (obrasocial) => {
  tBody.innerHTML+= `
  <tr>
        <th scope="row">${obrasocial.obraSocial_Id}</th>
        <td>${obrasocial.obraSocial_Sigla}</td>
        <td>${obrasocial.obraSocial_Nombre}</td>
        </tr>
  `
}