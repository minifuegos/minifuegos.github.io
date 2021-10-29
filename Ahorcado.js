var botones = document.getElementById("botones")

var letras = [['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
			  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
			  ['z', 'x', 'c', 'v', 'b' ,'n', 'm']]

for (let renglon of letras) {
	for (let letra of renglon) {
		botones.innerHTML += `
		<button class="botones" id="boton${letra}"> ${letra} </button>
		`
	}
	botones.innerHTML += `<br>`
}

var palabra = []
var palabra2 = ''
var palabraentera = ''
var vidas = 7
var si = false

function enviarTexto() {
	let input = document.getElementById('input').value.toLowerCase()
	let out = PalabraAArray (input)
	palabra = out [0]
	palabra2 = out [1]
	palabraentera = out [2]
	vidas = 7
	si = true
	document.getElementById("input").value = ""
		
	CrearIncognita (palabra2)
	
	for (let renglon of letras) {
		for (let letra of renglon) {
			let boton  = document.getElementById("boton" + letra)
			boton.onclick = function() {
				let salida = SumarUnaLetra (letra, palabra, palabra2, palabraentera, vidas)
				vidas = salida[0]
				palabra2 = salida[1]
			}
		}
	}
}

function presionar_tecla() {
	let tecla = event.key
	if (tecla == 'Enter') {
		enviarTexto()
	}
	
	let abecedario = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']
	
	if (si) {
		for (letra of abecedario) {
			if (tecla == letra) {
				let salida = SumarUnaLetra (letra, palabra, palabra2, palabraentera, vidas)
				vidas = salida[0]
				palabra2 = salida[1]
			}
		}
	}
	
/*	else {
		for (letra of abecedario) {
			if (tecla == letra) {
				document.getElementById("input").value += letra
			}
		}
		if (tecla == 'Backspace') {
			
		}
	}*/
}

window.onkeydown = presionar_tecla

function SumarUnaLetra (letra, palabra, palabra2, palabraentera, vidas) {
    let correcto = -1
    let puntaje = palabra.length
	for (let lugar of palabra) {
        correcto = correcto + 1
        if (letra == lugar) {
            palabra2 = remplazar (palabra2, correcto, letra)
            CrearIncognita (palabra2)
            let intro = document.getElementById('boton' + letra)
			intro.style.backgroundColor = '#108010'
        }
        else {
            puntaje = puntaje - 1
            if (puntaje == 0 && !CompararArray (letra, palabraentera)) {
                vidas = vidas - 1
	            let intro = document.getElementById('boton' + letra)
				intro.style.backgroundColor = '#a00402'
                if (vidas == 0) {
                	si = false
                    CrearIncognita (palabraentera)
                    alert ('perdiste')
                }
            }
    	}
    }
    if (CompararArray (letra, palabraentera) || CompararArray (palabra, palabra2)) {
    	si = false
        alert ('ganaste')
        }
    return [vidas, palabra2]
}

function PalabraAArray (palabra) {
	let array = palabra.split('')
	let vacio = ''.padEnd(palabra.length,'_')
	return [array, vacio, palabra]
}

function CrearIncognita (palabra2) {
	var incognita = document.getElementById("incognita")
	incognita.innerHTML = `
	<h1>${palabra2}</h1>
	`
}

function CompararArray (list1, list2) {
	if (list1.length != list2.length) {
		return false
	}
	for (let i = 0; i < list1.length; i++) {
		if (list1[i] != list2[i])
			return false
	}
	return true
}

function remplazar (string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length)
}
