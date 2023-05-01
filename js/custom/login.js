$(function () {
  $("#loginBtn").on("click", function () {
    let email = $("#email").val();
    let password = $("#password").val();

    var data = JSON.stringify({
      email: email,
      password: password,
    });

    if ($("#remember").prop("checked")) {
      setCookie("email", email, 7); //儲存帳號到cookie，有效期7天
      setCookie("pswd", password, 7); //儲存密碼到cookie，有效期7天
    }

    $.ajax({
      type: "POST",
      url: "http://localhost:7788/api/login",
      processData: false,
      contentType: "application/json",
      data: data,
      success: function (response) {
        if (response.info.message == "success")
          window.location.href = "index.html";
        else $(".message").text(response.info.message);
      },
      error: function (response) {
        $(".message").text(response);
      },
    });
  });

  let oEmail = $("#email");
  let oPswd = $("#password");
  let oRemember = $("#remember");

  //頁面初始化時，如果帳號密碼cookie存在則填充
  if (getCookie("email") && getCookie("pswd")) {
    oEmail.val(getCookie("email"));
    oPswd.val(getCookie("pswd"));
    oRemember.prop("checked", true);
  }

  //複選框勾選狀態發生改變時，如果未勾選則清除cookie
  oRemember.on("change", function () {
    if (!$(this).prop("checked")) {
      delCookie("email");
      delCookie("pswd");
    }
  });

  //設定cookie
  function setCookie(name, value, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + "=" + value + ";expires=" + date;
  }
  //獲取cookie
  function getCookie(name) {
    var reg = RegExp(name + "=([^;]+)");
    var arr = document.cookie.match(reg);
    if (arr) {
      return arr[1];
    } else {
      return "";
    }
  }
  //刪除cookie
  function delCookie(name) {
    setCookie(name, null, -1);
  }
});
