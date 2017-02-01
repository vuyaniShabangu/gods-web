<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>God's Web | Login Form</title>
    <link rel="stylesheet" href="styles/login_style.css">
</head>
<body>
    <hgroup>
        <h3><br /></h3>
    </hgroup>
    <form method="post">
        <div class="group">
            <input type="text" id="emailAddress" name="emailAddress"><span class="highlight"></span><span class="bar"></span>
            <label>Email Address</label>
        </div>
        <div class="group">
            <input type="password" id="password" name="password"><span class="highlight"></span><span class="bar"></span>
            <label>Password</label>
        </div>
        <button type="button" class="button buttonBlue" id="login">
            Login
            <div class="ripples buttonRipples"><span class="ripplesCircle"></span></div>
        </button>
        <div class="err" id="add_err"></div>
    </form>
    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
    <script src="js/login_index.js"></script>
    <script src="js/login.js"></script>
</body>
</html>