document.addEventListener('DOMContentLoaded', fetchStudent);

async function fetchStudent() {
    try {
        const response = await fetch('http://localhost:8003/students');
        
        if (response.ok) {
            const students = await response.json();
            const tableBody = document.getElementById('tbody');

            students.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.dept} <button class="btn" onclick="deleteStudent(${student.id})">X</button>
                </td>
                <td> <button class="update" onclick="updateStudent(${student.id}, '${student.name}', ${student.age}, '${student.dept}')"> update </button> </td>
                `;

                tableBody.appendChild(row);
            });
        } 

    } catch (e) {
        console.log("An error occurred while fetching data: ", e);
    }
}

// delete student by id
async function deleteStudent(id) {
    const baseURL = `http://localhost:8003/student/${id}`;
    try {
        const response = await fetch(baseURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            alert('Student deleted successfully');
            window.location.reload();
        }
    } catch (e) {
        console.log("An error occurred while deleting data: ", e);
    }
}

// update student by id
function updateStudent(id, name, age, dept) {
    window.location.href = `update-student.html?id=${id}&name=${name}&age=${age}&dept=${dept}`;
}
