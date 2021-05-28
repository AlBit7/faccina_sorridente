const viso = document.getElementById("viso");
const bocca = document.getElementById("bocca");
const body = document.getElementById("body");
const svg = document.getElementById("svg");

var notte = 1;

function rotazioneAttuale() {

    var angolo = parseInt(svg.style.transform.match(/(\d+)/)[0]);

    if (angolo > 360) {
        angolo -= 360;
    }
    if (angolo < 0) {
        angolo += 360;
    }

    return angolo;
}

document.addEventListener('click', function (event) {

    switch (event.target.id) {

        case 'occhio_destro':
        case 'occhio_sinistro':

            console.log('occhiolino');

            const occhio = document.getElementById(event.target.id);

            occhio.y1.baseVal.valueAsString = "165.7";
            occhio.y2.baseVal.valueAsString = "143";

            var id = null;
            var tmp = -1;
            var ritorna = false;
            clearInterval(id);
            var id = setInterval(animazioneOcchio, 20);
            function animazioneOcchio() {
                if (tmp == 0) {
                    clearInterval(id);
                } else {
                    if (tmp == -12) {
                        ritorna = true;
                    }
                    if (ritorna) { tmp++; }
                    else { tmp--; }
                    occhio.y1.baseVal.value = 165.7 + tmp;
                    occhio.y2.baseVal.value = 143 - tmp;
                }
            }

            break;

        case 'occhio_sinistro':

            console.log('sinistro');
            break;

        case 'viso':

            console.log("viso --> cambio colore");

            if (notte) {
                body.style.backgroundColor = 'white';
                occhio_destro.style.stroke = occhio_sinistro.style.stroke = bocca.style.stroke = viso.style.stroke = "black";
                notte = 0;
            } else {
                body.style.backgroundColor = 'black';
                occhio_destro.style.stroke = occhio_sinistro.style.stroke = bocca.style.stroke = viso.style.stroke = "white";
                notte = 1;
            }
            break;

        case 'bocca':

            console.log("bocca");

            rotazioneIniziale = tmp = rotazioneAttuale();
            clearInterval(id);
            var id = setInterval(animazioneBocca, 5);
            function animazioneBocca() {
                if (tmp > 360 + rotazioneIniziale) {
                    clearInterval(id);
                } else {
                    svg.style.transform = "rotate(" + tmp.toString() + "deg)";
                    tmp += 3;
                }
            }
            break;

        default: break;
    }

});

body.onkeypress = function (tasto) {
    switch (tasto.key) {

        case 's':
            svg.style.transform = "rotate(" + (rotazioneAttuale() + 45).toString() + "deg)";
            break;

        case 'd':
            svg.style.transform = "rotate(" + (rotazioneAttuale() - 45).toString() + "deg)";
            break;

        case 'r':
            rotazioneIniziale = tmp = rotazioneAttuale();
            clearInterval(id);
            var id = setInterval(animazioneBocca, 5);
            function animazioneBocca() {
                if (tmp > 360) {
                    clearInterval(id);
                } else {
                    svg.style.transform = "rotate(" + tmp.toString() + "deg)";
                    tmp += 3;
                }
            }
            break;

        default: break;
    }
};