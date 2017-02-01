<?php
  //Buffer larger content areas like the main page content
  ob_start();
  session_start();
?>
Events Content Comes Here
<?php
  //Assign all Page Specific variables
  $mainContent = ob_get_contents();
  ob_end_clean();
  $pagetitle = "Events Page";
  $pageName = "Event";
  //Apply the template
  include("master.php");
?>