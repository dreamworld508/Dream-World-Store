document.addEventListener("DOMContentLoaded", function () {
  // Load user data from localStorage if available
  const savedName = localStorage.getItem("userName");
  const savedNumber = localStorage.getItem("userNumber");
  if (savedName) {
    document.getElementById("name").value = savedName;
  }
  if (savedNumber) {
    document.getElementById("number").value = savedNumber;
  }

  // Listen for form submission
  document
    .getElementById("orderForm")
    .addEventListener("submit", function (event) {
      // Prevent the default form submission behavior
      event.preventDefault();

      // Get the user input
      const name = document.getElementById("name").value;
      const number = document.getElementById("number").value;

      // Save user data to localStorage
      localStorage.setItem("userName", name);
      localStorage.setItem("userNumber", number);

      // Proceed with form submission
      // You may want to add further processing here such as sending the data to a server
      // For now, let's just simulate a successful order submission
      $("#exampleModal").modal("hide");
      $("#successModal").modal("show");
    });
});
