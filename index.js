import{a as y,S as g,i as u}from"./assets/vendor-KnZd4sWe.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const h="48897668-7102e16b6983a9d2c1f1ac079",p="https://pixabay.com/api/";async function d(r,t=1,s=40){try{return(await y.get(p,{params:{key:h,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:s,page:t}})).data}catch(a){return console.error("Error fetching images:",a),null}}const f=document.querySelector(".gallery"),L=new g(".gallery a");function m(r){const t=r.map(s=>`
      <a href="${s.largeImageURL}" class="gallery-item">
        <img src="${s.webformatURL}" alt="${s.tags}" loading="lazy" />
      </a>
    `).join("");f.insertAdjacentHTML("beforeend",t),L.refresh()}function b(){f.innerHTML=""}const S=document.querySelector("#search-form");document.querySelector(".gallery");const l=document.querySelector("#load-more");let n="",i=1;S.addEventListener("submit",async r=>{if(r.preventDefault(),n=r.target.elements.searchQuery.value.trim(),i=1,b(),n){const t=await d(n,i);t&&t.hits.length>0?(m(t.hits),l.classList.remove("hidden")):u.error({message:"Sorry, no images found!"})}});l.addEventListener("click",async()=>{i+=1;const r=await d(n,i);r&&r.hits.length>0?m(r.hits):(l.classList.add("hidden"),u.info({message:"We're sorry, but you've reached the end of search results."}))});
//# sourceMappingURL=index.js.map
