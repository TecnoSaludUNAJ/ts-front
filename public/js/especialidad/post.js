class Especialidad
{
    constructor(tipoEspecialidad)
    {
        this.tipoEspecialidad=tipoEspecialidad
    }

}

function PostEspecialidad(especialidadjson)
{

    fetch('https://localhost:44306/api/Especialidades',{

    method: 'POST',
    body: especialidadjson,
    headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).then(response =>response.json()).then(data=>{console.log(data);})


}


const dom= document.getElementById("form-especialidad").addEventListener("submit",function(event){

    event.preventDefault();
    const tipoEspecialidad=document.getElementById("input-especialidad").value;

var especialidad=new Especialidad(tipoEspecialidad);
var especialidadjson=JSON.stringify(especialidad);

PostEspecialidad(especialidadjson);

})