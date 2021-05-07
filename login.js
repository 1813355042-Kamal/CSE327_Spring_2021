
function persistentlogin(){
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
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
    console.log("Fk");
    window.location.href = 'index.html';
    firebase.auth().signOut();
}

function chklogin(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var elems = document.getElementsByClassName("btnDisappearAfterLogin");
            var i=0;
            for(i=0;i<elems.length;i++){
                elems[i].style.visibility="hidden";
            }
        } else {
            var elems = document.getElementsByClassName("btnDisappearAfterLogin");
            var i=0;
            for(i=0;i<elems.length;i++){
                elems[i].style.visibility="visible";
            }
        }
    });
}
