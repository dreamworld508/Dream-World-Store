// Event listener for "Download Receipt" button click in the success modal
document
  .querySelector("#successModal button.btn-primary")
  .addEventListener("click", function () {
    // Collect order details
    let cardTitle = document.getElementById("modalCardTitle").textContent;
    let numberOfItems = document.getElementById("item").textContent;
    let totalPrice = document.getElementById("totalPrice").textContent;
    let customization = document.querySelector("#customization").value;

    // Format receipt content
    let receiptContent = `Order Details:
    Item: ${cardTitle}
    Number of Items: ${numberOfItems}
    Customization: ${customization}
    Total Price: ${totalPrice}`;

    // Create a Blob containing the receipt content
    const blob = new Blob([receiptContent], { type: "text/plain" });

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement("a");
    anchor.download = "receipt.txt"; // File name
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target = "_blank";

    // Trigger the download
    anchor.click();

    // Clean up
    window.URL.revokeObjectURL(anchor.href);
  });
