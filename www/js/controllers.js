/* global angular, document, window */
//'use strict';

var userID;
var otherUserID;
var selectedEvent;
var selectedCategory;

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, $firebaseObject) {
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

    var ref;
    var userObject;
    if(userID)
    {
        ref = firebase.database().ref().child("users").child(userID);
        userObject = $firebaseObject(ref);
        userObject.$bindTo($scope, "user");
    }
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $firebaseAuth, $ionicPopup) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
        
    }, 0);
    ionicMaterialInk.displayEffect();

    const txtEmail = document.getElementsByClassName('md-input')[0];
    const txtPassword = document.getElementsByClassName('md-input')[1];
    const btnLogin =  document.getElementById('loginButton');

    var auth = $firebaseAuth();
    var ref = firebase.database().ref().child("users");
    $scope.signInUser = function() {
    

    $scope.message = null;
    $scope.error = null;
      // Create a new user
      auth.$signInWithEmailAndPassword(txtEmail.value, txtPassword.value)
        .then(function(firebaseUser) {
            
            console.log("User signed in with uid: " + firebaseUser.uid);
            userID = firebaseUser.uid;

            $state.go('app.profile');
        }).catch(function(error) {
            $scope.error = error;
            console.log($scope.error);
            var alertPopup = $ionicPopup.alert({
                title: 'Please try again.',
                template: $scope.error.message
            });
    
        });
    };
})



.controller('SignUpCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $state, $firebaseAuth, $ionicPopup) {
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
            console.log($scope.error);
            var alertPopup = $ionicPopup.alert({
                title: 'Please try again.',
                template: $scope.error.message
            });
        });
    };
})

.controller('StarterCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate, $ionicScrollDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $ionicSideMenuDelegate.canDragContent(false);
    $ionicScrollDelegate.scrollBottom();
    console.log("should have scrolled");
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

    alert("In Progress");
    console.log($stateParams);
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$ionicSideMenuDelegate, $firebaseObject, $firebaseArray) {
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
    $ionicSideMenuDelegate.canDragContent(true);
    
    var ref = firebase.database().ref().child("users").child(userID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");


    var postsRef = firebase.database().ref().child("posts");
    // create a synchronized array
    $scope.posts = $firebaseArray(postsRef);
var usersRef = firebase.database().ref().child("users");
    var users = $firebaseArray(usersRef);
    
    users.$loaded().then( function(){

        $scope.posts.$loaded()
            .then(function(){
                angular.forEach($scope.posts, function(post) {
                    console.log(post);
                    post.username = users.$getRecord(post.userID).username;
                    post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                    post.amen =  $.map(post.amen, function(value, index) {
                                    return [value];
                    });
                    post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                    return [value];
                    });
                    post.touch =  $.map(post.touch, function(value, index) {
                                    return [value];
                    });
                   
            })
        });

    });

    $scope.viewUserProfile = function(uid){
        otherUserID = uid;
        if(uid == userID)
            $state.go('app.profile');
        else
            $state.go('app.view_user');
    }

    $scope.amen = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("amen");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.hallelujah = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("hallelujah");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.touch = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("touch");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }


    function loadObjects(){
            users.$loaded().then( function(){

            $scope.posts.$loaded()
                .then(function(){
                    angular.forEach($scope.posts, function(post) {
                        console.log(post);
                        post.username = users.$getRecord(post.userID).username;
                        post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                        post.amen =  $.map(post.amen, function(value, index) {
                                        return [value];
                        });
                        post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                        return [value];
                        });
                        post.touch =  $.map(post.touch, function(value, index) {
                                        return [value];
                        });
                    
                })
            });

        });
    }

    /*function addDevotionsTemp(){
        var devCategoryRef = firebase.database().ref().child("category_ref").child("-KWWkoLqepV_mHNW8VO6").child("devotions");
        var category = $firebaseArray(devCategoryRef);
        category.$add({
            verse: "Mathew 28:19",
            word: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit",
            version: "NIV",
            explaination: "This is our purpose. To go and to mae disciples of Jesus. If the love of God truley overflows in you, then it has to affect the lives of other people.",
            date: new Date()
        });
        category.$add({
            verse: "Ephesians 3:20",
            word: "Now to Him who is able to do exceedingly abundantly above all that we ask or think, according to the power that works in us",
            version: "NKJV",
            explaination: "The author of this passage used all three words to emphasise how much more God is willing to for us, but the question is, what are you asking? What are you imagining?",
            date: new Date()
        });
    }*/




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

    var followRef = firebase.database().ref().child("following");
    $scope.follow = $firebaseArray(followRef);

    //Followers:
    var query = followRef.orderByChild("followee").equalTo(userID);
    $scope.followers = $firebaseArray(query);

    //Following:
    var query = followRef.orderByChild("follower").equalTo(userID);
    $scope.following = $firebaseArray(query);


})

