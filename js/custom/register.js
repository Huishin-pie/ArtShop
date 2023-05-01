$(function () {
  $("#registerBtn").on("click", function () {
    let email = $("#email").val();
    let firstName = $("#firstName").val();
    let password = $("#password").val();
    let checkPassword = $("#checkPassword").val();

    var data = JSON.stringify({
      email: email,
      firstName: firstName,
      password: password,
      checkPassword: checkPassword,
    });

    $.ajax({
      type: "POST",
      url: "http://localhost:7788/api/register",
      processData: false,
      contentType: "application/json",
      data: data,
      success: function (response) {
        if (response.info.message == "success")
          window.location.href = "login.html";
        else $(".message").text(response.info.message);
      },
      error: function (response) {
        $(".message").text(response);
      },
    });
  });
});
