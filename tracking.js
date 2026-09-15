(function(){
  // ↓ 現在のGoogle Apps Script Web App URLを貼ってください
  const ENDPOINT="https://script.google.com/macros/s/AKfycbzC5S7D8P8CwiHbCl76qBPPGOw0oRL6j8AO50epB04H64fBl_IviR8VAgFjF-0CWzRW/exec";

  if(!ENDPOINT || ENDPOINT.includes("PASTE_CURRENT")) return;

  let vid = localStorage.getItem("bets_visitor_id");
  if(!vid){
    vid = (crypto.randomUUID ? crypto.randomUUID() :
      "v-" + Date.now() + "-" + Math.random().toString(36).slice(2));
    localStorage.setItem("bets_visitor_id", vid);
  }

  function send(eventName, extra){
    try{
      const bet = document.body?.dataset?.bet || "home";
      const q = new URLSearchParams({
        event:eventName,
        bet:bet,
        page:location.pathname,
        ref:document.referrer || "",
        ts:String(Date.now()),
        vid:vid,
        ...(extra || {})
      });
      const img = new Image();
      img.referrerPolicy = "no-referrer";
      img.src = ENDPOINT + (ENDPOINT.includes("?") ? "&" : "?") + q.toString();
    }catch(e){}
  }

  window.BETS_TRACK = send;
  window.addEventListener("load", ()=>send("page_view"));
})();