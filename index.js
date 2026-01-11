function checkValidFields() {
  const u = username.value;
  const p = password.value;

  if (u === "abcd" && p === "1234") {
    window.location.href = "levelPage.html";
  } else {
    alert("User: abcd | Password: 1234");
  }
}
