const firebaseConfig = {
    apiKey: "AIzaSyD22caki0Faq_SvkK_hEb6Hzbo1xUzARSY",
    authDomain: "cse327-22a1f.firebaseapp.com",
    projectId: "cse327-22a1f",
    storageBucket: "cse327-22a1f.appspot.com",
    messagingSenderId: "655530972906",
    appId: "1:655530972906:web:1aaa3af6ab53c85b14a993",
    measurementId: "G-9MVFM433J4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.getElementById("sign-up-form").addEventListener("submit", function(event){
    event.preventDefault()
});

const auth = firebase.auth();

function loginDataActor(email, password, cb = () => {}){
    auth.createUserWithEmailAndPassword(email, password).then(() => {
        cb(true);
    }).catch((error) => {
        cb(false, error);
        console.log("error: ")
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    }).finally(() => {
        alert("Form Submited");
    });
}


function loginData() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    loginDataActor(email, password);
}