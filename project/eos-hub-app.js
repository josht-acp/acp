/* EOS Hub — render + filter + drawer · vanilla */
/* eslint-disable */
(function(){
  const BLOCKS = window.EOS_BLOCKS;
  const SURFACES = window.EOS_SURFACES;
  const STATE = { office:'all', phase:'all', q:'' };

  const el = (tag, cls, html) => { const e = document.createElement(tag); if(cls) e.className=cls; if(html!=null) e.innerHTML=html; return e; };

  // Office → block mapping for filters. "Other" covers IR/HR/BD/KM/FIN/OPS/PM/EX.
  const OFFICE_GROUPS = {
    FO:['FO'], MO:['MO'], BO:['BO'], IC:['IC'], REL:['REL'],
    Other:['IR','HR','BD','KM','FIN','OPS','PM','EX']
  };

  function passesFilter(s){
    if (STATE.office !== 'all') {
      const blocks = OFFICE_GROUPS[STATE.office] || [STATE.office];
      if (!blocks.includes(s.block)) return false;
    }
    if (STATE.phase !== 'all' && s.phase !== STATE.phase) return false;
    if (STATE.q) {
      const q = STATE.q.toLowerCase();
      if (!(s.name + ' ' + s.desc + ' ' + s.code + ' ' + s.eos).toLowerCase().includes(q)) return false;
    }
    return true;
  }

  function tileHtml(s){
    return `
      <div class="tile-pin"></div>
      <div class="tile-h">
        <div class="tile-code"><b>${s.code}</b> · ${s.eos}</div>
        <div class="tile-status ${s.status}">${s.status}</div>
      </div>
      <div class="tile-name">${s.name}</div>
      <div class="tile-desc">${s.desc}</div>
      <div class="tile-foot">
        <div class="tile-foot-l">
          <span class="tile-phase">${s.phase}${s.live ? ' · MOCK' : ''}</span>
          <div class="tile-ai" title="AI coverage ${s.ai}%">
            <div class="tile-ai-bar"><div class="tile-ai-fill" style="width:${s.ai}%"></div></div>
            <div class="tile-ai-n">AI ${s.ai}</div>
          </div>
        </div>
        <span class="tile-open">${s.live ? 'Open →' : 'Detail →'}</span>
      </div>
    `;
  }

  function render(){
    const app = document.getElementById('app');
    app.innerHTML = '';
    BLOCKS.forEach(b => {
      const surfaces = SURFACES.filter(s => s.block === b.id && passesFilter(s));
      if (surfaces.length === 0) return;
      const block = el('section','block');
      const total = SURFACES.filter(s => s.block === b.id).length;
      block.innerHTML = `
        <div class="block-h">
          <div>
            <div class="block-code">${b.code}</div>
            <div class="block-name">${b.name}</div>
            <div class="block-tagline">${b.tagline}</div>
          </div>
          <div class="block-count"><b>${surfaces.length}</b> / ${total} surfaces</div>
        </div>
        <div class="grid"></div>
      `;
      const grid = block.querySelector('.grid');
      surfaces.forEach(s => {
        const t = el('div','tile phase-' + s.phase);
        t.innerHTML = tileHtml(s);
        t.addEventListener('click', () => openDrawer(s));
        grid.appendChild(t);
      });
      app.appendChild(block);
    });
    if (!app.children.length) {
      app.innerHTML = '<div style="padding:80px 0;text-align:center;font-family:var(--font-mono);color:var(--acp-steel);letter-spacing:0.1em;font-size:11px;text-transform:uppercase;">No surfaces match · adjust filters</div>';
    }
  }

  function openDrawer(s){
    document.getElementById('drCode').textContent = s.code + ' · ' + s.eos + '  ·  ' + s.status + ' · ' + s.phase;
    document.getElementById('drName').textContent = s.name;
    document.getElementById('drDesc').textContent = s.desc;
    document.getElementById('drBody').innerHTML = `
      <div class="dr-block">
        <div class="dr-bl">Metadata</div>
        <div class="dr-grid">
          <div class="dr-kv"><div class="dr-kv-l">Function block</div><div class="dr-kv-v">${BLOCKS.find(b=>b.id===s.block).name}</div></div>
          <div class="dr-kv"><div class="dr-kv-l">Owner</div><div class="dr-kv-v">${s.owner}</div></div>
          <div class="dr-kv"><div class="dr-kv-l">Trigger</div><div class="dr-kv-v">${s.trigger}</div></div>
          <div class="dr-kv"><div class="dr-kv-l">Phase</div><div class="dr-kv-v">${s.phase}</div></div>
          <div class="dr-kv"><div class="dr-kv-l">AI coverage</div><div class="dr-kv-v">${s.ai}%</div></div>
          <div class="dr-kv"><div class="dr-kv-l">Status</div><div class="dr-kv-v">${s.status}</div></div>
        </div>
      </div>
      <div class="dr-block">
        <div class="dr-bl">AI coverage</div>
        <div style="height:8px;background:var(--acp-charcoal);border:1px solid var(--acp-gold-hair);overflow:hidden;border-radius:2px;">
          <div style="height:100%;background:linear-gradient(90deg,var(--acp-gold-dark),var(--acp-gold),var(--acp-gold-light));width:${s.ai}%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:9px;color:var(--acp-silver);letter-spacing:0.1em;margin-top:8px;">
          <span>0 · JT-operated</span>
          <span>100 · Fully autonomous</span>
        </div>
      </div>
      <div class="dr-block">
        <div class="dr-bl">Reference</div>
        <div style="font-size:13px;color:var(--acp-pearl);line-height:1.6;">
          ${s.pdf ? 'Full spec in reference PDF · ' + s.pdf : 'No reference PDF — surface scoped but not yet designed.'}
        </div>
      </div>
      <div class="dr-block">
        <div class="dr-bl">Roadmap</div>
        <div style="font-size:13px;color:var(--acp-silver);line-height:1.6;">
          ${s.live ? 'Live interactive mock available — click <b style="color:var(--acp-gold-light)">Open live surface</b> to launch.' : 'Backed by its reference PDF today. Interactive build scheduled in Phase ' + s.phase + '.'}
        </div>
      </div>
    `;
    const ref = document.getElementById('drRef');
    const live = document.getElementById('drLive');
    if (s.pdf) { ref.style.display = ''; ref.onclick = () => window.open('uploads/' + s.pdf, '_blank'); } else { ref.style.display='none'; }
    if (s.live) { live.style.display=''; live.textContent = 'Open live surface →'; live.onclick = () => window.location.href = s.live; }
    else        { live.style.display=''; live.textContent = 'Open reference PDF →'; live.onclick = () => s.pdf && window.open('uploads/' + s.pdf, '_blank'); }
    document.getElementById('drawer').classList.add('on');
    document.getElementById('veil').classList.add('on');
  }
  function closeDrawer(){
    document.getElementById('drawer').classList.remove('on');
    document.getElementById('veil').classList.remove('on');
  }

  // Wire filters
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.f;
      STATE[f] = chip.dataset.v;
      document.querySelectorAll('.chip[data-f="'+f+'"]').forEach(c => c.classList.toggle('on', c.dataset.v === STATE[f]));
      render();
    });
  });
  document.getElementById('search').addEventListener('input', (e)=>{ STATE.q = e.target.value; render(); });
  document.getElementById('drClose').addEventListener('click', closeDrawer);
  document.getElementById('veil').addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeDrawer(); });

  render();
})();
