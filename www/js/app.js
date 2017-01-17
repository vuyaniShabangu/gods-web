// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA4o8hn-qEB3jTmw4ZdDlsksdAAWLIAVHs",
    authDomain: "gods-web.firebaseapp.com",
    databaseURL: "https://gods-web.firebaseio.com",
    storageBucket: "gods-web.appspot.com",
    messagingSenderId: "353628194694"
  };
  firebase.initializeApp(config);

angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'firebase', 'angularMoment','ionic.cloud'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            //StatusBar.styleDefault();
            StatusBar.backgroundColorByHexString('#20B2AA');
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicCloudProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);
    
    //Initialize the cloud provider
    $ionicCloudProvider.init({
        "core": {
        "app_id": "e460e997"
            },
        "push": {
        "sender_id": "353628194694",
        "pluginConfig": {
            "ios": {
            "badge": true,
            "sound": true
            },
            "android": {
            "iconColor": "#343434"
            }
        }
        }
    });


    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.explore', {
        url: '/explore',
        views: {
            'menuContent': {
                templateUrl: 'templates/explore.html',
                controller: 'ExploreCtrl'
            },
           /* 'fabContent': {
                template: '<button id="fab-activity" class="button button-fab button-fab-top-right expanded button-energized-900 flap"><i class="icon ion-paper-airplane"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-activity').classList.toggle('on');
                    }, 200);
                }
            }*/
        }
    })

    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl',
                params: ['uid']

            },
            'fabContent': {
                template: '<button id="fab-friends" class="button button-fab button-fab-top-left expanded button-energized-900 spin"><i class="icon ion-chatbubbles"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-friends').classList.toggle('on');
                    }, 900);
                }
            }
        }
    })

    .state('app.events', {
        url: '/events',
        views: {
            'menuContent': {
                templateUrl: 'templates/events.html',
                controller: 'EventsCtrl'
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            }
        }
    })

    .state('app.signup', {
        url: '/signup',
        views: {
            'menuContent': {
                templateUrl: 'templates/signup.html',
                controller: 'SignUpCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.starter', {
        url: '/starter',
        views: {
            'menuContent': {
                templateUrl: 'templates/starter.html',
                controller: 'StarterCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.home', {
        url: '/home',
        views: {
            'menuContent': {
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl',
                params: ['uid']
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.devotions', {
        url: '/devotions',
        views: {
            'menuContent': {
                templateUrl: 'templates/devotions.html',
                controller: 'DevotionsCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('app.settings', {
        url: '/settings',
        views: {
            'menuContent': {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })

    .state('app.extra', {
        url: '/extra',
        views: {
            'menuContent': {
                templateUrl: 'templates/extra.html',
                controller: 'ExtraCtrl'
            }
        }
    })

    .state('app.add_new_account', {
        url: '/add_new_account',
        views: {
            'menuContent': {
                templateUrl: 'templates/add_new_account.html',
                controller: 'AddNewAccountCtrl'
            }
        }
    })

    .state('app.upgrade_halo', {
        url: '/upgrade_halo',
        views: {
            'menuContent': {
                templateUrl: 'templates/upgrade_halo.html',
                controller: 'UpgradeHaloCtrl'
            }
        }
    })

    .state('app.register_church', {
        url: '/register_church',
        views: {
            'menuContent': {
                templateUrl: 'templates/register_church.html',
                controller: 'RegisterChurchCtrl'
            }
        }
    })

    .state('app.addEvent', {
        url: '/addEvent',
        views: {
            'menuContent': {
                templateUrl: 'templates/addEvent.html',
                controller: 'AddEventCtrl'
            }
        }
    })

    .state('app.viewEvent', {
        url: '/viewEvent',
        views: {
            'menuContent': {
                templateUrl: 'templates/view_event.html',
                controller: 'ViewEventCtrl'
            }
        }
    })

    .state('app.about', {
        url: '/about',
        views: {
            'menuContent': {
                templateUrl: 'templates/about.html'            }
        }
    })

    .state('app.edit_profile', {
        url: '/edit_profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/edit_profile.html',
                controller: 'EditProfileCtrl'
            }
        }
    })

    .state('app.view_user', {
        url: '/view_user',
        views: {
            'menuContent': {
                templateUrl: 'templates/view_user.html',
                controller: 'ViewUserCtrl'
            }
        }
    })

    .state('app.view_category', {
        url: '/view_category',
        views: {
            'menuContent': {
                templateUrl: 'templates/view_category.html',
                controller: 'ViewCategoryCtrl'
            }
        }
    })

    .state('app.passage', {
        url: '/passage',
        views: {
            'menuContent': {
                templateUrl: 'templates/passage.html',
                controller: 'PassageCtrl'
            }
        }
    })

    .state('app.letterbox', {
        url: '/letterbox',
        views: {
            'menuContent': {
                templateUrl: 'templates/letterbox.html',
                controller: 'LetterBoxCtrl'
            }
        }
    })

    .state('app.report_a_problem', {
        url: '/report_a_problem',
        views: {
            'menuContent': {
                templateUrl: 'templates/report_a_problem.html',
                controller: 'ReportAProblemCtrl'
            }
        }
    })

    .state('app.reset_password', {
        url: '/reset_password',
        views: {
            'menuContent': {
                templateUrl: 'templates/reset_password.html',
                controller: 'ResetPasswordCtrl'
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/starter');
});
