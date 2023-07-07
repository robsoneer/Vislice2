var form = document.getElementById("insert-word");
var grid = document.getElementById("grid");
var modal = document.getElementById("word");
var drawer = document.getElementById("drawer");
var fireworks = document.getElementById("fireworks")

var slike = [
    "./slike/slika1.png",
    "./slike/slika2.png",
    "./slike/slika3.png",
    "./slike/slika4.png",
    "./slike/slika5.png",
    "./slike/slika6.png",
    "./slike/slika7.png",
    "./slike/slika8.png",
    "./slike/slika9.png",
    "./slike/slika10.png",
];

var letters = [
    "A", "B", "C", "Č", "D",
    "E", "F", "G", "H", "I",
    "J", "K", "L", "M", "N",
    "O", "P", "R", "S", "Š",
    "T", "U", "V", "Z", "Ž"
];

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var modal = document.getElementById("modal");
    var beseda = event.target.elements["beseda"].value.toUpperCase();
    localStorage.setItem("beseda", beseda);
    localStorage.setItem("napake", "0");
    for (var crka of beseda) {
        word.innerHTML += "_";
    }
    modal.remove();
    Swal.fire(
        'game has started',
        `you have 10 tries good luck dont die`,
        'info'
    )

});

window.addEventListener("load", function (event) {
    fireworks.style.display = "none";
    drawer.style.display = "none";
    generateGrid();
});
function generateGrid() {
    var i = 0

    while (i < 25) {
        grid.innerHTML += `<button onclick="fillLetter(this, '${letters[i]}')">${letters[i]}</button>`;
        i += 1;
    }

}

function fillLetter(element, letter) {
    element.disabled = true;
    var beseda = localStorage.getItem("beseda");
    var prikazano = word.innerHTML.split("");
    var i = 0;
    while (i < beseda.length) {
        if (beseda[i] == letter) {
            prikazano[i] = letter;
        }
        i += 1;

    }

    if (!beseda.includes(letter)) {
        var napake = localStorage.getItem("napake");
        var noveNapake = Number(napake) + 1;
        localStorage.setItem("napake", String(noveNapake));
    drawer.style.display = "flex";

        drawer.innerHTML = `
        <img src= "${slike[noveNapake - 1]}"/>
        `;
        setTimeout(function () {

            if (noveNapake == 10) {
                Swal.fire({
                    title: 'dead',
                    text: `You idiot, black man is dead now! `,
                    type: 'wasted',
                    icon: "error"
                }).then(function () {
                    location.reload();
                })

            }
        }, 100)
    }

    var novPrikaz = prikazano.join("");
    word.innerHTML = novPrikaz

    setTimeout(function () {
        if (!novPrikaz.includes("_")) {
            fireworks.style.display = "flex";
            Swal.fire({
                title: 'congradulation!',
                text: `you guessed the word you can live :)`,
                type: 'success',
                icon: "success"
            }).then(function () {
                location.reload();
            })
        }

        word.innerHTML = novPrikaz
    }, 100)
    function validateInput(element) {
        var value = element.value.toUpperCase();
        var newValue = "";
        element.value = newValue;
        var i = 0;
        while (i < beseda.length) {
            if (letter.includes(value[i])); {
                newValue += value[i];
            }
            i += 1;

        }
    }

}