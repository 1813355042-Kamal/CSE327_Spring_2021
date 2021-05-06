
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyD22caki0Faq_SvkK_hEb6Hzbo1xUzARSY",
    authDomain: "cse327-22a1f.firebaseapp.com",
    projectId: "cse327-22a1f",
    storageBucket: "cse327-22a1f.appspot.com",
    messagingSenderId: "655530972906",
    appId: "1:655530972906:web:322fe6fa1351e75814a993",
    measurementId: "G-CW582KX4P7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  const auth = firebase.auth()

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