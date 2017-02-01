<?php
  //Buffer larger content areas like the main page content
  ob_start();
  session_start();
?>
    <table width="100%">
        <tr>
            <td width="50%">
                <div class="demo-card-square mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-mdl-card__title_churches mdl-card--expand">
                        <h2 class="mdl-card__title-text">Churches Summary</h2>
                    </div>
                    <div class="mdl-card__supporting-text" id="divChurches">
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="churches.php">
                            View Churches
                        </a>
                    </div>
                </div>
            </td>
            <td>
                <div class="demo-card-square mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card__title_devotionals mdl-card--expand">
                        <h2 class="mdl-card__title-text">Devotions Summary</h2>
                    </div>
                    <div class="mdl-card__supporting-text" id="divDevotions">
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="devotionals.php">
                            View Devotions
                        </a>
                    </div>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <br/>
            </td>
        </tr>
        <tr>
            <td>
                <div class="demo-card-square mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card__title_administrators mdl-card--expand">
                        <h2 class="mdl-card__title-text">Admins Summary</h2>
                    </div>
                    <div class="mdl-card__supporting-text" id="divAdmins">
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="administrators.php">
                            View Admins
                        </a>
                    </div>
                </div>
            </td>
            <td>
                <div class="demo-card-square mdl-card mdl-shadow--2dp">
                    <div class="mdl-card__title mdl-card__title_events mdl-card--expand">
                        <h2 class="mdl-card__title-text">Events Summary</h2>
                    </div>
                    <div class="mdl-card__supporting-text" id="divEvents">
                    </div>
                    <div class="mdl-card__actions mdl-card--border">
                        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="events.php">
                            View Events
                        </a>
                    </div>
                </div>
            </td>
        </tr>
    </table>

<script type="text/javascript">
    $(document).ready(function () {
       // First check with the churches
        $.ajax({
            async: false,
            url: 'scripts/SummaryScript.php?action=churches',
            success: function (data)
            {
                var result = $.parseJSON(data);
                var count = 0;
                var timestamp = "";

                for(var item in result)
                {
                    if (count == 0)
                    {
                        timestamp = result[0].timestamp;
                    }
                    count++;
                }
                var message = "There are currently <strong>" + count + "</strong> churches and the last one was added on <strong>" + timestamp + "</strong>";

                $("#divChurches").html(message);
            },
            error: function (data)
            {
                alert("Error: " + data);
            }
        });

        // Second check with the devotions
        $.ajax({
            async: false,
            url: 'scripts/SummaryScript.php?action=devotions',
            success: function (data)
            {
                var result = $.parseJSON(data);
                var count = 0;
                var timestamp = "";

                for(var item in result)
                {
                    if (count == 0)
                    {
                        timestamp = result[0].timestamp;
                    }
                    count++;
                }
                var message = "There are currently <strong>" + count + "</strong> devotionals and the last one was added on <strong>" + timestamp + "</strong>";

                $("#divDevotions").html(message);
            },
            error: function (data)
            {
                alert("Error: " + data);
            }
        });

        // Third check with the admins
        $.ajax({
            async: false,
            url: 'scripts/SummaryScript.php?action=admins',
            success: function (data)
            {
                var result = $.parseJSON(data);
                var count = 0;
                var timestamp = "";

                for(var item in result)
                {
                    if (count == 0)
                    {
                        timestamp = result[0].timestamp;
                    }
                    count++;
                }
                var message = "There are currently <strong>" + count + "</strong> admins and the last one was added on <strong>" + timestamp + "</strong>";

                $("#divAdmins").html(message);
            },
            error: function (data)
            {
                alert("Error: " + data);
            }
        });

        // Fourth check with the events
        $.ajax({
            async: false,
            url: 'scripts/SummaryScript.php?action=events',
            success: function (data)
            {
                var result = $.parseJSON(data);
                var count = 0;
                var timestamp = "";

                for(var item in result)
                {
                    if (count == 0)
                    {
                        timestamp = result[0].timestamp;
                    }
                    count++;
                }
                var message = "There are currently <strong>" + count + "</strong> events and the last one was added on <strong>" + timestamp + "</strong>";

                $("#divEvents").html(message);
            },
            error: function (data)
            {
                alert("Error: " + data);
            }
        });
    });
</script>
<?php
  //Assign all Page Specific variables
  $mainContent = ob_get_contents();
  ob_end_clean();
  $pagetitle = "Home Page";
  $pageName = "Home";
  //Apply the template
  include("master.php");
?>