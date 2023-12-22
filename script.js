const form = document.getElementById("form");
const templateStudent = document.getElementById("templateStudent").content;
const templateTeacher = document.getElementById("templateTeacher").content;

const cardsStudents = document.getElementById("cardsStudents");
const cardsTeachers = document.getElementById("cardsTeachers");

const alert = document.getElementsByClassName("alert")[0];
const students = [];
const teachers = [];

document.addEventListener("click", e => {
    if (e.target.dataset.uid){
        if(e.target.matches(".btn-success")){
            students.map(item => {
                if(item.uid === e.target.dataset.uid){
                    item.setStatus = true;
                }
                console.log(item);
                return item;
            });
            Person.showPersonUI(students, "Student")
        }
        if(e.target.matches(".btn-danger")){
            students.map(item => {
                if(item.uid === e.target.dataset.uid){
                    item.setStatus = false;
                }
                return item;
            });
            
            Person.showPersonUI(students, "Student")
        }
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert.classList.add("d-none")

    const data = new FormData(form);
    const [name, age, option] = [...data.values()]

    if(!name.trim() || !age.trim() || !option.trim()){
        alert.classList.remove("d-none");
        return;
    };

    if (option === "Student"){
        const student = new Student(name, age);
        students.push(student);
        Person.showPersonUI(students, option);
    }

    if (option === "Teacher"){
        const teacher = new Teacher(name, age);
        teachers.push(teacher);
        Person.showPersonUI(teachers, option)

    }

}, false);

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
        this.uid = `${Date.now()}`;
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

        if (tipe === "Teacher"){
            cardsTeachers.textContent = "";
            const fragment = document.createDocumentFragment();

            persons.forEach(item => {
                fragment.appendChild(item.addNewTeacher())
            })

            cardsTeachers.appendChild(fragment)
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
        clone.querySelector("h6").textContent = this.getStudent;
        clone.querySelector(".lead").textContent = this.age;

        if(this.#status){
            clone.querySelector(".badge").className = "badge bg-success";
            clone.querySelector(".btn-success").disabled = true;
            clone.querySelector(".btn-danger").disabled = false;
        }else{
            clone.querySelector(".badge").className = "badge bg-danger";
            clone.querySelector(".btn-danger").disabled = true;
            clone.querySelector(".btn-success").disabled = false;
        }
        clone.querySelector(".badge").textContent = this.#status ? "Passed": "Failed";

        clone.querySelector(".btn-success").dataset.uid = this.uid;
        clone.querySelector(".btn-danger").dataset.uid = this.uid;

        return clone;
    }
}

class Teacher extends Person{
    #teacher = "Teacher";

    addNewTeacher(){
        const clone = templateTeacher.firstElementChild.cloneNode(true);
        clone.querySelector("h5").textContent = this.name;
        clone.querySelector("h6").textContent = this.#teacher;
        clone.querySelector(".lead").textContent = this.age;

        return clone;
    }
}