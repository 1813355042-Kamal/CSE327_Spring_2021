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
  function LoginData(){
    
      var firstname = document.getElementById("firstname").value;
      var lastname = document.getElementById("lastname").value;
      var email = document.getElementById("email").value;
      var phonenumber = document.getElementById("phonenumber").value;
      var password = document.getElementById("password").value;
      var address = document.getElementById("address").value;


      auth.createUserWithEmailAndPassword(email, password).catch((error) => {
        console.log("error: ")
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });

      alert("Form Submited");
    
  }