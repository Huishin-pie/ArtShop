$(function () {
  //取得商品清單
  let getProductList = function (pageNo = 0, pageSize = 10) {
    $.ajax({
      type: "GET",
      url: `http://localhost:7788/api/products?pageNo=${pageNo}&pageSize=${pageSize}`,
      dataType: "json",
      success: function (res) {
        if (res.info.message === "success" && res.data != null) {
          let pageNo = res.data.pageable.pageNumber;
          let totalPages = res.data.totalPages;
          $("input[name='pageNo']").val(pageNo);
          $("input[name='totalPages']").val(totalPages);
          if (pageNo + 1 == totalPages) {
            $("#loadBtn").css("display", "none");
          }

          let products = res.data.content;
          products.forEach((element) => {
            let productElement = `<div class="col-lg-6 col-sm-6">
          <div class="single_product_item">
            <img
              src="img/product/product_list_1.png"
              alt="#"
              class="img-fluid"
            />
            <h3>
              <a href="single-product.html?id=1">${element.name}</a>
            </h3>
            <p>$${element.price}</p>
          </div>
        </div>`;
            $("#productList").append(productElement);
          });
        } else {
          $("#productList").empty();
        }
      },
      error: function (res) {
        alert(res);
      },
    });
  };

  //取得分類商品清單
  let getProductListByCategory = function (id, pageNo = 0, pageSize = 10) {
    $.ajax({
      type: "GET",
      url: `http://localhost:7788/api/products/category?pageNo=${pageNo}&pageSize=${pageSize}&categoryId=${id}`,
      dataType: "json",
      success: function (res) {
        if (res.info.message === "success" && res.data != null) {
          $("input[name='pageNo']").val(res.data.pageable.pageNumber);
          $("input[name='totalPages']").val(res.data.totalPages);
          $("#productList").empty();
          let products = res.data.content;
          products.forEach((element) => {
            let productElement = `<div class="col-lg-6 col-sm-6">
          <div class="single_product_item">
            <img
              src="img/product/product_list_1.png"
              alt="#"
              class="img-fluid"
            />
            <h3>
              <a href="single-product.html?id=1">${element.name}</a>
            </h3>
            <p>$${element.price}</p>
          </div>
        </div>`;
            $("#productList").append(productElement);
          });
        } else {
          $("#productList").empty();
        }
      },
      error: function (res) {
        alert(res);
      },
    });
  };

  //取得類別清單
  let getCategoriesList = function () {
    $.ajax({
      type: "GET",
      url: "http://localhost:7788/api/categories",
      dataType: "json",
      success: function (res) {
        if (res.info.message === "success" && res.data != null) {
          let categories = res.data;
          categories.forEach((element) => {
            let categoryElement = `<p class="category" categoryId="${element.id}">${element.name}</p>`;
            $("#categoryDropdown").append(categoryElement);
          });
          //搜尋商品功能
          $(".category").on("click", function () {
            let category = $(this).attr("categoryId");
            getProductListByCategory(category);
          });
        } else {
          alert(res.info.message);
        }
      },
      error: function (res) {
        alert(res);
      },
    });
  };

  //載入更多
  $("#loadBtn").on("click", function (e) {
    e.preventDefault();
    let pageNo = parseInt($("input[name='pageNo']").val()) + 1;
    let totalPages = parseInt($("input[name='totalPages']").val());
    if (pageNo < totalPages) {
      getProductList(pageNo);
    }
  });

  getProductList();
  getCategoriesList();
});
