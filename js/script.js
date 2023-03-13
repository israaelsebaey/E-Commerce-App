// select elements
var cartNums=document.getElementById('cartNums');
var cartIcon=document.getElementById('cartIcon');
var close=document.getElementById('close')
var price=document.getElementById('price');
//==============DRAWER CONTENT=============================
var drawer=document.getElementById('drawer');
var viewPrd=document.getElementById('viewPrd');
var emptyCart=document.getElementById('emptyCart');
var items=document.getElementById('drawer-items');
/////////////////////////////////////////////////////////////
function Warning(){
    Swal.fire({
        icon: 'info',
        html:
          'You Should Login First! ' +'<br/>'+
          '<a href="login.html" style="text-align:center;color:#3fc3ee !important">Login</a> ',
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText:'OK',
        confirmButtonColor: "#3fc3ee",
      })
} 
function Warning2(){
    Swal.fire({
        html:
        '<h5 style="margin-top:20px">This Item Already Exist!</h5>',
        confirmButtonColor: "#3fc3ee",
    });
}
////////////////////////////////////////////////////////////
//================DRAWER===================================
cartIcon.addEventListener('click',function(){
    drawer.style.right=0;
    setTimeout(function(){
       close.style.right=0;
    },700)
}) 
close.addEventListener('click',function(){
    drawer.style.right='-500px';
    close.style.right='-50px';
})
///////////////////////////////////////////////////////////
// get data and display it
var products=document.getElementById('products');
var out='';
var input='';
function display(){
    fetch('../data/data.json')
    .then(function(res){return res.json()})
    .then(function(data){
        for(let item of data){
            out+= `
                <div class="col-lg-3 col-md-6 col-12 mb-5 product-item">
                    <div class="card">
                        <div class="img-top">
                            <img src="${item.image}" class="card-img-top">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">$${item.price}</p>
                            <input type="number" value="1" id='numberInput' min='1'
                            style='width:40px;margin-bottom:15px'
                            onchange="changeAmount(value)"
                            />
                            <div class="card-icons d-flex justify-content-between">
                                <i class="fas fa-shopping-bag" onclick="addToCart(${item.id})"></i>
                                <i class="far fa-heart"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `
        }
        products.innerHTML=out;
    }) 
} 
display();
//=================ADD TO CART==============================
var inputValue=1;
function changeAmount(v){
    inputValue=v; 
}
var productsArr=JSON.parse(localStorage.getItem('cartProducts'))||[];
var product={};
function addToCart(id){
    if(localStorage.getItem('loginData')){
        fetch('../data/data.json')
        .then(function(res){return res.json()})
        .then(function(data){
          product=data.find(function(item){return item.id===id});
          product.amount=inputValue;
          inputValue=1;
          addToArr(product);
        })  
    }
    else{
        Warning();
    }
}
var count=JSON.parse(localStorage.getItem('counter'))||0;
function addToArr(product){
    var flag=false;
    for(var i=0;i<productsArr.length;i++){
        if(productsArr[i].id===product.id){
           flag=true;
           Warning2();
           break;
        }
    }
    if(!flag){
      productsArr.push(product);
      localStorage.setItem('cartProducts',JSON.stringify(productsArr));
      ++count;
      localStorage.setItem('counter',JSON.stringify(count));
      cartNums.innerHTML=count;
      displayinCart();
    }
}
if(productsArr){
    displayinCart();
    cartNums.innerHTML=count;
    console.log(count);
}
function displayinCart(){
   var totalPrice=0;
   var result='';
   for(let item of productsArr){
       totalPrice+=parseInt(item.price*item.amount);
       localStorage.setItem('totalPrice',JSON.stringify(totalPrice));
       result+=`
        <div class="col-12 d-flex justify-content-between drawer-item mb-3 pt-3 border">
            <div class="img"><img src="${item.image}"/></div>
            <div class="details">
                <h5>${item.name}</h5>
                <p>${item.price}</p>
                <p>${item.amount}</p>
            </div>
            <div class="actions  d-flex justify-content-center align-items-center">
                <i class="fas fa-trash mx-lg-2 mx-0" onclick="deleteItem(${item.id})"></i>
            </div>
        </div>`     
    }
    items.innerHTML=result;
    if(items.children.length!==0){
    viewPrd.style.display='block';
    emptyCart.style.display='none';
    }
    else{
        viewPrd.style.display='none';
        emptyCart.style.display='block';
    }
    price.innerHTML=`<strong>total: </strong>$${totalPrice}`;
}
// ===============DELETE FROM CART===========================
function deleteItem(id){
    var indx=productsArr.map(function(item){
        return item.id
    }).indexOf(id);
    if(indx!=-1){
        productsArr.splice(indx,1);
        localStorage.removeItem('cartProducts');
        localStorage.setItem('cartProducts',JSON.stringify(productsArr));
        count--;
        localStorage.removeItem('counter');
        localStorage.setItem('counter',JSON.stringify(count));
        cartNums.innerHTML=count;
        displayinCart();
    }
}
///////////////////////////////////////////////
viewPrd.addEventListener('click',function(e){
    e.preventDefault();
    setTimeout(function(){
       window.location='cartProducts.html'
    },500)
}) 
