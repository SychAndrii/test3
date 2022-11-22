const fs = require('fs')

let students = [];

function init() {
    return new Promise((resolve, reject) => {
        fs.readFile('./students.json', (err, data) => {
            if(err)
                reject("unable to read file");
            else {
                students = JSON.parse(data);
                resolve();
            }
        })
    })
}

function getBSD() {
    return new Promise((resolve, reject) => {
        let result_array = students.filter(s => s.program == "BSD");
        if (result_array.length == 0)
            reject("no results returned");
        else 
            resolve(result_array);
    });
}

function allStudents() {
    return new Promise((resolve, reject) => {
        if(students.length != 0) 
            resolve(students)
        else 
            reject("Could not get any students")
    });
}

function highGPA() {
    return new Promise((resolve, reject) => {
        let current_grade = -1, current_index = -1, i = 0;
        for (const student of students) {
            if(current_grade < student.gpa) {
                current_grade = student.gpa;
                current_index = i;
            }
            ++i;
        }
        if(current_grade == -1)
            reject('"Failed finding the student with the highest GPA');
        else
            resolve(students[current_index]);
    });
}

module.exports = {
    init,
    getBSD,
    highGPA,
    allStudents
}