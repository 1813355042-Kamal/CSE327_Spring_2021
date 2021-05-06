
function persistentlogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.

        var userEmail = document.getElementById("email_field").value;
        var userPass = document.getElementById("password_field").value;

        return firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(usr_){
            window.location.href = 'map.html';
        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Unexpected error in persistent login");
    });
}
function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(usr_){
        window.location.href = 'map.html';
    }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage);
    });
}

function logout(){
  firebase.auth().signOut();
}
