import { useState, useEffect, useCallback } from 'react'
import {
  notesData, qaData, archData, projectsData,
  experienceData, behavioralData, dataQA
} from '../lib/data.js'

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const SK = 'mlprep_v3'
function loadSt() {
  try { const r = localStorage.getItem(SK); return r ? JSON.parse(r) : null } catch { return null }
}
function saveSt(st) {
  try { localStorage.setItem(SK, JSON.stringify(st)) } catch {}
}

// ─── COLORS ───────────────────────────────────────────────────────────────────
const CC = {
  'c-ml':'#4ade80','c-dl':'#818cf8','c-rag':'#fb923c','c-kg':'#c084fc',
  'c-inf':'#f87171','c-sys':'#22d3ee','c-dsa':'#facc15','c-beh':'#34d399',
  'c-ft':'#fb7185','c-lc':'#2dd4bf','c-arch':'#f472b6','c-mcp':'#38bdf8',
  'c-sql':'#34d399','c-vdb':'#a78bfa','c-nosql':'#60a5fa','c-pipe':'#fb923c','c-dw':'#f472b6',
}
const BG = {
  'c-ml':'#0e1a0e','c-dl':'#0e0e1c','c-rag':'#1a100a','c-kg':'#120e1a',
  'c-inf':'#1a0e0e','c-sys':'#0a1618','c-dsa':'#161400','c-beh':'#0a1410',
  'c-ft':'#1a0a10','c-lc':'#0a1614','c-arch':'#160a12','c-mcp':'#0a1418',
  'c-sql':'#0a1410','c-vdb':'#100c1a','c-nosql':'#0a1018','c-pipe':'#1a100a','c-dw':'#160a12',
}
const col = c => CC[c] || '#6a6a80'
const bg  = c => BG[c] || '#13131a'

const TABS = [
  { id:'notes',    label:'STUDY NOTES',   dot:'#f0c040' },
  { id:'qa',       label:'Q&A CARDS',     dot:'#e879f9' },
  { id:'arch',     label:'ARCHITECTURES', dot:'#f472b6' },
  { id:'projects', label:'PROJECTS',      dot:'#fb923c' },
  { id:'exp',      label:'EXPERIENCE',    dot:'#22d3ee' },
  { id:'data',     label:'DATA & DBs',    dot:'#f59e0b' },
  { id:'beh',      label:'BEHAVIORAL',    dot:'#34d399' },
  { id:'ai',       label:'✦ AI TOPICS',   dot:'#38bdf8' },
]

// ─── SHARED STYLE HELPERS ─────────────────────────────────────────────────────
const mono = "'JetBrains Mono',monospace"
const board     = { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:'1rem', alignItems:'start' }
const boardWide = { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(480px,1fr))', gap:'1rem', alignItems:'start' }
const page      = { padding:'1.6rem 2rem 6rem' }
const proseSt   = { fontFamily:mono, fontSize:'.68rem', color:'#b0b0c8', lineHeight:1.75 }
const labelSt   = { fontFamily:mono, fontSize:'.55rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', opacity:.35, marginBottom:'.28rem' }
const liSt      = { fontFamily:mono, fontSize:'.67rem', color:'#b0b0c8', lineHeight:1.6, paddingLeft:'.9rem', position:'relative', marginBottom:'.32rem' }
const chipSt    = { fontFamily:mono, fontSize:'.54rem', padding:'.1rem .4rem', borderRadius:2, background:'rgba(255,255,255,.05)', color:'#6a6a80', letterSpacing:'.04em' }

function cardShell(c, done, open) {
  return {
    borderRadius:6,
    border:`1px solid ${done ? c+'60' : open ? c+'45' : '#252530'}`,
    borderStyle: done ? 'dashed' : 'solid',
    overflow:'hidden',
    transition:'border-color .2s',
    opacity: done ? .62 : 1,
    background: '#13131a',
    animation:'fadeUp .3s ease both',
  }
}
function hdr(clickable=true) {
  return {
    padding:'.78rem 1rem', display:'flex', alignItems:'flex-start',
    justifyContent:'space-between', gap:'.5rem',
    cursor: clickable ? 'pointer' : 'default',
    userSelect:'none', borderBottom:'1px solid rgba(255,255,255,.04)',
  }
}

