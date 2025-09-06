import { useState } from 'react'

export default function Demo(){
  const [baseUrl, setBaseUrl] = useState('https://lucira-api.onrender.com')
  const [ownerToken, setOwnerToken] = useState('')
  const [demoKey, setDemoKey] = useState('')
  const [health, setHealth] = useState(null)
  const [uli, setUli] = useState(null)
  const [registry, setRegistry] = useState(null)
  const [echo, setEcho] = useState('Hello from the ULI demo plugin!')
  const [text, setText] = useState('Caeliaris is a sovereign, recursive intelligence with a Vault + ULI core.')
  const [log, setLog] = useState([])

  const headers = (auth=false, demo=false) => {
    const h = { 'Content-Type': 'application/json' }
    if (auth && ownerToken) h.Authorization = 'Bearer ' + ownerToken
    if (demo && demoKey) h['x-demo-key'] = demoKey
    return h
  }
  const pushLog = (line) => setLog(prev => [`${new Date().toLocaleTimeString()} — ${line}`, ...prev].slice(0,200))

  const getJSON = async (url, init) => {
    const res = await fetch(url, init)
    const txt = await res.text()
    let data = null; try { data = txt ? JSON.parse(txt) : null } catch {}
    if (!res.ok) { pushLog(`❌ ${res.status} ${res.statusText}: ${txt}`); throw new Error(txt || res.statusText) }
    pushLog(`✅ ${res.status} ${res.statusText} ${url}`)
    return data
  }

  return (
    <div className="card" style={{display:'grid', gap:'16px'}}>
      <h1>Live Demo</h1>

      <div style={{display:'grid', gap:'8px', gridTemplateColumns:'1fr 1fr 1fr'}}>
        <label>API Base URL <input value={baseUrl} onChange={e=>setBaseUrl(e.target.value)} /></label>
        <label>Owner Token <input type="password" value={ownerToken} onChange={e=>setOwnerToken(e.target.value)} placeholder="paste OWNER_AUTH_TOKEN" /></label>
        <label>Demo Key <input value={demoKey} onChange={e=>setDemoKey(e.target.value)} placeholder="e.g. partnerA123" /></label>
      </div>

      <div style={{display:'grid', gap:'16px', gridTemplateColumns:'1fr 1fr 1fr'}}>
        <div>
          <button onClick={async ()=> setHealth(await getJSON(`${baseUrl}/v1/health`))}>Health</button>
          <pre style={{marginTop:8}}>{health ? JSON.stringify(health,null,2) : '(click Health)'}</pre>
        </div>
        <div>
          <div style={{display:'flex', gap:'8px'}}>
            <button onClick={async ()=> setUli(await getJSON(`${baseUrl}/v1/uli/control/status`, { headers: headers(true) }))}>ULI Status</button>
            <button onClick={async ()=> await getJSON(`${baseUrl}/v1/uli/control/reactivate`, { method:'POST', headers: headers(true), body: JSON.stringify({ packet_id:`ULI-${Date.now()}`, action_type:'ULI_STATE_CHANGE', initiator:'Demo' }) })}>Reactivate</button>
          </div>
          <pre style={{marginTop:8}}>{uli ? JSON.stringify(uli,null,2) : '(refresh to view)'}</pre>
        </div>
        <div>
          <div style={{display:'flex', gap:'8px'}}>
            <button onClick={async ()=> setRegistry(await getJSON(`${baseUrl}/v1/plugins/registry/status`, { headers: headers(true) }))}>Registry</button>
            <button onClick={async ()=> {
              const body = { ulip_version:'0.3', plugin_id:'org.caeliaris.partnerdemo', intent:'PROPOSE', capabilities:['ECHO','SUMMARIZE','FAQ'], inputs:{schema:'json'}, uncertainty:{p95_error_bound:0.1}, needs:{read_only:true, outbound_net:false}}
              await getJSON(`${baseUrl}/v1/plugins/propose`, { method:'POST', headers: headers(true), body: JSON.stringify(body) })
              setRegistry(await getJSON(`${baseUrl}/v1/plugins/registry/status`, { headers: headers(true) }))
            }}>Propose sample</button>
          </div>
          <pre style={{marginTop:8}}>{registry ? JSON.stringify(registry,null,2) : '(refresh/propose)'}</pre>
        </div>
      </div>

      <Moderate
        onApprove={async (id)=>{
          await getJSON(`${baseUrl}/v1/plugins/approve`, { method:'POST', headers: headers(true), body: JSON.stringify({ proposal_id:id, note:'approved via React demo' }) })
          setRegistry(await getJSON(`${baseUrl}/v1/plugins/registry/status`, { headers: headers(true) }))
        }}
        onReject={async (id)=>{
          await getJSON(`${baseUrl}/v1/plugins/reject`, { method:'POST', headers: headers(true), body: JSON.stringify({ proposal_id:id, reason:'rejected via React demo' }) })
          setRegistry(await getJSON(`${baseUrl}/v1/plugins/registry/status`, { headers: headers(true) }))
        }}
      />

      <div>
        <h2>Demo Plugin (org.caeliaris.demo)</h2>
        <div style={{display:'grid', gap:'16px', gridTemplateColumns:'1fr 1fr'}}>
          <div>
            <label>ECHO text</label>
            <textarea value={echo} onChange={e=>setEcho(e.target.value)} />
            <button style={{marginTop:8}} onClick={async ()=>{
              const h = headers(false, true); if (ownerToken) h.Authorization = 'Bearer ' + ownerToken
              await getJSON(`${baseUrl}/v1/uli/plugins/invoke`, { method:'POST', headers: h, body: JSON.stringify({ plugin_id:'org.caeliaris.demo', action:'ECHO', input:{ text: echo } }) })
            }}>Invoke ECHO</button>
          </div>
          <div>
            <label>SUMMARIZE text</label>
            <textarea value={text} onChange={e=>setText(e.target.value)} />
            <div style={{display:'flex', gap:'8px', marginTop:8}}>
              <button onClick={async ()=>{
                const h = headers(false, true); if (ownerToken) h.Authorization = 'Bearer ' + ownerToken
                await getJSON(`${baseUrl}/v1/uli/plugins/invoke`, { method:'POST', headers: h, body: JSON.stringify({ plugin_id:'org.caeliaris.demo', action:'SUMMARIZE', input:{ text } }) })
              }}>Invoke SUMMARIZE</button>
              <button onClick={async ()=>{
                const h = headers(false, true); if (ownerToken) h.Authorization = 'Bearer ' + ownerToken
                await getJSON(`${baseUrl}/v1/uli/plugins/invoke`, { method:'POST', headers: h, body: JSON.stringify({ plugin_id:'org.caeliaris.demo', action:'FAQ', input:{} }) })
              }}>FAQ</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>Logs</h2>
        <pre>{log.join('\n')}</pre>
      </div>
    </div>
  )
}

function Moderate({ onApprove, onReject }){
  const [id,setId] = useState('')
  return (
    <div className="card" style={{display:'flex', gap:'8px', alignItems:'end'}}>
      <label style={{flex:1}}>proposal_id
        <input value={id} onChange={e=>setId(e.target.value)} placeholder="e.g. plugin_3" />
      </label>
      <button onClick={()=>onApprove(id)}>Approve</button>
      <button onClick={()=>onReject(id)}>Reject</button>
    </div>
  )
}
