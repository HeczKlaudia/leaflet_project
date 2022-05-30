$(function () {
  storage();
  saveOrder();
});

function saveOrder() {
  var initialData = [1, 2, 3, 4, 5, 6, 7], //initial items order (used if there is no saved data
    localStorageSupport =
      "localStorage" in window && window["localStorage"] !== null,
    data,
    html;

  if (localStorageSupport) {
    // Retrieve the local storage data if such is available. Otherwise, use the default order.
    data = JSON.parse(localStorage.getItem("destination")) || initialData;
  } else {
    alert("your browser does not support local storage");
    data = initialData;
  }

  $("#mydest").kendoSortable({
    // Initialize the Sortable.
    filter: ".list-group",
    change: function (e) {
      var item = data.splice(e.oldIndex, 1)[0]; // Remove the item that has changed its order.
      data.splice(e.newIndex, 0, item); // Add the item back using the newIndex.

      localStorage.setItem("destination", kendo.stringify(data)); // Set the updated data in the local storage.
    },
  });
}

function storage() {
  let dest = $(".result");
  let destElementFront =
    '<div class="item">' +
    '<div class="handle flex-center"><i class="fa fa-bars"></i></div>' +
    '<div class="dest"><div class="data">City, Country</div>';
  let destElementBack =
    '</div><div class="delete flex-center"><i class="fa fa-close"></i></div>' +
    "</div></div>";
  var retrievedObject = localStorage.getItem("destination");
  var getloc = JSON.parse(retrievedObject);
  for (let i = 0; i < getloc.length; i++) {
    dest.append(
      '<div class="list-group" id="dest-list">' +
        destElementFront +
        getloc[i] +
        destElementBack
    );
  }
}