function Tag({ c, children }) {
  return <span style={{ fontFamily:mono, fontSize:'.54rem', padding:'.1rem .4rem', borderRadius:2, background:c+'18', color:c, letterSpacing:'.06em', flexShrink:0 }}>{children}</span>
}
function CheckBtn({ done, onClick }) {
  return (
    <button onClick={onClick} style={{ fontFamily:mono, fontSize:'.55rem', padding:'.14rem .42rem', background:'transparent', border:`1px solid ${done?'#f0c040':'#252530'}`, color:done?'#f0c040':'#6a6a80', borderRadius:2, cursor:'pointer', transition:'all .15s', flexShrink:0 }}>✓</button>
  )
}
function RemBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ fontFamily:mono, fontSize:'.55rem', padding:'.14rem .42rem', background:'transparent', border:'1px solid #f8717135', color:'#f87171', borderRadius:2, cursor:'pointer', flexShrink:0 }}>✕</button>
  )
}
function Chev({ open }) {
  return <span style={{ fontSize:'.57rem', color:'#6a6a80', transition:'transform .2s', transform:open?'none':'rotate(-90deg)', flexShrink:0 }}>▾</span>
}
function Dot({ c }) {
  return <div style={{ width:7, height:7, borderRadius:'50%', background:c, flexShrink:0, marginTop:2 }} />
}
function SecLbl({ children }) {
  return <div style={{ fontFamily:"'Syne',sans-serif", fontSize:'.57rem', fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', opacity:.3, marginTop:'.6rem', marginBottom:'.2rem' }}>{children}</div>
}
function Li({ children }) {
  return <div style={liSt}><span style={{ position:'absolute', left:0, opacity:.4 }}>›</span>{children}</div>
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ done, total }) {
  const pct = total > 0 ? Math.round(done / total * 100) : 0
  return (
    <div style={{ padding:'.52rem 2rem', display:'flex', alignItems:'center', gap:'1rem', borderBottom:'1px solid #1a1a24', background:'#0f0f14' }}>
      <span style={{ fontFamily:mono, fontSize:'.62rem', color:'#6a6a80', whiteSpace:'nowrap' }}>{done}/{total} done</span>
      <div style={{ flex:1, height:2, background:'#1e1e2a', borderRadius:2, overflow:'hidden' }}>
        <div style={{ height:'100%', background:pct===100?'#4ade80':'#f0c040', width:pct+'%', transition:'width .4s ease', borderRadius:2 }} />
      </div>
      <span style={{ fontFamily:mono, fontSize:'.62rem', color:pct===100?'#4ade80':'#6a6a80', whiteSpace:'nowrap' }}>{pct}%</span>
    </div>
  )
}

// ─── FILTER BAR ───────────────────────────────────────────────────────────────
function FilterBar({ filters, active, onChange }) {
  return (
    <div style={{ padding:'.52rem 2rem', display:'flex', gap:'.3rem', flexWrap:'wrap', borderBottom:'1px solid #1a1a24' }}>
      {filters.map(f => (
        <button key={f.v} onClick={() => onChange(f.v)} style={{ fontFamily:mono, fontSize:'.59rem', padding:'.2rem .6rem', borderRadius:2, cursor:'pointer', transition:'all .15s', letterSpacing:'.04em', border:`1px solid ${active===f.v?'#f0c040':'#252530'}`, background:active===f.v?'rgba(240,192,64,.07)':'transparent', color:active===f.v?'#f0c040':'#6a6a80' }}>
          {f.l}
        </button>
      ))}
    </div>
  )
}

function PageHdr({ title, sub }) {
  return (
    <div style={{ padding:'1.6rem 2rem 1.1rem', borderBottom:'1px solid #1a1a24' }}>
      <h2 style={{ fontSize:'1.35rem', fontWeight:800, letterSpacing:'-.03em' }}>{title}</h2>
      {sub && <p style={{ fontFamily:mono, fontSize:'.66rem', color:'#6a6a80', marginTop:'.25rem' }}>{sub}</p>}
    </div>
  )
}

// ─── NOTE CARD ────────────────────────────────────────────────────────────────
function NoteCard({ d, done, onDone, onRemove }) {
  const [open, setOpen] = useState(true)
  const c = col(d.cat)

  const renderIt = (it, i) => {
    if (typeof it === 'object' && it.s) return <SecLbl key={i}>{it.s}</SecLbl>
    if (typeof it === 'object' && it.p) return <p key={i} style={{ ...proseSt, margin:'.38rem 0' }}>{it.p}</p>
    if (typeof it === 'object' && it.fig) return (
      <div key={i} style={{ margin:'.6rem 0 .3rem', padding:'.5rem .4rem .3rem', borderRadius:3, background:'rgba(0,0,0,.3)', border:'1px solid rgba(255,255,255,.05)', overflowX:'auto' }}>
        {it.cap && <div style={{ ...labelSt, marginBottom:'.28rem' }}>{it.cap}</div>}
        <div dangerouslySetInnerHTML={{ __html: it.fig }} />
      </div>
    )
    return <Li key={i}>{it}</Li>
  }

  return (
    <div style={{ ...cardShell(c, done, open), background:bg(d.cat), borderLeft:`2px solid ${c}` }}>
      <div style={hdr()} onClick={() => setOpen(o => !o)}>
        <div style={{ display:'flex', alignItems:'center', gap:'.4rem', flex:1, minWidth:0 }}>
          <Dot c={c} />
          <span style={{ fontSize:'.73rem', fontWeight:700, letterSpacing:'.02em', textTransform:'uppercase', color:c, flex:1, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</span>
          {d.tag && <Tag c={c}>{d.tag}</Tag>}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'.25rem', flexShrink:0 }}>
          <CheckBtn done={done} onClick={e => { e.stopPropagation(); onDone() }} />
          <RemBtn onClick={e => { e.stopPropagation(); onRemove() }} />
          <Chev open={open} />
        </div>
      </div>
      {open && <div style={{ padding:'.72rem 1rem' }}>{d.items.map(renderIt)}</div>}
    </div>
  )
}

// ─── FLIP CARD ────────────────────────────────────────────────────────────────
function FlipCard({ d, done, onDone, onRemove }) {
  const [flipped, setFlipped] = useState(false)
  const c = col(d.cat || 'c-arch')
  const face = { backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', borderRadius:6, display:'flex', flexDirection:'column', background:bg(d.cat||'c-arch'), border:'1px solid #252530' }

  return (
    <div style={{ animation:'fadeUp .3s ease both', opacity:done?.62:1 }}>
      <div style={{ perspective:1000 }}>
        <div style={{ position:'relative', transformStyle:'preserve-3d', transition:'transform .52s cubic-bezier(.4,.2,.2,1)', transform:flipped?'rotateY(180deg)':'none', minHeight:170 }}>
          <div style={face}>
            <div style={{ padding:'.68rem 1rem .55rem', display:'flex', alignItems:'center', gap:'.4rem', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
              <Dot c={c} />
              <span style={{ fontFamily:mono, fontSize:'.53rem', opacity:.45, letterSpacing:'.06em' }}>{(d.cat||'').replace('c-','').toUpperCase()} · Q</span>
            </div>
            <div style={{ padding:'.82rem 1rem .4rem', flex:1, display:'flex', alignItems:'center', minHeight:82 }}>
              <p style={{ fontFamily:"'Syne',sans-serif", fontSize:'.8rem', fontWeight:600, lineHeight:1.5 }}>{d.q}</p>
            </div>
            <div style={{ padding:'.38rem 1rem .72rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div style={{ display:'flex', gap:'.25rem' }}>
                <CheckBtn done={done} onClick={onDone} />
                <RemBtn onClick={onRemove} />
              </div>
              <button onClick={() => setFlipped(true)} style={{ fontFamily:mono, fontSize:'.59rem', padding:'.24rem .62rem', borderRadius:2, cursor:'pointer', border:`1px solid ${c}`, color:c, background:'transparent', letterSpacing:'.05em' }}>reveal ↓</button>
            </div>
          </div>
          <div style={{ ...face, position:'absolute', inset:0, transform:'rotateY(180deg)', border:`1px solid ${c}40` }}>
            <div style={{ padding:'.68rem 1rem .55rem', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'.4rem' }}>
                <Dot c={c} />
                <span style={{ fontFamily:mono, fontSize:'.53rem', opacity:.45 }}>ANSWER</span>
              </div>
              <CheckBtn done={done} onClick={onDone} />
            </div>
            <div style={{ padding:'.72rem 1rem', flex:1, overflowY:'auto', maxHeight:290 }}>
              {(d.a || []).map((l, i) => (
                <div key={i} style={{ ...liSt }}>
                  <span style={{ position:'absolute', left:0, opacity:.3, fontSize:'.56rem' }}>→</span>{l}
                </div>
              ))}
            </div>
            <div style={{ padding:'.35rem 1rem .72rem', display:'flex', justifyContent:'flex-end' }}>
              <button onClick={() => setFlipped(false)} style={{ fontFamily:mono, fontSize:'.59rem', padding:'.24rem .62rem', borderRadius:2, cursor:'pointer', border:'1px solid #252530', color:'#6a6a80', background:'transparent' }}>← back</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TOPIC CARD ───────────────────────────────────────────────────────────────
function TopicCard({ d, done, onDone, onRemove }) {
  const [open, setOpen] = useState(false)
  const [openQs, setOpenQs] = useState({})
  const c = d.color || col(d.cat) || '#f0c040'
  const toggleQ = i => setOpenQs(p => ({ ...p, [i]: !p[i] }))

  return (
    <div style={{ ...cardShell(c, done, open), background:bg(d.cat), borderLeft:`2px solid ${c}` }}>
      <div style={hdr()} onClick={() => setOpen(o => !o)}>
        <div style={{ flex:1, display:'flex', flexDirection:'column', gap:'.18rem', minWidth:0 }}>
          <span style={{ fontSize:'.82rem', fontWeight:700, color:c, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</span>
          {d.sub && <span style={{ fontFamily:mono, fontSize:'.61rem', color:'#6a6a80', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.sub}</span>}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'.25rem', flexShrink:0 }}>
          {d.tag && <Tag c={c}>{d.tag}</Tag>}
          <CheckBtn done={done} onClick={e => { e.stopPropagation(); onDone() }} />
          <RemBtn onClick={e => { e.stopPropagation(); onRemove() }} />
          <Chev open={open} />
        </div>
      </div>
      {open && (
        <div style={{ padding:'1rem 1.1rem', animation:'fadeIn .2s ease' }}>
          {(d.sections || []).map((sec, i) => (
            <div key={i} style={{ marginBottom:'.85rem' }}>
              <div style={labelSt}>{sec.label}</div>
              <p style={proseSt}>{sec.text}</p>
            </div>
          ))}
          {(d.qa || []).length > 0 && (
            <div style={{ marginTop:'.85rem', borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:'.72rem' }}>
              <div style={{ ...labelSt, marginBottom:'.48rem' }}>Interview Questions</div>
              {d.qa.map((q, i) => (
                <div key={i} style={{ marginBottom:'.58rem' }}>
                  <div onClick={() => toggleQ(i)} style={{ fontFamily:mono, fontSize:'.66rem', color:'#e4e4f0', lineHeight:1.5, padding:'.28rem .5rem', borderLeft:`2px solid ${c}55`, borderRadius:'0 3px 3px 0', background:'rgba(255,255,255,.025)', cursor:'pointer', userSelect:'none', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'.4rem' }}>
                    <span>{q.q}</span>
                    <span style={{ opacity:.38, fontSize:'.52rem', flexShrink:0, transform:openQs[i]?'none':'rotate(-90deg)', transition:'transform .18s' }}>▾</span>
                  </div>
                  {openQs[i] && (
                    <div style={{ fontFamily:mono, fontSize:'.64rem', color:'#9090b4', lineHeight:1.65, padding:'.42rem .5rem .28rem', background:'rgba(0,0,0,.18)', borderRadius:'0 0 3px 3px', animation:'fadeIn .18s ease' }}>{q.a}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          {((d.chips || []).length > 0 || d.gh) && (
            <div style={{ display:'flex', flexWrap:'wrap', gap:'.3rem', marginTop:'.72rem', paddingTop:'.62rem', borderTop:'1px solid rgba(255,255,255,.05)' }}>
              {(d.chips || []).map((ch, i) => <span key={i} style={chipSt}>{ch}</span>)}
              {d.gh && <a href={d.gh} target="_blank" rel="noreferrer" style={{ fontFamily:mono, fontSize:'.54rem', padding:'.1rem .4rem', borderRadius:2, border:`1px solid ${c}40`, color:c, textDecoration:'none' }}>GitHub ↗</a>}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── BEHAVIORAL CARD ──────────────────────────────────────────────────────────
function BehCard({ d, done, onDone, onRemove }) {
  const [open, setOpen] = useState(false)
  const c = '#34d399'
  return (
    <div style={{ ...cardShell(c, done, open), background:'#0a1410', borderLeft:`2px solid ${c}` }}>
      <div style={hdr()} onClick={() => setOpen(o => !o)}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'.77rem', fontWeight:700, color:c, marginBottom:'.14rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.title}</div>
          <div style={{ fontFamily:mono, fontSize:'.61rem', color:'#6a6a80', fontStyle:'italic', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>"{d.q}"</div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'.25rem', flexShrink:0 }}>
          <Tag c={c}>{(d.type || '').toUpperCase()}</Tag>
          <CheckBtn done={done} onClick={e => { e.stopPropagation(); onDone() }} />
          <RemBtn onClick={e => { e.stopPropagation(); onRemove() }} />
          <Chev open={open} />
        </div>
      </div>
      {open && (
        <div style={{ padding:'1rem 1.1rem', animation:'fadeIn .2s ease' }}>
          {d.star && (
            <div style={{ marginBottom:'.85rem' }}>
              <div style={labelSt}>STAR FORMAT</div>
              {[['S','rgba(74,222,128,.1)'],['T','rgba(250,204,21,.1)'],['A','rgba(129,140,248,.1)'],['R','rgba(251,146,60,.1)']].map(([k, gbg]) => (
                <div key={k} style={{ display:'flex', gap:'.45rem', marginBottom:'.35rem', alignItems:'flex-start' }}>
                  <span style={{ fontFamily:mono, fontSize:'.58rem', padding:'.15rem .38rem', borderRadius:2, background:gbg, border:`1px solid ${c}45`, color:c, flexShrink:0 }}>{k}</span>
                  <span style={{ fontFamily:mono, fontSize:'.65rem', color:'#b0b0c8', lineHeight:1.6 }}>{d.star[k]}</span>
                </div>
              ))}
            </div>
          )}
          {d.prose && <div><div style={labelSt}>HOW TO DELIVER IT</div><p style={proseSt}>{d.prose}</p></div>}
          {(d.points || []).map((pt, i) => (
            typeof pt === 'object' && pt.p
              ? <p key={i} style={{ ...proseSt, marginBottom:'.42rem' }}>{pt.p}</p>
              : <Li key={i}>{pt}</Li>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── AI TOPIC GENERATOR ───────────────────────────────────────────────────────
function AIGen({ onAdd }) {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [preview, setPreview] = useState(null)

  const generate = async () => {
    if (!q.trim()) return
    setLoading(true); setErr(''); setPreview(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: q.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Server error')
      setPreview(data)
    } catch (e) {
      setErr(e.message || 'Failed to generate. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding:'1.4rem 2rem', borderBottom:'1px solid #1a1a24' }}>
      <div style={{ ...labelSt, marginBottom:'.52rem' }}>Generate topic with Claude AI</div>
      <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap' }}>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && generate()}
          placeholder="e.g. Kubernetes for ML, MLflow, Spark DataFrames, Prometheus monitoring..."
          style={{ flex:1, minWidth:200, fontFamily:mono, fontSize:'.69rem', background:'#1a1a24', border:'1px solid #252530', color:'#e4e4f0', borderRadius:4, padding:'.46rem .75rem', outline:'none', transition:'border .15s' }}
        />
        <button
          onClick={generate}
          disabled={loading || !q.trim()}
          style={{ fontFamily:mono, fontSize:'.67rem', padding:'.46rem 1.1rem', borderRadius:4, cursor:'pointer', background:'rgba(56,189,248,.07)', border:'1px solid #38bdf845', color:'#38bdf8', opacity:(!q.trim()||loading)?.5:1, display:'flex', alignItems:'center', gap:'.4rem', transition:'all .15s' }}
        >
          {loading ? (
            <><span style={{ width:10, height:10, borderRadius:'50%', border:'1.5px solid #38bdf835', borderTopColor:'#38bdf8', display:'inline-block', animation:'spin .7s linear infinite' }}/>generating...</>
          ) : '+ generate'}
        </button>
      </div>

      {err && <div style={{ marginTop:'.5rem', fontFamily:mono, fontSize:'.63rem', color:'#f87171' }}>{err}</div>}

      {preview && (
        <div style={{ marginTop:'.9rem', border:'1px solid #38bdf828', borderRadius:6, overflow:'hidden', animation:'fadeUp .3s ease' }}>
          <div style={{ padding:'.62rem 1rem', background:'rgba(56,189,248,.04)', borderBottom:'1px solid #38bdf818', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'.4rem' }}>
            <div>
              <span style={{ fontSize:'.77rem', fontWeight:700, color:preview.color }}>{preview.title}</span>
              <span style={{ fontFamily:mono, fontSize:'.56rem', color:'#6a6a80', marginLeft:'.5rem' }}>{preview.qa?.length || 0} questions</span>
            </div>
            <div style={{ display:'flex', gap:'.32rem' }}>
              <button onClick={() => { onAdd(preview); setPreview(null); setQ('') }} style={{ fontFamily:mono, fontSize:'.63rem', padding:'.25rem .62rem', borderRadius:3, cursor:'pointer', background:'rgba(74,222,128,.1)', border:'1px solid #4ade8055', color:'#4ade80' }}>✓ add to prep</button>
              <button onClick={() => setPreview(null)} style={{ fontFamily:mono, fontSize:'.63rem', padding:'.25rem .62rem', borderRadius:3, cursor:'pointer', background:'transparent', border:'1px solid #252530', color:'#6a6a80' }}>discard</button>
            </div>
          </div>
          <div style={{ padding:'.68rem 1rem' }}>
            {preview.sections?.slice(0,1).map((s, i) => <p key={i} style={{ ...proseSt, marginBottom:'.38rem' }}>{s.text}</p>)}
            <div style={{ ...labelSt, marginTop:'.45rem', marginBottom:'.32rem' }}>questions included</div>
            <div style={{ display:'flex', flexDirection:'column', gap:'.22rem' }}>
              {preview.qa?.map((q2, i) => <span key={i} style={{ ...chipSt, fontSize:'.62rem', color:'#8888b0' }}>{q2.q}</span>)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [tab, setTab] = useState('notes')
  const [doneIds, setDoneIds] = useState(new Set())
  const [custom, setCustom] = useState([])
  const [removedIds, setRemovedIds] = useState(new Set())
  const [hydrated, setHydrated] = useState(false)

  // Filters
  const [nf, setNf] = useState('all')
  const [qf, setQf] = useState('all')
  const [af, setAf] = useState('all')
  const [df, setDf] = useState('all')
  const [bf, setBf] = useState('all')

  // Load localStorage after hydration (SSR safe)
  useEffect(() => {
    const saved = loadSt()
    if (saved) {
      if (saved.doneIds)    setDoneIds(new Set(saved.doneIds))
      if (saved.custom)     setCustom(saved.custom)
      if (saved.removedIds) setRemovedIds(new Set(saved.removedIds))
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    saveSt({ doneIds: [...doneIds], custom, removedIds: [...removedIds] })
  }, [doneIds, custom, removedIds, hydrated])

  const toggleDone = useCallback(id => {
    setDoneIds(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  }, [])

  const toggleRemove = useCallback(id => {
    setRemovedIds(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  }, [])

  const addCustom = t => setCustom(p => [t, ...p])
  const removeCustom = id => {
    setCustom(p => p.filter(t => t.id !== id))
    setDoneIds(p => { const n = new Set(p); n.delete(id); return n })
  }

  const vis  = (arr, fld, val) => arr.filter(d => !removedIds.has(d.id) && (val === 'all' || d[fld] === val))
  const visA = val => archData.filter(d => !removedIds.has(d.id) && (val === 'all' || d.group === val))

  const allBuiltin = [...notesData,...qaData,...archData,...projectsData,...experienceData,...behavioralData,...dataQA]
  const activeBuiltin = allBuiltin.filter(d => !removedIds.has(d.id))
  const totalItems = activeBuiltin.length + custom.length
  const doneCount = [...activeBuiltin, ...custom].filter(d => doneIds.has(d.id)).length

  if (!hydrated) return null // avoid SSR mismatch

  return (
    <div style={{ minHeight:'100vh' }}>
      {/* NAV */}
      <nav style={{ display:'flex', alignItems:'stretch', borderBottom:'1px solid #1a1a24', background:'#0f0f14', position:'sticky', top:0, zIndex:100 }}>
        <div style={{ padding:'0 1.4rem', display:'flex', alignItems:'center', borderRight:'1px solid #1a1a24', flexShrink:0 }}>
          <span style={{ fontSize:'.95rem', fontWeight:800, letterSpacing:'-.03em', color:'#f0c040' }}>Prep ↗</span>
        </div>
        <div style={{ display:'flex', flex:1, overflowX:'auto' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ fontFamily:mono, fontSize:'.67rem', letterSpacing:'.04em', padding:'0 1.1rem', cursor:'pointer', border:'none', background:'transparent', color:tab===t.id?'#f0c040':'#6a6a80', borderBottom:tab===t.id?'2px solid #f0c040':'2px solid transparent', transition:'all .15s', whiteSpace:'nowrap', height:48, display:'flex', alignItems:'center', gap:'.35rem' }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:tab===t.id?t.dot:'#3a3a50', flexShrink:0 }}/>
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      <ProgressBar done={doneCount} total={totalItems} />

      {tab === 'notes' && <>
        <PageHdr title="Study Notes" sub="// expand · tick when confident · ✕ to hide"/>
        <FilterBar active={nf} onChange={setNf} filters={[
          {v:'all',l:'ALL'},{v:'c-ml',l:'ML FUNDAMENTALS'},{v:'c-dl',l:'DEEP LEARNING'},
          {v:'c-rag',l:'RAG & LLMs'},{v:'c-kg',l:'KNOWLEDGE GRAPHS'},{v:'c-inf',l:'INFERENCE'},
          {v:'c-sys',l:'ML SYSTEMS'},{v:'c-ft',l:'FINE-TUNING'},{v:'c-lc',l:'LANGCHAIN'},
          {v:'c-dsa',l:'DSA'},{v:'c-mcp',l:'MCP'},
        ]}/>
        <div style={page}><div style={board}>
          {vis(notesData,'cat',nf).map(d => <NoteCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'qa' && <>
        <PageHdr title="Q&A Flip Cards" sub="// reveal answer · answer without peeking · tick done"/>
        <FilterBar active={qf} onChange={setQf} filters={[
          {v:'all',l:'ALL'},{v:'c-ml',l:'ML'},{v:'c-dl',l:'DEEP LEARNING'},
          {v:'c-rag',l:'RAG & LLMs'},{v:'c-kg',l:'KG'},{v:'c-inf',l:'INFERENCE'},
          {v:'c-sys',l:'SYSTEMS'},{v:'c-ft',l:'FINE-TUNING'},{v:'c-lc',l:'LANGCHAIN'},{v:'c-dsa',l:'DSA'},
        ]}/>
        <div style={page}><div style={board}>
          {vis(qaData,'cat',qf).map(d => <FlipCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'arch' && <>
        <PageHdr title="Architecture Flip Cards" sub="// flip for internals · diagrams · tradeoffs"/>
        <FilterBar active={af} onChange={setAf} filters={[
          {v:'all',l:'ALL'},{v:'transformer',l:'TRANSFORMER'},{v:'rag',l:'RAG'},
          {v:'training',l:'TRAINING'},{v:'serving',l:'SERVING'},
        ]}/>
        <div style={page}><div style={boardWide}>
          {visA(af).map(d => <FlipCard key={d.id} d={{...d, cat:d.cat||'c-arch', q:d.front, a:d.back}} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'projects' && <>
        <PageHdr title="Projects" sub="// problem · decisions · results · story · tech Q&A"/>
        <div style={page}><div style={boardWide}>
          {vis(projectsData,'cat','all').map(d => <TopicCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'exp' && <>
        <PageHdr title="Experience" sub="// know your numbers · decisions · talking points"/>
        <div style={page}><div style={boardWide}>
          {vis(experienceData,'cat','all').map(d => <TopicCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'data' && <>
        <PageHdr title="Data & Databases" sub="// SQL · NoSQL · Vector DBs · Graph DBs · Pipelines · Feature Stores"/>
        <FilterBar active={df} onChange={setDf} filters={[
          {v:'all',l:'ALL'},{v:'c-sql',l:'SQL'},{v:'c-nosql',l:'NoSQL'},
          {v:'c-vdb',l:'VECTOR DBs'},{v:'c-kg',l:'GRAPH DBs'},
          {v:'c-pipe',l:'PIPELINES'},{v:'c-dw',l:'DATA WAREHOUSE'},{v:'c-sys',l:'FEATURE STORES'},
        ]}/>
        <div style={page}><div style={boardWide}>
          {vis(dataQA,'cat',df).map(d => <TopicCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'beh' && <>
        <PageHdr title="Behavioral" sub="// STAR stories · tradeoffs · collaboration · growth · tips"/>
        <FilterBar active={bf} onChange={setBf} filters={[
          {v:'all',l:'ALL'},{v:'story',l:'PROJECT STORIES'},{v:'tradeoff',l:'TRADEOFFS'},
          {v:'collaboration',l:'COLLABORATION'},{v:'growth',l:'GROWTH'},
          {v:'common',l:'COMMON Q&A'},{v:'tips',l:'TIPS'},
        ]}/>
        <div style={page}><div style={boardWide}>
          {(bf==='all' ? vis(behavioralData,'type','all') : vis(behavioralData,'type',bf)).map(d => <BehCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => toggleRemove(d.id)}/>)}
        </div></div>
      </>}

      {tab === 'ai' && <>
        <PageHdr title="AI-Generated Topics" sub="// type any topic · Claude generates a full card with Q&A · saved across sessions"/>
        <AIGen onAdd={addCustom} />
        <div style={page}>
          {custom.length === 0 ? (
            <div style={{ textAlign:'center', padding:'4rem 2rem', color:'#6a6a80', fontFamily:mono, fontSize:'.7rem' }}>
              <div style={{ fontSize:'2.5rem', marginBottom:'1rem', opacity:.18 }}>◎</div>
              No custom topics yet. Type any ML topic above and hit generate.
            </div>
          ) : (
            <div style={boardWide}>
              {custom.map(d => <TopicCard key={d.id} d={d} done={doneIds.has(d.id)} onDone={() => toggleDone(d.id)} onRemove={() => removeCustom(d.id)}/>)}
            </div>
          )}
        </div>
      </>}
    </div>
  )
}
