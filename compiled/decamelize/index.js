(()=>{"use strict";var e={159:e=>{const handlePreserveConsecutiveUppercase=(e,r)=>{e=e.replace(/((?<![\p{Uppercase_Letter}\d])[\p{Uppercase_Letter}\d](?![\p{Uppercase_Letter}\d]))/gu,(e=>e.toLowerCase()));return e.replace(/(\p{Uppercase_Letter}+)(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,((e,t,p)=>t+r+p.toLowerCase()))};e.exports=(e,{separator:r="_",preserveConsecutiveUppercase:t=false}={})=>{if(!(typeof e==="string"&&typeof r==="string")){throw new TypeError("The `text` and `separator` arguments should be of type `string`")}if(e.length<2){return t?e:e.toLowerCase()}const p=`$1${r}$2`;const a=e.replace(/([\p{Lowercase_Letter}\d])(\p{Uppercase_Letter})/gu,p);if(t){return handlePreserveConsecutiveUppercase(a,r)}return a.replace(/(\p{Uppercase_Letter})(\p{Uppercase_Letter}\p{Lowercase_Letter}+)/gu,p).toLowerCase()}}};var r={};function __nccwpck_require__(t){var p=r[t];if(p!==undefined){return p.exports}var a=r[t]={exports:{}};var _=true;try{e[t](a,a.exports,__nccwpck_require__);_=false}finally{if(_)delete r[t]}return a.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var t=__nccwpck_require__(159);module.exports=t})();