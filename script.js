const form = document.getElementById("form");
const templateStudent = document.getElementById("templateStudent").content;
const templateTeacher = document.getElementById("templateTeacher").content;

const cardsStudents = document.getElementById("cardsStudents");
const cardsTeachers = document.getElementById("cardsTeachers");
const students = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const [name, age, option] = [...data.values()]

    if (option === "Student"){
        const student = new Student(name, age)
        students.push(student);
        Person.showPersonUI(students, option)
    }

    if (option === "Teacher"){
        console.log("Teacher")
    }

}, false);

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    static showPersonUI(persons, tipe){
        if(tipe === "Student"){

            cardsStudents.textContent = "";
            const fragment = document.createDocumentFragment();

            persons.forEach(item => {
                fragment.appendChild(item.addNewStudent())
            });

            cardsStudents.appendChild(fragment);
        }
    }
}

class Student extends Person {
    #status = false;
    #student = "Student";

    set setStatus(status){
        this.#status = status
    }

    get getStudent(){
        return this.#student
    }

    addNewStudent(){
        const clone = templateStudent.firstElementChild.cloneNode(true);
        clone.querySelector("h5 .text-primary").textContent = this.name;

        return clone;
    }
}

class Teacher extends Person{

}