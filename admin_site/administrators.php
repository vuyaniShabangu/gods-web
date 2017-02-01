<?php
//Buffer larger content areas like the main page content
ob_start();
session_start();
?>
   <div style="text-align: right; width: 100%;" >
       <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised mdl-button--colored" onclick="window.location='pages/add_admin.php'";>
           Add New
       </button>
   </div><br/><br /><br/>

    <div id="administrators_grid" style="width: 100%">
    </div>

<script type="text/javascript">
    $(document).ready(function () {
        // Lets fill the table.
        $.ajax({
            async: false,
            url: 'scripts/AdministratorsScript.php?action=list',
            success: function (data) {
                var result = $.parseJSON(data);

                var table = constructTable(result);

                $('#administrators_grid').html(table);
            },
            error: function (data) {
                alert("Error: " + data);
            }
        });
    });

    function constructTable(result) {
        var html = "<table class=\"mdl-data-table mdl-js-data-table mdl-shadow--2dp\" width=\"100%\" border=\"1\">";
        html += "<thead><tr><th width=\"2%\"></th>";
        html += "<th class=\"mdl-data-table__cell--non-numeric\">First Name</th>";
        html += "<th class=\"mdl-data-table__cell--non-numeric\">Last Name</th>";
        html +="<th class=\"mdl-data-table__cell--non-numeric\">Email Address</th>";
        html += "<th class=\"mdl-data-table__cell--non-numeric\">Phone Number</th>";
        html += "</tr></thead><tbody>";
        var count = 0;

        for(var item in result)
        {
            html += "<tr>";
            html += "<td><label class=\"mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select\" for=\"row[" + result[count].id + "]\">";
            html += "<input type=\"checkbox\" id=\"row[" + result[count].id + "]\" class=\"mdl-checkbox__input\" onclick=\"javascript:editDelete(this.checked, " + result[count].id + ");\" />";
            html += "</label></td>";
            html += "<td class=\"mdl-data-table__cell--non-numeric\">"  + result[count].name + "</td>";
            html += "<td class=\"mdl-data-table__cell--non-numeric\">"  + result[count].surname + "</td>";
            html += "<td class=\"mdl-data-table__cell--non-numeric\">" + result[count].email + "</td>";
            html += "<td class=\"mdl-data-table__cell--non-numeric\">" + result[count].phone_number + "</td>";
            html += "</tr>";

            count++;
        }

        html += "</tbody></table>";

        return html;
    }

    function editDelete(check, recordId) {
        if (!check) return;

        // this is the part where we bring the dialog so they can chose to edit/ delete or do nothing
        var dialog = document.querySelector('dialog');

        if (! dialog.showModal) {
            dialogPolyfill.registerDialog(dialog);
        }

        dialog.showModal();

        //Set a listener for the edit
        dialog.querySelector('.edit').addEventListener('click', function () {
            window.location = 'pages/edit_admin.php?q=' + recordId;
        });

        //Set a listener for the delete
        dialog.querySelector('.delete').addEventListener('click', function () {
            var confirmed = window.confirm("Press OK to confirm deleting of the record.");

            if (confirmed) {
                $.ajax({
                    async: false,
                    url: 'scripts/AdministratorsScript.php?action=delete&q=' + recordId,
                    success: function (data) {
                        if (data == "true") {
                            alert("Record has been successfully deleted.");
                        }
                        else {
                            alert("An error has occurred. Details: " + data);
                        }
                    },
                    error: function (data) {
                        alert("Error: " + data);
                    }
                });
            }

            dialog.close();
            location.reload();
        });

        // Set a listener for the close.
        dialog.querySelector('.close').addEventListener('click', function () {
            dialog.close();
        });
    }
</script>
    <dialog class="mdl-dialog">
        <h5 class="mdl-dialog__title">Record Selected</h5>
        <div class="mdl-dialog__content">
            <p>
                What would you like to do with the selected record?
            </p>
        </div>
        <div class="mdl-dialog__actions">
            <button type="button" class="mdl-button close">Cancel</button>
            <button type="button" class="mdl-button delete">Delete</button>
            <button type="button" class="mdl-button edit">Edit</button>
        </div>
    </dialog>
<?php
//Assign all Page Specific variables
$mainContent = ob_get_contents();
ob_end_clean();
$pagetitle = "Administrators Page";
$pageName = "Administrators";
//Apply the template
include("master.php");
?>