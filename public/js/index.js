import {ROL_ADMIN, ROL_PACIENTE, ROL_PROFESIONAL} from './constants.js'
import {session, logOut} from './usuario/session.js'
// todo el js comun en todo el sitio


const modalCompleteRegister = (nombres, apellidos) => {return `<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">Solo te falta paso mas...</h5>
      <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> -->
    </div>
    <div class="modal-body">
      <b class="text-capitalize">${nombres} ${apellidos}</b> te falta completar tus datos personales para poder utilizar las funciones de la web.
    </div>
    <div class="modal-footer align-content-center">
      <button type="button" class="btn btn-danger" id="logOutbtn">Cerrar sesion</button>
      <a class="btn btn-success" href="/paciente/registrar">Completar registro ahora</a>
    </div>
  </div>
</div>
</div>`}


// sidebar
$(function(){
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  $(window).resize(function(e) {
    if($(window).width()<=768){
      $("#wrapper").removeClass("toggled");
    }else{
      $("#wrapper").addClass("toggled");
    }
  });
});

// session 
if(session){
  switch(session.usuario.rolId){
    case ROL_PACIENTE:
      if(!session.paciente){
        if(window.location.pathname != "/paciente/registrar"){
          document.body.innerHTML+= modalCompleteRegister(session.usuario.nombres, session.usuario.apellidos)
          $("#myModal").modal({
            backdrop:'static',keyboard:false, show:true
          });
          
        }
      }

  }
}

// logoutAction
let logOutButton = document.getElementById("logOutbtn");
logOutButton ? logOutButton.addEventListener("click", logOut) : "";