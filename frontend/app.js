
document.addEventListener('DOMContentLoaded', () => {

    
    const fetchData = async () => {
        try {
          
            const response = await fetch('http://localhost:3000/students');
            const data = await response.json();

            
            const studentList = document.getElementById('student-list');

          
            data.forEach(student => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>${student.first_name} ${student.last_name}</strong><br>
                    Email: ${student.email}<br>
                    Gender: ${student.gender}<br>
                    Degree Classification: ${student.degree_classification}<br>
                    Degree Program: ${student.degree_program}<br>
                    Employer: ${student.employer}<br>
                    GPA: ${student.gpa}<br>
                    Skills: ${student.skills.join(', ')}
                `;
                studentList.appendChild(li);
            });
        } catch (error) {
            console.error('Error fetching data:', error); 
        }
    };

   
    fetchData();
});
