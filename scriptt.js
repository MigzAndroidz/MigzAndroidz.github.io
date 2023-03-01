function auth(){
            var email = document.getElementById("Email");
            var password = document.getElementById("Password");
            if( email.value == "migzcayetano23@gmail.com" && password.value == "Janelle Legaspi"){
                alert("Login Success! ");
                window.location.assign("./index.html");
            }
            else{
                alert("Invalid");
            }
        }
