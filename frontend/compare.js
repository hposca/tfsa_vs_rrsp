$(document).ready(function() {
  $("#submit").click(function() {
    var avg_tax_rate_in_ret = $("#avg_tax_rate_in_ret").val();
    var curr_marg_tax_rate = $("#curr_marg_tax_rate").val();
    var deposit_amount = $("#deposit_amount").val();
    var inflation_rate = $("#inflation_rate").val();
    var return_on_investment = $("#return_on_investment").val();
    var years = $("#years").val();

    $("#results").empty(); // To empty previous error/success message.

    if (avg_tax_rate_in_ret == '' || curr_marg_tax_rate == '' || deposit_amount == '' || inflation_rate == '' || return_on_investment == '' || years == '') {
      alert("Please Fill Required Fields");
    } else {
      $.post("http://localhost:5000/compare", {
          avg_tax_rate_in_ret: avg_tax_rate_in_ret,
          curr_marg_tax_rate: curr_marg_tax_rate,
          deposit_amount: deposit_amount,
          inflation_rate: inflation_rate,
          return_on_investment: return_on_investment,
          years: years
        }, "json")
        .done(function(data) {
          var results = "";
          results += "<br/>"
          results += "<h2>Results</h2>"

          results += "<table class=\"blueTable\">"

          results += "<thead>"
          results += "<tr>"
          results += "<th></th>"
          results += "<th>TFSA</th>"
          results += "<th>RRSP</th>"
          results += "</tr>"
          results += "</thead>"

          results += "<tbody>"

          results += "<tr>"
          results += "<td>After Tax:</td>";
          results += "<td>" + data["after_tax"]["TFSA"] + "</td>";
          results += "<td>" + data["after_tax"]["RRSP"] + "</td>";
          results += "</tr>"

          results += "<tr>"
          results += "<td>Future Value:</td>";
          results += "<td>" + data["future_value"]["TFSA"] + "</td>";
          results += "<td>" + data["future_value"]["RRSP"] + "</td>";
          results += "</tr>"

          results += "<tr>"
          results += "<td>Tax on Withdrawal:</td>";
          results += "<td>" + data["tax_on_withdrawal"]["TFSA"] + "</td>";
          results += "<td>" + data["tax_on_withdrawal"]["RRSP"] + "</td>";
          results += "</tr>"

          results += "<tr>"
          results += "<td>After Taxes Future Value:</td>";
          results += "<td>" + data["after_taxes_future_value"]["TFSA"] + "</td>";
          results += "<td>" + data["after_taxes_future_value"]["RRSP"] + "</td>";
          results += "</tr>"

          results += "</tbody>"
          results += "</table>"

          $("#results").append(results).css({
            "visibility": "visible"
          });
        }).fail(function(xhr, status, error) {
          console.log("on fail");
        }).always(function() {
          console.log("on always");
        });
    }
  });
});
