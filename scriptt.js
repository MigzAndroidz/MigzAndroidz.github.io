function auth(){
            var Email =document.getElementById("Email").value;
            var Password = document.getElementById("Password").value;
            if(Email== "migzcayetano23@gmail.com " && Password== "Janelle Legaspi"){
                window.location.assign("index.html");
                alert("Login Success! ");
            }
            else{
                alert("Invalid");
                return;
            }
        }
