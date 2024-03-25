// Get references to select element and label
let customizationSelect = document.getElementById("customization");
let customizationLabel = document.getElementById("customizationLabel");

// Add event listener for changes in select element
customizationSelect.addEventListener("change", function () {
  if (customizationSelect.value === "Yes") {
    customizationLabel.style.display = "block";
  } else {
    customizationLabel.style.display = "none";
  }
});
