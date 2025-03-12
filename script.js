 async function handleSubmit(event) {
    // prevent default
    event.preventDefault();

    // get values
    // const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const dept = document.getElementById('dept').value;
    
    if (age < 18) {
        alert("age can not be less than 18")
        return;
    }

    const student = {name, age, dept};

    console.log(JSON.stringify(student));

    const baseURL = "https://simple-project-y81c.onrender.com/student"

    try {
        const response = await fetch(baseURL, {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(student)
        });

        if (response.ok) {
            const responseData = await response.json(); // Get the response data
            alert(`Student added successfully! User ID: ${responseData.id}`);
        } 
        else {
            const errorData = await response.json();
            alert(`Failed to add student: ${errorData.message}`);
        }

    } catch (err) {
        alert("Request failed...");
        console.log('Error: ', err);
    }
}
