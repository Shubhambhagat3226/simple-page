let studentId;
    
document.addEventListener('DOMContentLoaded', load);

async function load() {
    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById("updatedName").value = urlParams.get("name");
    document.getElementById("updatedAge").value = urlParams.get("age");
    document.getElementById("updatedDept").value = urlParams.get("dept");
    studentId = urlParams.get("id");
}

async function updateStudent(event) {
    event.preventDefault();

    const name = document.getElementById("updatedName").value;
    const age = document.getElementById("updatedAge").value;
    const dept = document.getElementById("updatedDept").value;

    if (!studentId || !name || !age || !dept) {
        alert("Please fill all fields!");
        return;
    }

    const student = {
        id: studentId,  // Make sure your API expects "id"
        name,
        age: parseInt(age, 10),  // Make sure age is a number
        dept
    };

    try {
        const response = await fetch(`http://localhost:8003/student/${studentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            alert("Student updated successfully");
            window.location.href = "ViewStudent.html";
        } else {
            const errorData = await response.json();
            console.log("Failed to update student:", errorData);
            alert("Failed to update student!");
        }
    } catch (err) {
        console.log("Error while updating data:", err);
        alert("An error occurred while updating data.");
    }
}
