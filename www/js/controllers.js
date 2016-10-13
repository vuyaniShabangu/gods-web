/* global angular, document, window */
'use strict';

var userID;

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    const txtEmail = document.getElementsByClassName('md-input')[0];
    const txtPassword = document.getElementsByClassName('md-input')[1];
    const btnLogin =  document.getElementById('loginButton');

})

.controller('SignUpCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $firebaseAuth) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    const txtName = document.getElementsByClassName('md-input')[0];
    const txtUsername = document.getElementsByClassName('md-input')[1];
    const txtEmail = document.getElementsByClassName('md-input')[2];
    const txtPassword = document.getElementsByClassName('md-input')[3];
    const btnLogin =  document.getElementById('loginButton');

    var auth = $firebaseAuth();
    var ref = firebase.database().ref().child("users");
    $scope.createUser = function() {
    
    $scope.message = null;
    $scope.error = null;
      // Create a new user
      auth.$createUserWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then(function(firebaseUser) {
            
            console.log("User created with uid: " + firebaseUser.uid);
            userID = firebaseUser.uid;
            ref.child(firebaseUser.uid).set({
                name: txtName.value,
                email: txtEmail.value,
                username: txtUsername.value,
                profilePicURL: 'img/profileDefault.png',
                followers: 0,
                following: 0,
                topPosts: 0,
                church: '-',
                about: 'My name is '+txtName.value
                

            });
            $state.go('app.profile');
        }).catch(function(error) {
            $scope.error = error;
        });
    };
})

.controller('StarterCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    var ref = firebase.database().ref().child("users").child(userID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");

    /*var i=0;
    window.setInterval(function(){
        if(i==0)
        {
            $('.hero').css("background-image", "url('img/nightBG.jpeg')");
            i++;
        }
        else
        {
            $('.hero').css("background-image", "url('img/dayBG.jpeg')");
            i--;
        }

        //alert(i);
    }, 5000);*/
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('HomeCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var ref = firebase.database().ref().child("users").child(userID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");

    var postsRef = firebase.database().ref().child("posts");
    // create a synchronized array
    $scope.posts = $firebaseArray(postsRef);

    //getPostInfo
    var postContent = document.getElementById('postContent');

    $scope.makePost = function(){
        //alert(postContent.value);
        $scope.posts.$add({
            text: postContent.value,
            datetime: new Date(),
            userID: userID,
            username: userObject.username,
            userProfilePic: userObject.profilePicURL
        });
        postContent.value = "";

    }

})

.controller('DevotionsCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('SettingsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $state) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    //ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

    var btnLogout = document.getElementById('logoutButton');
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        $state.go('app.starter');
    });

})

.controller('ExtraCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    //ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('AddNewAccountCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    //ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('UpgradeHaloCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    //ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('RegisterChurchCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    //ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });*/
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
