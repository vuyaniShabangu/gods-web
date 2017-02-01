$(document).ready(function () {
    $("#add_err").css('display', 'none', 'important');
    $("#login").click(function () {
        email = $("#emailAddress").val();
        password = $("#password").val();
        $.ajax({
            type: "POST",
            url: "scripts/login.php",
            data: "emailAddress=" + email + "&password=" + password,
            success: function (html) {
                if (html == 'true') {
                    //$("#add_err").html("right username or password");
                    window.location = "home.php";
                }
                else {
                    $("#add_err").css('display', 'inline', 'important');
                    $("#add_err").html("<img src='images/alert.png' /> Username or password is not correct.");
                }
            },
            beforeSend: function () {
                $("#add_err").css('display', 'inline', 'important');
                $("#add_err").html("<img src='images/ajax-loader.gif' /> Loading...")
            },
            error: function(html) {
                alert(html);
            }
        });
        return false;
    });
});