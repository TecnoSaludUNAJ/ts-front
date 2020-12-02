
/* API TURNOS */
export const API_URL = "https://localhost:44307/api";
export const TURNOS_API_URL = API_URL + "/turnos";
export const TURNOS_DISPONIBLES_API_URL = API_URL + "/turnosdisponibles";
export const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

export class CalendarioTurnos {
  constructor(IdEspecialista,diaId,horaInicio,horaFin) {
    this.idEspecialista=IdEspecialista,
    this.diaId=diaId,
    this.horaInicio=horaInicio,
    this.horaFin=horaFin
  }
}

export const CALENDARIO_TURNOS_API = "https://localhost:44307/api/CalendarioTurnos";

/* API HOSPITAL */
export const API_URL_HOSPITAL = "https://localhost:44308/api"
export const ESPECIALIDADES_API_URL = API_URL_HOSPITAL +"/Especialidades";
export const ESPECIALISTAS_API_URL = API_URL_HOSPITAL +"/Especialistas";
export const PROFESIONALES_API_URL = API_URL_HOSPITAL +"/Profesionales";

export class Especialista {
    constructor(profesionalid, especialidadid) {
      this.profesionalId = profesionalid;
      this.especialidadId = especialidadid;
    }
  }

  export class Especialidad {
    constructor(tipoEspecialidad) {
      this.tipoEspecialidad = tipoEspecialidad;
    }
  }

// API PACIENTESAD
/* export const PACIENTES_API_URL = "https://localhost:5001/api/Pacientes"
export const OBRASSOCIALES_API_URL = "https://localhost:5001/api/ObrasSociales" */
export const PACIENTES_API_URL = "https://localhost:44310/api/Pacientes"
export const OBRASSOCIALES_API_URL = "https://localhost:44310/api/ObrasSociales"

//API HISTORIA CLINICA
/* export const REGISTROS_API_URL = "https://localhost:5001/api/Registros"
export const RECETAS_API_URL = "https://localhost:5001/api/Recetas"
export const HISTORIA_API_URL = "https://localhost:5001/api/HistoriaClinicas"
export const ANALISIS_API_URL = "https://localhost:5001/api/Analisis" */
export const REGISTROS_API_URL = "https://localhost:44306/api/Registros"
export const RECETAS_API_URL = "https://localhost:44306/api/Recetas"
export const HISTORIA_API_URL = "https://localhost:44306/api/HistoriaClinicas"
export const ANALISIS_API_URL = "https://localhost:44306/api/Analisis"

// API AUTENTICACION
export const AUTENTICATION_API_BASE = "https://localhost:44309/api"
export const REGISTROUSER_API_URL = AUTENTICATION_API_BASE + "/register"
export const LOGIN_API_URL = AUTENTICATION_API_BASE + "/login"

// ROLES
export const ROL_PROFESIONAL = 2;
export const ROL_PACIENTE = 3;
export const ROL_ADMIN = 1;

export class Registros{
  constructor(motivoConsulta,diagnostico,proximaRevision,especialistaId,historiaClinicaId){
    this.motivoConsulta = motivoConsulta;
    this.diagnostico = diagnostico;
    this.proximaRevision = proximaRevision;
    this.especialistaId = especialistaId;
    this.historiaClinicaId = historiaClinicaId;
  }
}