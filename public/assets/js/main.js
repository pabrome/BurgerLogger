async function loadBurgers() {
  let burgerList = await $.get("/loadBurgers");
  for (burger of burgerList) {
    if (burger.devoured == 0) {status = "ready"} else {status = "eaten"}
    buildBurger(burger.description, status);
  };
};

async function logBurger() {
  data = {burgerName: $("#input").val()}

  $.ajax({
    url: "/log",
    method: "POST",
    data: data
  });
  
  burger = $("#input").val();
  $("#input").val('');
  buildBurger(burger,"ready");
};

async function devourBurger() {
  let burgerName = $(this).parent()[0].childNodes[0].nodeValue;
  let burgerID = $(this).parent().attr("id");
  let data = {burgerName: burgerName};

  $.ajax({
    method: "POST",
    url: "/devour",
    data: data
  });

  $(this).remove();
  $(`#${burgerID}`).appendTo("#eaten");
};

function buildBurger(burger, status) {
  $("<li>").attr({
    class: "list-group-item",
    id: `burger${$("li").length}`
  }).text(burger).appendTo(`#${status}`);
  if (status == "ready") {
    $("<button>").attr({
      class: "ml-3 devourButton"
    }).text("Devour").appendTo(`#burger${$("li").length-1}`);
  };
  $(".devourButton").on("click", devourBurger);
};

$("#log").on("click",logBurger);

loadBurgers();