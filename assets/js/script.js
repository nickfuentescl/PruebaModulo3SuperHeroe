document.addEventListener('DOMContentLoaded', function() {

let cajaSuperHeroe = document.querySelector('#caja')
let botonSuperHeroe = document.querySelector('#button')
let expresionRegular = /^[1-9]\d*$/;
let porfavorIngresasolonumeros = document.querySelector('#error')


function buscarSuperHeroe() {

    let capturaSuperHeroe = cajaSuperHeroe.value
    if (capturaSuperHeroe > 731) {
        porfavorIngresasolonumeros.innerHTML =
            `<div style="display: flex; align-items: center;" class="mt-3">
    <img style="width: 60px;" src="./assets/img/error.png" alt="">
    <p>Error: Superaste el rango, no existen más SuperHeroes</p>
    </div>`
        return;
    } if (expresionRegular.test(capturaSuperHeroe)) {

    } else {
        porfavorIngresasolonumeros.innerHTML = `<div style="display: flex; align-items: center;" class="mt-3">
    <img style="width: 60px;" src="./assets/img/error.png" alt="">
    <p>Ingresaste algo mal</p>
    </div>`
    }

    $.ajax({
        type: "GET",
        url: `https://www.superheroapi.com/api.php/86f063e94127d73307ffac340ea71f39/${capturaSuperHeroe}`,
        dataType: "json",
        success: function (response) {

            let cajaImagen = document.querySelector('#cajaImagen')
            let cajaNombre = document.querySelector('#cajaNombre')
            let cajaConexiones = document.querySelector('#cajaConexiones')
            let cajaPublicado = document.querySelector('#cajaPublicado')
            let cajaOcupacion = document.querySelector('#cajaOcupacion')
            let cajaPrimeraAparicion = document.querySelector('#cajaPrimeraAparicion')
            let cajaAltura = document.querySelector('#cajaAltura')
            let cajaPeso = document.querySelector('#cajaPeso')
            let cajaAlianza = document.querySelector('#cajaAlianza')


            cajaImagen.src = response.image.url
            cajaNombre.innerHTML = `<p style="text-align: start" class="mt-3">Nombre: ${response.name}</p>`
            cajaConexiones.innerHTML = `<p style="text-align: start">Conexiones: ${response.connections['group-affiliation']}</p>`;
            cajaPublicado.innerHTML = `<p style="text-align: start">Publicado: ${response.biography.publisher}</p>`
            cajaOcupacion.innerHTML = `<p style="text-align: start">Ocupacion: ${response.work.occupation}</p>`
            cajaPrimeraAparicion.innerHTML = `<p style="text-align: start">Primera Aparicion: ${response.biography['first-appearance']}</p>`
            cajaAltura.innerHTML = `<p style="text-align: start">Altura: ${response.appearance.height}</p>`
            cajaPeso.innerHTML = `<p style="text-align: start">Peso: ${response.appearance.weight}</p>`
            cajaAlianza.innerHTML = `<p style="text-align: start">Alianza: ${response.connections.relatives}</p>`


            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                backgroundColor: "rgba(255, 255, 255, 0.0)",
                title: {
                    text: response.name
                },
                data: [{
                    type: "pie",
                    startAngle: 240,
                    yValueFormatString: "##0.00\"",
                    indexLabel: "{label} {y}",
                    dataPoints: [
                        { y: response.powerstats.intelligence, label: Object.keys(response.powerstats)[0] },
                        { y: response.powerstats.strength, label: Object.keys(response.powerstats)[1] },
                        { y: response.powerstats.speed, label: Object.keys(response.powerstats)[2] },
                        { y: response.powerstats.durability, label: Object.keys(response.powerstats)[3] },
                        { y: response.powerstats.power, label: Object.keys(response.powerstats)[4] },
                        { y: response.powerstats.combat, label: Object.keys(response.powerstats)[5] }
                    ]
                }]
            });
            chart.render();


        }
    });


}


/* function ocultarError(){

    if(porfavorIngresasolonumeros.style.visibility == 'hidden'){
        porfavorIngresasolonumeros.style.visibility = 'visible';
    }else{
        porfavorIngresasolonumeros.style.visibility = 'hidden';
    }
} */

function mostrar() {
    contenidoTotal.style.display = 'block';
}

cajaSuperHeroe.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        buscarSuperHeroe();
        mostrar();
    }
});



botonSuperHeroe.addEventListener('click', buscarSuperHeroe);
if (botonSuperHeroe) {
    botonSuperHeroe.addEventListener('click', mostrar);
}


$(document).ready(function () {
    $('.loader').fadeOut(1000);  /*FadeOut after page loaded*/
});
});