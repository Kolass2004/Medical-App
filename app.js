

let userData;

document.addEventListener('DOMContentLoaded', function () {


    
    fetch('userdata.json')
        .then(response => response.json())
        .then(data => {
            userData = data;
            createDiseaseCheckboxes(Object.keys(userData.medications));
        })
        .catch(error => console.error('Error loading user data:', error));
});

function createDiseaseCheckboxes(diseases) {
    const diseaseListDiv = document.getElementById('disease-list');

    diseases.forEach(disease => {
        const checkboxLabel = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `${disease.toLowerCase()}Checkbox`;
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(document.createTextNode(` ${disease}`));

        diseaseListDiv.appendChild(checkboxLabel);
        diseaseListDiv.appendChild(document.createElement('br'));
    });
}

function getSelectedMedications() {
    const selectedDiseases = getSelectedDiseases();

    // Fetch medications for selected diseases
    const selectedMedications = getSelectedMedicationsFromData(userData.medications, selectedDiseases);
    renderMedications(selectedMedications);
}

function getSelectedDiseases() {
    const selectedDiseases = [];
    const checkboxes = document.querySelectorAll('#disease-list input[type="checkbox"]:checked');

    checkboxes.forEach(checkbox => {
        selectedDiseases.push(checkbox.id.replace('Checkbox', '').toLowerCase());
    });

    return selectedDiseases;
}

function getSelectedMedicationsFromData(allMedications, selectedDiseases) {
    const selectedMedications = {};

    selectedDiseases.forEach(disease => {
        selectedMedications[disease] = allMedications[disease];
    });

    return selectedMedications;
}

function renderMedications(medications) {
    const medicationsList = document.getElementById('medications-list');
    medicationsList.innerHTML = '';

    
    for (const category in medications) {
        const categoryHeader = document.createElement('h2');
        categoryHeader.textContent = category;
        medicationsList.appendChild(categoryHeader);

        
        medications[category].forEach(medication => {
            const listItem = document.createElement('div');
            listItem.textContent = `${medication.name} - ${medication.dosage} - ${medication.frequency}`;
            medicationsList.appendChild(listItem);
        });
    }
}
