document
  .getElementById("redirectSelect")
  .addEventListener("change", function () {
    var selectedPage = this.value;
    window.location.href = selectedPage;
  });
