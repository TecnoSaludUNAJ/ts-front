export const API_URL = "https://localhost:44377/api";
export const TURNOS_API_URL = API_URL + "/turnos";
export const TURNOS_DISPONIBLES_API_URL = API_URL + "/turnosdisponibles";
export const DAYS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
export const ESPECIALIDADES_API_URL = "https://localhost:44306/api/Especialidades";
export const ESPECIALISTAS_API_URL = "https://localhost:44306/api/Especialistas";
export const PROFESIONALES_API_URL = "https://localhost:44306/api/Profesionales";


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

  export class CalendarioTurnos {
    constructor(IdEspecialista,diaId,horaInicio,horaFin) {
      this.idEspecialista=IdEspecialista,
      this.diaId=diaId,
      this.horaInicio=horaInicio,
      this.horaFin=horaFin
    }
  }

// API PACIENTES
export const PACIENTES_API_URL = "https://localhost:5001/api/Pacientes"
export const OBRASSOCIALES_API_URL = "https://localhost:5001/api/ObrasSociales"

//API HISTORIA CLINICA
export const REGISTROS_API_URL = "https://localhost:5001/api/Registros"
export const RECETAS_API_URL = "https://localhost:5001/api/Recetas"
export const HISTORIA_API_URL = "https://localhost:5001/api/HistoriaClinicas"
export const ANALISIS_API_URL = "https://localhost:5001/api/Analisis"

export class Registros{
  constructor(motivoConsulta,diagnostico,proximaRevision,especialistaId,historiaClinicaId){
    this.motivoConsulta = motivoConsulta;
    this.diagnostico = diagnostico;
    this.proximaRevision = proximaRevision;
    this.especialistaId = especialistaId;
    this.historiaClinicaId = historiaClinicaId;
  }
}
