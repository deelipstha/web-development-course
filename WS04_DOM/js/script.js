// TASK 1

const taskOneHeading = document.querySelector("#taskOneHeading");
const changeHeadingButton = document.querySelector("#changeHeadingButton");
const changeStyleButton = document.querySelector("#changeStyleButton");
const changeTextButton = document.querySelector("#changeTextButton");
const animalText = document.querySelector("#animalText");

changeHeadingButton.addEventListener("click", function () {
    taskOneHeading.textContent = "Animal Information";
});

changeStyleButton.addEventListener("click", function () {
    taskOneHeading.classList.toggle("highlight");
});

changeTextButton.addEventListener("click", function () {
    animalText.textContent = "Tigers are large and powerful wild cats.";
});


// TASK 2

const animalContent = document.querySelector("#animalContent");

const animalHeading = document.createElement("h3");
animalHeading.textContent = "Animal of the Day";
animalHeading.classList.add("animal-heading");

const animalDescription = document.createElement("p");
animalDescription.textContent =
    "Elephants are intelligent, social and powerful animals.";

const animalPicture = document.createElement("img");
animalPicture.src = "images/elephant.png";
animalPicture.alt = "Elephant";

animalContent.append(
    animalHeading,
    animalDescription,
    animalPicture
);

const hideAnimalButton = document.querySelector("#hideAnimalButton");
const showAnimalButton = document.querySelector("#showAnimalButton");

hideAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "none";
});

showAnimalButton.addEventListener("click", function () {
    animalContent.style.display = "block";
});


// TASK 3

const animalSelect = document.querySelector("#animalSelect");
const animalName = document.querySelector("#animalName");
const selectedAnimalImage = document.querySelector("#animalImage");
const animalDescriptionText = document.querySelector("#animalDescription");

animalSelect.addEventListener("change", function () {

    if (animalSelect.value === "elephant") {
        animalName.textContent = "Elephant";
        selectedAnimalImage.src = "images/elephant.png";
        selectedAnimalImage.alt = "Elephant";
        animalDescriptionText.textContent =
            "Elephants are the world's largest land animals.";
    }

    else if (animalSelect.value === "tiger") {
        animalName.textContent = "Tiger";
        selectedAnimalImage.src = "images/tiger.png";
        selectedAnimalImage.alt = "Tiger";
        animalDescriptionText.textContent =
            "Tigers are large wild cats and powerful predators.";
    }

    else if (animalSelect.value === "penguin") {
        animalName.textContent = "Penguin";
        selectedAnimalImage.src = "images/penguin.png";
        selectedAnimalImage.alt = "Penguin";
        animalDescriptionText.textContent =
            "Penguins are birds that are excellent swimmers.";
    }

    else if (animalSelect.value === "panda") {
        animalName.textContent = "Panda";
        selectedAnimalImage.src = "images/panda.png";
        selectedAnimalImage.alt = "Panda";
        animalDescriptionText.textContent =
            "Pandas are famous for eating bamboo.";
    }
});

selectedAnimalImage.addEventListener("mouseenter", function () {
    selectedAnimalImage.classList.add("image-highlight");
});

selectedAnimalImage.addEventListener("mouseleave", function () {
    selectedAnimalImage.classList.remove("image-highlight");
});


// TASK 4

const animalForm = document.querySelector("#animalForm");
const observationAnimal = document.querySelector("#observationAnimal");
const observationLocation = document.querySelector("#observationLocation");
const observationDate = document.querySelector("#observationDate");
const observationTableBody = document.querySelector("#observationTableBody");

animalForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (
        observationAnimal.value === "" ||
        observationLocation.value === "" ||
        observationDate.value === ""
    ) {
        alert("Please fill in all fields.");
        return;
    }

    const row = document.createElement("tr");

    const animalCell = document.createElement("td");
    const locationCell = document.createElement("td");
    const dateCell = document.createElement("td");

    animalCell.textContent = observationAnimal.value;
    locationCell.textContent = observationLocation.value;
    dateCell.textContent = observationDate.value;

    row.append(animalCell, locationCell, dateCell);

    observationTableBody.append(row);

    observationAnimal.value = "";
    observationLocation.value = "";
    observationDate.value = "";
});