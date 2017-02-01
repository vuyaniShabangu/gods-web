<?php
//Buffer larger content areas like the main page content
ob_start();
session_start();
?>
    <div style="text-align: center; width: 100%;" >
        <label style="font-size: 14px">Edit Administrator</label>
    </div><br /><br/>

    <form action="../scripts/AdministratorsScript.php?action=update" method="post">
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
            <input type="hidden" id="adminId" name="adminId" />
            <input type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Save">
            </input>
            <input type="reset" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Cancel">
            </input>
        </div>
    </form>

<script type="text/javascript">
    
    $(document).ready(function () {
        var qString = getParameterByName('q');
        
        // Lets fill the fields.
        $.ajax({
            async: false,
            url: '../scripts/AdministratorsScript.php?action=getOne&q=' + qString,
            success: function (data) {
                var result = $.parseJSON(data);

                if(result.length <= 0)
                {
                    alert("No record found for the selected administrator.");
                }

                document.getElementById("name").value = result[0].name;
                document.getElementById("surname").value = result[0].surname;
                document.getElementById("email").value = result[0].email;
                document.getElementById("phone_number").value = result[0].phone_number;
                document.getElementById("password").value = result[0].password;
                document.getElementById("confirm").value = result[0].password;
                document.getElementById("adminId").value = result[0].id;
            },
            error: function (data) {
                alert("Error: " + data);
            }
        });
    });

    function getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
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