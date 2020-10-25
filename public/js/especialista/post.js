class Especialista
{
    constructor(profesionalid,especialidadid,calendarioturnos)
    {
        this.profesionalId=profesionalid;
        this.especialidadId=especialidadid;
        this.calendarioTurnos=calendarioturnos;
    }
}


function PostEspecialista(especialistajson)
{

    fetch('https://localhost:44306/api/Especialistas',{
    method: 'POST',
    body: especialistajson,
    headers:{'Content-Type': 'application/json;charset=UTF-8'}
    }).then(response =>response.json()).then(data=>{console.log(data);})


}


const dom= document.getElementById("form-especialista").addEventListener("submit",function(event){

    event.preventDefault();
    
    var especialidadId=document.getElementById("input-especialista-especialidadid").value;
    var profesionalId=document.getElementById("input-especialista-profesionalid").value;
    var calendarioTurnos=document.getElementById("input-especialista-calendarioturnosid").value;


   
    var especialista= new Especialista(profesionalId,especialidadId,calendarioTurnos);

    var especialistajson=JSON.stringify(especialista);


    PostEspecialista(especialistajson);

})