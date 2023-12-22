const formulario = document.getElementById("formulario");
const templateEstudiante = document.getElementById("templateEstudiante").content;
const templateProfesor = document.getElementById("templateProfesor").content;

const cardsEstudiantes = document.getElementById("cardsEstudiantes");
const cardsProfesores = document.getElementById("cardsProfesores");
const estudiantes = [];

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const [nombre, edad, opcion] = [...datos.values()]

    if (opcion === "Estudiante"){
        const estudiante = new Estudiante(nombre, edad)
        estudiantes.push(estudiante);
    }

    if (opcion === "Profesor"){
        console.log("Profesor")
    }

}, false);

class Persona{
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }

    static pintarPersonaUI(personas, tipo){
        if(tipo === "Estudiante"){

            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoEstudiante())
            });

            cardsEstudiantes.appendChild(fragment);
        }
    }
}

class Estudiante extends Persona {
    #estado = false;
    #estudiante = "Estudiante";

    set setEstado(estado){
        this.#estado = estado
    }

    get getEstudiante(){
        return this.#estudiante
    }

    agregarNuevoEstudiante(){
        const clone = templateEstudiante.firstElementChild.cloneNode(true);
        clone.querySelector("h5 .text-primary").textContent = this.nombre;

        return clone;
    }
}

class Profesor extends Persona{

}