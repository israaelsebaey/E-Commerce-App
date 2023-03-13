// select elements
var inputGroup=document.getElementsByClassName('input-group');
var username=document.getElementById('username');
var email=document.getElementById('email');
var password=document.getElementById('password');
var cpassword=document.getElementById('cpassword');
var registerBtn=document.getElementById('registerBtn');

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
var patterns={
    userName:/^[a-z\d]{3,20}$/i,
    email:/^([a-z\d\.]+)@([a-z]+)\.([a-z]{2,5})$/,
    password:/^[\w!@#$%^&*]{8,20}$/,
}
function validate(inputV,regex){
    return regex.test(inputV);
}
function setError(input,message){
    var parent=input.parentElement;
    parent.classList.add('err');
    parent.classList.remove('success');
    parent.children[4].innerHTML=message;
}
function setSuccess(input){
    var parent=input.parentElement;
    parent.classList.add('success');
    parent.classList.remove('err');
}
var arrdata=JSON.parse((localStorage.getItem('data')))||[];
var objData={};
registerBtn.addEventListener('click',function(e){
    e.preventDefault();
    var userValue=username.value.trim();
    var emailValue=email.value.trim();
    var passwordValue=password.value.trim();
    var cpasswordValue=cpassword.value.trim();
    // check on user name
    if(userValue===''){setError(username,'user name should not be empty!')}
    else if(!(validate(userValue,patterns.userName))){setError(username,'user name must be alphanumeric and length between(3-20)')}
    else{setSuccess(username)}
    // check on email
    if(emailValue===''){setError(email,'email should not be empty!')}
    else if(!(validate(emailValue,patterns.email))){setError(email,'email must be like : name@example.com')}
    else{setSuccess(email)}
    // check on password
    if(passwordValue===''){setError(password,'password should not be empty!')}
    else if(!(validate(passwordValue,patterns.password))){setError(password,'password must be alphanumeric, special chars and length between(8-20)')}
    else{setSuccess(password)}
    // check on confirm password
    if(cpasswordValue===''){setError(cpassword,'confirm password should not be empty!')}
    else if(cpasswordValue!==passwordValue){setError(cpassword,'confirm password does not match')}
    else{setSuccess(cpassword);}
    // save data in localstorage
    if(userValue!==''&&emailValue!==''&&passwordValue!==''&&cpasswordValue!==''){
        if((validate(userValue,patterns.userName))&&
           (validate(emailValue,patterns.email))&&
           (validate(passwordValue,patterns.password))&&
           (cpasswordValue===passwordValue)
           ){
            arrdata.push({userValue,emailValue,passwordValue});
            localStorage.setItem('data',JSON.stringify(arrdata));
            setTimeout(Success,1000);
            setTimeout(function(){
               window.location='login.html';
            },4000)           
        }
    }  
})
