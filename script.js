const products = [
 {id:'p1',name:'Zinger Burger',price:350,desc:'Crispy chicken fillet, lettuce and signature sauce.',img:'https://images.deliveryhero.io/image/fd-pk/products/23199090.jpg?width=700',tag:'BESTSELLER'},
 {id:'p2',name:'Zinger Shawarma',price:280,desc:'Crunchy zinger strips wrapped with creamy sauce.',img:'https://tb-static.uber.com/prod/image-proc/processed_images/83caef6d6e400cd60e974356d754772a/df577d3a0807d3bb859f2fb53aefcd86.jpeg',tag:'POPULAR'},
 {id:'p3',name:'Chicken Shawarma',price:220,desc:'Seasoned chicken, fresh salad and garlic mayo.',img:'https://tb-static.uber.com/prod/image-proc/processed_images/83caef6d6e400cd60e974356d754772a/df577d3a0807d3bb859f2fb53aefcd86.jpeg',tag:'FRESH'},
 {id:'p4',name:'Chicken Burger',price:250,desc:'Juicy chicken patty in a soft toasted bun.',img:'https://images.deliveryhero.io/image/fd-pk/Products/11837131.jpg?width=700',tag:'FAVOURITE'},
 {id:'p5',name:'Shami Burger',price:180,desc:'Desi shami patty with chutney and fresh salad.',img:'https://images.deliveryhero.io/image/fd-pk/LH/v7ng-listing.jpg',tag:'DESI PICK'},
 {id:'p6',name:'Loaded Fries',price:300,desc:'Golden fries topped with sauces and cheesy goodness.',img:'https://images.deliveryhero.io/image/fd-pk/LH/vasg-listing.jpg',tag:'LOADED'},
 {id:'p7',name:'Cheese Shawarma',price:320,desc:'Chicken shawarma filled with melted cheese.',img:'https://tb-static.uber.com/prod/image-proc/processed_images/83caef6d6e400cd60e974356d754772a/df577d3a0807d3bb859f2fb53aefcd86.jpeg',tag:'CHEESY'},
 {id:'p8',name:'Patty Burger',price:200,desc:'Classic patty burger with fresh crunchy toppings.',img:'https://images.deliveryhero.io/image/fd-pk/Products/11837131.jpg?width=700',tag:'CLASSIC'},
 {id:'p9',name:'Cheese Burger',price:380,desc:'A juicy burger layered with rich melted cheese.',img:'https://images.deliveryhero.io/image/fd-pk/LH/v7ng-listing.jpg',tag:'CHEESE LOVER'},
 {id:'p10',name:'Pizza Fries',price:350,desc:'Crispy fries with pizza-style sauce and cheese.',img:'https://images.deliveryhero.io/image/fd-pk/LH/vasg-listing.jpg',tag:'HOT PICK'},
 {id:'p11',name:'Chicken Nuggets',price:300,desc:'Golden crunchy chicken bites with dipping sauce.',img:'https://images.deliveryhero.io/image/fd-bd/LH/tdjl-listing.jpg',tag:'CRUNCHY'},
 {id:'p12',name:'Club Sandwich',price:400,desc:'Triple-layer sandwich with chicken and fresh salad.',img:'https://images.deliveryhero.io/image/fd-pk/LH/v7ng-listing.jpg',tag:'FILLING'},
 {id:'p13',name:'Mayo Garlic Fries',price:280,desc:'Crispy fries drizzled with creamy garlic mayo.',img:'https://images.deliveryhero.io/image/fd-pk/LH/vasg-listing.jpg',tag:'SAUCY'},
 {id:'p14',name:'Crispy Chicken',price:320,desc:'Juicy chicken pieces with a crunchy golden coating.',img:'https://images.deliveryhero.io/image/fd-pk/products/23199090.jpg?width=700',tag:'CRISPY'},
 {id:'p15',name:'Chicken Cheese Roll',price:250,desc:'Warm roll stuffed with chicken and melted cheese.',img:'https://tb-static.uber.com/prod/image-proc/processed_images/83caef6d6e400cd60e974356d754772a/df577d3a0807d3bb859f2fb53aefcd86.jpeg',tag:'ROLLS'},
 {id:'p16',name:'Beef Burger',price:420,desc:'Hearty beef-style burger with fresh toppings.',img:'https://images.deliveryhero.io/image/fd-pk/LH/vasg-listing.jpg',tag:'RICH TASTE'},
 {id:'p17',name:'Chicken Tikka Burger',price:300,desc:'Spicy tikka chicken with creamy sauce in a bun.',img:'https://images.deliveryhero.io/image/fd-pk/Products/11837131.jpg?width=700',tag:'SPICY'},
 {id:'p18',name:'Cold Drink',price:100,desc:'A chilled drink to complete your meal.',img:'https://images.deliveryhero.io/image/fd-bd/LH/tdjl-listing.jpg',tag:'CHILLED'}
];
const deals = [
 {id:'d1',name:'Zinger Meal Deal',price:550,desc:'1 Zinger Burger + Regular Fries + Cold Drink',img:'https://images.deliveryhero.io/image/fd-pk/products/23199090.jpg?width=800',tag:'SAVE RS. 50'},
 {id:'d2',name:'Shawarma Duo Deal',price:580,desc:'2 Chicken Shawarmas + 2 Cold Drinks',img:'https://tb-static.uber.com/prod/image-proc/processed_images/83caef6d6e400cd60e974356d754772a/df577d3a0807d3bb859f2fb53aefcd86.jpeg',tag:'FOR TWO'},
 {id:'d3',name:'Friends Feast',price:1150,desc:'2 Zinger Burgers + Loaded Fries + 2 Cold Drinks',img:'https://images.deliveryhero.io/image/fd-pk/LH/v7ng-listing.jpg',tag:'BEST VALUE'}
];
const catalog=[...products,...deals];
const cart={};
const money=n=>'Rs. '+n.toLocaleString('en-PK');
const menuGrid=document.getElementById('menuGrid');
const dealGrid=document.getElementById('dealGrid');
const cartCount=document.getElementById('cartCount');
const cartItems=document.getElementById('cartItems');
const cartTotal=document.getElementById('cartTotal');
const modal=document.getElementById('cartModal');
let toastTimer;

