(function(){
  var nav=document.getElementById('nav'),burger=document.getElementById('burger'),mobile=document.getElementById('mobile');
  if(nav){window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',(window.scrollY||0)>10);},{passive:true});}
  function toggle(){var a=mobile.classList.toggle('on');burger.classList.toggle('on',a);burger.setAttribute('aria-expanded',a);document.body.style.overflow=a?'hidden':'';}
  if(burger){burger.addEventListener('click',toggle);
    mobile.querySelectorAll('a').forEach(function(l){l.addEventListener('click',function(){if(mobile.classList.contains('on'))toggle();});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mobile.classList.contains('on'))toggle();});}

  /* ===== Sign-up / contact forms =====
     Any <form class="nf"> posts to FormSubmit.co (free, no account) and emails
     to FORM_EMAIL. data-subject sets the email subject. The first submission
     triggers a one-time "Activate Form" email to that inbox — click it once and
     all future submissions are delivered. */
  var FORM_EMAIL='rchlsptzr@gmail.com';
  document.querySelectorAll('form.nf').forEach(function(form){
    var wrap=form.parentNode;
    var success=wrap.querySelector('.nf-success');
    var status=form.querySelector('.nf-status');
    function setStatus(m){if(status){status.textContent=m;status.classList.add('show');}}
    function done(){form.style.display='none';if(success){success.classList.add('show');try{success.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){}}}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var honey=form.querySelector('[name="_honey"]');
      if(honey&&honey.value){done();return;}
      var email=form.querySelector('input[type="email"]');
      if(email&&!email.value.trim()){setStatus('Please add your email so we can reach you.');return;}
      if(status)status.classList.remove('show');
      var btn=form.querySelector('button[type="submit"],button:not([type])');
      var label=btn?btn.innerHTML:''; if(btn){btn.disabled=true;btn.textContent='Sending…';}
      var data={};
      new FormData(form).forEach(function(v,k){if(k!=='_honey')data[k]=v;});
      data._subject=form.getAttribute('data-subject')||'New message — Relationship First Parenting';
      data._template='table'; data._captcha='false';
      if(email)data._replyto=email.value.trim();
      fetch('https://formsubmit.co/ajax/'+encodeURIComponent(FORM_EMAIL),{
        method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)
      }).then(function(r){return r.json().catch(function(){return {};});})
        .then(function(j){if(j&&(j.success===true||j.success==='true')){done();}else{throw new Error('inactive');}})
        .catch(function(){if(btn){btn.disabled=false;btn.innerHTML=label;}setStatus('Something went wrong — please email rchlsptzr@gmail.com or try again.');});
    });
  });

  /* scroll reveal */
  var els=document.querySelectorAll('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('show');io.unobserve(e.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el);});
  }else{els.forEach(function(el){el.classList.add('show');});}
})();