.controller('ExploreCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $firebaseArray) {
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

        var usersRef = firebase.database().ref().child("users");
    var users = $firebaseArray(usersRef);
    
    users.$loaded().then( function(){

        $scope.posts.$loaded()
            .then(function(){
                angular.forEach($scope.posts, function(post) {
                    console.log(post);
                    post.username = users.$getRecord(post.userID).username;
                    post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                    post.amen =  $.map(post.amen, function(value, index) {
                                    return [value];
                    });
                    post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                    return [value];
                    });
                    post.touch =  $.map(post.touch, function(value, index) {
                                    return [value];
                    });
                   
            })
        });

    });

    $scope.viewUserProfile = function(uid){
        otherUserID = uid;
        if(uid == userID)
            $state.go('app.profile');
        else
            $state.go('app.view_user');
    }

    $scope.amen = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("amen");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.hallelujah = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("hallelujah");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.touch = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("touch");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }


    function loadObjects(){
            users.$loaded().then( function(){

            $scope.posts.$loaded()
                .then(function(){
                    angular.forEach($scope.posts, function(post) {
                        console.log(post);
                        post.username = users.$getRecord(post.userID).username;
                        post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                        post.amen =  $.map(post.amen, function(value, index) {
                                        return [value];
                        });
                        post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                        return [value];
                        });
                        post.touch =  $.map(post.touch, function(value, index) {
                                        return [value];
                        });
                    
                })
            });

        });
    }


})

.controller('HomeCtrl', function($scope, $state,$stateParams, $timeout, /*ionicMaterialMotion,*/ ionicMaterialInk, $firebaseObject, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
        ionicMaterialInk.displayEffect();
    }, 200);*/

    // Activate ink for controller
    
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
            timestamp: new Date().getTime(),
            userID: userID,
            username: userObject.username,
            userProfilePic: userObject.profilePicURL
        });
        postContent.value = "";
        var timestamp = new Date().getTime();
        
    }

    var usersRef = firebase.database().ref().child("users");
    var users = $firebaseArray(usersRef);
    
    users.$loaded().then( function(){

        $scope.posts.$loaded()
            .then(function(){
                angular.forEach($scope.posts, function(post) {
                    console.log(post);
                    post.username = users.$getRecord(post.userID).username;
                    post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                    post.amen =  $.map(post.amen, function(value, index) {
                                    return [value];
                    });
                    post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                    return [value];
                    });
                    post.touch =  $.map(post.touch, function(value, index) {
                                    return [value];
                    });
                   
            })
        });

    });

    $scope.viewUserProfile = function(uid){
        otherUserID = uid;
        if(uid == userID)
            $state.go('app.profile');
        else
            $state.go('app.view_user');
    }

    $scope.amen = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("amen");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.hallelujah = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("hallelujah");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.touch = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("touch");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }


    function loadObjects(){
            users.$loaded().then( function(){

            $scope.posts.$loaded()
                .then(function(){
                    angular.forEach($scope.posts, function(post) {
                        console.log(post);
                        post.username = users.$getRecord(post.userID).username;
                        post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                        post.amen =  $.map(post.amen, function(value, index) {
                                        return [value];
                        });
                        post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                        return [value];
                        });
                        post.touch =  $.map(post.touch, function(value, index) {
                                        return [value];
                        });
                    
                })
            });

        });
    }

    

})

