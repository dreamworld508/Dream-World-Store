let incrementButton = document.getElementById("increment");
let decrementButton = document.getElementById("decrement");
let itemLabel = document.getElementById("item");
let count = 1;

// Increment button click event
incrementButton.addEventListener("click", function () {
  count++;
  itemLabel.textContent = count;
  updateTotalPrice();
});

// Decrement button click event
decrementButton.addEventListener("click", function () {
  if (count > 1) {
    count--;
    itemLabel.textContent = count;
    updateTotalPrice();
  }
});

// Function to update total price
function updateTotalPrice() {
  let modalPrice = document.getElementById("modalCardPrice").textContent;
  modalPrice = modalPrice.replace("Rs ", "");
  modalPrice = parseInt(modalPrice);
  let totalPrice = modalPrice * count;
  document.getElementById("totalPrice").textContent = "Rs " + totalPrice;
}

// Event listener for modal show event
document
  .getElementById("exampleModal")
  .addEventListener("show.bs.modal", function (event) {
    let button = event.relatedTarget;
    let title = button.getAttribute("data-title");
    let price = button.getAttribute("data-price");
    let text = button.getAttribute("data-text");
    let img = button.getAttribute("data-img");
    // Update modal content with new data
    document.getElementById("modalCardTitle").textContent = title;
    document.getElementById("modalCardPrice").textContent = "Rs " + price;
    document.getElementById("modalCardText").textContent = text;
    document.getElementById("modalImg").src = img;
    // Reset count and total price
    count = 1;
    itemLabel.textContent = count;
    updateTotalPrice();
  });

// Event listener for modal hidden event
document
  .getElementById("successModal")
  .addEventListener("hidden.bs.modal", function () {
    // Close submit order modal when order success modal is closed
    $("#exampleModal").modal("hide");
  });

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Capture values entered by the user
  let name = document.getElementById("name").value.trim();
  let phoneNumber = document.getElementById("number").value.trim();
  let department = document.querySelector("#department").value;
  let customization = document.querySelector("#customization").value; // Capture the value of customization select element

  // Check if any of the required fields are empty
  if (
    name === "" ||
    phoneNumber === "" ||
    department === "Select your Department"
  ) {
    alert("Please fill out all the required fields.");
    return;
  }

  // Create an object to store all the data
  let cardTitle = document.getElementById("modalCardTitle").textContent;
  let numberOfItems = document.getElementById("item").textContent;
  let totalPrice = document.getElementById("totalPrice").textContent;

  let orderData = {
    name: name,
    phoneNumber: phoneNumber,
    department: department,
    cardTitle: cardTitle,
    numberOfItems: numberOfItems,
    totalPrice: totalPrice,
    customization: customization, // Add customization to the orderData object
  };

  // Call the insertOrder function from server.js to insert data into SQLite
  fetch("/insertOrder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Show success modal
      $("#successModal").modal("show");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