function getRatings(){
 try{return JSON.parse(localStorage.getItem('alAzizRatings')||'{}');}catch(e){return {};}
}
function getProductRating(id){
 const list=getRatings()[id]||[];
 if(!list.length)return {average:0,count:0};
 return {average:list.reduce((sum,r)=>sum+r.stars,0)/list.length,count:list.length};
}
function rateProduct(id,stars){
 const all=getRatings();
 const list=all[id]||[];
 const existing=list.findIndex(r=>r.voter==='this-browser');
 const review=prompt('Write a short review (optional):')||'';
 const entry={stars,review:review.trim(),voter:'this-browser',date:new Date().toISOString()};
 if(existing>=0)list[existing]=entry;else list.push(entry);
 all[id]=list;
 try{localStorage.setItem('alAzizRatings',JSON.stringify(all));}catch(e){alert('Could not save rating in this browser.');}
 renderMenu(document.getElementById('productSearch')?.value||'');
}
function renderMenu(query=''){
 const q=query.trim().toLowerCase();
 const visible=products.filter(p=>`${p.name} ${p.desc} ${p.tag}`.toLowerCase().includes(q));
 const count=document.getElementById('menuCount');
 if(count)count.textContent=`${visible.length} of ${products.length} choices`;
 const message=document.getElementById('searchMessage');
 if(message)message.textContent=q?`${visible.length} matching product${visible.length===1?'':'s'} found.`:'Search our menu by product name.';
 if(!visible.length){
  menuGrid.innerHTML='<div class="no-results">😕 No products found. Try another search.</div>';
  return;
 }
 const ratings=getRatings();
 menuGrid.innerHTML=visible.map(p=>{
  const rating=getProductRating(p.id);
  const own=(ratings[p.id]||[]).find(r=>r.voter==='this-browser');
  const stars=[1,2,3,4,5].map(n=>`<button type="button" class="${own&&n<=own.stars?'active':''}" aria-label="Rate ${p.name} ${n} stars" title="${n} star${n>1?'s':''}" onclick="rateProduct('${p.id}',${n})">★</button>`).join('');
  const latest=(ratings[p.id]||[]).filter(r=>r.review).slice(-1)[0];
  return `<article class="food-card">
   <div class="food-image"><img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.deliveryhero.io/image/fd-pk/products/23199090.jpg?width=700'"><span class="food-label">${p.tag}</span></div>
   <div class="food-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="food-bottom"><span class="food-price">${money(p.price)} <small>/ item</small></span><button class="add-button" onclick="addToCart('${p.id}')">＋ Add to Cart</button></div>
    <div class="rating-area"><div class="rating-summary"><strong>${rating.count?rating.average.toFixed(1)+' ★':'No rating yet'}</strong><span>(${rating.count} ${rating.count===1?'rating':'ratings'})</span></div><div class="rating-stars" aria-label="Rate ${p.name}">${stars}</div><div class="rating-hint">${own?'Your rating: '+own.stars+'/5 — tap to update':'Tap a star to rate this product'}</div>${latest?`<div class="rating-review">“${escapeHTML(latest.review)}”</div>`:''}</div>
   </div>
  </article>`;
 }).join('');
}
function renderDeals(query=''){
 const q=query.trim().toLowerCase();
 const visible=deals.filter(d=>`${d.name} ${d.desc} ${d.tag}`.toLowerCase().includes(q));
 if(!visible.length){dealGrid.innerHTML='<div class="no-results">No matching deals found.</div>';return;}
 const ratings=getRatings();
 dealGrid.innerHTML=visible.map(d=>{
  const rating=getProductRating(d.id);
  const own=(ratings[d.id]||[]).find(r=>r.voter==='this-browser');
  const stars=[1,2,3,4,5].map(n=>`<button type="button" class="${own&&n<=own.stars?'active':''}" aria-label="Rate ${d.name} ${n} stars" title="${n} star${n>1?'s':''}" onclick="rateProduct('${d.id}',${n})">★</button>`).join('');
  const latest=(ratings[d.id]||[]).filter(r=>r.review).slice(-1)[0];
  return `<article class="deal-card">
   <div class="deal-image"><img src="${d.img}" alt="${d.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.deliveryhero.io/image/fd-pk/LH/vasg-listing.jpg'"><span class="deal-ribbon">${d.tag}</span></div>
   <div class="deal-info"><h3>${d.name}</h3><p>${d.desc}</p><div class="deal-foot"><span class="deal-price">${money(d.price)}<small>COMBO PRICE</small></span><button class="deal-add" onclick="addToCart('${d.id}')">＋ Add Deal</button></div>
    <div class="rating-area deal-rating"><div class="rating-summary"><strong>${rating.count?rating.average.toFixed(1)+' ★':'No rating yet'}</strong><span>(${rating.count} ${rating.count===1?'rating':'ratings'})</span></div><div class="rating-stars">${stars}</div><div class="rating-hint">${own?'Your rating: '+own.stars+'/5 — tap to update':'Tap a star to rate this deal'}</div>${latest?`<div class="rating-review">“${escapeHTML(latest.review)}”</div>`:''}</div>
   </div>
  </article>`;
 }).join('');
}
function addToCart(id){
 cart[id]=(cart[id]||0)+1;renderCart();
 const item=catalog.find(x=>x.id===id);
 document.getElementById('toastTitle').textContent=item.name+' added!';
 document.getElementById('toastText').textContent='Your item is now in the cart.';
 const toast=document.getElementById('toast');toast.classList.add('show');
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];renderCart();}
function renderCart(){
 const ids=Object.keys(cart).filter(id=>cart[id]>0);
 cartCount.textContent=ids.reduce((sum,id)=>sum+cart[id],0);
 if(!ids.length){cartItems.innerHTML='<div class="empty-cart"><span>🛍️</span>Your cart is empty.<br>Add something delicious!</div>';}
 else{cartItems.innerHTML=ids.map(id=>{const p=catalog.find(x=>x.id===id);return `<div class="cart-row"><img src="${p.img}" alt=""><div class="cart-product"><b>${p.name}</b><small>${money(p.price)} each</small></div><div class="quantity"><button onclick="changeQty('${id}',-1)">−</button><b>${cart[id]}</b><button onclick="changeQty('${id}',1)">+</button></div></div>`}).join('');}
 const total=ids.reduce((sum,id)=>sum+catalog.find(x=>x.id===id).price*cart[id],0);
 cartTotal.textContent=money(total);
}
function openCart(){renderCart();modal.classList.add('open');document.body.classList.add('no-scroll');}
function closeCart(){modal.classList.remove('open');document.body.classList.remove('no-scroll');}
document.getElementById('openCart').addEventListener('click',openCart);
document.getElementById('closeCart').addEventListener('click',closeCart);
modal.addEventListener('click',e=>{if(e.target===modal)closeCart();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCart();});
document.getElementById('checkoutButton').addEventListener('click',()=>{
 if(!Object.keys(cart).length){alert('Your cart is empty. Add a product first.');return;}
 document.getElementById('checkoutForm').hidden=false;
 document.getElementById('checkoutButton').hidden=true;
});
document.getElementById('placeOrder').addEventListener('click',()=>{
 const name=document.getElementById('customerName').value.trim();
 const phone=document.getElementById('customerPhone').value.trim();
 const address=document.getElementById('customerAddress').value.trim();
 if(!name||!phone||!address){alert('Please enter your name, phone number and delivery address.');return;}
 const ids=Object.keys(cart);
 if(!ids.length){alert('Your cart is empty.');return;}
 const total=ids.reduce((sum,id)=>sum+catalog.find(x=>x.id===id).price*cart[id],0);
 const order={id:'AZ'+Date.now().toString().slice(-6),name,phone,address,total,items:ids.map(id=>({name:catalog.find(x=>x.id===id).name,qty:cart[id],price:catalog.find(x=>x.id===id).price})),createdAt:new Date().toISOString()};
 try{const saved=JSON.parse(localStorage.getItem('alAzizOrders')||'[]');saved.push(order);localStorage.setItem('alAzizOrders',JSON.stringify(saved));}catch(err){}
 document.getElementById('checkoutForm').hidden=true;
 document.getElementById('cartItems').innerHTML='';
 document.getElementById('cartTotal').textContent=money(total);
 const confirmation=document.getElementById('orderConfirmation');
 confirmation.hidden=false;
 confirmation.innerHTML=`<div class="big-check">🎉</div><h2>Order placed!</h2><p>Thank you, ${escapeHTML(name)}.</p><p>Your order number is <b>${order.id}</b>.</p><p>Your order has been saved in this browser.</p>`;
 Object.keys(cart).forEach(k=>delete cart[k]);renderCart();
 document.getElementById('cartCount').textContent='0';
});
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const productSearch=document.getElementById('productSearch');
if(productSearch)productSearch.addEventListener('input',e=>{
 renderMenu(e.target.value);
 renderDeals(e.target.value);
 const message=document.getElementById('searchMessage');
 if(message){
  const q=e.target.value.trim();
  const matches=products.filter(p=>`${p.name} ${p.desc} ${p.tag}`.toLowerCase().includes(q.toLowerCase())).length
   +deals.filter(d=>`${d.name} ${d.desc} ${d.tag}`.toLowerCase().includes(q.toLowerCase())).length;
  message.textContent=q?`${matches} matching product/deal${matches===1?'':'s'} found.`:'Search our menu and today\'s deals.';
 }
});
renderMenu();renderDeals();renderCart();
