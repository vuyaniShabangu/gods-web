<?php
//Buffer larger content areas like the main page content
ob_start();
session_start();
?>
    <div style="text-align: center; width: 100%;" >
        <label style="font-size: 14px">Add Administrator</label>
    </div><br /><br/>

    <form action="../scripts/AdministratorsScript.php?action=create" method="post" onsubmit="javascript:checkIfPasswordsSame();">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
            <input class="mdl-textfield__input" type="text" id="name" name="name">
            <label class="mdl-textfield__label" for="name">First Name</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="surname" name="surname">
            <label class="mdl-textfield__label" for="surname">Last Name</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="email" name="email">
            <label class="mdl-textfield__label" for="email">Email:</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="phone_number" name="phone_number">
            <label class="mdl-textfield__label" for="phone_number">Phone Number.</label>
            <span class="mdl-textfield__error">Input is not a number! e.g **********</span>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="password" name="password">
            <label class="mdl-textfield__label" for="password">Password</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="password" id="confirm" name="confirm">
            <label class="mdl-textfield__label" for="confirm">Confirm</label>
        </div>

        <div style="text-align: center; width: 100%;" >
            <input type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Save">
            </input>
            <input type="reset" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Cancel">
            </input>
        </div>
    </form>

<script type="text/javascript">
    function checkIfPasswordsSame() {
        var password = $("password").val();
        var confirm = $("confirm").val();

        if (password == confirm)
            return true;

        alert("Passwords entered do not match.");
        return false;
    }
</script>
<?php
//Assign all Page Specific variables
$mainContent = ob_get_contents();
ob_end_clean();
$pagetitle = "Add Admin Page";
$pageName = "Administrators";
//Apply the template
include("page_master.php");
?>