const stage=document.getElementById('invitationStage');
const begin=document.getElementById('beginButton');
const hero=document.getElementById('editorialHero');
function openInvitation(){
  stage.classList.add('open');
  document.body.classList.remove('is-locked');
  setTimeout(()=>{
    stage.style.display='none';
    window.scrollTo({top:0,behavior:'auto'});
    hero.classList.remove('hero-awaiting');
    void hero.offsetWidth;
    hero.classList.add('hero-reveal');
  },880);
}
begin.addEventListener('click',openInvitation);
const menuButton=document.getElementById('menuButton');
const nav=document.getElementById('siteNav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const weddingDate=new Date('2027-09-25T14:00:00-04:00');
const countdown=document.getElementById('countdown');
function updateCountdown(){const diff=weddingDate-new Date();if(diff<=0){countdown.innerHTML='<div><strong>Today</strong><span>We say I do</span></div>';return;}const days=Math.floor(diff/86400000),hours=Math.floor((diff%86400000)/3600000),minutes=Math.floor((diff%3600000)/60000),seconds=Math.floor((diff%60000)/1000);countdown.innerHTML=`<div><strong>${days}</strong><span>Days</span></div><div><strong>${hours}</strong><span>Hours</span></div><div><strong>${minutes}</strong><span>Minutes</span></div><div><strong>${seconds}</strong><span>Seconds</span></div>`;}
updateCountdown();setInterval(updateCountdown,1000);
