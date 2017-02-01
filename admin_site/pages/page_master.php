<!doctype html>
<!--
  Material Design Lite
  Copyright 2015 Google Inc. All rights reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License
-->
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps." />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
    <title>
        God's Web Admin | <?php echo $pagetitle; ?>
    </title>

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes" />
    <link rel="icon" sizes="192x192" href="../images/android-desktop.png" />

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="apple-mobile-web-app-title" content="Material Design Lite" />
    <link rel="apple-touch-icon-precomposed" href="../images/ios-desktop.png" />

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="../images/touch/ms-touch-icon-144x144-precomposed.png" />
    <meta name="msapplication-TileColor" content="#3372DF" />

    <link rel="shortcut icon" href="../images/favicon.png" />

    <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
    -->

    <link rel="stylesheet" href="css/roboto.css" />
    <link rel="stylesheet" href="css/material_icons.css" />
    <link rel="stylesheet" href="../styles/material_style.css" />
    <link rel="stylesheet" href="../styles/styles.css" />
    <link href="../styles/themes/jqueryui/jtable_jqueryui.css" rel="stylesheet" type="text/css" />
    <link href="../styles/themes/metro/blue/jtable.css" rel="stylesheet" type="text/css" />
    <link href="../styles/mdb.css" rel="stylesheet"/>
    <link href="../styles/jquery.fileupload.css" rel="stylesheet">
    <link href="../styles/jquery.fileupload-ui.css" rel="stylesheet">
    <!--<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.0/themes/base/jquery-ui.css" type="text/css" rel="stylesheet" />
    <link rel="stylesheet" href="styles/themes/metro/blue/jtable.min.css" type="text/css"/>
    <style>
        #view-source {
            position: fixed;
            display: block;
            right: 0;
            bottom: 0;
            margin-right: 40px;
            margin-bottom: 40px;
            z-index: 900;
        }
    </style>-->

    <script src="../js/jquery.min.js" type="text/javascript"></script>
    <script src="../js/jquery.ui.min.js"  type="text/javascript"></script>
    <script src="../js/bootstrap.min.js" type="text/javascript"></script>
    <script src="../js/jquery.jtable.min.js" type="text/javascript"></script>
    <!-- The jQuery UI widget factory, can be omitted if jQuery UI is already included -->
    <script src="../js/jquery.ui.widget.js"></script>
    <!-- The Templates plugin is included to render the upload/download listings -->
    <script src="../js/tmpl.min.js"></script>
    <!-- The Load Image plugin is included for the preview images and image resizing functionality -->
    <script src="../js/load-image.all.min.js"></script>
    <!-- The Canvas to Blob plugin is included for image resizing functionality -->
    <script src="../js/canvas-to-blob.min.js"></script>
    <!-- blueimp Gallery script -->
    <script src="../js/jquery.blueimp-gallery.min.js"></script>
    <!-- The Iframe Transport is required for browsers without support for XHR file uploads -->
    <script src="../js/jquery.iframe-transport.js"></script>
    <!-- The basic File Upload plugin -->
    <script src="../js/jquery.fileupload.js"></script>
    <!-- The File Upload processing plugin -->
    <script src="../js/jquery.fileupload-process.js"></script>
    <!-- The File Upload image preview & resize plugin -->
    <script src="../js/jquery.fileupload-image.js"></script>
    <!-- The File Upload audio preview plugin -->
    <script src="../js/jquery.fileupload-audio.js"></script>
    <!-- The File Upload video preview plugin -->
    <script src="../js/jquery.fileupload-video.js"></script>
    <!-- The File Upload validation plugin -->
    <script src="../js/jquery.fileupload-validate.js"></script>
    <!-- The File Upload user interface plugin -->
    <script src="../js/jquery.fileupload-ui.js"></script>
    <!-- The main application script -->
    <script src="../js/main.js"></script>
    <script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
    <script>
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyA4o8hn-qEB3jTmw4ZdDlsksdAAWLIAVHs",
            authDomain: "gods-web.firebaseapp.com",
            databaseURL: "https://gods-web.firebaseio.com",
            storageBucket: "gods-web.appspot.com",
            messagingSenderId: "353628194694"
        };
        firebase.initializeApp(config);
    </script>

</head>
<body>
<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
    <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
        <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">
                    <?php echo $pageName ?>
                </span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
                <label class="mdl-button mdl-js-button mdl-button--icon" for="search">
                    <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                    <input class="mdl-textfield__input" type="text" id="search" />
                    <label class="mdl-textfield__label" for="search">Enter your query...</label>
                </div>
            </div>
            <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon" id="hdrbtn">
                <i class="material-icons">more_vert</i>
            </button>
            <ul class="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" for="hdrbtn">
                <li class="mdl-menu__item">About</li>
                <li class="mdl-menu__item">Contact</li>
                <li class="mdl-menu__item">Legal information</li>
            </ul>
        </div>
    </header>
    <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
        <header class="demo-drawer-header">
            <img src="../images/user.jpg" class="demo-avatar" />
            <div class="demo-avatar-dropdown">
                    <span>
                        <?php echo $_SESSION['Name']; ?>
                    </span>
                <div class="mdl-layout-spacer"></div>
                <button id="accbtn" class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon">
                    <i class="material-icons" role="presentation">arrow_drop_down</i>
                    <span class="visuallyhidden">Accounts</span>
                </button>
                <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" for="accbtn">
                    <li class="mdl-menu__item">
                        <a href="">Profile</a>
                    </li>
                    <li class="mdl-menu__item">
                        <a href="">Settings</a>
                    </li>
                    <li class="mdl-menu__item">
                        <a href="../scripts/logout.php">Logout</a>
                    </li>
                </ul>
            </div>
        </header>
        <nav class="demo-navigation mdl-navigation mdl-color--blue-grey-800">
            <a class="mdl-navigation__link" href="../home.php">
                <i class="mdl-color-text--blue-grey-400 material-icons">home</i>Home
            </a>
            <a class="mdl-navigation__link" href="../churches.php">
                <i class="mdl-color-text--blue-grey-400 material-icons">toll</i>Churches
            </a>
            <a class="mdl-navigation__link" href="../devotionals.php">
                <i class="mdl-color-text--blue-grey-400 material-icons">book</i>Devotionals
            </a>
            <a class="mdl-navigation__link" href="../administrators.php">
                <i class="mdl-color-text--blue-grey-400 material-icons">https</i>Administrators
            </a>
            <a class="mdl-navigation__link" href="../events.php">
                <i class="mdl-color-text--blue-grey-400 material-icons">event</i>Events
            </a>
            <!--<a class="mdl-navigation__link" href=""><i class="mdl-color-text--blue-grey-400 material-icons"></i>Forums</a>-->
            <div class="mdl-layout-spacer"></div>
            <a class="mdl-navigation__link" href="">
                <i class="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i>
                <span class="visuallyhidden">Help</span>
            </a>
        </nav>
    </div>
    <main class="mdl-layout__content mdl-color--grey-100">
        <div class="mdl-grid">
            <?php if (isset($mainContent)) {
                echo $mainContent;
            } ?>
        </div>
    </main>
</div>
<!--<a href="https://github.com/google/material-design-lite/blob/mdl-1.x/templates/dashboard/" target="_blank" id="view-source" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored mdl-color-text--white"View Source</a>-->
<script src="../js/material.min.js"></script>
</body>
</html>