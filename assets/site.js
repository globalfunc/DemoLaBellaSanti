// Shared nav + footer + behaviors for La Bella Senti
(function(){
  const PAGE = document.body.dataset.page || "home";

  const NAV_ITEMS = [
    { id:"home", href:"index.html", bg:"Начало", en:"Home" },
    { id:"about", href:"about.html", bg:"За мен", en:"About" },
    { id:"services", href:"services.html", bg:"Услуги", en:"Services" },
    { id:"contact", href:"contact.html", bg:"Контакти", en:"Contact" },
  ];

  // ---- NAV ----
  const nav = document.createElement("nav");
  nav.className = "nav";
  nav.innerHTML = `
    <a class="nav-brand" href="index.html" aria-label="La Bella Senti">
      <span class="mark">B</span>
      <span>
        <div class="wordmark">La Bella Senti</div>
        <div class="sub">Beauty · Studio</div>
      </span>
    </a>
    <div class="nav-links">
      ${NAV_ITEMS.map(i=>`<a href="${i.href}" data-i18n-bg="${i.bg}" data-i18n-en="${i.en}" data-nav="${i.id}" class="${i.id===PAGE?'active':''}">${i.bg}</a>`).join("")}
    </div>
    <div class="nav-right">
      <div class="lang" role="group" aria-label="language">
        <button data-lang="bg" class="on">БГ</button>
        <button data-lang="en">EN</button>
      </div>
      <a href="contact.html" class="btn gold" style="padding:12px 20px;font-size:10px;" data-i18n-bg="Резервирай" data-i18n-en="Book Now">Резервирай <span class="arrow">→</span></a>
    </div>
  `;
  document.body.prepend(nav);

  // scroll behavior
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
    const sb = document.querySelector(".sticky-book");
    if (sb){
      if (window.scrollY > 600) sb.classList.add("show");
      else sb.classList.remove("show");
    }
  };
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  // ---- FOOTER ----
  const foot = document.createElement("footer");
  foot.className = "lbs";
  foot.innerHTML = `
    <div class="foot-grid">
      <div>
        <a class="nav-brand" href="index.html" style="margin-bottom:18px;">
          <span class="mark" style="font-size:48px;">B</span>
          <span>
            <div class="wordmark" style="font-size:20px;">La Bella Senti</div>
            <div class="sub">Beauty · Studio</div>
          </span>
        </a>
        <p style="margin-top:22px;max-width:34ch;" data-i18n-bg="Луксозно студио за красота — където прецизността среща изтънчеността. Авторски ритуали за лице, тяло и коса." data-i18n-en="A luxury beauty studio where precision meets refinement. Signature rituals for face, body, and hair.">
          Луксозно студио за красота — където прецизността среща изтънчеността. Авторски ритуали за лице, тяло и коса.
        </p>
      </div>
      <div>
        <h4 data-i18n-bg="Студио" data-i18n-en="Studio">Studio</h4>
        <a href="about.html" data-i18n-bg="За мен" data-i18n-en="About">За мен</a>
        <a href="services.html" data-i18n-bg="Услуги" data-i18n-en="Services">Услуги</a>
        <a href="services.html#packages" data-i18n-bg="Промо пакети" data-i18n-en="Packages">Промо пакети</a>
        <a href="services.html#membership" data-i18n-bg="VIP членство" data-i18n-en="VIP Membership">VIP членство</a>
      </div>
      <div>
        <h4 data-i18n-bg="Контакти" data-i18n-en="Contact">Contact</h4>
        <a href="tel:+359896181881">089 618 1881</a>
        <a target="_blank" href="https://www.instagram.com/la_bella_senti_beauty_studio/">@la_bella_senti</a>
        <a href="contact.html">ул. „Златни врата“ 17<br/><span style="color:var(--ink-dim);font-size:11px;letter-spacing:.2em;text-transform:uppercase;" data-i18n-bg="ж.к. Стрелбище · София" data-i18n-en="Strelbishte · Sofia">ж.к. Стрелбище · София</span></a>
      </div>
      <div>
        <h4 data-i18n-bg="Часове" data-i18n-en="Hours">Hours</h4>
        <div style="color:var(--ink-mute);font-size:13px;line-height:2;">
          <div style="display:flex;justify-content:space-between;"><span data-i18n-bg="Пн – Пт" data-i18n-en="Mon – Fri">Пн – Пт</span><span class="dim">10 — 20</span></div>
          <div style="display:flex;justify-content:space-between;"><span data-i18n-bg="Събота" data-i18n-en="Saturday">Събота</span><span class="dim">10 — 18</span></div>
          <div style="display:flex;justify-content:space-between;"><span data-i18n-bg="Неделя" data-i18n-en="Sunday">Неделя</span><span class="dim" data-i18n-bg="по уговорка" data-i18n-en="by appt.">по уговорка</span></div>
        </div>
      </div>
    </div>
    <div class="foot-bot">
      <div>© 2026 La Bella Senti · <span data-i18n-bg="Всички права запазени" data-i18n-en="All rights reserved">Всички права запазени</span></div>
      <div data-i18n-bg="Студио · София · Стрелбище" data-i18n-en="Studio · Sofia · Strelbishte">Студио · София · Стрелбище</div>
    </div>
  `;
  document.body.appendChild(foot);

  // ---- LANGUAGE ----
  const setLang = (lang) => {
    localStorage.setItem("lbs-lang", lang);
    document.querySelectorAll("[data-i18n-bg]").forEach(el=>{
      const t = el.getAttribute(`data-i18n-${lang}`);
      if (t!=null){
        // preserve nested spans by replacing text-only content if no children except text
        if (el.children.length === 0) el.textContent = t;
        else {
          // replace first text node
          el.innerHTML = t;
        }
      }
    });
    document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("on", b.dataset.lang===lang));
    document.documentElement.lang = lang;
  };
  document.querySelectorAll("[data-lang]").forEach(b=>{
    b.addEventListener("click", ()=> setLang(b.dataset.lang));
  });
  const savedLang = localStorage.getItem("lbs-lang") || "bg";
  setLang(savedLang);

  // ---- REVEAL ----
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);}
    });
  },{rootMargin:"0px 0px -8% 0px", threshold:0.05});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  // ---- STICKY BOOK ----
  if (!document.querySelector(".sticky-book")){
    const sb = document.createElement("a");
    sb.className = "sticky-book";
    sb.href = "contact.html";
    sb.setAttribute("data-i18n-bg","Резервирай час");
    sb.setAttribute("data-i18n-en","Book Appointment");
    sb.textContent = savedLang === "en" ? "Book Appointment" : "Резервирай час";
    document.body.appendChild(sb);
  }
})();
