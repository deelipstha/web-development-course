document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // EXERCISE 1 & 3: Animal Care Form & Storage
    // ==========================================
    const animalForm = document.getElementById('animalForm');
    const animalNameInput = document.getElementById('animalName');
    const animalSpeciesInput = document.getElementById('animalSpecies');
    const careNoteInput = document.getElementById('careNote');

    const nameError = document.getElementById('nameError');
    const speciesError = document.getElementById('speciesError');
    const noteError = document.getElementById('noteError');
    const formResult = document.getElementById('formResult');

    animalForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Read field values and remove extra whitespace
        const name = animalNameInput.value.trim();
        const species = animalSpeciesInput.value.trim();
        const note = careNoteInput.value.trim();

        let isValid = true;

        // Validate Animal Name (must not be empty)
        if (name === '') {
            nameError.textContent = 'Animal name must not be empty.';
            animalNameInput.classList.add('invalid');
            isValid = false;
        } else {
            nameError.textContent = '';
            animalNameInput.classList.remove('invalid');
        }

        // Validate Species (must not be empty)
        if (species === '') {
            speciesError.textContent = 'Species must not be empty.';
            animalSpeciesInput.classList.add('invalid');
            isValid = false;
        } else {
            speciesError.textContent = '';
            animalSpeciesInput.classList.remove('invalid');
        }

        // Validate Care Note (1–150 characters)
        if (note === '') {
            noteError.textContent = 'Care note must not be empty.';
            careNoteInput.classList.add('invalid');
            isValid = false;
        } else if (note.length > 150) {
            noteError.textContent = 'Care note must be 150 characters or less.';
            careNoteInput.classList.add('invalid');
            isValid = false;
        } else {
            noteError.textContent = '';
            careNoteInput.classList.remove('invalid');
        }

        // Stop if validation fails
        if (!isValid) {
            formResult.textContent = 'Please fix the errors in the form.';
            formResult.style.color = '#e74c3c';
            return;
        }

        // Show success confirmation
        formResult.textContent = `Successfully added: ${name} / ${species} / ${note}`;
        formResult.style.color = '#27ae60';

        // Exercise 3: Save object to localStorage under key 'ws05Animal'
        const animalData = { name, species, note };
        localStorage.setItem('ws05Animal', JSON.stringify(animalData));

        // Reset the form fields
        animalForm.reset();
    });

    // Clear error highlights live as the user types
    [animalNameInput, animalSpeciesInput, careNoteInput].forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                input.classList.remove('invalid');
                const errorSpan = document.getElementById(`${input.id}Error`);
                if (errorSpan) errorSpan.textContent = '';
            }
        });
    });


    // ==========================================
    // EXERCISE 2: Animal Sponsorship Calculator
    // ==========================================
    const sponsorForm = document.getElementById('sponsorForm');
    const animalTypeSelect = document.getElementById('animalType');
    const yearsInput = document.getElementById('years');
    const costOutput = document.getElementById('cost');
    const discountMessage = document.getElementById('discountMessage');

    sponsorForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const annualFee = parseFloat(animalTypeSelect.value);
        const years = parseInt(yearsInput.value, 10);

        // Accept only positive whole years
        if (isNaN(years) || years < 1) {
            costOutput.textContent = 'Please enter a valid positive number of years (at least 1).';
            discountMessage.textContent = '';
            return;
        }

        let total = annualFee * years;
        let discountText = '';

        // Discount Rules:
        // > 2 years -> 20% discount
        // >= 5 years -> 20% discount AND subtract €5 after percentage discount
        if (years >= 5) {
            let discounted = total * 0.80;
            total = discounted - 5;
            discountText = 'Applied 20% discount plus an extra €5 off for sponsoring 5 years or more!';
        } else if (years > 2) {
            total = total * 0.80;
            discountText = 'Applied 20% discount for sponsoring more than 2 years!';
        } else {
            discountText = 'No discount applied for 2 years or less.';
        }

        costOutput.textContent = `Total: ${total.toFixed(2)} €`;
        discountMessage.textContent = discountText;
    });


    // ==========================================
    // EXERCISE 4: Loading and Clearing the Animal
    // ==========================================
    const loadBtn = document.getElementById('loadAnimal');
    const clearBtn = document.getElementById('clearAnimal');
    const savedAnimalDisplay = document.getElementById('savedAnimal');

    function loadSavedAnimal() {
        const savedData = localStorage.getItem('ws05Animal');

        if (!savedData) {
            savedAnimalDisplay.textContent = 'No saved animal yet.';
            return;
        }

        const animalObj = JSON.parse(savedData);
        savedAnimalDisplay.textContent = `Saved animal — Name: ${animalObj.name}, Species: ${animalObj.species}, Note: ${animalObj.note}`;
    }

    // Load animal when "Load animal" button is clicked
    loadBtn.addEventListener('click', loadSavedAnimal);

    // Clear saved animal when "Clear saved animal" button is clicked
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('ws05Animal');
        savedAnimalDisplay.textContent = 'Saved animal details will appear here.';
    });

    // Automatically load saved animal when page opens
    loadSavedAnimal();
});