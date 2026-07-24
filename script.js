const W = window.WEDDING;
const $ = s => document.querySelector(s);
const set = (s,v) => { const el=$(s); if(el) el.textContent=v; };

set("#firstName",W.couple.first); set("#secondName",W.couple.second);
set("#verseText",W.verse.text); set("#verseRef",W.verse.reference);
set("#verseText2",W.verse.text); set("#verseRef2",W.verse.reference);
set("#metTitle",W.story.metTitle); set("#metText",W.story.metText);
set("#metVenue",W.story.metVenue); set("#metCity",W.story.metCity);
set("#proposalVenue",W.story.proposalVenue); set("#proposalCity",W.story.proposalCity);
set("#ceremonyVenue",W.ceremony.venue); set("#ceremonyCity",W.ceremony.city);
set("#receptionVenue",W.reception.venue); set("#receptionCity",W.reception.city);
set("#ceremonyVenue2",W.ceremony.venue); set("#ceremonyCity2",W.ceremony.city); set("#ceremonyTime",W.ceremony.time);
set("#receptionVenue2",W.reception.venue); set("#receptionCity2",W.reception.city); set("#receptionTime",W.reception.time);
$("#ceremonyMap").href=W.ceremony.mapsUrl; $("#receptionMap").href=W.reception.mapsUrl;
set("#travelIntro",W.travel.intro); set("#rsvpDeadline",W.rsvp.deadline);

W.travel.airports.forEach(x=>{const li=document.createElement("li");li.textContent=x;$("#airportList").append(li)});
W.registry.forEach(x=>{const a=document.createElement("a");a.textContent=x.name;a.href=x.url;$("#registryLinks").append(a)});

function countdown(){
  const diff = new Date(W.weddingDate) - new Date();
  const target = $("#countdown");
  if(diff<=0){target.innerHTML="<strong>Today is the day!</strong>";return}
  const days=Math.floor(diff/86400000), hours=Math.floor(diff/3600000)%24, mins=Math.floor(diff/60000)%60, secs=Math.floor(diff/1000)%60;
  target.innerHTML=[["Days",days],["Hours",hours],["Minutes",mins],["Seconds",secs]].map(([l,n])=>`<div><strong>${String(n).padStart(2,"0")}</strong><span>${l}</span></div>`).join("");
}
countdown(); setInterval(countdown,1000);

$("#openInvitation").addEventListener("click",()=>{
  $("#invitation").classList.add("opened");
  $(".site-header").classList.add("visible");
  document.body.style.overflow="";
  setTimeout(()=>$("#invitation").remove(),1000);
});
document.body.style.overflow="hidden";

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("in-view")}),{threshold:.13});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
$(".ring-easter").addEventListener("click",()=>$(".ring-message").classList.toggle("show"));
$(".menu-toggle").addEventListener("click",()=>$(".site-header nav").classList.toggle("open"));
document.querySelectorAll(".site-header nav a").forEach(a=>a.addEventListener("click",()=>$(".site-header nav").classList.remove("open")));

window.addEventListener("scroll",()=>$(".to-top").classList.toggle("show",scrollY>700));
$(".to-top").addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

document.querySelectorAll(".gallery-item").forEach(btn=>btn.addEventListener("click",()=>{
  $("#lightbox img").src=btn.querySelector("img").src; $("#lightbox").hidden=false;
}));
$("#lightbox button").addEventListener("click",()=>$("#lightbox").hidden=true);
$("#lightbox").addEventListener("click",e=>{if(e.target.id==="lightbox")$("#lightbox").hidden=true});

$("#rsvpForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target).entries());
  if(W.rsvp.formAction){
    const res=await fetch(W.rsvp.formAction,{method:"POST",body:new FormData(e.target),headers:{Accept:"application/json"}});
    if(!res.ok){alert("Your RSVP could not be sent. Please try again.");return}
  } else {
    const text=`Wedding RSVP\n\nName: ${data.name}\nEmail: ${data.email}\nAttendance: ${data.attendance}\nGuests: ${data.guests}\nSong: ${data.song}\nMessage: ${data.message}`;
    const blob=new Blob([text],{type:"text/plain"}), a=document.createElement("a");
    a.href=URL.createObjectURL(blob); a.download=`RSVP-${data.name.replace(/\s+/g,"-")}.txt`; a.click(); URL.revokeObjectURL(a.href);
  }
  e.target.hidden=true; $("#rsvpThanks").hidden=false;
});
