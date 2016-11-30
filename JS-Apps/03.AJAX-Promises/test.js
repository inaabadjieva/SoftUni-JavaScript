function solve() {
 
const kinveyAppId = "kid_BJXTsSi-e";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppId;
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64Auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = { "Authorization": "Basic " + base64Auth ,
        "Content-Type": "application/json"};
 
    $('#loadBtn').click(loadStudents);
    $('#createBtn').click(createStudents);
 
    function loadStudents() {
        let loadStudentsRequest = {
            method: "GET",
            url: serviceUrl + "/students",
            headers: authHeaders
        };
 
        $.ajax(loadStudentsRequest)
            .then(displayStudents)
    }
 
    function displayStudents(students) {
        students.sort((a, b) =>
            a.ID - b.ID
        );
 
        for (let student of students) {
            $('#results').append($('<tr>')
                .append($('<td>').text(student.ID))
                .append($("<td>").text(student.FirstName))
                .append($('<td>').text(student.LastName))
                .append($('<td>').text(student.FacultyNumber))
                .append($('<td>').text(student.Grade)));
        }
    }
 
        function createStudents() {
            let id = Number($('#ID').val());
            let firstName = $('#firstName').val();
            let lastName = $('#lastName').val();
            let facultyNumber = $('#facultyNumber').val();
            let grade = Number($('#grade').val());
        let students = {
            ID: id,
            FirstName: firstName,
            LastName: lastName,
            FacultyNumber: facultyNumber,
            Grade: grade
        };
 
            let createStudentsRequest = {
                method: "POST",
                url: serviceUrl + "/students",
                headers: authHeaders,
                data: JSON.stringify(students)
            };
           
            $.ajax(createStudentsRequest)
                .then(createNewStudent)
        }
       
        function createNewStudent() {
            loadStudents();
        }
 
 
}