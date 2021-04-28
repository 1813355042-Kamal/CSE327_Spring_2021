<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCaJC-qcxd_8cJYJqkPbTuv2S0tY0r09IU",
    authDomain: "cse327-cf8b5.firebaseapp.com",
    projectId: "cse327-cf8b5",
    storageBucket: "cse327-cf8b5.appspot.com",
    messagingSenderId: "1029376971824",
    appId: "1:1029376971824:web:b070bf1f6ab3237012c9f5",
    measurementId: "G-RGNSVZ35BV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  firebase.analytics();

  function LoginData(){
      var firstname = document.getElementById("firstname");
      var lastname = document.getElementById("lastname");
      var email = document.getElementById("email");
      var phonenumber = document.getElementById("phonenumber");
      var password = document.getElementById("password");
      var address = document.getElementById("address");
      const promise = auth.createUserWithInfo(email.value, password.value);
      promise.catch(e => alert (e.message));
      alert("Signed Up");
  }
</script>