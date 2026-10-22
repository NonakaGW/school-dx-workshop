(function(){'use strict';
  function showFeedback(id,message){const el=document.getElementById(id);if(el){el.textContent=message;setTimeout(()=>{if(el.textContent===message)el.textContent='';},2800)}}
  async function copyContent(text){
    if(navigator.clipboard && window.isSecureContext){await navigator.clipboard.writeText(text);return}
    const area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();
    const ok=document.execCommand('copy');document.body.removeChild(area);if(!ok)throw new Error('clipboard');
  }
  document.addEventListener('click',async event=>{
    const button=event.target.closest('[data-copy]');if(!button)return;
    const target=document.getElementById(button.getAttribute('data-copy'));
    if(!target)return;
    try{await copyContent(target.value ?? target.textContent);showFeedback(button.getAttribute('data-feedback')||'copy-feedback','コピーしました');}
    catch(_){showFeedback(button.getAttribute('data-feedback')||'copy-feedback','コピーできませんでした。文章を選択してコピーしてください。')}
  });
  const slider=document.getElementById('slide-slider'),slideImage=document.getElementById('slide-image'),stage=document.getElementById('viewer-stage');
  if(slider && slideImage && stage){
    const total=Number(slider.max),tray=document.getElementById('thumb-tray');let current=1;
    for(let i=1;i<=total;i++){
      const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`スライド ${i} に移動`);
      const img=document.createElement('img');img.src=`slides/slide-${String(i).padStart(2,'0')}.webp`;img.loading='lazy';img.alt='';
      const label=document.createElement('span');label.textContent=String(i).padStart(2,'0');b.append(img,label);b.addEventListener('click',()=>setSlide(i));tray.appendChild(b);
    }
    const buttons=[...tray.children];
    function setSlide(n){current=Math.max(1,Math.min(total,n));slideImage.src=`slides/slide-${String(current).padStart(2,'0')}.webp`;slideImage.alt=`研修スライド ${current}/${total}`;
      slider.value=String(current);document.getElementById('slide-count').textContent=`${current} / ${total}`;
      document.getElementById('prev-slide').disabled=current===1;document.getElementById('next-slide').disabled=current===total;
      buttons.forEach((b,i)=>b.setAttribute('aria-current',String(i+1===current)));
      const active=buttons[current-1];if(active)tray.scrollLeft=Math.max(0,active.offsetLeft-tray.offsetLeft-tray.clientWidth/2+active.clientWidth/2);
    }
    document.getElementById('prev-slide').addEventListener('click',()=>setSlide(current-1));
    document.getElementById('next-slide').addEventListener('click',()=>setSlide(current+1));
    slider.addEventListener('input',()=>setSlide(Number(slider.value)));
    document.getElementById('fullscreen-slide').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen();else if(stage.requestFullscreen)stage.requestFullscreen()});
    document.addEventListener('keydown',e=>{
      const tag=(document.activeElement?.tagName||'').toLowerCase();if(['input','textarea','select'].includes(tag))return;
      if(e.key==='ArrowRight'){setSlide(current+1);e.preventDefault()}else if(e.key==='ArrowLeft'){setSlide(current-1);e.preventDefault()}
    });
    setSlide(1);
  }
})();