(function(){
const ENDPOINT="https://script.google.com/macros/s/AKfycbzC5S7D8P8CwiHbCl76qBPPGOw0oRL6j8AO50epB04H64fBl_IviR8VAgFjF-0CWzRW/exec";
if(!ENDPOINT||ENDPOINT.includes("PASTE_GOOGLE"))return;
function send(eventName,extra){
  try{
    const bet=document.body?.dataset?.bet||"home";
    const q=new URLSearchParams({
      event:eventName,bet:bet,page:location.pathname,
      ref:document.referrer||"",ts:String(Date.now()),...(extra||{})
    });
    const img=new Image();
    img.referrerPolicy="no-referrer";
    img.src=ENDPOINT+(ENDPOINT.includes("?")?"&":"?")+q.toString();
  }catch(e){}
}
window.BETS_TRACK=send;
window.addEventListener("load",function(){
  send("page_view");
  document.querySelectorAll("button").forEach(el=>el.addEventListener("click",()=>send("tool_run",{label:(el.textContent||"").trim().slice(0,80)})));
  document.querySelectorAll(".btn").forEach(el=>el.addEventListener("click",()=>send("cta_click",{label:(el.textContent||"").trim().slice(0,80)})));
});
})();