.controller('DevotionsCtrl', function($scope, $state, $stateParams, $timeout, /*ionicMaterialMotion,*/ ionicMaterialInk, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);*/

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var devCategoriesRef = firebase.database().ref().child("category_ref");
    // create a synchronized array
    $scope.devotionalCategories = $firebaseArray(devCategoriesRef);

    $scope.viewCategory = function(devCat){
        selectedCategory = devCat.$id;
        $state.go('app.view_category');   
    }



})

.controller('ViewCategoryCtrl', function($scope, $state, $stateParams, $timeout, /*ionicMaterialMotion,*/ ionicMaterialInk, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);*/

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    var devotionsRef = firebase.database().ref().child("category_ref").child(selectedCategory).child("devotions");
    // create a synchronized array
    $scope.devotions = $firebaseArray(devotionsRef);
    console.log($scope.devotions);

})

.controller('EventsCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk/*, ionicMaterialMotion*/, $firebaseObject, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/

    var eventsRef = firebase.database().ref().child("events");
    // create a synchronized array
    $scope.events = $firebaseArray(eventsRef);

    console.log($scope.events);
    $scope.viewEvent = function(ev){
        selectedEvent = ev.$id;
        console.log(ev);
        $state.go('app.viewEvent');
    };
})

.controller('ViewEventCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk/*, ionicMaterialMotion*/, $firebaseObject, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    /*ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/

    var eventsRef = firebase.database().ref().child("events").child(selectedEvent);
    // create a synchronized array
    $scope.event = $firebaseObject(eventsRef);
    console.log($scope.event);

    $scope.book = function(){
        var numOfSeats = document.getElementById('numOfSeats').value;
        console.log("Seats "+numOfSeats);
    }
})

.controller('SettingsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, /*ionicMaterialMotion,*/ $state) {
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
    /*ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/

    var btnLogout = document.getElementById('logoutButton');
    btnLogout.addEventListener('click', function(e){
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
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });*/



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

.controller('UpgradeHaloCtrl', function($rootScope, $scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
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
    $scope.upgradeHaloBronze= function() {
         var userId = userID;
        return window.open('http://www.gods-web.com/payfast/make-payment.php?item_name=Halo+Bronze&item_description=Halo+Bronze&amount=349.00&m_payment_id=' + userId, '_blank');
    }

     $scope.upgradeHaloSilver= function() {
        var userId = userID;
        return window.open('http://www.gods-web.com/payfast/make-payment.php?item_name=Halo+Silver&item_description=Halo+Silver&amount=599.00&m_payment_id=' + userId, '_blank');
    }
    console.log($rootScope.currentUser);
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

.controller('AddEventCtrl', function($scope, $stateParams, $timeout, /*ionicMaterialMotion,*/ ionicMaterialInk, $firebaseObject, $firebaseArray, $ionicPopup) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
        ionicMaterialInk.displayEffect();
    }, 200);*/

    // Activate ink for controller
    
        $('#fab').hide();

        var eventsRef = firebase.database().ref().child("events");
         // create a synchronized array
        $scope.events = $firebaseArray(eventsRef);

        var ref = firebase.database().ref().child("users").child(userID);
        var userObject = $firebaseObject(ref);
        userObject.$bindTo($scope, "user");

        var eventName = document.getElementById('eventName');
        var eventDesc = document.getElementById('eventDesc');
        var eventDate = document.getElementById('eventDate');
        var eventTime = document.getElementById('eventTime');
        var eventChurch = document.getElementById('eventChurch');
        var eventAddress1 = document.getElementById('eventAddress1');
        var eventAddress2 = document.getElementById('eventAddress2');
        var eventCity = document.getElementById('eventCity');
        var eventProvince = document.getElementById('eventProvince');
        var eventPostalCode = document.getElementById('eventPostalCode');
        var eventCountry = document.getElementById('eventCountry');
        var eventPrice = document.getElementById('eventPrice');

        var uploader = document.getElementById('uploader');
        var fileButton = document.getElementById('fileButton');
        
        var file;
        var imageURL;
        fileButton.addEventListener('change', function(e){
                 file = e.target.files[0];
                var storageRef = firebase.storage().ref('event_graphics/' + file.name);
                var task = storageRef.put(file);
                task.on('state_changed', 
                    function progress(snapshot){
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        uploader.value = percentage;
                    },
                    function error(err){

                    },
                    function complete(){
                            storageRef.getDownloadURL().then(function(url) {
                                imageURL = url;
                            }).catch(function(error) {

                            });
                    }
                );
        });

    $scope.newEvent = function(){
        $scope.events.$add({
            eventName : eventName.value,
            eventDesc : eventDesc.value,
            eventDate : eventDate.value,
            eventTime : eventTime.value,
            eventChurch : eventChurch.value,
            eventAddress1 : eventAddress1.value,
            eventAddress2 : eventAddress2.value,
            eventCity : eventCity.value,
            eventProvince : eventProvince.value,
            eventPostalCode : eventPostalCode.value,
            eventCountry : eventCountry.value,
            eventPrice : eventPrice.value,
            userID: userID,
            username: userObject.username,
            image: imageURL,
            attendees: []
        }).then( function(ref){
            $ionicPopup.alert({
                title: 'Success!',
                template: 'Event successfully added!'
            });
        });
    }





})

