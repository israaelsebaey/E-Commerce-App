// select Elements
var username=document.getElementById('username');
var password=document.getElementById('password');
var loginBtn=document.getElementById('loginBtn');

function Warning(){
    Swal.fire({
        icon: 'warning',
        title: 'Please Fill Data!',
        confirmButtonColor: "#facea8",
        iconColor:"#facea8",
      })
}
function Fail(){
    Swal.fire({
        icon: 'error',
        title: 'Wrong user name or password!',
        confirmButtonColor: "#d14a60",
        iconColor:"#d14a60",
      })
}
function Success(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
          popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
      })
      Toast.fire({
        icon: 'success',
        title: 'Success'
      })
}
loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    // get data from local storage
    var data=JSON.parse(localStorage.getItem('data')); //array of objects
    console.log(data);
    var userValue=username.value.trim();
    var passwordValue=password.value.trim();
    if(userValue===''||passwordValue===''){
        Warning();
    }
    else{
       var flag;
       for(var i=0;i<data.length;i++){
         if(data[i].userValue===userValue && data[i].passwordValue===passwordValue){
            localStorage.setItem('loginData',JSON.stringify(userValue));
            Success();
            setTimeout(function(){
                window.location='index.html';
            },2000)
            flag=true;
            break;
         }
       }
       if(!flag){
        Fail();
       }
    }
})

    
    












