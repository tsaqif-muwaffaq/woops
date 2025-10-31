// CONFIG: set your password here (plain text for demo). Change before deploy.
const SECRET_PASSWORD = "cintakamu"; // <= Ubah kata sandi di sini
const images = ["img/photo1.svg","img/photo2.svg","img/photo3.svg"];

document.addEventListener("DOMContentLoaded",()=>{
  const pwScreen = document.getElementById("password-screen");
  const mainScreen = document.getElementById("main-screen");
  const input = document.getElementById("pw-input");
  const enter = document.getElementById("pw-enter");
  const clear = document.getElementById("pw-clear");
  const msg = document.getElementById("pw-msg");
  const pwAnim = document.getElementById("pw-anim");

  enter.addEventListener("click", () => {
    const val = input.value.trim();
    if(!val){ msg.textContent = "Masukkan kode ya 💌"; return; }
    if(val === SECRET_PASSWORD){ // success
      pwScreen.classList.add("hidden");
      mainScreen.classList.remove("hidden");
      startExperience();
    } else {
      // wrong - small animation message
      pwAnim.textContent = "Waduh, sandi salah 🐰💔 Coba lagi ya";
      setTimeout(()=> pwAnim.textContent = "", 3000);
    }
  });

  clear.addEventListener("click", ()=>{ input.value=""; msg.textContent="Masukkan kode untuk melihat ucapan spesial." });

  // allow Enter key
  input.addEventListener("keydown", (e)=>{ if(e.key === 'Enter'){ enter.click(); }});

  // slideshow controls
  let idx = 0;
  const slideImg = document.getElementById("slide-img");
  document.getElementById("prev").addEventListener("click", ()=>{ idx = (idx-1+images.length)%images.length; slideImg.src = images[idx]; });
  document.getElementById("next").addEventListener("click", ()=>{ idx = (idx+1)%images.length; slideImg.src = images[idx]; });

});

function startExperience(){
  runTypewriter("Happy Birthday, Sayang! 🎂");
  launchConfetti();
  startHearts();
  cycleMessages();
  startSlideshowAuto();
}

// TYPEWRITER
function runTypewriter(text){
  const el = document.getElementById('typewriter');
  el.textContent = '';
  let i=0;
  const t = setInterval(()=>{ el.textContent += text[i]||''; i++; if(i>text.length){ clearInterval(t);} }, 60);
}

// SIMPLE CONFETTI (creates colorful squares falling)
function launchConfetti(){
  const confDiv = document.getElementById('confetti');
  for(let i=0;i<35;i++){
    const d = document.createElement('div');
    d.style.position='absolute';
    d.style.left = Math.random()*100 + '%';
    d.style.top = -10 + 'px';
    d.style.width = (6+Math.random()*10)+'px';
    d.style.height = d.style.width;
    d.style.background = ['#ff9ccf','#ffd166','#ff66b3','#ffb3e6','#ffd9ec'][Math.floor(Math.random()*5)];
    d.style.opacity = 0.95;
    d.style.transform = 'translateY(0)';
    d.style.transition = 'transform 3s linear, opacity 3s linear';
    confDiv.appendChild(d);
    // animate
    setTimeout(()=>{ d.style.transform = 'translateY(120vh) rotate('+ (Math.random()*360) +'deg)'; d.style.opacity=0; }, 50 + Math.random()*100);
    setTimeout(()=> confDiv.removeChild(d), 4000);
  }
}

// HEARTS
function startHearts(){
  const container = document.querySelector('.hearts');
  for(let i=0;i<18;i++){
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = (Math.random()*100)+'%';
    h.style.width = (12 + Math.random()*30) + 'px';
    h.style.height = h.style.width;
    h.style.background = ['#ff66b3','#ff9ccf','#ffb3e6'][Math.floor(Math.random()*3)];
    h.style.animationDuration = (4 + Math.random()*4) + 's';
    h.style.bottom = (-Math.random()*40)+'px';
    h.style.opacity = 0.95;
    container.appendChild(h);
    // remove after animation
    setTimeout(()=> h.remove(), 8000);
  }
}

// messages cycle
function cycleMessages(){
  const cards = document.querySelectorAll('#message-cards .msg');
  let j=0;
  cards.forEach((c,i)=>{ c.style.opacity=0; c.style.transform='translateY(10px)'; });
  const t = setInterval(()=>{
    cards.forEach((c,i)=>{ c.style.opacity=0; c.style.transform='translateY(10px)'; });
    const c = cards[j%cards.length];
    c.style.opacity=1;
    c.style.transform='translateY(0)';
    j++;
  }, 2600);
}

// slideshow auto
function startSlideshowAuto(){
  const slide = document.getElementById('slide-img');
  let i=0;
  setInterval(()=>{ i = (i+1) % 3; slide.src = ['img/photo1.svg','img/photo2.svg','img/photo3.svg'][i]; }, 3500);
}