.controller('EditProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebaseObject) {
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

    var ref = firebase.database().ref().child("users").child(userID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");

    var usernameInput = document.getElementById("username");
    var fullNameInput = document.getElementById("fullName");
    var churchInput = document.getElementById("church");
    var aboutInput = document.getElementById("about");

    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');
        
    var file;
    var imageURL;
    userObject.$loaded().then(function(){
            imageURL = userObject.profilePicURL;
            console.log(imageURL);
    });

    fileButton.addEventListener('change', function(e){
            file = e.target.files[0];
            var storageRef = firebase.storage().ref('user/' + userID + "/" + file.name);
            var task = storageRef.put(file);
            task.on('state_changed', 
                function progress(snapshot){
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploader.value = percentage;
                },
                function error(err){
                },
                function complete(){
                        storageRef.getDownloadURL().then(function(url) {
                            imageURL = url;
                        }).catch(function(error) {

                        });
                }
            );
    });

    $scope.saveChanges = function(){
        $scope.user.username = usernameInput.value;
        $scope.user.name = fullNameInput.value;
        $scope.user.church = churchInput.value;
        $scope.user.about = aboutInput.value;
        $scope.user.profilePicURL = imageURL;
    }

    
})

.controller('ViewUserCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $firebaseObject, $firebaseArray) {
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

    var ref = firebase.database().ref().child("users").child(otherUserID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");


    var postsRef = firebase.database().ref().child("posts");
    // create a synchronized array
    $scope.posts = $firebaseArray(postsRef);

    var usersRef = firebase.database().ref().child("users");
    // create a synchronized array
    var users = $firebaseArray(usersRef);

    users.$loaded().then( function(){

        $scope.posts.$loaded()
            .then(function(){
                angular.forEach($scope.posts, function(post) {
                    console.log(post);
                    post.username = users.$getRecord(post.userID).username;
                    post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                    post.amen =  $.map(post.amen, function(value, index) {
                                    return [value];
                    });
                    post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                    return [value];
                    });
                    post.touch =  $.map(post.touch, function(value, index) {
                                    return [value];
                    });
                   
            })
        });

    });

    $scope.viewUserProfile = function(uid){
        otherUserID = uid;
        if(uid == userID)
            $state.go('app.profile');
        else
            $state.go('app.view_user');
    }

    $scope.amen = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("amen");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.hallelujah = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("hallelujah");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.touch = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("touch");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }


    function loadObjects(){
            users.$loaded().then( function(){

            $scope.posts.$loaded()
                .then(function(){
                    angular.forEach($scope.posts, function(post) {
                        console.log(post);
                        post.username = users.$getRecord(post.userID).username;
                        post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                        post.amen =  $.map(post.amen, function(value, index) {
                                        return [value];
                        });
                        post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                        return [value];
                        });
                        post.touch =  $.map(post.touch, function(value, index) {
                                        return [value];
                        });
                    
                })
            });

        });
    }


    //Following:

    var followRef = firebase.database().ref().child("following");
    $scope.follow = $firebaseArray(followRef);

    $scope.followUser = function(){

        $scope.follow.$add({
            follower : userID,
            followee: otherUserID
        });
        alert("You are now following...");
    }

    //Followers:
    var query = followRef.orderByChild("followee").equalTo(otherUserID);
    $scope.followers = $firebaseArray(query);

    //Following:
    var query = followRef.orderByChild("follower").equalTo(otherUserID);
    $scope.following = $firebaseArray(query);
    

})

