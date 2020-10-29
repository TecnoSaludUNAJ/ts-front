import {postPaciente} from '../services/pacienteService.js'
import {paises} from './paises.js'

const nacionalidadSelect = document.getElementById("nacionalidad");
if(nacionalidadSelect){
  paises.forEach(pais => {
    var option = document.createElement("option");
    option.text = pais[0];
    nacionalidadSelect.add(option);
  })
}