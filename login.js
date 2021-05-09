    /** This function ensures that the user stays logged in when the website is closed. */
    function persistentLogin() {
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

    /** This function enables the user to log in to his/her existing account on the database. */
    function loginActor(userEmail, userPass, cb = () => {}) {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(usr_){
            //This will log the user in to the website and redirect to the map.
            window.location.href = 'map.html';

            cb(true);

        }).catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);

            cb(false);

        });
    }

    function loginFunction() {
        var userEmail = document.getElementById("email_field").value;
        var userPass = document.getElementById("password_field").value;

        loginActor(userEmail, userPass);
    }

    /** This function enables the user to log out of the website. */
    function logOut(cb = () => {}) {
        window.location.href = 'index.html';

        firebase.auth().signOut().then(() => {
            cb(true);
        }).catch((error) => {
            cb(false, error);
        });
    }
