export const menuProfesional = `
<div class="accordion">
  <div class="card border-0">
    <small class="nav-subtitle">Profesional</small>
    <div class="card-header bg-white border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#profTurnos" aria-expanded="true" aria-controls="profTurnos">
        <i class="far fa-calendar-alt"></i> Turnos
      </button>
    </div>
    <div id="profTurnos" class="collapse" aria-labelledby="profTurnos" data-parent="#accordionExample">
    <div class="card-body my-0 py-0">
    <nav class="nav flex-column">
      <a class="nav-link" href="#"><i class="fas fa-calendar-day"></i> Agenda del día</a>
      <a class="nav-link" href="/turnos"><i class="fas fa-hand-holding-medical"></i> Solicitar turno</a>
    </nav>
    </div>
    </div>
    <div class="card-header bg-white border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#profHistorial" aria-expanded="true" aria-controls="profHistorial">
        <i class="fas fa-laptop-medical"></i> Historial clínico
      </button>
    </div>
    <div id="profHistorial" class="collapse" aria-labelledby="profHistorial" data-parent="#accordionExample">
    <div class="card-body my-0 py-0">
      <nav class="nav flex-column">
        <a class="nav-link" href="/historiaClinica"><i class="fas fa-history"></i> Ver historial</a>
        <a class="nav-link" href="/historiaClinica/registrar"><i class="fas fa-notes-medical"></i> Agregar historial</a>
      </nav>
    </div>
    </div>
  </div>
</div>
`