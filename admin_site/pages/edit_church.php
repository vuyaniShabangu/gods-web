<?php
//Buffer larger content areas like the main page content
ob_start();
session_start();
?>
    <div style="text-align: center; width: 100%;" >
        <label style="font-size: 14px">Edit Church</label>
    </div><br /><br/>

    <form action="../scripts/ChurchesScript.php?action=update" method="post">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" style="width: 100%">
            <input class="mdl-textfield__input" type="text" id="name" name="name">
            <label class="mdl-textfield__label" for="name">Church Name</label>
        </div>

        <!--<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="surname" name="surname">
            <label class="mdl-textfield__label" for="surname">Last Name</label>
        </div>-->

        <!--<div class="mdl-select mdl-js-select mdl-select--floating-label">
            <select class="mdl-select__input" id="leader" name="leader">
                <option value=""></option>
                <option value="option1">option 1</option>
                <option value="option2">option 2</option>
                <option value="option3">option 3</option>
                <option value="option4">option 4</option>
                <option value="option5">option 5</option>
            </select>
            <label class="mdl-select__label" for="leader">Leading Member</label>
        </div>-->

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="address" name="address">
            <label class="mdl-textfield__label" for="address">Address</label>
        </div>

        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" id="description" name="description">
            <label class="mdl-textfield__label" for="description">Description</label>
        </div><br />

        <div class="mdl-textfield" style="padding-left: 30px">
            Select file to upload:
            <input type="file" name="fileToUpload" id="fileToUpload">
        </div>

        <div style="text-align: center; width: 100%;" >
            <input type="hidden" id="churchId" name="churchId" />
            <input type="submit" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Save">
            </input>
            <input type="reset" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" value="Cancel">
            </input>
        </div>
    </form>

    <script type="text/javascript">

        $(document).ready(function () {
            var qString = getParameterByName('q');
            
            FillLeaders();

            // Lets fill the fields.
            $.ajax({
                async: false,
                url: '../scripts/ChurchesScript.php?action=getOne&q=' + qString,
                success: function (data) {
                    var result = $.parseJSON(data);

                    if(result.length <= 0)
                    {
                        alert("No record found for the selected church.");
                    }

                    document.getElementById("name").value = result[0].name;
                    document.getElementById("address").value = result[0].address;
                    document.getElementById("description").value = result[0].description;
                    document.getElementById("churchId").value = result[0].id;
                    //document.getElementById("leader").value = result[0].leadingMember;
                },
                error: function (data) {
                    alert("Error: " + data);
                }
            });
        });
        
        function FillLeaders() {

        }

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