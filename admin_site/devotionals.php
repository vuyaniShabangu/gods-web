<?php
  //Buffer larger content areas like the main page content
  ob_start();
  session_start();
?>
Devotional Content Comes Here
<?php
  //Assign all Page Specific variables
  $mainContent = ob_get_contents();
  ob_end_clean();
  $pagetitle = "Devotionals Page";
  $pageName = "Devotional";
  //Apply the template
  include("master.php");
?>