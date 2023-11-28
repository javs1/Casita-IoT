//funcion que aplica estilo
function seleccionar(link){
    var opciones = document.querySelectorAll('#links a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    //desaparece el menu
    var x = document.getElementById("nav");
    x.className="";
    link.className = "seleccionado";
}

function responsiveMenu(){
    var x = document.getElementById("nav");
    if(x.className === ""){
        x.className = "responsive";
    } else{
        x.className = "";
    }
}

//detecto el scrolling

//funcion que aplica animacio