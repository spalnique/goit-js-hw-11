var f=(t,e,s)=>{if(!e.has(t))throw TypeError("Cannot "+s)};var g=(t,e,s)=>(f(t,e,"read from private field"),s?s.call(t):e.get(t)),c=(t,e,s)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,s)},p=(t,e,s,n)=>(f(t,e,"write to private field"),n?n.call(t,s):e.set(t,s),s);var y=(t,e,s)=>(f(t,e,"access private method"),s);import{i as j,S}from"./assets/vendor-5b791d57.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const h of a.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&n(h)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const $="/goit-js-hw-11/assets/rejectedIcon-9956cb73.svg",q="/goit-js-hw-11/assets/izitoast-close-4cebbc46.svg";var i;class O{constructor(e=""){c(this,i,void 0);this.parent=e,p(this,i,"")}add(){p(this,i,document.querySelector(`${this.parent}`).innerHTML),document.querySelector(`${this.parent}`).innerHTML='<div id="spinner-container" style="display:flex; flex-direction:column; gap:15px; align-items:center;"><span class="js-processing-request">Loading images, please wait...</span><span class="loader"></span></div>'}remove(){document.querySelector(`${this.parent}`).innerHTML=g(this,i)}}i=new WeakMap;var l,d,v,m,F;class w{constructor(e=[],s=[""],n=""){c(this,d);c(this,m);c(this,l,void 0);this.parent=n,this.rawData=e,this.cleanData=y(this,d,v).call(this,s),p(this,l,y(this,m,F).call(this))}static testInput(e){return e.trim()?/^[a-z\s]+$/gi.test(e.trim()):!1}renderGallery(){document.querySelector(`${this.parent}`).innerHTML=g(this,l),console.log(this)}}l=new WeakMap,d=new WeakSet,v=function(e){return this.rawData.map(s=>{const n={};return e.forEach(r=>{n[r]=s[r]}),n})},m=new WeakSet,F=function(){return this.cleanData.map(s=>`<li class="js-gallery-item">
        <a class="js-image-container" href="${s.largeImageURL}"><img class="js-item-image" src="${s.webformatURL}" alt="${s.alt}" /></a>
        <ul class="js-item-desc">
          <li class="js-desc-wrapper"><span class="js-desc-prop">Likes</span><span class="js-desc-value">${s.likes}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Views</span><span class="js-desc-value">${s.views}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Comments</span><span class="js-desc-value">${s.comments}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Downloads</span><span class="js-desc-value">${s.downloads}</span></li>
        </ul>
      </li>`).join(`

`)};const o={form:document.querySelector(".js-search-form"),input:document.querySelector(".js-search-input"),container:document.querySelector(".js-gallery")},M="https://pixabay.com/api/",b={key:"42242477-df8643eaa45736c853493b589",image_type:"photo",orientation:"horizontal",safesearch:!0,q:null},L=new O(".js-gallery"),u={class:"js-izitoast-message",titleColor:"#FFFFFF",messageColor:"#FFFFFF",messageSize:"16px",position:"topRight",backgroundColor:"#EF4040",progressBarColor:"#B51B1B",iconUrl:$,close:!1,buttons:[[`<button type="button" style="background-color: transparent;"><img src=${q}></button>`,function(t,e){t.hide({transitionOut:"fadeOut"},e)}]],onOpening:function(t,e){o.container.innerHTML="",o.input.blur(),o.input.addEventListener("focus",()=>{j.hide({transitionOut:"fadeOut"},e)},{once:!0})}};o.form.addEventListener("submit",t=>{if(t.preventDefault(),b.q=o.input.value.trim(),!w.testInput(o.input.value.trim())){u.message='Try something like "kitty", "best friends", "on the Moon" ;)',j.show(u),o.form.reset();return}fetch(`${M}?${new URLSearchParams(b)}`).then(e=>{if(L.add(),!e.ok)throw new Error("Something went wrong!");return e.json()}).then(e=>{if(!e.hits.length){u.message="Sorry, there are no images matching your search query. Please try again!",j.show(u),o.form.reset();return}const s=new w(e.hits,["largeImageURL","webformatURL","alt","likes","views","comments","downloads"],".js-gallery"),n=new S(".js-gallery a",{className:"lightbox-wrapper"});L.remove(),s.renderGallery(),n.refresh(),o.form.reset()}).catch(e=>console.log(e))});
//# sourceMappingURL=commonHelpers.js.map
