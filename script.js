const stage = document.getElementById("invitationStage");
const begin = document.getElementById("beginButton");
function openInvitation(){
  const hero=document.getElementById("editorialHero");
  stage.classList.add("open");
  setTimeout(()=>{
    stage.style.display="none";
    window.scrollTo({top:0,behavior:"auto"});
    if(hero){
      hero.classList.remove("hero-awaiting");
      void hero.offsetWidth;
      hero.classList.add("hero-reveal");
    }
  },900);
}
begin.addEventListener("click",openInvitation);

const menuButton=document.getElementById("menuButton");
const nav=document.getElementById("siteNav");
menuButton.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const weddingDate=new Date("2027-09-25T14:00:00-04:00");
const countdown=document.getElementById("countdown");
function updateCountdown(){
  const diff=weddingDate-new Date();
  if(diff<=0){
    countdown.innerHTML="<div><strong>Today</strong><span>We say I do</span></div>";
    return;
  }
  const days=Math.floor(diff/86400000);
  const hours=Math.floor((diff%86400000)/3600000);
  const minutes=Math.floor((diff%3600000)/60000);
  const seconds=Math.floor((diff%60000)/1000);
  countdown.innerHTML=
    `<div><strong>${days}</strong><span>Days</span></div>
     <div><strong>${hours}</strong><span>Hours</span></div>
     <div><strong>${minutes}</strong><span>Minutes</span></div>
     <div><strong>${seconds}</strong><span>Seconds</span></div>`;
}
updateCountdown();
setInterval(updateCountdown,1000);
