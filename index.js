function checkValidFileds(){

    let username =document.getElementById("username").value 
    let password =document.getElementById("password").value 
    
    if(username=="abcd" & password =="1234"){
       openLevelPage();
    
    }else{
       alert("User name not found / incorrect Password. User name: abcd Password: 1234" );
    }
    
    }
    
    function openLevelPage(){
    
        window.open("levelPage.html");
    
    }