.controller('PassageCtrl', function($scope, $state,$stateParams, $timeout, /*ionicMaterialMotion,*/ ionicMaterialInk, $firebaseObject, $firebaseArray) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    /*$timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
        ionicMaterialInk.displayEffect();
    }, 200);*/

    // Activate ink for controller
    
    var ref = firebase.database().ref().child("users").child(userID);
    var userObject = $firebaseObject(ref);
    userObject.$bindTo($scope, "user");

    var postsRef = firebase.database().ref().child("posts");
    // create a synchronized array
    $scope.posts = $firebaseArray(postsRef);
    
    //getPostInfo

    var usersRef = firebase.database().ref().child("users");
    var users = $firebaseArray(usersRef);
    
    userObject.$loaded().then( function(){
                    users.$loaded().then( function(){

                $scope.posts.$loaded()
                    .then(function(){
                        angular.forEach($scope.posts, function(post) {
                            console.log(post);
                            post.username = users.$getRecord(post.userID).username;
                            post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                            post.amen =  $.map(post.amen, function(value, index) {
                                            return [value];
                            });
                            post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                            return [value];
                            });
                            post.touch =  $.map(post.touch, function(value, index) {
                                            return [value];
                            });
                        
                    })
                });

            });
    });


    $scope.viewUserProfile = function(uid){
        otherUserID = uid;
        if(uid == userID)
            $state.go('app.profile');
        else
            $state.go('app.view_user');
    }

    $scope.amen = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("amen");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.hallelujah = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("hallelujah");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }

    $scope.touch = function(pst){
        console.log(pst.$id);
        var key  = pst.$id;
        var selectedPostRef =  firebase.database().ref().child("posts").child(key).child("touch");
        $scope.selectedPost = $firebaseArray(selectedPostRef);
        $scope.selectedPost.$add({
            user: userID
        });
        loadObjects();
    }


    function loadObjects(){
            users.$loaded().then( function(){

            $scope.posts.$loaded()
                .then(function(){
                    angular.forEach($scope.posts, function(post) {
                        console.log(post);
                        post.username = users.$getRecord(post.userID).username;
                        post.userProfilePic = users.$getRecord(post.userID).profilePicURL;
                        post.amen =  $.map(post.amen, function(value, index) {
                                        return [value];
                        });
                        post.hallelujah =  $.map(post.hallelujah, function(value, index) {
                                        return [value];
                        });
                        post.touch =  $.map(post.touch, function(value, index) {
                                        return [value];
                        });
                    
                })
            });

        });
    }

    

})

;
