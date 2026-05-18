// Pata de Veludo — Admin (Dashboard + Pedidos + Produtos + Observabilidade)
const { useState: aS, useEffect: aE, useMemo: aM, useRef: aR } = React;
const ADM = window.PV_ADMIN;

const fmtBRL = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const fmtNum = (v) => v.toLocaleString("pt-BR");

// ───────── Admin Shell ─────────
function AdminApp({ onExitAdmin }) {
  const [tab, setTab] = aS("dashboard");
  const [collapsed, setCollapsed] = aS(false);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "orders", label: "Pedidos", icon: "package", badge: ADM.orders.filter(o => o.status === "pendente" || o.status === "pago").length },
    { id: "products", label: "Produtos", icon: "box" },
    { id: "observability", label: "Observabilidade", icon: "pulse" },
  ];

  return (
    <div className={`adm-app ${collapsed ? "collapsed" : ""}`}>
      <aside className="adm-sidebar">
        <div className="adm-brand" onClick={onExitAdmin}>
          <div className="adm-brand-mark">PV</div>
          {!collapsed && <div className="adm-brand-name"><strong>Pata de Veludo</strong><span>admin · Mutum Labs</span></div>}
        </div>
        <nav className="adm-nav">
          {tabs.map(t => (
            <button key={t.id} className={`adm-nav-item ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <AdmIcon name={t.icon}/>
              {!collapsed && <span>{t.label}</span>}
              {!collapsed && t.badge != null && t.badge > 0 && <span className="adm-nav-badge">{t.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="adm-side-foot">
          <button className="adm-collapse" onClick={() => setCollapsed(!collapsed)} aria-label="Colapsar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {collapsed
                ? <path d="M9 6 L 15 12 L 9 18"/>
                : <path d="M15 6 L 9 12 L 15 18"/>}
            </svg>
          </button>
          {!collapsed && <button className="adm-exit" onClick={onExitAdmin}>← voltar à loja</button>}
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div>
            <h1>{tabs.find(t => t.id === tab)?.label}</h1>
            <p className="adm-topbar-sub">{topbarSub(tab)}</p>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-period">
              <button className="active">30 dias</button>
              <button>90 dias</button>
              <button>1 ano</button>
            </div>
            <div className="adm-user">
              <div className="adm-avatar">JM</div>
              <div>
                <strong>João Mutum</strong>
                <span>admin</span>
              </div>
            </div>
          </div>
        </header>

        <main className="adm-content">
          {tab === "dashboard" && <AdmDashboard/>}
          {tab === "orders" && <AdmOrders/>}
          {tab === "products" && <AdmProducts/>}
          {tab === "observability" && <AdmObservability/>}
        </main>
      </div>
    </div>
  );
}

function topbarSub(tab) {
  switch (tab) {
    case "dashboard": return "panorama dos últimos 30 dias";
    case "orders": return ADM.orders.length + " pedidos no período";
    case "products": return ADM.inventory.length + " SKUs ativos";
    case "observability": return "saúde do site em tempo real";
    default: return "";
  }
}

// ───────── Icons (line, monoline) ─────────
function AdmIcon({ name, size = 18, stroke = 2 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "grid": return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case "package": return <svg {...common}><path d="M3 7 L12 3 L21 7 V17 L12 21 L3 17 Z"/><path d="M3 7 L12 11 L21 7 M12 11 V21"/></svg>;
    case "box": return <svg {...common}><rect x="3" y="6" width="18" height="14" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "pulse": return <svg {...common}><path d="M3 12 H 7 L 10 5 L 14 19 L 17 12 H 21"/></svg>;
    case "trend-up": return <svg {...common}><path d="M3 17 L 9 11 L 13 15 L 21 7 M 15 7 H 21 V 13"/></svg>;
    case "trend-down": return <svg {...common}><path d="M3 7 L 9 13 L 13 9 L 21 17 M 15 17 H 21 V 11"/></svg>;
    case "search": return <svg {...common}><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/></svg>;
    case "filter": return <svg {...common}><path d="M3 5 H 21 L 14 13 V 20 L 10 18 V 13 Z"/></svg>;
    case "download": return <svg {...common}><path d="M12 4 V 16 M 7 11 L 12 16 L 17 11 M 4 20 H 20"/></svg>;
    case "dot": return <svg {...common}><circle cx="12" cy="12" r="4" fill="currentColor"/></svg>;
    case "external": return <svg {...common}><path d="M14 4 H 20 V 10 M 20 4 L 10 14 M 18 14 V 20 H 4 V 6 H 10"/></svg>;
    default: return null;
  }
}

// ───────── Dashboard ─────────
function AdmDashboard() {
  const k = ADM.kpis;
  return (
    <div className="adm-dash">
      {/* KPI grid */}
      <section className="adm-kpis">
        <KpiCard label={k.revenue.label} value={fmtBRL(k.revenue.value)} delta={k.revenue.delta} accent="primary"/>
        <KpiCard label={k.orders.label} value={fmtNum(k.orders.value)} delta={k.orders.delta}/>
        <KpiCard label={k.aov.label} value={fmtBRL(k.aov.value)} delta={k.aov.delta}/>
        <KpiCard label={k.conversion.label} value={k.conversion.value.toFixed(2) + "%"} delta={k.conversion.delta} deltaAsPP/>
        <KpiCard label={k.sessions.label} value={fmtNum(k.sessions.value)} delta={k.sessions.delta}/>
        <KpiCard label={k.refunds.label} value={fmtNum(k.refunds.value)} delta={k.refunds.delta} invertDelta/>
      </section>

      {/* Chart + Funnel */}
      <section className="adm-row-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <div>
              <h2>Receita por dia</h2>
              <p>últimos 30 dias · linha mostra tendência</p>
            </div>
            <div className="adm-chart-legend">
              <span><i style={{ background: "#ed6058" }}/>receita</span>
              <span><i style={{ background: "#fcebf1" }}/>pedidos</span>
            </div>
          </div>
          <RevenueChart data={ADM.dailySales}/>
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><h2>Funil de conversão</h2><p>jornada média de 30 dias</p></div>
          <Funnel data={ADM.funnel}/>
        </div>
      </section>

      {/* Top products + Traffic */}
      <section className="adm-row-2">
        <div className="adm-card">
          <div className="adm-card-head"><h2>Top produtos</h2><p>por receita gerada</p></div>
          <TopProducts data={ADM.topProducts}/>
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><h2>Origem do tráfego</h2><p>conversão por canal</p></div>
          <TrafficSources data={ADM.trafficSources}/>
        </div>
      </section>

      {/* Recent orders preview */}
      <section className="adm-card">
        <div className="adm-card-head">
          <div><h2>Pedidos recentes</h2><p>últimas 8 vendas</p></div>
          <a className="adm-card-link">ver todos →</a>
        </div>
        <OrdersTable orders={ADM.orders.slice(0, 8)} compact/>
      </section>
    </div>
  );
}

function KpiCard({ label, value, delta, accent, deltaAsPP, invertDelta }) {
  const positive = invertDelta ? delta < 0 : delta > 0;
  const sign = delta > 0 ? "+" : "";
  return (
    <div className={`adm-kpi ${accent === "primary" ? "adm-kpi-primary" : ""}`}>
      <div className="adm-kpi-label">{label}</div>
      <div className="adm-kpi-value">{value}</div>
      <div className={`adm-kpi-delta ${positive ? "up" : "down"}`}>
        <AdmIcon name={positive ? "trend-up" : "trend-down"} size={14}/>
        <span>{sign}{Math.abs(delta).toFixed(1)}{deltaAsPP ? " pp" : "%"} vs. 30d anteriores</span>
      </div>
    </div>
  );
}

// ───── Revenue chart (inline SVG, bars + line)
function RevenueChart({ data }) {
  const w = 720, h = 240, padL = 48, padR = 16, padT = 16, padB = 32;
  const max = Math.max(...data.map(d => d.revenue));
  const maxOrders = Math.max(...data.map(d => d.orders));
  const xStep = (w - padL - padR) / data.length;
  const yScale = (v) => h - padB - (v / max) * (h - padT - padB);
  const yScaleOrders = (v) => h - padB - (v / maxOrders) * (h - padT - padB);
  const linePath = data.map((d, i) => {
    const x = padL + i * xStep + xStep / 2;
    const y = yScaleOrders(d.orders);
    return `${i === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
  return (
    <svg className="adm-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      {/* gridlines */}
      {[0.25, 0.5, 0.75, 1].map((p, i) => (
        <g key={i}>
          <line x1={padL} x2={w - padR} y1={padT + (h - padT - padB) * (1 - p)} y2={padT + (h - padT - padB) * (1 - p)}
                stroke="#0001" strokeDasharray="3 4"/>
          <text x={padL - 8} y={padT + (h - padT - padB) * (1 - p) + 4} fontSize="10" fill="#0008" textAnchor="end" fontFamily="DM Mono">
            {p === 1 ? "R$" + Math.round(max/1000) + "k" : Math.round(max * p / 1000) + "k"}
          </text>
        </g>
      ))}
      {/* bars */}
      {data.map((d, i) => {
        const x = padL + i * xStep + 2;
        const y = yScale(d.revenue);
        const bh = h - padB - y;
        const bw = xStep - 4;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} rx="3" fill="#ed6058" opacity={i === data.length - 1 ? 1 : 0.85}>
              <title>{d.date} · {fmtBRL(d.revenue)} · {d.orders} pedidos</title>
            </rect>
          </g>
        );
      })}
      {/* orders line */}
      <path d={linePath} stroke="#2a1612" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((d, i) => {
        const x = padL + i * xStep + xStep / 2;
        const y = yScaleOrders(d.orders);
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#fdfedf" stroke="#2a1612" strokeWidth="1.5"/>;
      })}
      {/* x axis */}
      {data.filter((_, i) => i % 5 === 0).map((d, i) => {
        const idx = data.indexOf(d);
        const x = padL + idx * xStep + xStep / 2;
        return <text key={i} x={x} y={h - padB + 18} fontSize="10" fill="#0008" textAnchor="middle" fontFamily="DM Mono">{d.day}</text>;
      })}
    </svg>
  );
}

// ───── Funnel
function Funnel({ data }) {
  const max = data[0].value;
  return (
    <div className="adm-funnel">
      {data.map((s, i) => (
        <div key={s.label} className="adm-funnel-row">
          <div className="adm-funnel-label">
            <span>{s.label}</span>
            <strong>{fmtNum(s.value)}</strong>
          </div>
          <div className="adm-funnel-bar">
            <div style={{ width: `${(s.value / max) * 100}%` }}/>
          </div>
          <div className="adm-funnel-pct">{s.pct}%</div>
        </div>
      ))}
    </div>
  );
}

// ───── Top products
function TopProducts({ data }) {
  const max = data[0].revenue;
  return (
    <div className="adm-toplist">
      {data.map((p, i) => (
        <div key={p.name} className="adm-toplist-row">
          <div className="adm-toplist-rank">{i + 1}</div>
          <div className="adm-toplist-info">
            <strong>{p.name}</strong>
            <span>{p.units} unidades · {fmtBRL(p.revenue)}</span>
          </div>
          <div className="adm-toplist-bar">
            <div style={{ width: `${(p.revenue / max) * 100}%` }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───── Traffic sources
function TrafficSources({ data }) {
  const total = data.reduce((s, t) => s + t.sessions, 0);
  return (
    <div className="adm-traffic">
      <div className="adm-traffic-bar">
        {data.map(s => (
          <div key={s.source} style={{ width: `${(s.sessions / total) * 100}%`, background: s.color }} title={s.source}/>
        ))}
      </div>
      <div className="adm-traffic-list">
        {data.map(s => (
          <div key={s.source} className="adm-traffic-row">
            <span className="adm-traffic-dot" style={{ background: s.color }}/>
            <div className="adm-traffic-info">
              <strong>{s.source}</strong>
              <span>{fmtNum(s.sessions)} sessões · {((s.sessions / total) * 100).toFixed(1)}%</span>
            </div>
            <div className="adm-traffic-conv"><strong>{s.conv}%</strong><em>conv</em></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ───────── Orders ─────────
function AdmOrders() {
  const [filter, setFilter] = aS("todos");
  const [q, setQ] = aS("");
  const [viewing, setViewing] = aS(null);
  const filtered = aM(() => {
    return ADM.orders.filter(o => {
      if (filter !== "todos" && o.status !== filter) return false;
      if (q && !(o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.name.toLowerCase().includes(q.toLowerCase()))) return false;
      return true;
    });
  }, [filter, q]);
  const counts = aM(() => {
    const c = { todos: ADM.orders.length };
    ["pendente","pago","enviado","entregue","cancelado"].forEach(s => {
      c[s] = ADM.orders.filter(o => o.status === s).length;
    });
    return c;
  }, []);
  return (
    <div className="adm-orders">
      <div className="adm-orders-controls">
        <div className="adm-tabs">
          {["todos","pendente","pago","enviado","entregue","cancelado"].map(s => (
            <button key={s} className={filter === s ? "active" : ""} onClick={() => setFilter(s)}>
              <span>{s}</span>
              <em>{counts[s]}</em>
            </button>
          ))}
        </div>
        <div className="adm-orders-actions">
          <div className="adm-search">
            <AdmIcon name="search" size={16}/>
            <input placeholder="buscar por ID ou cliente..." value={q} onChange={e => setQ(e.target.value)}/>
          </div>
          <button className="adm-btn"><AdmIcon name="download" size={14}/>exportar CSV</button>
        </div>
      </div>
      <div className="adm-card adm-card-flush">
        <OrdersTable orders={filtered} onView={(o) => setViewing(o)}/>
      </div>
      {viewing && <AdmOrderDrawer order={viewing} onClose={() => setViewing(null)}/>}
    </div>
  );
}

function OrdersTable({ orders, compact, onView }) {
  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Itens</th>
            <th>Total</th>
            <th>Pagamento</th>
            <th>Status</th>
            {!compact && <th></th>}
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td><strong>{o.id}</strong></td>
              <td>
                <div className="adm-cell-stack">
                  <strong>{o.customer.name}</strong>
                  <span>{o.customer.city}</span>
                </div>
              </td>
              <td>{o.date.toLocaleDateString("pt-BR")} <em>{o.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</em></td>
              <td>{o.items.reduce((s, i) => s + i.qty, 0)} item{o.items.length > 1 ? "s" : ""}</td>
              <td><strong>{fmtBRL(o.total)}</strong></td>
              <td><span className="adm-pay">{o.payment}</span></td>
              <td><StatusPill status={o.status}/></td>
              {!compact && <td><button className="adm-row-action" onClick={() => onView && onView(o)}>ver →</button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={`adm-status adm-status-${status}`}>{status}</span>;
}

// ───────── Products ─────────
function AdmProducts() {
  const [q, setQ] = aS("");
  const [items, setItems] = aS(ADM.inventory);
  const [editing, setEditing] = aS(null);
  const [adding, setAdding] = aS(false);
  const [deleteConfirm, setDeleteConfirm] = aS(null);
  const [toast, setToast] = aS("");

  const filtered = items.filter(p => !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.sku.toLowerCase().includes(q.toLowerCase()));

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2400); };

  const saveProduct = (data) => {
    if (editing) {
      setItems(items.map(p => p.sku === editing.sku ? { ...editing, ...data } : p));
      showToast(`✓ ${data.name} atualizado`);
    } else {
      const sku = "SKU-" + Math.random().toString(36).slice(2, 8).toUpperCase();
      setItems([{ ...data, sku, sold30d: 0 }, ...items]);
      showToast(`✓ ${data.name} criado`);
    }
    setEditing(null);
    setAdding(false);
  };

  const deleteProduct = (sku) => {
    const p = items.find(i => i.sku === sku);
    setItems(items.filter(i => i.sku !== sku));
    showToast(`× ${p.name} removido`);
    setDeleteConfirm(null);
  };

  return (
    <div className="adm-products">
      <div className="adm-orders-controls">
        <div className="adm-search">
          <AdmIcon name="search" size={16}/>
          <input placeholder="buscar produto ou SKU..." value={q} onChange={e => setQ(e.target.value)}/>
        </div>
        <div className="adm-orders-actions">
          <button className="adm-btn" onClick={() => setAdding(true)}>+ novo produto</button>
        </div>
      </div>
      <div className="adm-card adm-card-flush">
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>SKU</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Vendas 30d</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const lowStock = p.stock < 10;
                const oos = p.stock === 0;
                return (
                  <tr key={p.sku}>
                    <td><strong>{p.name}</strong></td>
                    <td><code className="adm-sku">{p.sku}</code></td>
                    <td>{fmtBRL(p.price)}</td>
                    <td>
                      <div className="adm-stock">
                        <strong>{p.stock}</strong>
                        <div className="adm-stock-bar">
                          <div style={{ width: `${Math.min(100, p.stock)}%`, background: oos ? "#c43030" : lowStock ? "#f2a23a" : "#3da888" }}/>
                        </div>
                      </div>
                    </td>
                    <td>{p.sold30d}</td>
                    <td>
                      {oos
                        ? <span className="adm-status adm-status-cancelado">esgotado</span>
                        : lowStock
                          ? <span className="adm-status adm-status-pendente">estoque baixo</span>
                          : <span className="adm-status adm-status-entregue">em estoque</span>}
                    </td>
                    <td>
                      <div className="adm-product-actions">
                        <button className="adm-row-action" onClick={() => setEditing(p)}>editar</button>
                        <button className="adm-row-action adm-row-action-danger" onClick={() => setDeleteConfirm(p)}>excluir</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {(editing || adding) && (
        <ProductFormDrawer
          initial={editing}
          onClose={() => { setEditing(null); setAdding(false); }}
          onSave={saveProduct}
        />
      )}
      {deleteConfirm && (
        <DeleteProductModal
          product={deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={() => deleteProduct(deleteConfirm.sku)}
        />
      )}
      {toast && <div className="adm-drawer-toast">{toast}</div>}
    </div>
  );
}

// ───── Product Form (drawer)
function ProductFormDrawer({ initial, onClose, onSave }) {
  const isEdit = !!initial;
  const [data, setData] = aS(initial ? { ...initial } : {
    name: "",
    description: "",
    category: "brincar",
    price: "",
    cost: "",
    stock: 0,
    weight: "",
    tags: [],
    photos: [],
    active: true
  });
  const [tab, setTab] = aS("info");
  const upd = (k, v) => setData({ ...data, [k]: v });

  const margin = data.cost && data.price ? ((data.price - data.cost) / data.price * 100).toFixed(0) : 0;
  const canSave = data.name && data.price > 0 && data.category;

  const categories = ["brincar", "descansar", "hidratar", "passear", "cuidar"];

  return (
    <>
      <div className="adm-drawer-mask" onClick={onClose}/>
      <aside className="adm-drawer adm-drawer-wide">
        <header className="adm-drawer-head">
          <div>
            <div className="adm-modal-eyebrow">{isEdit ? "editando produto" : "novo produto"}</div>
            <h2>{isEdit ? data.name : "criar produto"}</h2>
            <p>{isEdit ? `SKU ${data.sku}` : "preencha os dados e publique"}</p>
          </div>
          <div className="adm-drawer-head-right">
            <label className="adm-toggle-row adm-toggle-inline">
              <input type="checkbox" checked={data.active} onChange={e => upd("active", e.target.checked)}/>
              <span className="adm-check"/>
              <span>{data.active ? "ativo" : "rascunho"}</span>
            </label>
            <button className="adm-modal-close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
            </button>
          </div>
        </header>

        <nav className="adm-drawer-tabs">
          {[
            { id: "info", label: "Informações" },
            { id: "pricing", label: "Preço & estoque" },
            { id: "media", label: "Fotos", count: data.photos.length },
            { id: "seo", label: "SEO & visibilidade" }
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
              {t.label}
              {t.count != null && <em>{t.count}</em>}
            </button>
          ))}
        </nav>

        <div className="adm-drawer-body">
          {tab === "info" && (
            <>
              <section className="adm-dd-section">
                <h3>Identificação</h3>
                <div className="adm-form">
                  <div className="adm-form-row">
                    <label>nome do produto</label>
                    <input value={data.name} onChange={e => upd("name", e.target.value)} placeholder="ex: Ratinho elétrico Picapau"/>
                  </div>
                  <div className="adm-form-row">
                    <label>descrição curta (aparece no card)</label>
                    <input value={data.tagline || ""} onChange={e => upd("tagline", e.target.value)} placeholder="ex: corre, vira e desafia o instinto"/>
                  </div>
                  <div className="adm-form-row">
                    <label>história do produto</label>
                    <textarea
                      value={data.description}
                      onChange={e => upd("description", e.target.value)}
                      rows="4"
                      placeholder="conte a história desse produto: o que faz, pra qual tipo de gato, o que tem de especial..."
                    />
                  </div>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Categoria</h3>
                <div className="adm-form-chips">
                  {categories.map(c => (
                    <button key={c} type="button" className={`adm-form-chip ${data.category === c ? "on" : ""}`} onClick={() => upd("category", c)}>{c}</button>
                  ))}
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Tags & especificações</h3>
                <div className="adm-form-row">
                  <label>tags (pra busca e filtros)</label>
                  <div className="adm-tag-input">
                    {(data.tags || []).map((t, i) => (
                      <span key={i} className="adm-tag-chip">
                        {t}
                        <button onClick={() => upd("tags", data.tags.filter((_, ix) => ix !== i))}>×</button>
                      </span>
                    ))}
                    <input
                      placeholder="enter pra adicionar..."
                      onKeyDown={e => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          upd("tags", [...(data.tags || []), e.target.value.trim()]);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="adm-form-row">
                  <label>especificações (uma por linha)</label>
                  <textarea
                    value={(data.specs || []).join("\n")}
                    onChange={e => upd("specs", e.target.value.split("\n").filter(Boolean))}
                    rows="4"
                    placeholder="Recarregável USB-C&#10;Autonomia 4h&#10;Modo noite silencioso"
                  />
                </div>
              </section>
            </>
          )}

          {tab === "pricing" && (
            <>
              <section className="adm-dd-section">
                <h3>Preço</h3>
                <div className="adm-form">
                  <div className="adm-form-row-split">
                    <div className="adm-form-row">
                      <label>preço de venda</label>
                      <div className="adm-form-prefix">
                        <span>R$</span>
                        <input type="number" step="0.01" value={data.price} onChange={e => upd("price", +e.target.value)} placeholder="0,00"/>
                      </div>
                    </div>
                    <div className="adm-form-row">
                      <label>preço antigo (riscado)</label>
                      <div className="adm-form-prefix">
                        <span>R$</span>
                        <input type="number" step="0.01" value={data.old || ""} onChange={e => upd("old", +e.target.value)} placeholder="0,00"/>
                      </div>
                    </div>
                  </div>
                  <div className="adm-form-row-split">
                    <div className="adm-form-row">
                      <label>custo do produto</label>
                      <div className="adm-form-prefix">
                        <span>R$</span>
                        <input type="number" step="0.01" value={data.cost || ""} onChange={e => upd("cost", +e.target.value)} placeholder="0,00"/>
                      </div>
                    </div>
                    <div className="adm-form-row">
                      <label>margem estimada</label>
                      <div className="adm-form-prefix adm-form-readonly">
                        <span style={{ color: margin > 30 ? "#3da888" : margin > 0 ? "#f2a23a" : "#c43030" }}>{margin}%</span>
                        <input value={data.cost && data.price ? fmtBRL(data.price - data.cost) : "—"} readOnly/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Estoque</h3>
                <div className="adm-form">
                  <div className="adm-form-row-split">
                    <div className="adm-form-row">
                      <label>quantidade em estoque</label>
                      <input type="number" min="0" value={data.stock} onChange={e => upd("stock", +e.target.value)}/>
                    </div>
                    <div className="adm-form-row">
                      <label>alerta de estoque baixo</label>
                      <input type="number" min="0" value={data.lowStockAlert || 10} onChange={e => upd("lowStockAlert", +e.target.value)}/>
                    </div>
                  </div>
                  <label className="adm-toggle-row">
                    <input type="checkbox" defaultChecked/>
                    <span className="adm-check"/>
                    <span>permitir venda sem estoque (pré-venda)</span>
                  </label>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Logística</h3>
                <div className="adm-form-row-split">
                  <div className="adm-form-row">
                    <label>peso embalado (kg)</label>
                    <input type="number" step="0.01" value={data.weight || ""} onChange={e => upd("weight", e.target.value)} placeholder="0.50"/>
                  </div>
                  <div className="adm-form-row">
                    <label>dimensões (cm)</label>
                    <input value={data.dimensions || ""} onChange={e => upd("dimensions", e.target.value)} placeholder="20 × 15 × 8"/>
                  </div>
                </div>
              </section>
            </>
          )}

          {tab === "media" && (
            <section className="adm-dd-section">
              <h3>Fotos do produto</h3>
              <p style={{ fontSize: 12, color: "var(--adm-mute)", fontFamily: "DM Mono" }}>
                a primeira foto é a principal. arraste para reordenar. recomendado: quadrado, 1200×1200px mínimo.
              </p>
              <div className="adm-media-grid">
                {(data.photos || []).map((p, i) => (
                  <div key={i} className="adm-media-slot">
                    <img src={p}/>
                    {i === 0 && <span className="adm-media-main">principal</span>}
                    <button onClick={() => upd("photos", data.photos.filter((_, ix) => ix !== i))}>×</button>
                  </div>
                ))}
                <label className="adm-media-add">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="6" width="18" height="14" rx="3"/>
                    <path d="M3 16 L 8 11 L 13 16 L 16 13 L 21 18"/>
                    <circle cx="15.5" cy="10.5" r="1.5"/>
                  </svg>
                  <span>adicionar foto</span>
                  <em>JPG ou PNG · até 5MB</em>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    onChange={e => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(f => {
                        const reader = new FileReader();
                        reader.onload = () => upd("photos", [...(data.photos || []), reader.result]);
                        reader.readAsDataURL(f);
                      });
                    }}
                  />
                </label>
              </div>
            </section>
          )}

          {tab === "seo" && (
            <>
              <section className="adm-dd-section">
                <h3>SEO</h3>
                <div className="adm-form">
                  <div className="adm-form-row">
                    <label>slug (URL)</label>
                    <div className="adm-form-prefix">
                      <span>/produto/</span>
                      <input value={data.slug || ""} onChange={e => upd("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="ratinho-eletro"/>
                    </div>
                  </div>
                  <div className="adm-form-row">
                    <label>título da página (meta title)</label>
                    <input value={data.seoTitle || ""} onChange={e => upd("seoTitle", e.target.value)} placeholder="auto-gerado do nome do produto" maxLength="70"/>
                    <span className="adm-form-counter">{(data.seoTitle || "").length} / 70</span>
                  </div>
                  <div className="adm-form-row">
                    <label>descrição (meta description)</label>
                    <textarea
                      value={data.seoDesc || ""}
                      onChange={e => upd("seoDesc", e.target.value)}
                      rows="3"
                      maxLength="160"
                      placeholder="texto que aparece no Google"
                    />
                    <span className="adm-form-counter">{(data.seoDesc || "").length} / 160</span>
                  </div>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Visibilidade</h3>
                <div className="adm-form-toggles">
                  <label className="adm-toggle-row">
                    <input type="checkbox" defaultChecked/>
                    <span className="adm-check"/>
                    <span>aparecer na busca do site</span>
                  </label>
                  <label className="adm-toggle-row">
                    <input type="checkbox" defaultChecked/>
                    <span className="adm-check"/>
                    <span>aparecer em recomendações</span>
                  </label>
                  <label className="adm-toggle-row">
                    <input type="checkbox"/>
                    <span className="adm-check"/>
                    <span>destacar como novidade</span>
                  </label>
                  <label className="adm-toggle-row">
                    <input type="checkbox"/>
                    <span className="adm-check"/>
                    <span>marcar como best-seller</span>
                  </label>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Preview na loja</h3>
                <div className="adm-product-preview">
                  <div className="adm-product-preview-img">
                    {data.photos?.[0] ? <img src={data.photos[0]}/> : <span>foto principal</span>}
                  </div>
                  <div className="adm-product-preview-info">
                    <strong>{data.name || "Nome do produto"}</strong>
                    <p>{data.tagline || "descrição curta..."}</p>
                    <div className="adm-product-preview-price">
                      {data.old > 0 && <s>{fmtBRL(data.old)}</s>}
                      <strong>{data.price > 0 ? fmtBRL(data.price) : "R$ 0,00"}</strong>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>

        <footer className="adm-drawer-foot">
          <button className="adm-modal-back" onClick={onClose}>cancelar</button>
          <div className="adm-drawer-foot-actions">
            {!isEdit && <button className="adm-btn" style={{ background: "white", color: "var(--adm-ink)", border: "1px solid var(--adm-line)" }}>salvar como rascunho</button>}
            <button className="adm-btn" disabled={!canSave} onClick={() => onSave(data)}>
              {isEdit ? "salvar alterações" : "publicar produto"}
            </button>
          </div>
        </footer>
      </aside>
    </>
  );
}

// ───── Delete confirmation
function DeleteProductModal({ product, onClose, onConfirm }) {
  const [confirmText, setConfirmText] = aS("");
  const ok = confirmText === product.name;
  return (
    <div className="adm-modal-mask" onClick={onClose}>
      <div className="adm-modal adm-modal-danger" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
        <button className="adm-modal-close" onClick={onClose}>×</button>
        <header className="adm-modal-head" style={{ display: "block" }}>
          <div className="adm-modal-eyebrow adm-modal-eyebrow-danger">ação irreversível</div>
          <h2>excluir produto?</h2>
          <p><strong>{product.name}</strong> será removido permanentemente do catálogo. pedidos existentes não serão afetados.</p>
        </header>
        <div className="adm-modal-body">
          <div className="adm-form-row">
            <label>digite <strong>{product.name}</strong> para confirmar</label>
            <input value={confirmText} onChange={e => setConfirmText(e.target.value)} autoFocus/>
          </div>
        </div>
        <footer className="adm-modal-foot">
          <button className="adm-modal-back" onClick={onClose}>cancelar</button>
          <button
            className="adm-btn"
            style={{ background: "var(--adm-red)" }}
            disabled={!ok}
            onClick={onConfirm}
          >excluir definitivamente</button>
        </footer>
      </div>
    </div>
  );
}

// ───────── Observability ─────────
function AdmObservability() {
  const v = ADM.webVitals;
  const [analyzing, setAnalyzing] = aS(null);
  return (
    <div className="adm-obs">
      {/* ── User behavior / clicks ── */}
      <section className="adm-row-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <div><h2>Cliques em tempo real</h2><p>últimos 60 minutos · 1 ponto por minuto</p></div>
            <div className="adm-live-indicator">
              <span className="adm-live-dot"/>
              <strong>{ADM.liveClicks[ADM.liveClicks.length - 1].clicks}</strong>
              <em>cliques/min agora</em>
            </div>
          </div>
          <LiveClicksChart data={ADM.liveClicks}/>
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><h2>Dispositivos</h2><p>distribuição e conversão</p></div>
          <div className="adm-devices">
            {ADM.devices.map(d => (
              <div key={d.name} className="adm-device">
                <div className="adm-device-head">
                  <strong>{d.name}</strong>
                  <span>{d.pct}%</span>
                </div>
                <div className="adm-device-bar"><div style={{ width: `${d.pct}%` }}/></div>
                <div className="adm-device-foot">
                  <span>{fmtNum(d.sessions)} sessões</span>
                  <span className="adm-device-conv">{d.conv}% conv</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Heatmap + Top clicks ── */}
      <section className="adm-row-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <div><h2>Mapa de calor — Home</h2><p>onde os usuários estão clicando</p></div>
            <div className="adm-heat-scale">
              <span>frio</span>
              <div className="adm-heat-gradient"/>
              <span>quente</span>
            </div>
          </div>
          <HomeHeatmap data={ADM.heatmap}/>
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><h2>Elementos mais clicados</h2><p>ranking por volume e taxa de clique</p></div>
          <ClickElementsViz data={ADM.topClicks}/>
        </div>
      </section>

      {/* ── Top pages ── */}
      <section className="adm-card">
        <div className="adm-card-head"><h2>Páginas mais visitadas</h2><p>tempo médio, bounce e taxa de saída</p></div>
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Página</th>
                <th>Views</th>
                <th>Tempo médio</th>
                <th>Bounce</th>
                <th>Exit rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {ADM.topPages.map(p => (
                <tr key={p.path}>
                  <td><code className="adm-sku">{p.path}</code></td>
                  <td><strong>{fmtNum(p.views)}</strong></td>
                  <td>{p.avgTime}</td>
                  <td>
                    <div className="adm-pages-bar">
                      <div style={{ width: `${p.bounce}%`, background: p.bounce > 30 ? "#f2a23a" : "#3da888" }}/>
                      <span>{p.bounce}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="adm-pages-bar">
                      <div style={{ width: `${p.exit}%`, background: p.exit > 50 ? "#c43030" : p.exit > 30 ? "#f2a23a" : "#3da888" }}/>
                      <span>{p.exit}%</span>
                    </div>
                  </td>
                  <td><button className="adm-row-action" onClick={() => setAnalyzing(p)}>analisar →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Core Web Vitals ── */}
      <section className="adm-card">
        <div className="adm-card-head">
          <div><h2>Core Web Vitals</h2><p>percentil 75, últimos 30 dias · dados reais de usuários (RUM)</p></div>
          <span className="adm-badge adm-badge-ok">tudo no verde</span>
        </div>
        <div className="adm-vitals">
          {Object.entries(v).map(([key, m]) => {
            const ok = m.value <= m.target;
            const pct = Math.min(100, (m.value / m.target) * 100);
            return (
              <div key={key} className="adm-vital">
                <div className="adm-vital-head">
                  <strong>{key}</strong>
                  <span className={`adm-vital-state ${ok ? "ok" : "bad"}`}>{ok ? "BOM" : "RUIM"}</span>
                </div>
                <div className="adm-vital-value">{m.value}<em>{m.unit}</em></div>
                <div className="adm-vital-bar">
                  <div style={{ width: `${pct}%`, background: ok ? "#3da888" : "#c43030" }}/>
                </div>
                <div className="adm-vital-foot">
                  <span>{m.label}</span>
                  <span className={`adm-vital-trend ${m.trend < 0 ? "good" : "bad"}`}>
                    {m.trend > 0 ? "+" : ""}{m.trend}{m.unit} vs. 30d
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="adm-row-2">
        <div className="adm-card">
          <div className="adm-card-head">
            <div><h2>Uptime</h2><p>últimos 60 dias · status check a cada 1 min</p></div>
            <strong className="adm-uptime-pct">99.94%</strong>
          </div>
          <div className="adm-uptime">
            {ADM.uptime.map((d, i) => (
              <span key={i} className={`adm-uptime-cell adm-uptime-${d.status}`} title={`${d.date} — ${d.status}`}/>
            ))}
          </div>
          <div className="adm-uptime-legend">
            <span><i className="adm-uptime-ok"/>OK</span>
            <span><i className="adm-uptime-degraded"/>degradado</span>
            <span><i className="adm-uptime-down"/>fora do ar</span>
          </div>
        </div>
        <div className="adm-card">
          <div className="adm-card-head"><h2>Latência por rota</h2><p>p95 nas últimas 24h</p></div>
          <div className="adm-latency">
            {[
              { r: "GET /", v: 142, max: 300 },
              { r: "GET /produto/[id]", v: 215, max: 300 },
              { r: "GET /api/cart", v: 88, max: 200 },
              { r: "POST /api/checkout", v: 412, max: 600 },
              { r: "GET /api/shipping", v: 1820, max: 1000, bad: true },
              { r: "POST /api/webhook/mp", v: 64, max: 200 }
            ].map(l => (
              <div key={l.r} className="adm-lat-row">
                <code className="adm-lat-route">{l.r}</code>
                <div className="adm-lat-bar">
                  <div style={{ width: `${Math.min(100, (l.v / l.max) * 100)}%`, background: l.bad ? "#c43030" : l.v > l.max * 0.8 ? "#f2a23a" : "#3da888" }}/>
                </div>
                <strong className={l.bad ? "bad" : ""}>{l.v} ms</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="adm-card">
        <div className="adm-card-head"><h2>Eventos recentes</h2><p>logs operacionais e alertas</p></div>
        <div className="adm-events">
          {ADM.events.map((e, i) => (
            <div key={i} className={`adm-event adm-event-${e.type}`}>
              <span className="adm-event-dot"/>
              <div className="adm-event-msg">
                <strong>{e.msg}</strong>
                <span><code>{e.source}</code> · {e.at}</span>
              </div>
              <span className={`adm-event-type adm-event-type-${e.type}`}>{e.type}</span>
            </div>
          ))}
        </div>
      </section>

      {analyzing && <PageAnalyzeModal page={analyzing} onClose={() => setAnalyzing(null)}/>}
    </div>
  );
}

// ───── Click elements viz (horizontal bar chart with details)
function ClickElementsViz({ data }) {
  const max = Math.max(...data.map(d => d.clicks));
  return (
    <div className="adm-clicks-viz">
      {data.map((c, i) => (
        <div key={c.selector} className="adm-cev-row">
          <div className="adm-cev-rank">{String(i + 1).padStart(2, "0")}</div>
          <div className="adm-cev-main">
            <div className="adm-cev-head">
              <strong>{c.label}</strong>
              <div className="adm-cev-meta">
                <code>{c.selector}</code>
                <em>em {c.page}</em>
              </div>
            </div>
            <div className="adm-cev-track">
              <div className="adm-cev-bar" style={{ width: `${(c.clicks / max) * 100}%` }}>
                <span>{fmtNum(c.clicks)}</span>
              </div>
            </div>
          </div>
          <div className="adm-cev-ctr">
            <strong>{c.rate}%</strong>
            <em>CTR</em>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───── Page Analyze Modal
function PageAnalyzeModal({ page, onClose }) {
  const referrers = [
    { src: "Instagram (paid)", pct: 38, sessions: Math.round(page.views * 0.38) },
    { src: "Google orgânico", pct: 27, sessions: Math.round(page.views * 0.27) },
    { src: "Direto", pct: 14, sessions: Math.round(page.views * 0.14) },
    { src: "Email", pct: 11, sessions: Math.round(page.views * 0.11) },
    { src: "Outras", pct: 10, sessions: Math.round(page.views * 0.10) }
  ];
  const nextPages = [
    { path: "/cat/brincar", pct: 32 },
    { path: "/produto/[id]", pct: 24 },
    { path: "/checkout", pct: 18 },
    { path: "saiu do site (exit)", pct: 22, exit: true },
    { path: "/quiz", pct: 4 }
  ];
  const scrollDepth = [
    { depth: "0-25%", users: 100 },
    { depth: "25-50%", users: 82 },
    { depth: "50-75%", users: 64 },
    { depth: "75-90%", users: 48 },
    { depth: "100%", users: 36 }
  ];
  const timeBuckets = [
    { range: "<10s", pct: 18, color: "#c43030" },
    { range: "10-30s", pct: 22, color: "#f2a23a" },
    { range: "30s-1min", pct: 28, color: "#3da888" },
    { range: "1-3min", pct: 22, color: "#3da888" },
    { range: ">3min", pct: 10, color: "#1a8e72" }
  ];

  return (
    <div className="adm-modal-mask" onClick={onClose}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <button className="adm-modal-close" onClick={onClose}>×</button>
        <header className="adm-modal-head">
          <div>
            <span className="adm-modal-eyebrow">análise de página</span>
            <h2>{page.path}</h2>
            <p>{fmtNum(page.views)} visualizações · tempo médio {page.avgTime} · {page.bounce}% bounce · {page.exit}% exit</p>
          </div>
          <a className="adm-card-link" href={page.path === "/" ? "Pata de Veludo.html" : "#"} target="_blank">abrir página ↗</a>
        </header>

        <div className="adm-modal-body">
          {/* KPIs */}
          <div className="adm-pa-kpis">
            <div className="adm-pa-kpi"><span>views</span><strong>{fmtNum(page.views)}</strong></div>
            <div className="adm-pa-kpi"><span>únicos</span><strong>{fmtNum(Math.round(page.views * 0.78))}</strong></div>
            <div className="adm-pa-kpi"><span>tempo médio</span><strong>{page.avgTime}</strong></div>
            <div className="adm-pa-kpi"><span>bounce</span><strong className={page.bounce > 30 ? "warn" : ""}>{page.bounce}%</strong></div>
            <div className="adm-pa-kpi"><span>exit rate</span><strong className={page.exit > 50 ? "bad" : page.exit > 30 ? "warn" : ""}>{page.exit}%</strong></div>
          </div>

          {/* Time distribution */}
          <section className="adm-pa-section">
            <h3>distribuição de tempo na página</h3>
            <div className="adm-pa-timedist">
              {timeBuckets.map(b => (
                <div key={b.range} className="adm-pa-td-bar" style={{ flex: b.pct }}>
                  <div style={{ background: b.color, height: `${b.pct * 3}px` }}/>
                  <strong>{b.pct}%</strong>
                  <span>{b.range}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="adm-pa-row">
            {/* Referrers */}
            <section className="adm-pa-section">
              <h3>de onde vieram</h3>
              <div className="adm-pa-list">
                {referrers.map(r => (
                  <div key={r.src} className="adm-pa-listrow">
                    <span>{r.src}</span>
                    <div className="adm-pa-listbar"><div style={{ width: r.pct + "%" }}/></div>
                    <strong>{r.pct}%</strong>
                    <em>{fmtNum(r.sessions)}</em>
                  </div>
                ))}
              </div>
            </section>

            {/* Next pages */}
            <section className="adm-pa-section">
              <h3>pra onde foram</h3>
              <div className="adm-pa-list">
                {nextPages.map(n => (
                  <div key={n.path} className={`adm-pa-listrow ${n.exit ? "exit" : ""}`}>
                    <span>{n.path}</span>
                    <div className="adm-pa-listbar"><div style={{ width: n.pct + "%", background: n.exit ? "#c43030" : "#ed6058" }}/></div>
                    <strong>{n.pct}%</strong>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Scroll depth */}
          <section className="adm-pa-section">
            <h3>profundidade de scroll</h3>
            <div className="adm-pa-scroll">
              {scrollDepth.map((s, i) => (
                <div key={s.depth} className="adm-pa-scroll-row">
                  <span className="adm-pa-scroll-label">{s.depth}</span>
                  <div className="adm-pa-scroll-bar">
                    <div style={{ width: s.users + "%", background: `linear-gradient(90deg, #ed6058, #f08c84)` }}>
                      <em>{s.users}%</em>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="adm-pa-hint">apenas 36% dos usuários chegam ao final da página — considere mover CTAs mais para cima.</p>
          </section>

          {/* Suggested actions */}
          <section className="adm-pa-section">
            <h3>recomendações automáticas</h3>
            <div className="adm-pa-actions">
              {page.bounce > 30 && (
                <div className="adm-pa-action warn">
                  <span className="adm-pa-action-dot"/>
                  <div>
                    <strong>Bounce rate alto ({page.bounce}%)</strong>
                    <p>Melhore a velocidade de carregamento e o título da página. O LCP dessa rota é de 2.3s.</p>
                  </div>
                  <button>investigar →</button>
                </div>
              )}
              {page.exit > 30 && (
                <div className="adm-pa-action info">
                  <span className="adm-pa-action-dot"/>
                  <div>
                    <strong>Exit rate elevado ({page.exit}%)</strong>
                    <p>22% dos usuários saem do site após esta página. Adicione cross-sell e cards de produtos relacionados.</p>
                  </div>
                  <button>ver mockup →</button>
                </div>
              )}
              <div className="adm-pa-action ok">
                <span className="adm-pa-action-dot"/>
                <div>
                  <strong>Performance OK</strong>
                  <p>FCP, LCP e CLS dentro do alvo do Core Web Vitals.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// ───── Live clicks chart (sparkline area)
function LiveClicksChart({ data }) {
  const w = 600, h = 160, padL = 8, padR = 8, padT = 16, padB = 24;
  const max = Math.max(...data.map(d => d.clicks)) * 1.1;
  const xStep = (w - padL - padR) / (data.length - 1);
  const y = (v) => h - padB - (v / max) * (h - padT - padB);
  const pts = data.map((d, i) => `${padL + i * xStep},${y(d.clicks)}`);
  const areaPath = `M ${padL},${h - padB} L ${pts.join(" L ")} L ${w - padR},${h - padB} Z`;
  const linePath = `M ${pts.join(" L ")}`;
  return (
    <svg className="adm-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ height: 180 }}>
      <defs>
        <linearGradient id="liveGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ed6058" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#ed6058" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#liveGrad)"/>
      <path d={linePath} stroke="#ed6058" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
      {/* current point pulse */}
      <circle cx={padL + (data.length - 1) * xStep} cy={y(data[data.length - 1].clicks)} r="5" fill="#ed6058">
        <animate attributeName="r" values="4;7;4" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx={padL + (data.length - 1) * xStep} cy={y(data[data.length - 1].clicks)} r="3" fill="#fdfedf" stroke="#ed6058" strokeWidth="1.5"/>
      {/* x labels */}
      {[0, 15, 30, 45, 59].map(i => (
        <text key={i} x={padL + i * xStep} y={h - 6} fontSize="9" fill="#0008" textAnchor="middle" fontFamily="DM Mono">
          -{59 - i}min
        </text>
      ))}
    </svg>
  );
}

// ───── Home heatmap mock
function HomeHeatmap({ data }) {
  return (
    <div className="adm-heatmap">
      {/* simulated home thumbnail */}
      <div className="adm-heatmap-bg">
        <div className="adm-heat-region adm-heat-r1"/>
        <div className="adm-heat-region adm-heat-r2"/>
        <div className="adm-heat-region adm-heat-r3"/>
        <div className="adm-heat-region adm-heat-r4"/>
        <div className="adm-heat-region adm-heat-r5"/>
        <div className="adm-heat-region adm-heat-r6"/>
        <div className="adm-heat-region adm-heat-r7"/>
        {data.map((h, i) => {
          const opacity = 0.25 + h.i * 0.55;
          const size = 60 + h.i * 60;
          return (
            <div
              key={i}
              className="adm-heat-blob"
              style={{
                left: `${h.x + h.w / 2}%`,
                top: `${h.y + h.h / 2}%`,
                width: size,
                height: size,
                background: `radial-gradient(circle, rgba(237,96,88,${opacity}) 0%, rgba(237,96,88,${opacity * 0.4}) 35%, transparent 70%)`
              }}
              title={`${h.label} · intensidade ${(h.i * 100).toFixed(0)}%`}
            />
          );
        })}
      </div>
      <div className="adm-heatmap-footnote">
        <span>amostra de <strong>{fmtNum(38420)}</strong> sessões nos últimos 7 dias</span>
        <button className="adm-row-action">abrir em tela cheia →</button>
      </div>
    </div>
  );
}

// ───────── Admin Order Drawer (full detail view) ─────────
function AdmOrderDrawer({ order, onClose }) {
  const [tab, setTab] = aS("overview");
  const [statusEdit, setStatusEdit] = aS(false);
  const [currentStatus, setCurrentStatus] = aS(order.status);
  const [shipModal, setShipModal] = aS(false);
  const [cancelModal, setCancelModal] = aS(false);
  const [toast, setToast] = aS("");

  // Build stages aware of current status
  const stageList = ["pendente", "pago", "enviado", "entregue"];
  const stageIdx = stageList.indexOf(currentStatus);
  const stages = [
    { id: "pendente", label: "Aguardando pagamento", time: "ontem 21:18", actor: "sistema" },
    { id: "pago", label: "Pagamento aprovado", time: "ontem 21:24", actor: "Mercado Pago" },
    { id: "preparando", label: "Preparando envio", time: "hoje 09:42", actor: "Carla (operação)" },
    { id: "enviado", label: "Saiu do CD São Paulo", time: "hoje 14:18", actor: "Correios" },
    { id: "trans", label: "Em trânsito · Campinas", time: "agora", actor: "Correios", current: currentStatus === "enviado" },
    { id: "entregue", label: "Entregue", time: "previsto " + new Date(Date.now() + 2*86400000).toLocaleDateString("pt-BR"), future: currentStatus !== "entregue" }
  ];

  const events = [
    { type: "info", at: "5 min atrás", msg: "Email de confirmação enviado para " + order.customer.email },
    { type: "info", at: "1h atrás", msg: "NF-e #" + Math.floor(Math.random()*99999) + " emitida" },
    { type: "warn", at: "3h atrás", msg: "Cliente entrou em contato via WhatsApp" },
    { type: "info", at: "ontem", msg: "Pedido criado · origem: Instagram Ads" }
  ];

  return (
    <>
      <div className="adm-drawer-mask" onClick={onClose}/>
      <aside className="adm-drawer">
        <header className="adm-drawer-head">
          <div>
            <div className="adm-modal-eyebrow">pedido</div>
            <h2>{order.id}</h2>
            <p>{order.customer.name} · {order.date.toLocaleDateString("pt-BR")} {order.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
          <div className="adm-drawer-head-right">
            <div className="adm-drawer-status">
              {!statusEdit ? (
                <>
                  <StatusPill status={currentStatus}/>
                  <button className="adm-row-action" onClick={() => setStatusEdit(true)}>alterar</button>
                </>
              ) : (
                <div className="adm-drawer-status-edit">
                  {["pendente","pago","enviado","entregue","cancelado"].map(s => (
                    <button
                      key={s}
                      className={`adm-drawer-status-btn ${currentStatus === s ? "on" : ""}`}
                      onClick={() => { setCurrentStatus(s); setStatusEdit(false); }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="adm-modal-close" onClick={onClose}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
            </button>
          </div>
        </header>

        {/* KPIs summary */}
        <div className="adm-drawer-kpis">
          <div><span>valor</span><strong>{fmtBRL(order.total)}</strong></div>
          <div><span>itens</span><strong>{order.items.reduce((s, i) => s + i.qty, 0)}</strong></div>
          <div><span>pagamento</span><strong>{order.payment}</strong></div>
          <div><span>destino</span><strong>{order.customer.city.split(",")[1]?.trim() || order.customer.city}</strong></div>
        </div>

        {/* Tabs */}
        <nav className="adm-drawer-tabs">
          {[
            { id: "overview", label: "Visão geral" },
            { id: "items", label: "Itens" },
            { id: "shipping", label: "Entrega" },
            { id: "events", label: "Histórico", count: events.length }
          ].map(t => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
              {t.label}
              {t.count != null && <em>{t.count}</em>}
            </button>
          ))}
        </nav>

        <div className="adm-drawer-body">
          {tab === "overview" && (
            <>
              <section className="adm-dd-section">
                <h3>Cliente</h3>
                <div className="adm-dd-customer">
                  <div className="adm-dd-avatar">
                    {order.customer.name.split(" ").slice(0, 2).map(w => w[0]).join("")}
                  </div>
                  <div className="adm-dd-customer-info">
                    <strong>{order.customer.name}</strong>
                    <span>{order.customer.email}</span>
                    <span>{order.customer.city}</span>
                  </div>
                  <div className="adm-dd-customer-actions">
                    <button>ver perfil →</button>
                    <button>email</button>
                    <button>whatsapp</button>
                  </div>
                </div>
                <div className="adm-dd-customer-stats">
                  <div><em>cliente desde</em><span>mar/2024</span></div>
                  <div><em>total pedidos</em><span>4</span></div>
                  <div><em>LTV</em><span>{fmtBRL(827.5)}</span></div>
                  <div><em>tier</em><span>Veludo</span></div>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Status do pedido</h3>
                <ol className="adm-dd-timeline">
                  {stages.filter(s => {
                    if (currentStatus === "cancelado") return s.id === "pendente" || s.id === "pago";
                    if (s.id === "trans" && stageIdx < 2) return false;
                    return true;
                  }).map((s, i) => {
                    const sIdx = stageList.indexOf(s.id);
                    const done = sIdx !== -1 && sIdx <= stageIdx;
                    return (
                      <li key={s.id} className={`${done ? "done" : ""} ${s.current ? "current" : ""} ${s.future ? "future" : ""}`}>
                        <div className="adm-dd-tl-dot">
                          {done && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="5 13 10 18 19 7"/></svg>
                          )}
                        </div>
                        <div className="adm-dd-tl-info">
                          <strong>{s.label}</strong>
                          <span>{s.time} · {s.actor}</span>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </section>

              <section className="adm-dd-section">
                <h3>Resumo financeiro</h3>
                <div className="adm-dd-finance">
                  <div><span>subtotal</span><strong>{fmtBRL(order.subtotal)}</strong></div>
                  <div><span>frete</span><strong>{order.freight === 0 ? "grátis" : fmtBRL(order.freight)}</strong></div>
                  <div><span>cupom</span><strong className="muted">—</strong></div>
                  <div className="adm-dd-finance-total">
                    <span>total cobrado</span>
                    <strong>{fmtBRL(order.total)}</strong>
                  </div>
                  <div className="adm-dd-finance-meta">
                    <em>margem estimada</em>
                    <span>{fmtBRL(order.total * 0.34)} · 34%</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {tab === "items" && (
            <section className="adm-dd-section">
              <h3>Itens do pedido</h3>
              <table className="adm-dd-items-table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((it, i) => (
                    <tr key={i}>
                      <td>
                        <strong>{it.name}</strong>
                        <code className="adm-sku">SKU-{Math.random().toString(36).slice(2, 8).toUpperCase()}</code>
                      </td>
                      <td><strong>{it.qty}</strong></td>
                      <td>{fmtBRL(it.price)}</td>
                      <td>
                        <span className="adm-dd-stock-pill">{Math.floor(Math.random() * 40) + 5}</span>
                      </td>
                      <td><strong>{fmtBRL(it.price * it.qty)}</strong></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {tab === "shipping" && (
            <>
              <section className="adm-dd-section">
                <h3>Endereço de entrega</h3>
                <div className="adm-dd-address-card">
                  <strong>{order.customer.name}</strong>
                  <p>Rua Augusta, 1234, apto 72</p>
                  <p>Consolação · {order.customer.city}</p>
                  <p className="adm-dd-meta">CEP 01304-001</p>
                </div>
              </section>

              <section className="adm-dd-section">
                <h3>Logística</h3>
                <div className="adm-dd-shipping-grid">
                  <div className="adm-dd-ship-row">
                    <span>transportadora</span>
                    <strong>Correios · SEDEX</strong>
                  </div>
                  <div className="adm-dd-ship-row">
                    <span>código rastreio</span>
                    <div className="adm-dd-tracking">
                      <code>BR{Math.floor(Math.random() * 1000000000)}BR</code>
                      <button>copiar</button>
                    </div>
                  </div>
                  <div className="adm-dd-ship-row">
                    <span>previsão</span>
                    <strong>{new Date(Date.now() + 2*86400000).toLocaleDateString("pt-BR")}</strong>
                  </div>
                  <div className="adm-dd-ship-row">
                    <span>peso embalado</span>
                    <strong>0,84 kg</strong>
                  </div>
                  <div className="adm-dd-ship-row">
                    <span>declaração</span>
                    <strong>{fmtBRL(order.subtotal)}</strong>
                  </div>
                </div>
                <div className="adm-dd-shipping-actions">
                  <button className="adm-btn">imprimir etiqueta</button>
                  <button className="adm-btn" style={{ background: "white", color: "var(--adm-ink)", border: "1px solid var(--adm-line)" }}>baixar nota fiscal</button>
                </div>
              </section>
            </>
          )}

          {tab === "events" && (
            <section className="adm-dd-section">
              <h3>Histórico do pedido</h3>
              <div className="adm-dd-events">
                {events.map((e, i) => (
                  <div key={i} className={`adm-event adm-event-${e.type}`}>
                    <span className="adm-event-dot"/>
                    <div className="adm-event-msg">
                      <strong>{e.msg}</strong>
                      <span>{e.at}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="adm-dd-note">
                <strong>nota interna</strong>
                <textarea placeholder="adicione uma nota sobre esse pedido (visível só para a equipe)..."></textarea>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button className="adm-btn">salvar nota</button>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Foot */}
        <footer className="adm-drawer-foot">
          <button className="adm-modal-back" onClick={onClose}>fechar</button>
          <div className="adm-drawer-foot-actions">
            {currentStatus !== "cancelado" && currentStatus !== "entregue" && (
              <button
                className="adm-btn"
                style={{ background: "white", color: "var(--adm-red)", border: "1px solid var(--adm-line)" }}
                onClick={() => setCancelModal(true)}
              >cancelar pedido</button>
            )}
            {(currentStatus === "pago" || currentStatus === "pendente") && (
              <button className="adm-btn" onClick={() => setShipModal(true)}>marcar como enviado</button>
            )}
            {currentStatus === "enviado" && (
              <button className="adm-btn" onClick={() => { setCurrentStatus("entregue"); setToast("✓ marcado como entregue"); setTimeout(() => setToast(""), 2200); }}>marcar como entregue</button>
            )}
          </div>
        </footer>

        {toast && <div className="adm-drawer-toast">{toast}</div>}
      </aside>

      {shipModal && (
        <ShipOrderModal
          order={order}
          onClose={() => setShipModal(false)}
          onConfirm={(data) => {
            setCurrentStatus("enviado");
            setShipModal(false);
            setToast(`✓ enviado via ${data.carrier} · ${data.tracking}`);
            setTimeout(() => setToast(""), 2800);
          }}
        />
      )}
      {cancelModal && (
        <CancelOrderModal
          order={order}
          onClose={() => setCancelModal(false)}
          onConfirm={(data) => {
            setCurrentStatus("cancelado");
            setCancelModal(false);
            setToast(`✓ pedido cancelado · ${data.refund === "full" ? "reembolso total" : data.refund === "partial" ? "reembolso parcial" : "sem reembolso"}`);
            setTimeout(() => setToast(""), 2800);
          }}
        />
      )}
    </>
  );
}

// ───── Mark as shipped modal
function ShipOrderModal({ order, onClose, onConfirm }) {
  const [carrier, setCarrier] = aS("Correios SEDEX");
  const [tracking, setTracking] = aS("BR" + Math.floor(Math.random() * 1000000000) + "BR");
  const [weight, setWeight] = aS("0.84");
  const [notify, setNotify] = aS(true);
  const [printLabel, setPrintLabel] = aS(true);
  const canConfirm = tracking.length >= 10 && carrier;

  return (
    <div className="adm-modal-mask" onClick={onClose}>
      <div className="adm-modal" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
        <button className="adm-modal-close" onClick={onClose}>×</button>
        <header className="adm-modal-head" style={{ display: "block" }}>
          <div className="adm-modal-eyebrow">alteração de status</div>
          <h2>marcar como enviado</h2>
          <p>preencha os dados de envio para notificar o cliente.</p>
        </header>
        <div className="adm-modal-body">
          <div className="adm-mship-summary">
            <div><span>pedido</span><strong>{order.id}</strong></div>
            <div><span>cliente</span><strong>{order.customer.name.split(" ")[0]}</strong></div>
            <div><span>destino</span><strong>{order.customer.city}</strong></div>
            <div><span>valor</span><strong>{fmtBRL(order.total)}</strong></div>
          </div>

          <div className="adm-form">
            <div className="adm-form-row">
              <label>transportadora</label>
              <div className="adm-form-chips">
                {["Correios SEDEX", "Correios PAC", "Loggi", "Jadlog", "Outras"].map(c => (
                  <button key={c} type="button" className={`adm-form-chip ${carrier === c ? "on" : ""}`} onClick={() => setCarrier(c)}>{c}</button>
                ))}
              </div>
            </div>
            <div className="adm-form-row">
              <label>código de rastreio</label>
              <input value={tracking} onChange={e => setTracking(e.target.value.toUpperCase())} placeholder="BR000000000BR"/>
            </div>
            <div className="adm-form-row-split">
              <div className="adm-form-row">
                <label>peso embalado (kg)</label>
                <input value={weight} onChange={e => setWeight(e.target.value)} placeholder="0.50"/>
              </div>
              <div className="adm-form-row">
                <label>previsão de entrega</label>
                <input defaultValue={new Date(Date.now() + 2*86400000).toISOString().slice(0,10)} type="date"/>
              </div>
            </div>
            <div className="adm-form-toggles">
              <label className="adm-toggle-row">
                <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)}/>
                <span className="adm-check"/>
                <span>notificar o cliente por e-mail e whatsapp</span>
              </label>
              <label className="adm-toggle-row">
                <input type="checkbox" checked={printLabel} onChange={e => setPrintLabel(e.target.checked)}/>
                <span className="adm-check"/>
                <span>imprimir etiqueta dos correios agora</span>
              </label>
            </div>
          </div>
        </div>
        <footer className="adm-modal-foot">
          <button className="adm-modal-back" onClick={onClose}>cancelar</button>
          <button className="adm-btn" disabled={!canConfirm} onClick={() => onConfirm({ carrier, tracking, weight, notify, printLabel })}>
            confirmar envio →
          </button>
        </footer>
      </div>
    </div>
  );
}

// ───── Cancel order modal
function CancelOrderModal({ order, onClose, onConfirm }) {
  const [reason, setReason] = aS("");
  const [customReason, setCustomReason] = aS("");
  const [refund, setRefund] = aS("full");
  const [notify, setNotify] = aS(true);
  const [restock, setRestock] = aS(true);

  const reasons = [
    { id: "client", label: "cliente pediu" },
    { id: "stock", label: "sem estoque" },
    { id: "address", label: "endereço inválido" },
    { id: "payment", label: "pagamento não aprovado" },
    { id: "fraud", label: "suspeita de fraude" },
    { id: "other", label: "outro motivo" }
  ];

  const canConfirm = reason && (reason !== "other" || customReason.trim().length > 3);

  return (
    <div className="adm-modal-mask" onClick={onClose}>
      <div className="adm-modal adm-modal-danger" style={{ maxWidth: 540 }} onClick={e => e.stopPropagation()}>
        <button className="adm-modal-close" onClick={onClose}>×</button>
        <header className="adm-modal-head" style={{ display: "block" }}>
          <div className="adm-modal-eyebrow adm-modal-eyebrow-danger">ação irreversível</div>
          <h2>cancelar pedido</h2>
          <p>essa ação não pode ser desfeita. o cliente será notificado e os pontos serão estornados.</p>
        </header>
        <div className="adm-modal-body">
          <div className="adm-mship-summary">
            <div><span>pedido</span><strong>{order.id}</strong></div>
            <div><span>cliente</span><strong>{order.customer.name.split(" ")[0]}</strong></div>
            <div><span>valor</span><strong>{fmtBRL(order.total)}</strong></div>
            <div><span>status atual</span><strong>{order.status}</strong></div>
          </div>

          <div className="adm-form">
            <div className="adm-form-row">
              <label>motivo do cancelamento</label>
              <div className="adm-form-chips">
                {reasons.map(r => (
                  <button key={r.id} type="button" className={`adm-form-chip ${reason === r.id ? "on" : ""}`} onClick={() => setReason(r.id)}>{r.label}</button>
                ))}
              </div>
            </div>
            {reason === "other" && (
              <div className="adm-form-row">
                <label>descreva o motivo</label>
                <textarea
                  value={customReason}
                  onChange={e => setCustomReason(e.target.value)}
                  rows="2"
                  placeholder="explique brevemente..."
                />
              </div>
            )}
            <div className="adm-form-row">
              <label>reembolso</label>
              <div className="adm-refund-options">
                <label className={`adm-refund-opt ${refund === "full" ? "on" : ""}`}>
                  <input type="radio" checked={refund === "full"} onChange={() => setRefund("full")}/>
                  <div>
                    <strong>reembolso total</strong>
                    <span>{fmtBRL(order.total)} no mesmo método de pagamento (Mercado Pago)</span>
                  </div>
                </label>
                <label className={`adm-refund-opt ${refund === "partial" ? "on" : ""}`}>
                  <input type="radio" checked={refund === "partial"} onChange={() => setRefund("partial")}/>
                  <div>
                    <strong>crédito na loja</strong>
                    <span>{fmtBRL(order.total * 1.1)} de crédito (+10% bônus) válido por 6 meses</span>
                  </div>
                </label>
                <label className={`adm-refund-opt ${refund === "none" ? "on" : ""}`}>
                  <input type="radio" checked={refund === "none"} onChange={() => setRefund("none")}/>
                  <div>
                    <strong>sem reembolso</strong>
                    <span>somente para fraude ou não-pagamento</span>
                  </div>
                </label>
              </div>
            </div>
            <div className="adm-form-toggles">
              <label className="adm-toggle-row">
                <input type="checkbox" checked={notify} onChange={e => setNotify(e.target.checked)}/>
                <span className="adm-check"/>
                <span>notificar o cliente por e-mail e whatsapp</span>
              </label>
              <label className="adm-toggle-row">
                <input type="checkbox" checked={restock} onChange={e => setRestock(e.target.checked)}/>
                <span className="adm-check"/>
                <span>devolver itens ao estoque automaticamente</span>
              </label>
            </div>
          </div>
        </div>
        <footer className="adm-modal-foot">
          <button className="adm-modal-back" onClick={onClose}>não cancelar</button>
          <button
            className="adm-btn adm-btn-danger"
            disabled={!canConfirm}
            onClick={() => onConfirm({ reason, customReason, refund, notify, restock })}
          >
            confirmar cancelamento
          </button>
        </footer>
      </div>
    </div>
  );
}

Object.assign(window, { AdminApp });