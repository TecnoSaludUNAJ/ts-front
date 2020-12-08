export const menuAdministrador = `
<div class="accordion">
<div class="card border-0 bg-transparent">
    <small class="nav-subtitle">Admnistracion</small>
    <div class="card-header bg-transparent border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#admProfesionales" aria-expanded="true" aria-controls="admProfesionales">
        <i class="fas fa-user-md"></i> Profesionales
      </button>
    </div>
    <div id="admProfesionales" class="collapse" aria-labelledby="admProfesionales" data-parent="#accordionExample">
    <div class="card-body my-0 py-0">
      <nav class="nav flex-column">
        <a class="nav-link" href="/profesional/registrar">Alta Profesional</a>
        <a class="nav-link" href="/especialista/registrar">Alta Especialista</a>
        <a class="nav-link" href="/especialidad/registrar">Alta Especialidad</a>
      </nav>
    </div>
    </div>
     <div class="card-header bg-transparent border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#admPacientes" aria-expanded="true" aria-controls="admPacientes">
        <i class="fas fa-hospital-user"></i> Pacientes
      </button>
    </div>
    <div id="admPacientes" class="collapse" aria-labelledby="admPacientes" data-parent="#accordionExample">
    <div class="card-body my-0 py-0">
      <nav class="nav flex-column">
        <a class="nav-link" href="/paciente/listapacientes">Lista Pacientes</a>
        <a class="nav-link" href="/paciente/registrar">Ver historia clinica</a>
      </nav>
    </div>
    </div>
     <div class="card-header bg-transparent border-0 p-1" id="headingOne">
      <button class="btn dropdown-toggle btn-block text-left" type="button" data-toggle="collapse" data-target="#admObraSocial" aria-expanded="true" aria-controls="admObraSocial">
        <i class="fas fa-medkit"></i> Obras Sociales
      </button>
    </div>
    <div id="admObraSocial" class="collapse" aria-labelledby="admObraSocial">
    <div class="card-body my-0 py-0">
      <nav class="nav flex-column">
        <a class="nav-link" href="/obrassociales/">Listar obras sociales</a>
        <a class="nav-link" href="/obrassociales/alta">Alta Obra Social</a>
      </nav>
    </div>
    </div>
    
  </div>
</div>
` 