function auth(){
            var email = document.getElementById("Email");
            var password = document.getElementById("Password");
            if( email.value == "migzcayetano23@gmail.com" && password.value == "Janelle Legaspi"){
                alert("Login Success! ");
                window.location.replace("./index.html");
            }
            else{
                alert("Invalid");
            }
        }
