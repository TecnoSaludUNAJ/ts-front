import { menuPaciente } from './usuarioMenu/paciente.js';
import { menuProfesional } from './usuarioMenu/profesional.js';
import { menuAdministrador } from './usuarioMenu/admin.js';
import { ROL_ADMIN, ROL_PACIENTE, ROL_PROFESIONAL } from '../constants.js';

export const menuUsuario = (rolId) => {
  switch(rolId) {
    case ROL_ADMIN:
      return menuAdministrador;
    case ROL_PROFESIONAL:
      return menuProfesional;
    case ROL_PACIENTE:
      return menuPaciente;
  }
}