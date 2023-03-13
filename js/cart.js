var items=document.getElementById('cart-items');
var imgCart=document.getElementById('imgCart');
var cartNums=document.getElementById('cartNums');
var price=document.getElementById('price');
var btnBuy=document.getElementById('btnBuy');
var tableHeader=document.getElementById('tableHeader');
var btnBack=document.getElementById('btnBack');

cartNums.innerHTML=JSON.parse(localStorage.getItem('counter'));
price.innerHTML=`<strong>total: </strong>$${JSON.parse(localStorage.getItem('totalPrice'))}`;

var productsArr=JSON.parse(localStorage.getItem('cartProducts'))||[];
var count=JSON.parse(localStorage.getItem('counter'))||0;
//==========DISPLAY======================================
function display(){
    var result='';
    for(let item of productsArr){
        result+=`
                <tr>
                    <td><img src='${item.image}'/></td>
                    <td>${item.name}</td>
                    <td>${item.amount}</td>
                </tr>`     
     }
     items.innerHTML=result;
     if(items.children.length!==0){
        imgCart.style.display='none';
        btnBuy.style.display='block';
        btnBack.style.display='none';
     }
     else{
         imgCart.style.display='block';
         btnBuy.style.display='none';
         btnBack.style.display='block';
         price.innerHTML=``;
         cartNums.innerHTML='0';
         tableHeader.style.display='none';
     }
 }
 display();
//====================BUY======================================
btnBuy.addEventListener('click',function(){
    var res=confirm('Are You Sure? Buy All these Products');
    if(res){
        localStorage.removeItem('cartProducts');
        localStorage.removeItem('counter');
        localStorage.removeItem('totalPrice');
        location.reload();
        display();
    }
})
btnBack.addEventListener('click',function(e){
    e.preventDefault();
    setTimeout(function(){
       window.location='index.html'
    },500)
})