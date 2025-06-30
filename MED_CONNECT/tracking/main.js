var db = openDatabase("mydb", "1.0", "Courier Management", 2 * 1024 * 1024);

var emailArray = [];
var passwordArray = [];

var loginBox = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");
var currentUser = "";

async () => {
  await db.transaction(async (tx) => {
    await tx.executeSql(
      "SELECT * FROM LoggedInUser",
      [],
      function (tx, result) {
        if (result.rows.length == 0) {
          currentUser = "";
        } else {
          currentUser = result.rows.item(0).id;
          document.querySelector(
            ".loginInButton"
          ).innerHTML = `<a onclick="showLogin(event)" href="#">Login</a>`;
        }
      }
    );
  });
};

function regTabFun() {
  Event.preventDefault();
  regBox.style.visibility = "visible";
  loginBox.style.visibility = "hidden";
  forgetBox.style.visibility = "hidden";

  regTab.style.backgroundColor = "rgb(12, 132, 189)";
  loginTab.style.backgroundColor = "rgba(130, 140, 142, 0.82)";
}
function loginTabFun() {
  Event.preventDefault();

  regBox.style.visibility = "hidden";
  loginBox.style.visibility = "visible";
  forgetBox.style.visibility = "hidden";

  loginTab.style.backgroundColor = "rgb(12, 132, 189)";
  regTab.style.backgroundColor = "rgba(130, 140, 142, 0.82)";
}
function forTabFun() {
  Event.preventDefault();

  regBox.style.visibility = "hidden";
  loginBox.style.visibility = "hidden";
  forgetBox.style.visibility = "visible";

  regTab.style.backgroundColor = "rgba(130, 140, 142, 0.82)";
  loginTab.style.backgroundColor = "rgba(130, 140, 142, 0.82)";
}

function Registerwithdb() {
  Event.preventDefault();

  var email = document.getElementById("re").value;
  var password = document.getElementById("rp").value;
  var passwordRetype = document.getElementById("rrp").value;
  if (email == "") {
    alert("Email required.");
    return;
  } else if (password == "") {
    alert("Password required.");
    return;
  } else if (passwordRetype == "") {
    alert("Password required.");
    return;
  } else if (password != passwordRetype) {
    alert("Password don't match retype your Password.");
    return;
  } else {
  }
}

function showLogin(event) {
  event.preventDefault();
  document.querySelector("#container").classList.toggle("hidden");
}

function login() {
  Event.preventDefault();

  var email = document.getElementById("se").value;
  var password = document.getElementById("sp").value;

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM RegistgeredUsers WHERE id = ? AND pwd = ?",
      [email, password],
      function (tx, result) {
        if (result.rows.length > 0) {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS LoggedInUser (id unique, pwd)"
          );
          tx.executeSql("INSERT INTO LoggedInUser (id, pwd) VALUES (?, ?)", [
            email,
            password,
          ]);
          currentUser = email;
          document.querySelector("#container").classList.add("hidden");
          document.querySelector(
            ".loginInButton"
          ).innerHTML = `<a onclick="logout(event)" href="#">Logout</a>`;
        } else {
          alert("Please Check your Email and Password");
        }
        console.log(result.rows);
      }
    );
  });
}
function forgot() {
  Event.preventDefault();

  var email = document.getElementById("fe").value;

  if (emailArray.indexOf(email) == -1) {
    if (email == "") {
      alert("Email required.");
      return;
    }
    alert("Email does not exist.");
    return;
  }

  alert("email is send to your email check it in 24hr. \n Thanks");
  document.getElementById("fe").value = "";
}

function track(event) {
  event.preventDefault();

  let trackingDetail = document.querySelector(".detail");
  trackingDetail.classList.remove("hidden");

  let trackingId = document.querySelector("#trackingId");
  let productId = document.querySelector("#productId");
  let productName = document.querySelector("#productName");
  let productStatus = document.querySelector("#productStatus");

  let product = {
    123456: {
      id: "56451",
      name: "Medicine 3",
      status: "Delivered",
    },
    100000: {
      id: "45631",
      name: "Lab Test Result",
      status: "Out for delivery",
    },
    987654: {
      id: "4210",
      name: "Medicine 1",
      status: "Shipped",
    },
    111111: {
      id: "81655",
      name: "Medicine 6",
      status: "Cancelled",
    },
  };

  if (!product[trackingId.value]) {
    document.querySelector(".product-detail").innerHTML =
      "<h4>No Product Found!<br>Check Your Details</h4>";
    return;
  }

  productId.innerHTML = product[trackingId.value].id;
  productName.innerHTML = product[trackingId.value].name;
  productStatus.innerHTML = product[trackingId.value].status;
}

function trackAnother(event) {
  event.preventDefault();
  document.querySelector(".detail").classList.add("hidden");
}
