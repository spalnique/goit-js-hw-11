var f=(s,e,t)=>{if(!e.has(s))throw TypeError("Cannot "+t)};var y=(s,e,t)=>(f(s,e,"read from private field"),t?t.call(s):e.get(s)),c=(s,e,t)=>{if(e.has(s))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(s):e.set(s,t)},j=(s,e,t,n)=>(f(s,e,"write to private field"),n?n.call(s,t):e.set(s,t),t);var g=(s,e,t)=>(f(s,e,"access private method"),t);import{i as u,S as O}from"./assets/vendor-5b791d57.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&n(m)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();const S="/goit-js-hw-11/assets/rejectedIcon-9956cb73.svg",q="/goit-js-hw-11/assets/izitoast-close-4cebbc46.svg";var h;class ${constructor(e=""){c(this,h,void 0);this.parent=e}add(){document.querySelector(this.parent).innerHTML='<div id="spinner-container" style="padding-top: 25px; display:flex; flex-direction:column; gap:15px; align-items:center;"><span class="js-processing-request">Loading images, please wait...</span><span class="loader"></span></div>'}remove(){document.querySelector(this.parent).innerHTML=""}}h=new WeakMap;var l,p,b,d,F;class v{constructor(e=[],t=[""],n=""){c(this,p);c(this,d);c(this,l,void 0);this.parent=n,this.rawData=e,this.cleanData=g(this,p,b).call(this,t),j(this,l,g(this,d,F).call(this))}static testInput(e){return e.trim()?/^[a-z\s]+$/gi.test(e.trim()):!1}renderGallery(){document.querySelector(this.parent).innerHTML=y(this,l),console.log(this)}}l=new WeakMap,p=new WeakSet,b=function(e){return this.rawData.map(t=>{const n={};return e.forEach(r=>{n[r]=t[r]}),n})},d=new WeakSet,F=function(){return this.cleanData.map(t=>`<li class="js-gallery-item">
        <a class="js-image-container" href="${t.largeImageURL}"><img class="js-item-image" src="${t.webformatURL}" alt="${t.tags}" /></a>
        <ul class="js-item-desc">
          <li class="js-desc-wrapper"><span class="js-desc-prop">Likes</span><span class="js-desc-value">${t.likes}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Views</span><span class="js-desc-value">${t.views}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Comments</span><span class="js-desc-value">${t.comments}</span></li>
          <li class="js-desc-wrapper"><span class="js-desc-prop">Downloads</span><span class="js-desc-value">${t.downloads}</span></li>
        </ul>
      </li>`).join(`

`)};const a={form:document.querySelector(".js-search-form"),input:document.querySelector(".js-search-input"),container:document.querySelector(".js-gallery")},M="https://pixabay.com/api/",w={key:"42242477-df8643eaa45736c853493b589",image_type:"photo",orientation:"horizontal",safesearch:!0,q:null},L=new $(".js-gallery"),i={class:"js-izitoast-message",titleColor:"#FFFFFF",messageColor:"#FFFFFF",messageSize:"16px",position:"topRight",displayMode:"replace",pauseOnHover:!1,iconUrl:S,close:!1,buttons:[[`<button type="button" style="background-color: transparent;"><img src=${q}></button>`,function(s,e){s.hide({transitionOut:"fadeOut"},e)}]],onOpening:function(s,e){a.container.innerHTML="",a.input.blur(),a.input.addEventListener("focus",()=>{u.hide({transitionOut:"fadeOut"},e)},{once:!0})},onClosed:function(s,e){a.input.removeEventListener("focus",()=>{u.hide({transitionOut:"fadeOut"},e)},{once:!0})}};a.input.addEventListener("input",s=>{/^[a-z\s]+$/gi.test(s.target.value)||setTimeout(()=>{s.target.value=s.target.value.slice(0,-1)},100)});a.form.addEventListener("submit",s=>{if(s.preventDefault(),w.q=a.input.value.trim(),!v.testInput(a.input.value.trim())){i.message='Try something like "kitty", "best friends", "on the Moon" ;)',i.backgroundColor="#e0c34c",i.progressBarColor="#f7e28b",a.form.classList.add("centered"),u.show(i),a.form.reset();return}a.form.classList.remove("centered"),L.add(),fetch(`${M}?${new URLSearchParams(w)}`).then(e=>{if(!e.ok)throw new Error("Something went wrong!");return e.json()}).then(e=>{if(!e.hits.length){i.message="Sorry, there are no images matching your search query. Please try again!",i.backgroundColor="#EF4040",i.progressBarColor="#B51B1B",u.show(i),a.form.classList.add("centered"),a.form.reset();return}const t=new v(e.hits,["largeImageURL","webformatURL","tags","likes","views","comments","downloads"],".js-gallery"),n=new O(".js-gallery a",{className:"lightbox-wrapper"});L.remove(),a.form.classList.remove("centered"),t.renderGallery(),n.refresh(),a.form.reset()}).catch(e=>console.log(e))});
//# sourceMappingURL=commonHelpers.js.map
