export const menuPaciente = `
<div class="accordion">
  <div class="card border-0">
    <div class="card-header bg-white border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        <i class="fas fa-th-large"></i> Mi cuenta
      </button>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body py-0">
        <nav class="nav flex-column">
        <a class="nav-link" href="/paciente/registrar"><i class="fas fa-id-card-alt"></i> Datos personales</a>
        </nav>
      </div>
    </div>
    <div class="card-header bg-white border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#pacGestMed" aria-expanded="true" aria-controls="pacGestMed">
        <i class="fas fa-stethoscope"></i> Gestión médica
      </button>
    </div>
    <div id="pacGestMed" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
    <div class="card-body py-0">
    <nav class="nav flex-column">
    <a class="nav-link" href="/turnos"><i class="fas fa-laptop-medical"></i> Solicitar turno</a>
    <a class="nav-link" href="/turnos/mis-turnos"><i class="fas fa-heart"></i> Mis turnos</a>
    </nav>
    </div>
    </div>
  </div>
</div>
`