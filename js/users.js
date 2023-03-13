// select elements
var userName=document.getElementById('username');
var loginBtn=document.getElementById('loginBtn');
var logoutBtn=document.getElementById('logoutBtn');
// get login data from localstorage
var user=JSON.parse(localStorage.getItem('loginData'));
if(localStorage.getItem('loginData')){ //it mean if local storage have a value
    userName.innerHTML=user;
    logoutBtn.style.display='block';
}
else{
    loginBtn.style.display='block';
}
loginBtn.addEventListener('click',function(e){
    e.preventDefault();
    window.location='login.html'
})
logoutBtn.addEventListener('click',function(e){
    e.preventDefault();
    window.location='login.html';
    localStorage.removeItem('loginData');
})