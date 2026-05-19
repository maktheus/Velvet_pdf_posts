// Pata de Veludo — Perfil do Usuário (estilo loja, não admin)
const { useState: uS, useMemo: uM } = React;

const fmtBR = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// ───── Mock user data
const PROFILE = {
  user: {
    name: "Marina Albuquerque",
    email: "marina@email.com",
    phone: "(11) 9 8123-4567",
    since: "março de 2024",
    tier: "Veludo",
    points: 1840,
    nextTier: { name: "Veludo Ouro", at: 2500 }
  },
  cats: [
    {
      id: "quindim",
      name: "Quindim",
      age: "4 anos",
      breed: "SRD laranja",
      personality: "caçador zen",
      photo: "assets/puzzle-2.jpg",
      notes: "Adora penas. Detesta laser. Bebe pouca água — fonte é essencial.",
      faves: ["Varinha Pluma da Sereia", "Fonte Pétala silenciosa"]
    },
    {
      id: "anchovinha",
      name: "Anchovinha",
      age: "1 ano e 6 meses",
      breed: "Sphynx",
      personality: "explosiva",
      photo: "assets/puzzle-1.png",
      notes: "Energia infinita. Brinquedos com som crepitante são os favoritos.",
      faves: ["Túnel Veludo Macio", "Ratinho elétrico Picapau"]
    }
  ],
  orders: [
    { id: "#PV-2647", date: "12 mai 2026", status: "enviado", total: 308.80, items: [
      { name: "Fonte Pétala silenciosa", qty: 1, price: 229 },
      { name: "Bolinhas Crocantes", qty: 1, price: 32.4 },
      { name: "Frete", qty: 1, price: 47.4 }
    ], tracking: "BR123456789BR" },
    { id: "#PV-2631", date: "28 abr 2026", status: "entregue", total: 219.00, items: [
      { name: "Kit Caça Noturna", qty: 1, price: 219 }
    ] },
    { id: "#PV-2598", date: "02 abr 2026", status: "entregue", total: 159.90, items: [
      { name: "Puzzle Camarão Curioso", qty: 1, price: 159.9 }
    ] },
    { id: "#PV-2541", date: "14 mar 2026", status: "entregue", total: 89.90, items: [
      { name: "Ratinho elétrico Picapau", qty: 1, price: 89.9 }
    ] }
  ],
  addresses: [
    { id: 1, label: "Casa", main: true, line1: "Rua Augusta, 1234, apto 72", line2: "Consolação · São Paulo, SP", zip: "01304-001" },
    { id: 2, label: "Trabalho", main: false, line1: "Av. Paulista, 1230, 14º andar", line2: "Bela Vista · São Paulo, SP", zip: "01310-100" }
  ],
  cards: [
    { id: 1, brand: "Visa", last: "4429", exp: "08/28", main: true },
    { id: 2, brand: "Mastercard", last: "1182", exp: "03/27", main: false }
  ],
  wishlist: [
    { name: "Torre Arranhador Veludo", price: 459.9, old: 759.9, color: "#ed6058", img: "assets/puzzle-4.jpg" },
    { name: "Mochila Bolha de Sabão", price: 349.0, color: "#fcebf1", img: "assets/puzzle-5.jpg" },
    { name: "Túnel Triplo Aventura", price: 129.9, old: 189, color: "#fdfedf", img: "assets/puzzle-3.jpg" }
  ],
  history: [
    { date: "12 mai", event: "Pedido enviado", detail: "#PV-2647 · saiu pra entrega" },
    { date: "10 mai", event: "Pontos creditados", detail: "+92 pontos pelo pedido #PV-2647" },
    { date: "30 abr", event: "Avaliação enviada", detail: "5★ no Kit Caça Noturna" },
    { date: "28 abr", event: "Pedido entregue", detail: "#PV-2631 chegou na sua casa" },
    { date: "15 abr", event: "Cupom resgatado", detail: "10% OFF com 200 pontos" }
  ]
};

// ───────── Profile App ─────────
function ProfileView({ onNav }) {
  const [tab, setTab] = uS("home");
  const tabs = [
    { id: "home", label: "Visão geral", icon: "home" },
    { id: "orders", label: "Meus pedidos", icon: "package" },
    { id: "cats", label: "Meus gatos", icon: "cat", badge: PROFILE.cats.length },
    { id: "wishlist", label: "Favoritos", icon: "heart", badge: PROFILE.wishlist.length },
    { id: "addresses", label: "Endereços", icon: "pin" },
    { id: "wallet", label: "Carteira", icon: "wallet" },
    { id: "settings", label: "Conta", icon: "settings" }
  ];

  return (
    <div className="pv-page pv-profile-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span>
        <span>meu perfil</span>
      </div>

      {/* Banner */}
      <section className="pv-profile-banner">
        <Squircle color="#ed6058" className="pv-profile-banner-card">
          <PawPattern color="#fdfedf" opacity={0.12} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-profile-banner-inner">
            <div className="pv-profile-avatar">
              <span>{PROFILE.user.name.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
            </div>
            <div className="pv-profile-banner-text">
              <div className="pv-eyebrow pv-eyebrow-dark"><span>tutora desde {PROFILE.user.since}</span></div>
              <h1>oi, {PROFILE.user.name.split(" ")[0].toLowerCase()}.</h1>
              <p>{PROFILE.cats.length} gato{PROFILE.cats.length > 1 ? "s" : ""} cadastrado{PROFILE.cats.length > 1 ? "s" : ""} · {PROFILE.orders.length} pedidos feitos · {PROFILE.user.points} pontos pra trocar</p>
            </div>
            <div className="pv-profile-tier">
              <div className="pv-profile-tier-badge">
                <PawGlyph size={22} color="#ed6058"/>
                <span>Clube</span>
                <strong>{PROFILE.user.tier}</strong>
              </div>
            </div>
          </div>
        </Squircle>
      </section>

      <section className="pv-profile-shell">
        <aside className="pv-profile-side">
          <nav className="pv-profile-nav">
            {tabs.map(t => (
              <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
                <ProfileIcon name={t.icon}/>
                <span>{t.label}</span>
                {t.badge != null && <em>{t.badge}</em>}
              </button>
            ))}
          </nav>
          <button className="pv-profile-logout">sair da conta</button>
        </aside>

        <div className="pv-profile-content">
          {tab === "home" && <ProfileHome onTab={setTab} onNav={onNav}/>}
          {tab === "orders" && <ProfileOrders/>}
          {tab === "cats" && <ProfileCats/>}
          {tab === "wishlist" && <ProfileWishlist onNav={onNav}/>}
          {tab === "addresses" && <ProfileAddresses/>}
          {tab === "wallet" && <ProfileWallet/>}
          {tab === "settings" && <ProfileSettings/>}
        </div>
      </section>
    </div>
  );
}

// ───── Icons (rounded line)
function ProfileIcon({ name, size = 20 }) {
  const c = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "home": return <svg {...c}><path d="M3 12 L 12 4 L 21 12 V 20 H 14 V 14 H 10 V 20 H 3 Z"/></svg>;
    case "package": return <svg {...c}><path d="M3 7 L12 3 L21 7 V17 L12 21 L3 17 Z M3 7 L12 11 L21 7 M12 11 V21"/></svg>;
    case "cat": return <svg {...c}><path d="M6 8 L 4 4 L 8 6 M 18 8 L 20 4 L 16 6 M 6 8 Q 12 6 18 8 Q 20 14 18 18 Q 12 21 6 18 Q 4 14 6 8 Z M 10 13 L 10 14 M 14 13 L 14 14 M 11 16 Q 12 17 13 16"/></svg>;
    case "heart": return <svg {...c}><path d="M12 20 L 4 13 Q 1 9 5 5 Q 9 1 12 6 Q 15 1 19 5 Q 23 9 20 13 Z"/></svg>;
    case "pin": return <svg {...c}><path d="M12 21 Q 5 13 5 9 A 7 7 0 0 1 19 9 Q 19 13 12 21 Z M 12 9 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0"/></svg>;
    case "wallet": return <svg {...c}><path d="M3 8 V 18 H 21 V 8 M 3 8 V 6 H 19 V 8 M 17 13 H 19"/></svg>;
    case "settings": return <svg {...c}><circle cx="12" cy="12" r="3"/><path d="M19 12 a 7 7 0 0 0 -0.2 -1.5 l 2 -1.5 -2 -3.5 -2.4 0.7 a 7 7 0 0 0 -2.6 -1.5 L 13 3 H 11 l -0.8 1.7 a 7 7 0 0 0 -2.6 1.5 l -2.4 -0.7 -2 3.5 2 1.5 a 7 7 0 0 0 0 3 l -2 1.5 2 3.5 2.4 -0.7 a 7 7 0 0 0 2.6 1.5 L 11 21 h 2 l 0.8 -1.7 a 7 7 0 0 0 2.6 -1.5 l 2.4 0.7 2 -3.5 -2 -1.5 a 7 7 0 0 0 0.2 -1.5 Z"/></svg>;
    default: return null;
  }
}

// ───── Visão geral
function ProfileHome({ onTab, onNav }) {
  const lastOrder = PROFILE.orders[0];
  const u = PROFILE.user;
  const pct = (u.points / u.nextTier.at) * 100;
  return (
    <div className="pv-profile-home">
      {/* Stats */}
      <div className="pv-profile-stats">
        <Squircle color="#fcebf1" className="pv-stat">
          <span>total economizado</span>
          <strong>{fmtBR(287.40)}</strong>
          <em>em descontos e cupons</em>
        </Squircle>
        <Squircle color="#fdfedf" className="pv-stat">
          <span>pedidos realizados</span>
          <strong>{PROFILE.orders.length}</strong>
          <em>desde {u.since}</em>
        </Squircle>
        <Squircle color="#ed6058" className="pv-stat pv-stat-primary">
          <span>pontos no Clube</span>
          <strong>{u.points}</strong>
          <em>valem {fmtBR(u.points / 10)} em compras</em>
        </Squircle>
      </div>

      {/* Tier progress */}
      <Squircle color="#fdfedf" className="pv-profile-tier-card">
        <div className="pv-tier-head">
          <div>
            <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>seu progresso no clube</span></div>
            <h3>faltam <strong>{u.nextTier.at - u.points} pontos</strong> pra virar {u.nextTier.name}</h3>
          </div>
          <div className="pv-tier-pct"><strong>{Math.round(pct)}%</strong></div>
        </div>
        <div className="pv-tier-bar"><div style={{ width: `${pct}%` }}/></div>
        <div className="pv-tier-foot">
          <span>{u.tier}</span>
          <span>{u.nextTier.name}</span>
        </div>
        <div className="pv-tier-perks">
          <div><strong>15% OFF</strong><span>sempre na sua categoria favorita</span></div>
          <div><strong>frete grátis</strong><span>em qualquer valor</span></div>
          <div><strong>acesso antecipado</strong><span>a lançamentos e drops</span></div>
        </div>
      </Squircle>

      <div className="pv-profile-row-2">
        {/* Last order */}
        <Squircle color="#fcebf1" className="pv-profile-card">
          <div className="pv-pcard-head">
            <h3>último pedido</h3>
            <button className="pv-pcard-link" onClick={() => onTab("orders")}>ver todos →</button>
          </div>
          <div className="pv-last-order">
            <div className="pv-last-order-top">
              <strong>{lastOrder.id}</strong>
              <span className={`pv-order-status pv-status-${lastOrder.status}`}>{lastOrder.status}</span>
            </div>
            <p className="pv-last-order-date">{lastOrder.date} · {fmtBR(lastOrder.total)}</p>
            <div className="pv-last-order-items">
              {lastOrder.items.filter(i => i.name !== "Frete").map(it => (
                <span key={it.name} className="pv-item-chip">{it.qty}× {it.name}</span>
              ))}
            </div>
            {lastOrder.tracking && (
              <div className="pv-tracking">
                <span>rastreio:</span><code>{lastOrder.tracking}</code>
                <button>copiar</button>
              </div>
            )}
            <div className="pv-tracking-steps">
              {["pagamento confirmado","preparando envio","em transporte","saiu pra entrega","entregue"].map((s, i) => (
                <div key={s} className={`pv-step ${i <= 3 ? "done" : ""} ${i === 3 ? "current" : ""}`}>
                  <span className="pv-step-dot"/>
                  <em>{s}</em>
                </div>
              ))}
            </div>
          </div>
        </Squircle>

        {/* Activity timeline */}
        <Squircle color="#fdfedf" className="pv-profile-card">
          <div className="pv-pcard-head">
            <h3>atividade recente</h3>
          </div>
          <ul className="pv-timeline">
            {PROFILE.history.map((h, i) => (
              <li key={i}>
                <div className="pv-timeline-dot"/>
                <div>
                  <strong>{h.event}</strong>
                  <p>{h.detail}</p>
                  <em>{h.date}</em>
                </div>
              </li>
            ))}
          </ul>
        </Squircle>
      </div>

      {/* Recommendations */}
      <Squircle color="#fdfedf" className="pv-profile-card pv-profile-card-rec">
        <div className="pv-pcard-head">
          <div>
            <h3>recomendado pra Quindim e Anchovinha</h3>
            <p className="pv-pcard-sub">baseado nos brinquedos que vocês mais usam</p>
          </div>
          <button className="pv-pcard-link" onClick={() => onNav({ view: "cat", cat: "brincar" })}>ver mais →</button>
        </div>
        <div className="pv-rec-grid">
          {PROFILE.wishlist.map(w => (
            <div key={w.name} className="pv-rec-item">
              <Squircle color={w.color} className="pv-rec-img">
                <img src={w.img} alt={w.name}/>
              </Squircle>
              <strong>{w.name}</strong>
              <div className="pv-rec-price">
                {w.old && <s>{fmtBR(w.old)}</s>}
                <span>{fmtBR(w.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </Squircle>
    </div>
  );
}

// ───── Pedidos
function ProfileOrders() {
  const [filter, setFilter] = uS("todos");
  const [viewing, setViewing] = uS(null);

  const filtered = PROFILE.orders.filter(o => {
    if (filter === "todos") return true;
    if (filter === "andamento") return ["pendente","pago","enviado"].includes(o.status);
    if (filter === "entregues") return o.status === "entregue";
    return true;
  });

  return (
    <div className="pv-profile-orders">
      <div className="pv-orders-head">
        <h2>meus pedidos</h2>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="todos">todos os pedidos</option>
          <option value="andamento">em andamento</option>
          <option value="entregues">entregues</option>
        </select>
      </div>
      <div className="pv-orders-list">
        {filtered.map(o => (
          <Squircle key={o.id} color="#fdfedf" className="pv-order-card">
            <div className="pv-order-card-head">
              <div>
                <strong>{o.id}</strong>
                <span>{o.date}</span>
              </div>
              <span className={`pv-order-status pv-status-${o.status}`}>{o.status}</span>
            </div>
            <div className="pv-order-card-items">
              {o.items.filter(i => i.name !== "Frete").map(it => (
                <div key={it.name} className="pv-order-item-row">
                  <div className="pv-order-thumb">
                    <PawGlyph size={20} color="#ed6058"/>
                  </div>
                  <div className="pv-order-item-info">
                    <strong>{it.name}</strong>
                    <span>{it.qty} unidade{it.qty > 1 ? "s" : ""} · {fmtBR(it.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pv-order-card-foot">
              <div className="pv-order-total">
                <span>total</span>
                <strong>{fmtBR(o.total)}</strong>
              </div>
              <div className="pv-order-actions">
                {o.status === "entregue" && <button className="pv-order-btn">comprar de novo</button>}
                <button className="pv-order-btn pv-order-btn-primary" onClick={() => setViewing(o)}>ver detalhes</button>
              </div>
            </div>
          </Squircle>
        ))}
      </div>
      {viewing && <OrderDetailsModal order={viewing} onClose={() => setViewing(null)}/>}
    </div>
  );
}

function OrderDetailsModal({ order, onClose }) {
  const [reviewing, setReviewing] = uS(null);
  const [reviewedItems, setReviewedItems] = uS(new Set());
  const stages = [
    { id: "pago", label: "Pagamento confirmado", date: "12 mai 2026, 09:42" },
    { id: "preparando", label: "Preparando envio", date: "12 mai 2026, 14:18" },
    { id: "enviado", label: "Saiu do CD São Paulo", date: "13 mai 2026, 08:05" },
    { id: "transito", label: "Em trânsito · Campinas/SP", date: "13 mai 2026, 19:30", current: order.status === "enviado" },
    { id: "saiu", label: "Saiu para entrega", date: "previsto 15 mai", future: order.status !== "entregue" },
    { id: "entregue", label: "Entregue", date: order.status === "entregue" ? "14 mai 2026" : "previsto 16 mai", future: order.status !== "entregue" }
  ];

  const currentIndex = stages.findIndex(s => s.current);
  const lastDoneIdx = order.status === "entregue" ? stages.length - 1 : (currentIndex >= 0 ? currentIndex : 2);

  const subtotal = order.items.filter(i => i.name !== "Frete").reduce((s, i) => s + i.price * i.qty, 0);
  const freight = order.items.find(i => i.name === "Frete")?.price || 0;
  const points = Math.floor(order.total / 10);

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal pv-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>
        <div className="pv-modal-head">
          <div className="pv-od-head">
            <div>
              <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>pedido {order.id}</span></div>
              <h2>detalhes do pedido</h2>
            </div>
            <span className={`pv-order-status pv-status-${order.status}`}>{order.status}</span>
          </div>
          <p>realizado em {order.date} · pago com cartão Visa •••• 4429</p>
        </div>

        <div className="pv-modal-body">
          {/* Tracking timeline */}
          <section className="pv-od-section">
            <h3>rastreio em tempo real</h3>
            {order.tracking && (
              <div className="pv-tracking">
                <span>código:</span>
                <code>{order.tracking}</code>
                <button onClick={() => navigator.clipboard?.writeText(order.tracking)}>copiar</button>
                <button>rastrear nos Correios →</button>
              </div>
            )}
            <ol className="pv-od-timeline">
              {stages.map((s, i) => (
                <li key={s.id} className={`${i <= lastDoneIdx ? "done" : ""} ${s.current ? "current" : ""} ${s.future ? "future" : ""}`}>
                  <div className="pv-od-tl-dot">
                    {i <= lastDoneIdx && !s.current && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7"/></svg>
                    )}
                  </div>
                  <div className="pv-od-tl-info">
                    <strong>{s.label}</strong>
                    <span>{s.date}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Items */}
          <section className="pv-od-section">
            <h3>itens do pedido</h3>
            <div className="pv-od-items">
              {order.items.filter(i => i.name !== "Frete").map((it, i) => (
                <div key={i} className="pv-od-item">
                  <div className="pv-od-item-img">
                    <PawGlyph size={28} color="#ed6058"/>
                  </div>
                  <div className="pv-od-item-info">
                    <strong>{it.name}</strong>
                    <span>{it.qty} unidade{it.qty > 1 ? "s" : ""} · {fmtBR(it.price)} cada</span>
                  </div>
                  <div className="pv-od-item-price">
                    <strong>{fmtBR(it.price * it.qty)}</strong>
                    {order.status === "entregue" && (
                      reviewedItems.has(it.name)
                        ? <span className="pv-od-reviewed">✓ avaliado</span>
                        : <button onClick={() => setReviewing(it)}>avaliar →</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Address + Summary */}
          <section className="pv-od-row">
            <div className="pv-od-block">
              <h3>endereço de entrega</h3>
              <p><strong>Casa</strong></p>
              <p>Rua Augusta, 1234, apto 72</p>
              <p>Consolação · São Paulo, SP</p>
              <p className="pv-od-meta">CEP 01304-001</p>
            </div>
            <div className="pv-od-block">
              <h3>resumo financeiro</h3>
              <div className="pv-od-summary">
                <div><span>subtotal</span><span>{fmtBR(subtotal)}</span></div>
                {freight > 0 && <div><span>frete</span><span>{fmtBR(freight)}</span></div>}
                <div className="pv-od-summary-total">
                  <span>total pago</span>
                  <strong>{fmtBR(order.total)}</strong>
                </div>
                <div className="pv-od-points">
                  <PawGlyph size={14} color="#ed6058"/>
                  <span>você ganhou <strong>+{points} pontos</strong></span>
                </div>
              </div>
            </div>
          </section>

          {order.status === "entregue" && (
            <Squircle color="#fcebf1" className="pv-od-cta-card">
              <CatGlyph size={48} color="#ed6058" mood="happy"/>
              <div>
                <strong>gostou? avalie e ganhe 50 pontos por produto</strong>
                <p>sua opinião ajuda outros tutores a escolherem.</p>
              </div>
              <button className="pv-pill pv-pill-primary pv-pill-sm" onClick={() => setReviewing(order.items.filter(i => i.name !== "Frete" && !reviewedItems.has(i.name))[0])}>avaliar pedido</button>
            </Squircle>
          )}
        </div>

        <div className="pv-modal-foot">
          <button className="pv-modal-back" onClick={onClose}>fechar</button>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="pv-order-btn">precisa de ajuda?</button>
            {order.status === "entregue"
              ? <button className="pv-pill pv-pill-primary">comprar de novo</button>
              : <button className="pv-pill pv-pill-primary">acompanhar entrega</button>}
          </div>
        </div>
      </div>
      {reviewing && (
        <ReviewModal
          item={reviewing}
          onClose={() => setReviewing(null)}
          onSubmit={(data) => {
            setReviewedItems(new Set([...reviewedItems, reviewing.name]));
            setReviewing(null);
          }}
        />
      )}
    </div>
  );
}

// ───── Review (avaliação) modal
function ReviewModal({ item, onClose, onSubmit }) {
  const [step, setStep] = uS(0);
  const [rating, setRating] = uS(0);
  const [hover, setHover] = uS(0);
  const [aspects, setAspects] = uS({});
  const [text, setText] = uS("");
  const [photos, setPhotos] = uS([]);
  const [recommend, setRecommend] = uS(null);
  const [catReaction, setCatReaction] = uS("");

  const aspectLabels = [
    { id: "quality", label: "qualidade" },
    { id: "durability", label: "durabilidade" },
    { id: "value", label: "custo-benefício" },
    { id: "design", label: "design" }
  ];

  const reactions = [
    { id: "love", emoji: "happy", label: "amou na hora" },
    { id: "ok", emoji: "sleepy", label: "tolerou" },
    { id: "ignored", emoji: "surprise", label: "ignorou" }
  ];

  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    files.slice(0, 4 - photos.length).forEach(f => {
      const reader = new FileReader();
      reader.onload = () => setPhotos(prev => [...prev, reader.result]);
      reader.readAsDataURL(f);
    });
  };

  const fileRef = React.useRef(null);

  if (step === 2) {
    return (
      <div className="pv-modal-mask" onClick={onClose}>
        <div className="pv-modal" onClick={e => e.stopPropagation()}>
          <button className="pv-modal-close" onClick={onClose}>×</button>
          <div className="pv-review-success">
            <div className="pv-review-check">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="5 13 10 18 19 7"/>
              </svg>
            </div>
            <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>avaliação enviada</span></div>
            <h2>obrigado! 🐾</h2>
            <p>sua opinião ajuda outros tutores a escolherem o melhor pro gato deles.</p>
            <div className="pv-review-reward">
              <div>
                <span>você ganhou</span>
                <strong>+50 pontos</strong>
              </div>
              <PawGlyph size={32} color="#ed6058"/>
            </div>
            <button className="pv-pill pv-pill-primary" onClick={() => onSubmit({ rating, aspects, text, photos, recommend, catReaction })}>fechar</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>

        <div className="pv-modal-progress">
          <span className={step >= 0 ? "active" : ""}/>
          <span className={step >= 1 ? "active" : ""}/>
        </div>

        <div className="pv-modal-head">
          <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>passo {step + 1} de 2 · ganhe 50 pontos</span></div>
          <h2>{step === 0 ? "como foi a experiência?" : "uma última coisa..."}</h2>
          <p>avaliando <strong>{item?.name}</strong></p>
        </div>

        <div className="pv-modal-body">
          {step === 0 && (
            <div className="pv-cat-form">
              {/* Stars */}
              <div className="pv-review-stars-row">
                <label>nota geral</label>
                <div className="pv-review-stars-pick" onMouseLeave={() => setHover(0)}>
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      type="button"
                      className={`pv-review-star ${(hover || rating) >= n ? "on" : ""}`}
                      onMouseEnter={() => setHover(n)}
                      onClick={() => setRating(n)}
                      aria-label={`${n} estrelas`}
                    >
                      ★
                    </button>
                  ))}
                  {(hover || rating) > 0 && (
                    <span className="pv-review-stars-label">
                      {["", "péssimo", "ruim", "ok", "muito bom", "perfeito"][hover || rating]}
                    </span>
                  )}
                </div>
              </div>

              {/* Aspect ratings */}
              <div className="pv-set-row">
                <label>avalie cada aspecto</label>
                <div className="pv-review-aspects">
                  {aspectLabels.map(a => (
                    <div key={a.id} className="pv-review-aspect">
                      <span>{a.label}</span>
                      <div className="pv-review-aspect-stars">
                        {[1,2,3,4,5].map(n => (
                          <button
                            key={n}
                            type="button"
                            className={`pv-review-mini-star ${(aspects[a.id] || 0) >= n ? "on" : ""}`}
                            onClick={() => setAspects({ ...aspects, [a.id]: n })}
                            aria-label={`${n} estrelas`}
                          >★</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cat reaction (unique to brand) */}
              <div className="pv-set-row">
                <label>e o gato? como reagiu?</label>
                <div className="pv-review-reactions">
                  {reactions.map(r => (
                    <button
                      key={r.id}
                      type="button"
                      className={`pv-review-reaction ${catReaction === r.id ? "on" : ""}`}
                      onClick={() => setCatReaction(r.id)}
                    >
                      <CatGlyph size={42} color={catReaction === r.id ? "#fdfedf" : "#ed6058"} mood={r.emoji}/>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="pv-cat-form">
              <div className="pv-set-row">
                <label>conta pra gente o que aconteceu (opcional)</label>
                <textarea
                  rows="4"
                  placeholder="o que mais gostou? algo que melhoraria? como o gato reagiu na primeira vez?"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  maxLength="500"
                />
                <span className="pv-form-counter">{text.length} / 500</span>
              </div>

              <div className="pv-set-row">
                <label>foto do seu gato com o brinquedo (opcional)</label>
                <div className="pv-review-photos">
                  {photos.map((p, i) => (
                    <div key={i} className="pv-review-photo">
                      <img src={p} alt=""/>
                      <button onClick={() => setPhotos(photos.filter((_, ix) => ix !== i))} aria-label="Remover">×</button>
                    </div>
                  ))}
                  {photos.length < 4 && (
                    <button className="pv-review-photo-add" onClick={() => fileRef.current?.click()}>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="6" width="18" height="14" rx="3"/>
                        <path d="M3 16 L 8 11 L 13 16 L 16 13 L 21 18"/>
                        <circle cx="15.5" cy="10.5" r="1.5"/>
                      </svg>
                      <span>adicionar</span>
                    </button>
                  )}
                  <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handleFile}/>
                </div>
                <span className="pv-form-counter">até 4 fotos · ganhe +20 pts por foto</span>
              </div>

              <div className="pv-set-row">
                <label>recomendaria pra um amigo?</label>
                <div className="pv-review-recommend">
                  <button
                    type="button"
                    className={`pv-rec-btn ${recommend === true ? "on" : ""}`}
                    onClick={() => setRecommend(true)}
                  >
                    <span>👍</span><em>sim, com certeza</em>
                  </button>
                  <button
                    type="button"
                    className={`pv-rec-btn pv-rec-btn-no ${recommend === false ? "on" : ""}`}
                    onClick={() => setRecommend(false)}
                  >
                    <span>👎</span><em>não recomendaria</em>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pv-modal-foot">
          {step > 0
            ? <button className="pv-modal-back" onClick={() => setStep(step - 1)}>← voltar</button>
            : <button className="pv-modal-back" onClick={onClose}>cancelar</button>}
          <button
            className="pv-pill pv-pill-primary"
            disabled={step === 0 ? rating === 0 : false}
            onClick={() => step === 0 ? setStep(1) : setStep(2)}
          >
            {step === 0 ? "continuar →" : "enviar avaliação ✓"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───── Gatos
function ProfileCats() {
  const [cats, setCats] = uS(PROFILE.cats);
  const [adding, setAdding] = uS(false);
  const [editing, setEditing] = uS(null);

  const handleSave = (cat) => {
    if (editing) {
      setCats(cats.map(c => c.id === editing.id ? { ...cat, id: editing.id } : c));
    } else {
      setCats([...cats, { ...cat, id: cat.name.toLowerCase().replace(/\s/g, "-") + "-" + Date.now() }]);
    }
    setAdding(false);
    setEditing(null);
  };

  return (
    <div className="pv-profile-cats">
      <div className="pv-orders-head">
        <h2>meus gatos</h2>
        <button className="pv-add-btn" onClick={() => setAdding(true)}>+ adicionar gato</button>
      </div>
      <div className="pv-cats-grid">
        {cats.map(c => (
          <Squircle key={c.id} color="#fcebf1" className="pv-cat-card">
            <div className="pv-cat-photo">
              {c.photo
                ? <img src={c.photo} alt={c.name}/>
                : <div className="pv-cat-photo-placeholder"><CatGlyph size={64} color="#ed6058" mood="happy"/></div>}
              <div className="pv-cat-personality">{c.personality}</div>
            </div>
            <div className="pv-cat-info">
              <h3>{c.name}</h3>
              <div className="pv-cat-meta">
                <span><em>idade</em><strong>{c.age}</strong></span>
                <span><em>raça</em><strong>{c.breed}</strong></span>
              </div>
              {c.notes && <p className="pv-cat-notes">{c.notes}</p>}
              {c.faves && c.faves.length > 0 && (
                <div className="pv-cat-faves">
                  <div className="pv-eyebrow"><PawGlyph size={12} color="#ed6058"/><span>brinquedos favoritos</span></div>
                  {c.faves.map(f => <span key={f} className="pv-fav-chip">{f}</span>)}
                </div>
              )}
              <button className="pv-cat-edit" onClick={() => setEditing(c)}>editar perfil →</button>
            </div>
          </Squircle>
        ))}
        <button className="pv-cat-add" onClick={() => setAdding(true)}>
          <div className="pv-cat-add-plus">+</div>
          <strong>adicionar outro gato</strong>
          <span>quanto mais a gente conhece, melhor a recomendação</span>
        </button>
      </div>

      {(adding || editing) && (
        <AddCatFlow
          initial={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

// ───── Fluxo "Adicionar gato" (modal multi-etapas)
function AddCatFlow({ onClose, onSave, initial }) {
  const [step, setStep] = uS(0);
  const [data, setData] = uS(initial || {
    photo: null,
    name: "",
    age: "",
    ageUnit: "anos",
    breed: "SRD",
    sex: "",
    weight: "",
    personality: "",
    likes: [],
    dislikes: [],
    notes: "",
    birthday: ""
  });

  const update = (k, v) => setData({ ...data, [k]: v });
  const toggleArr = (key, val) => {
    const arr = data[key] || [];
    update(key, arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
  };

  const steps = [
    { label: "foto e nome", valid: () => !!data.name.trim() },
    { label: "idade e raça", valid: () => !!data.age },
    { label: "personalidade", valid: () => !!data.personality },
    { label: "preferências", valid: () => true },
    { label: "confirmação", valid: () => true }
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      const finalData = {
        ...data,
        age: `${data.age} ${data.ageUnit}`,
        faves: data.likes
      };
      onSave(finalData);
    }
  };

  const personalities = [
    { id: "cacador", label: "caçador", mood: "happy", desc: "adora penas, varinhas e laser" },
    { id: "contemplativo", label: "contemplativo", mood: "sleepy", desc: "prefere janela, sol e silenciar" },
    { id: "explosivo", label: "explosivo", mood: "surprise", desc: "energia o dia inteiro, escala tudo" },
    { id: "sociavel", label: "sociável", mood: "happy", desc: "gosta de gente e outros pets" },
    { id: "timido", label: "tímido", mood: "sleepy", desc: "observa de longe antes de chegar perto" },
    { id: "curioso", label: "curioso", mood: "surprise", desc: "investiga toda caixa e sacola" }
  ];

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose} aria-label="Fechar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
        </button>

        <div className="pv-modal-progress">
          {steps.map((s, i) => (
            <span key={i} className={i <= step ? "active" : ""} title={s.label}/>
          ))}
        </div>

        <div className="pv-modal-head">
          <span className="pv-modal-step">passo {step + 1} de {steps.length}</span>
          <h2>{stepTitle(step, data.name)}</h2>
          <p>{stepSubtitle(step)}</p>
        </div>

        <div className="pv-modal-body">
          {step === 0 && (
            <div className="pv-cat-form">
              <PhotoUploader value={data.photo} onChange={(v) => update("photo", v)}/>
              <div className="pv-set-row">
                <label>como ele se chama?</label>
                <input autoFocus placeholder="ex: quindim" value={data.name} onChange={e => update("name", e.target.value)}/>
              </div>
              <div className="pv-set-row">
                <label>sexo</label>
                <div className="pv-chip-group">
                  {["fêmea", "macho", "prefiro não dizer"].map(s => (
                    <button key={s} type="button" className={`pv-chip ${data.sex === s ? "on" : ""}`} onClick={() => update("sex", s)}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="pv-cat-form">
              <div className="pv-set-row pv-set-row-split">
                <div>
                  <label>idade</label>
                  <input type="number" min="0" placeholder="4" value={data.age} onChange={e => update("age", e.target.value)}/>
                </div>
                <div>
                  <label>unidade</label>
                  <div className="pv-chip-group">
                    {["meses", "anos"].map(u => (
                      <button key={u} type="button" className={`pv-chip ${data.ageUnit === u ? "on" : ""}`} onClick={() => update("ageUnit", u)}>{u}</button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pv-set-row">
                <label>raça / tipo</label>
                <select value={data.breed} onChange={e => update("breed", e.target.value)}>
                  <option>SRD</option>
                  <option>SRD laranja</option>
                  <option>SRD preto</option>
                  <option>SRD branco</option>
                  <option>SRD tricolor</option>
                  <option>Persa</option>
                  <option>Maine Coon</option>
                  <option>Siamês</option>
                  <option>Sphynx</option>
                  <option>British Shorthair</option>
                  <option>Ragdoll</option>
                  <option>Bengal</option>
                  <option>não sei dizer</option>
                </select>
              </div>
              <div className="pv-set-row pv-set-row-split">
                <div>
                  <label>peso (kg)</label>
                  <input type="number" step="0.1" placeholder="4.5" value={data.weight} onChange={e => update("weight", e.target.value)}/>
                </div>
                <div>
                  <label>aniversário (ganha presente!)</label>
                  <input type="text" placeholder="DD/MM" value={data.birthday} onChange={e => update("birthday", e.target.value)}/>
                </div>
              </div>
            </div>
          )}

          {step === 2 && !data.quizMode && (
            <div className="pv-cat-form">
              <div className="pv-quiz-toggle-row">
                <span>já sabe ou prefere descobrir?</span>
                <button type="button" className="pv-quiz-toggle-link" onClick={() => update("quizMode", true)}>
                  <PawGlyph size={14} color="#ed6058"/>
                  fazer um quiz rápido (90s) →
                </button>
              </div>
              <div className="pv-personality-grid">
                {personalities.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    className={`pv-personality-card ${data.personality === p.label ? "on" : ""}`}
                    onClick={() => update("personality", p.label)}
                  >
                    <CatGlyph size={48} color={data.personality === p.label ? "#fdfedf" : "#ed6058"} mood={p.mood}/>
                    <strong>{p.label}</strong>
                    <span>{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && data.quizMode && (
            <QuizInline
              cat={data.name}
              onCancel={() => update("quizMode", false)}
              onResult={(personality, likes) => {
                update("personality", personality);
                if (likes) setData(prev => ({ ...prev, personality, likes: [...new Set([...(prev.likes || []), ...likes])], quizMode: false }));
                else setData(prev => ({ ...prev, personality, quizMode: false }));
              }}
            />
          )}

          {step === 3 && (
            <div className="pv-cat-form">
              <div className="pv-set-row">
                <label>o que ele <strong style={{ color: "#ed6058" }}>adora</strong>?</label>
                <div className="pv-chip-group pv-chip-group-wrap">
                  {["penas","laser","varinhas","caixas","água corrente","catnip","túnel","alturas","papelinho","som crepitante"].map(it => (
                    <button key={it} type="button" className={`pv-chip ${data.likes.includes(it) ? "on" : ""}`} onClick={() => toggleArr("likes", it)}>{it}</button>
                  ))}
                </div>
              </div>
              <div className="pv-set-row">
                <label>e o que ele <strong style={{ color: "#c43030" }}>não curte</strong>?</label>
                <div className="pv-chip-group pv-chip-group-wrap">
                  {["barulho alto","banho","estranhos","outros gatos","cachorro","laser","esponja","aspirador"].map(it => (
                    <button key={it} type="button" className={`pv-chip ${data.dislikes.includes(it) ? "on" : ""}`} onClick={() => toggleArr("dislikes", it)}>{it}</button>
                  ))}
                </div>
              </div>
              <div className="pv-set-row">
                <label>alguma manha ou cuidado especial?</label>
                <textarea
                  rows="3"
                  placeholder="ex: bebe pouca água, prefere comer em prato raso, esconde-se quando chega visita..."
                  value={data.notes}
                  onChange={e => update("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="pv-cat-summary">
              <div className="pv-summary-card">
                <div className="pv-summary-photo">
                  {data.photo
                    ? <img src={data.photo} alt={data.name}/>
                    : <div className="pv-cat-photo-placeholder"><CatGlyph size={56} color="#ed6058" mood="happy"/></div>}
                </div>
                <div className="pv-summary-info">
                  <div className="pv-eyebrow"><span>{data.personality || "perfil novo"}</span></div>
                  <h3>{data.name || "sem nome"}</h3>
                  <p>{data.age} {data.ageUnit} · {data.breed}{data.weight ? ` · ${data.weight}kg` : ""}{data.sex ? ` · ${data.sex}` : ""}</p>
                  {data.notes && <p className="pv-summary-notes">“{data.notes}”</p>}
                </div>
              </div>

              {data.likes.length > 0 && (
                <div className="pv-summary-section">
                  <strong>adora</strong>
                  <div className="pv-chip-group pv-chip-group-wrap">
                    {data.likes.map(it => <span key={it} className="pv-chip pv-chip-static">{it}</span>)}
                  </div>
                </div>
              )}

              <div className="pv-summary-rec">
                <PawGlyph size={20} color="#ed6058"/>
                <div>
                  <strong>recomendações personalizadas pra {data.name || "seu gato"}</strong>
                  <p>com base no perfil, vamos sugerir 5 brinquedos certeiros logo de cara.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pv-modal-foot">
          {step > 0
            ? <button className="pv-modal-back" onClick={() => setStep(step - 1)}>← voltar</button>
            : <button className="pv-modal-back" onClick={onClose}>cancelar</button>}
          <button className="pv-pill pv-pill-primary" onClick={next} disabled={!steps[step].valid()}>
            {step === steps.length - 1 ? (initial ? "salvar alterações" : "finalizar cadastro ✓") : "continuar →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function stepTitle(step, name) {
  switch (step) {
    case 0: return "vamos conhecer seu gato";
    case 1: return `quantos anos ${name || "ele"} tem?`;
    case 2: return `como é a personalidade ${name ? "de " + name.toLowerCase() : "dele"}?`;
    case 3: return "do que ele gosta (e não gosta)";
    case 4: return "tudo certo!";
  }
}
function stepSubtitle(step) {
  switch (step) {
    case 0: return "começa com o básico — a foto a gente bota depois se preferir.";
    case 1: return "isso ajuda a sugerir produtos adequados pra fase de vida.";
    case 2: return "escolhe a que mais combina com ele agora. dá pra mudar depois.";
    case 3: return "opcional, mas ajuda muito na hora de recomendar.";
    case 4: return "dá uma conferídinha antes de salvar.";
  }
}

function QuizInline({ cat, onCancel, onResult }) {
  const [step, setStep] = uS(0);
  const [answers, setAnswers] = uS({});

  const questions = [
    {
      id: "energy",
      q: `como é o nível de energia ${cat ? "de " + cat.toLowerCase() : "dele"}?`,
      opts: [
        { val: "baixa", label: "calmo, dorme bastante", traits: ["contemplativo"] },
        { val: "media", label: "equilibrado, brinca de vez em quando", traits: ["sociável"] },
        { val: "alta", label: "caçador noturno", traits: ["caçador"] },
        { val: "explosiva", label: "energia o dia inteiro", traits: ["explosivo"] }
      ]
    },
    {
      id: "social",
      q: "como ele recebe visita?",
      opts: [
        { val: "esconde", label: "some no quarto", traits: ["tímido"] },
        { val: "espia", label: "observa de longe", traits: ["contemplativo"] },
        { val: "investiga", label: "vai investigar de perto", traits: ["curioso"] },
        { val: "interage", label: "deita no colo de qualquer um", traits: ["sociável"] }
      ]
    },
    {
      id: "play",
      q: "do que ele mais gosta na brincadeira?",
      opts: [
        { val: "perseguir", label: "perseguir penas e varinhas", traits: ["caçador"], likes: ["penas","varinhas"] },
        { val: "saltar", label: "saltar e escalar", traits: ["explosivo"], likes: ["alturas"] },
        { val: "esconder", label: "esconder em caixas e túneis", traits: ["tímido","curioso"], likes: ["caixas","túnel"] },
        { val: "observar", label: "observar pela janela", traits: ["contemplativo"] }
      ]
    },
    {
      id: "sound",
      q: "e o som?",
      opts: [
        { val: "papel", label: "papelinho amassado", traits: ["caçador"], likes: ["som crepitante","papelinho"] },
        { val: "silencio", label: "silêncio total", traits: ["contemplativo"] },
        { val: "agua", label: "água corrente", traits: ["sociável"], likes: ["água corrente"] },
        { val: "tudo", label: "tudo, é curioso", traits: ["curioso"] }
      ]
    },
    {
      id: "vibe",
      q: "se ele fosse um humano, seria...",
      opts: [
        { val: "atleta", label: "atleta", traits: ["explosivo","caçador"] },
        { val: "filosofo", label: "filósofo", traits: ["contemplativo"] },
        { val: "anfitriao", label: "anfitrião da festa", traits: ["sociável"] },
        { val: "detetive", label: "detetive curioso", traits: ["curioso"] }
      ]
    }
  ];

  const finalize = () => {
    // Count trait votes
    const traitCount = {};
    const likesSet = new Set();
    Object.entries(answers).forEach(([qid, val]) => {
      const opt = questions.find(q => q.id === qid)?.opts.find(o => o.val === val);
      opt?.traits?.forEach(t => traitCount[t] = (traitCount[t] || 0) + 1);
      opt?.likes?.forEach(l => likesSet.add(l));
    });
    const personality = Object.entries(traitCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "sociável";
    onResult(personality, [...likesSet]);
  };

  if (step >= questions.length) {
    // Result screen
    const traitCount = {};
    const likesSet = new Set();
    Object.entries(answers).forEach(([qid, val]) => {
      const opt = questions.find(q => q.id === qid)?.opts.find(o => o.val === val);
      opt?.traits?.forEach(t => traitCount[t] = (traitCount[t] || 0) + 1);
      opt?.likes?.forEach(l => likesSet.add(l));
    });
    const personality = Object.entries(traitCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "sociável";
    const likes = [...likesSet];

    return (
      <div className="pv-quiz-inline-result">
        <Squircle color="#ed6058" className="pv-qir-card">
          <PawPattern color="#fdfedf" opacity={0.12} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-qir-inner">
            <CatGlyph size={64} color="#fdfedf" mood={personality === "explosivo" ? "surprise" : personality === "contemplativo" ? "sleepy" : "happy"}/>
            <div className="pv-eyebrow pv-eyebrow-dark"><span>perfil identificado</span></div>
            <h3>{cat || "seu gato"} é um gato <strong>{personality}</strong></h3>
            <p>vamos usar isso pra recomendar brinquedos certeiros e ajustar a personalidade no perfil.</p>
            {likes.length > 0 && (
              <div className="pv-qir-likes">
                <span>já vou marcar como favoritos:</span>
                <div className="pv-chip-group pv-chip-group-wrap">
                  {likes.map(l => <span key={l} className="pv-chip pv-chip-static" style={{ background: "rgba(253, 254, 223, 0.22)", color: "#fdfedf" }}>{l}</span>)}
                </div>
              </div>
            )}
          </div>
        </Squircle>
        <div className="pv-qir-actions">
          <button className="pv-modal-back" onClick={() => setStep(0)}>refazer quiz</button>
          <button className="pv-pill pv-pill-primary" onClick={finalize}>aplicar e continuar →</button>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="pv-quiz-inline">
      <div className="pv-quiz-inline-head">
        <button className="pv-quiz-inline-back" onClick={onCancel}>← escolher direto</button>
        <span className="pv-quiz-inline-counter">pergunta {step + 1} de {questions.length}</span>
      </div>
      <div className="pv-quiz-inline-progress">
        {questions.map((_, i) => <span key={i} className={i <= step ? "active" : ""}/>)}
      </div>
      <h3 className="pv-quiz-inline-q">{q.q}</h3>
      <div className="pv-quiz-inline-opts">
        {q.opts.map(o => (
          <button
            key={o.val}
            className={`pv-quiz-inline-opt ${answers[q.id] === o.val ? "on" : ""}`}
            onClick={() => {
              setAnswers({ ...answers, [q.id]: o.val });
              setTimeout(() => setStep(step + 1), 250);
            }}
          >
            <span className="pv-quiz-inline-bullet"><PawGlyph size={14} color="currentColor"/></span>
            <span>{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PhotoUploader({ value, onChange }) {
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result);
    reader.readAsDataURL(f);
  };
  return (
    <div className="pv-photo-uploader" onClick={() => fileRef.current?.click()}>
      {value
        ? <>
            <img src={value} alt=""/>
            <button className="pv-photo-remove" onClick={(e) => { e.stopPropagation(); onChange(null); }} aria-label="Remover">×</button>
          </>
        : <>
            <div className="pv-photo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="14" rx="3"/>
                <path d="M3 16 L 8 11 L 13 16 L 16 13 L 21 18"/>
                <circle cx="15.5" cy="10.5" r="1.5"/>
                <path d="M7 6 L 9 3 L 15 3 L 17 6"/>
              </svg>
            </div>
            <strong>adicionar foto</strong>
            <span>opcional · funciona melhor com retratos quadrados</span>
          </>
      }
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={handleFile}/>
    </div>
  );
}

// ───── Favoritos
function ProfileWishlist({ onNav }) {
  const [wishlist, setWishlist] = uS(PROFILE.wishlist);
  const [removing, setRemoving] = uS(null);

  const removeItem = (idx, e) => {
    // Floating heart effect
    const rect = e.currentTarget.getBoundingClientRect();
    const heart = document.createElement("div");
    heart.className = "pv-heart-float";
    heart.style.left = rect.left + rect.width / 2 + "px";
    heart.style.top = rect.top + rect.height / 2 + "px";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "32"); svg.setAttribute("height", "32"); svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "#ed6058"); svg.setAttribute("stroke", "#ed6058"); svg.setAttribute("stroke-width", "2");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M12 20 L 4 13 Q 1 9 5 5 Q 9 1 12 6 Q 15 1 19 5 Q 23 9 20 13 Z");
    svg.appendChild(path); heart.appendChild(svg);
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);

    setRemoving(idx);
    setTimeout(() => {
      setWishlist(wishlist.filter((_, i) => i !== idx));
      setRemoving(null);
    }, 400);
  };

  if (wishlist.length === 0) {
    return (
      <div className="pv-profile-wishlist">
        <div className="pv-orders-head">
          <h2>favoritos</h2>
        </div>
        <Squircle color="#fcebf1" className="pv-empty-state">
          <CatGlyph size={72} color="#ed6058" mood="sleepy"/>
          <h3>nenhum favorito ainda</h3>
          <p>toque no coração de qualquer produto para guardar pra depois.</p>
          <PillBtn onClick={() => onNav({ view: "home" })}>explorar a loja</PillBtn>
        </Squircle>
      </div>
    );
  }

  return (
    <div className="pv-profile-wishlist">
      <div className="pv-orders-head">
        <h2>favoritos</h2>
        <span className="pv-wishlist-count">{wishlist.length} produtos salvos</span>
      </div>
      <div className="pv-wish-grid">
        {wishlist.map((w, i) => (
          <article key={w.name} className={`pv-wish-card ${removing === i ? "removing" : ""}`}>
            <Squircle color={w.color} className="pv-wish-img">
              <img src={w.img} alt={w.name}/>
              <button className="pv-wish-remove" onClick={(e) => removeItem(i, e)} aria-label="Remover dos favoritos">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M12 20 L 4 13 Q 1 9 5 5 Q 9 1 12 6 Q 15 1 19 5 Q 23 9 20 13 Z"/></svg>
              </button>
            </Squircle>
            <div className="pv-wish-info">
              <strong>{w.name}</strong>
              <div className="pv-wish-price">
                {w.old && <s>{fmtBR(w.old)}</s>}
                <span>{fmtBR(w.price)}</span>
              </div>
              <button className="pv-wish-add">adicionar ao carrinho</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// ───── Endereços
function ProfileAddresses() {
  const [addresses, setAddresses] = uS(PROFILE.addresses);
  const [editing, setEditing] = uS(null);
  const [adding, setAdding] = uS(false);

  const saveAddress = (addr) => {
    if (editing) {
      setAddresses(addresses.map(a => a.id === editing.id ? { ...addr, id: editing.id } : a));
    } else {
      setAddresses([...addresses, { ...addr, id: Date.now() }]);
    }
    setAdding(false);
    setEditing(null);
  };

  const removeAddr = (id) => {
    if (!confirm("Remover esse endereço?")) return;
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const setAsMain = (id) => {
    setAddresses(addresses.map(a => ({ ...a, main: a.id === id })));
  };

  return (
    <div className="pv-profile-addr">
      <div className="pv-orders-head">
        <h2>endereços</h2>
        <button className="pv-add-btn" onClick={() => setAdding(true)}>+ novo endereço</button>
      </div>
      <div className="pv-addr-grid">
        {addresses.map(a => (
          <Squircle key={a.id} color={a.main ? "#fcebf1" : "#fdfedf"} className="pv-addr-card">
            <div className="pv-addr-head">
              <strong>{a.label}</strong>
              {a.main && <span className="pv-tag-main">principal</span>}
            </div>
            <p>{a.line1}</p>
            <p>{a.line2}</p>
            <p className="pv-addr-zip">CEP {a.zip}</p>
            <div className="pv-addr-actions">
              <button onClick={() => setEditing(a)}>editar</button>
              {!a.main && <button onClick={() => setAsMain(a.id)}>tornar principal</button>}
              <button className="pv-addr-del" onClick={() => removeAddr(a.id)}>remover</button>
            </div>
          </Squircle>
        ))}
      </div>
      {(adding || editing) && (
        <AddressForm
          initial={editing}
          onClose={() => { setAdding(false); setEditing(null); }}
          onSave={saveAddress}
        />
      )}
    </div>
  );
}

function AddressForm({ initial, onClose, onSave }) {
  const [data, setData] = uS(initial || {
    label: "",
    zip: "",
    line1: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    reference: "",
    main: false
  });
  const [loading, setLoading] = uS(false);

  const upd = (k, v) => setData({ ...data, [k]: v });

  const formatCEP = (v) => v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

  // Simulated CEP lookup
  const lookupCEP = async (cep) => {
    const clean = cep.replace(/\D/g, "");
    if (clean.length !== 8) return;
    setLoading(true);
    // Mock — in production, fetch viacep.com.br
    await new Promise(r => setTimeout(r, 700));
    const mockData = {
      "01304001": { line1: "Rua Augusta", neighborhood: "Consolação", city: "São Paulo", state: "SP" },
      "01310100": { line1: "Avenida Paulista", neighborhood: "Bela Vista", city: "São Paulo", state: "SP" },
      "22230060": { line1: "Rua Cosme Velho", neighborhood: "Cosme Velho", city: "Rio de Janeiro", state: "RJ" }
    };
    const found = mockData[clean] || { line1: "Rua Exemplo", neighborhood: "Centro", city: "São Paulo", state: "SP" };
    setData(prev => ({ ...prev, ...found, zip: formatCEP(clean) }));
    setLoading(false);
  };

  const canSave = data.label && data.zip && data.line1 && data.number && data.city;

  const handleSave = () => {
    const line1Full = `${data.line1}, ${data.number}${data.complement ? `, ${data.complement}` : ""}`;
    const line2Full = `${data.neighborhood} · ${data.city}, ${data.state}`;
    onSave({ ...data, line1: line1Full, line2: line2Full });
  };

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>
        <div className="pv-modal-head">
          <span className="pv-modal-step">{initial ? "editar endereço" : "novo endereço"}</span>
          <h2>{initial ? "atualizar endereço" : "onde a gente entrega?"}</h2>
          <p>cadastra uma vez, usa em todos os pedidos.</p>
        </div>
        <div className="pv-modal-body">
          <div className="pv-cat-form">
            <div className="pv-set-row">
              <label>apelido do endereço</label>
              <input
                placeholder="ex: casa, trabalho, casa dos pais"
                value={data.label}
                onChange={e => upd("label", e.target.value)}
              />
            </div>
            <div className="pv-set-row">
              <label>CEP</label>
              <div className="pv-cep-row">
                <input
                  placeholder="00000-000"
                  value={data.zip}
                  onChange={e => upd("zip", formatCEP(e.target.value))}
                  onBlur={e => lookupCEP(e.target.value)}
                />
                {loading && <span className="pv-cep-loading">buscando...</span>}
                <a className="pv-cep-link" href="https://buscacepinter.correios.com.br" target="_blank" rel="noreferrer">não sei meu CEP →</a>
              </div>
            </div>
            <div className="pv-set-row">
              <label>logradouro</label>
              <input
                placeholder="rua, avenida..."
                value={data.line1}
                onChange={e => upd("line1", e.target.value)}
              />
            </div>
            <div className="pv-set-row-split">
              <div>
                <label>número</label>
                <input placeholder="123" value={data.number} onChange={e => upd("number", e.target.value)}/>
              </div>
              <div>
                <label>complemento</label>
                <input placeholder="apto, bloco..." value={data.complement} onChange={e => upd("complement", e.target.value)}/>
              </div>
            </div>
            <div className="pv-set-row-split">
              <div>
                <label>bairro</label>
                <input placeholder="bairro" value={data.neighborhood} onChange={e => upd("neighborhood", e.target.value)}/>
              </div>
              <div>
                <label>cidade · estado</label>
                <input placeholder="cidade, UF" value={`${data.city}${data.state ? ", " + data.state : ""}`} readOnly/>
              </div>
            </div>
            <div className="pv-set-row">
              <label>ponto de referência (opcional)</label>
              <input
                placeholder="ex: portão azul, perto da padaria"
                value={data.reference}
                onChange={e => upd("reference", e.target.value)}
              />
            </div>
            <div className="pv-toggle-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <span>definir como endereço principal</span>
              <button className={`pv-toggle ${data.main ? "on" : ""}`} onClick={() => upd("main", !data.main)}>
                <span/>
              </button>
            </div>
          </div>
        </div>
        <div className="pv-modal-foot">
          <button className="pv-modal-back" onClick={onClose}>cancelar</button>
          <button className="pv-pill pv-pill-primary" onClick={handleSave} disabled={!canSave}>
            {initial ? "salvar alterações" : "salvar endereço"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ───── Carteira
function ProfileWallet() {
  const [u, setU] = uS(PROFILE.user);
  const [cards, setCards] = uS(PROFILE.cards);
  const [redeemOpen, setRedeemOpen] = uS(false);
  const [earnOpen, setEarnOpen] = uS(false);
  const [addCardOpen, setAddCardOpen] = uS(false);
  const [toast, setToast] = uS("");

  const handleRedeem = (pts, amount) => {
    setU({ ...u, points: u.points - pts });
    setRedeemOpen(false);
    setToast(`✓ ${pts} pontos trocados por R$ ${amount.toFixed(2).replace(".", ",")} de desconto`);
    setTimeout(() => setToast(""), 3000);
  };

  const handleAddCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }]);
    setAddCardOpen(false);
  };

  return (
    <div className="pv-profile-wallet">
      <Squircle color="#ed6058" className="pv-wallet-card">
        <PawPattern color="#fdfedf" opacity={0.1} style={{ position: "absolute", inset: 0 }}/>
        <div className="pv-wallet-inner">
          <div className="pv-eyebrow pv-eyebrow-dark"><span>seus pontos · clube veludo</span></div>
          <div className="pv-wallet-points">
            <strong>{u.points.toLocaleString("pt-BR")}</strong>
            <em>pontos</em>
          </div>
          <p>valem <strong>{fmtBR(u.points / 10)}</strong> em desconto na próxima compra</p>
          <div className="pv-wallet-actions">
            <button className="pv-pill pv-pill-cream pv-pill-sm" onClick={() => setRedeemOpen(true)}>resgatar agora</button>
            <button className="pv-pill pv-pill-ghost pv-pill-sm" style={{ color: "#fdfedf", boxShadow: "inset 0 0 0 2px #fdfedf" }} onClick={() => setEarnOpen(true)}>como ganhar mais</button>
          </div>
        </div>
      </Squircle>

      <div className="pv-orders-head">
        <h2>cartões salvos</h2>
        <button className="pv-add-btn" onClick={() => setAddCardOpen(true)}>+ novo cartão</button>
      </div>
      <div className="pv-cards-grid">
        {cards.map(c => (
          <CreditCardVisual key={c.id} card={c}/>
        ))}
      </div>

      {redeemOpen && <RedeemModal points={u.points} onClose={() => setRedeemOpen(false)} onConfirm={handleRedeem}/>}
      {earnOpen && <EarnPointsModal points={u.points} onClose={() => setEarnOpen(false)}/>}
      {addCardOpen && <AddCardModal onClose={() => setAddCardOpen(false)} onSave={handleAddCard}/>}
      {toast && <div className="pv-wallet-toast"><PawGlyph size={20} color="#fdfedf"/><span>{toast}</span></div>}
    </div>
  );
}

// Cartão com chip + brand
function CreditCardVisual({ card }) {
  const brandStyle = {
    "Visa": { from: "#1a1f71", to: "#2a3a8f" },
    "Mastercard": { from: "#2a1612", to: "#4a2820" },
    "Elo": { from: "#ed6058", to: "#c43030" },
    "American Express": { from: "#1d6cb0", to: "#0f4880" }
  };
  const style = brandStyle[card.brand] || brandStyle["Mastercard"];

  return (
    <div className="pv-card-saved" style={{
      background: `linear-gradient(135deg, ${style.from} 0%, ${style.to} 100%)`
    }}>
      <div className="pv-card-chip">
        <div className="pv-card-chip-inner">
          <span/><span/><span/>
          <span/><span/><span/>
        </div>
      </div>
      <div className="pv-card-brand-row">
        <div className="pv-card-brand">{card.brand}</div>
        {card.main && <em>principal</em>}
      </div>
      <div className="pv-card-num">•••• •••• •••• <strong>{card.last}</strong></div>
      <div className="pv-card-foot">
        <span>exp {card.exp}</span>
        <div className="pv-card-brand-logo">
          {card.brand === "Visa" && <span style={{ fontFamily: "serif", fontWeight: 700, fontStyle: "italic", letterSpacing: "0.06em" }}>VISA</span>}
          {card.brand === "Mastercard" && (
            <div style={{ display: "flex" }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#eb001b", marginRight: -8 }}/>
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#f79e1b", opacity: 0.85 }}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Modal de Resgate
function RedeemModal({ points, onClose, onConfirm }) {
  const options = [
    { pts: 500, amount: 50, label: "R$ 50 OFF" },
    { pts: 1000, amount: 110, label: "R$ 110 OFF", bonus: "+10%" },
    { pts: 1500, amount: 180, label: "R$ 180 OFF", bonus: "+20%" },
    { pts: 1840, amount: 230, label: "R$ 230 OFF · usar tudo", bonus: "+25%", featured: true }
  ];
  const filtered = options.filter(o => o.pts <= points);
  const [selected, setSelected] = uS(filtered[filtered.length - 1]?.pts);

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>
        <div className="pv-modal-head">
          <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>resgatar pontos</span></div>
          <h2>quanto você quer trocar?</h2>
          <p>quanto mais pontos você troca de uma vez, maior o bônus.</p>
        </div>
        <div className="pv-modal-body">
          <div className="pv-redeem-balance">
            <span>saldo disponível</span>
            <strong>{points.toLocaleString("pt-BR")} pontos</strong>
          </div>
          <div className="pv-redeem-options">
            {filtered.map(o => (
              <button
                key={o.pts}
                className={`pv-redeem-opt ${o.featured ? "featured" : ""} ${selected === o.pts ? "on" : ""}`}
                onClick={() => setSelected(o.pts)}
              >
                <div className="pv-redeem-radio">
                  {selected === o.pts && <span/>}
                </div>
                <div className="pv-redeem-info">
                  <strong>{o.label}</strong>
                  <span>troca {o.pts} pontos</span>
                </div>
                {o.bonus && <em className="pv-redeem-bonus">bônus {o.bonus}</em>}
              </button>
            ))}
          </div>
          <Squircle color="#fcebf1" className="pv-redeem-note">
            <PawGlyph size={20} color="#ed6058"/>
            <div>
              <strong>como funciona?</strong>
              <p>o desconto fica disponível na próxima compra acima de R$ 100. válido por 90 dias. não acumula com outros cupons promocionais.</p>
            </div>
          </Squircle>
        </div>
        <div className="pv-modal-foot">
          <button className="pv-modal-back" onClick={onClose}>cancelar</button>
          <button
            className="pv-pill pv-pill-primary"
            onClick={() => {
              const opt = filtered.find(o => o.pts === selected);
              if (opt) onConfirm(opt.pts, opt.amount);
            }}
            disabled={!selected}
          >
            confirmar resgate ✓
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal de Como Ganhar Pontos
function EarnPointsModal({ points, onClose }) {
  const ways = [
    { icon: "shop", title: "compre na loja", pts: "+1 pt", per: "a cada R$ 10 gastos", note: "automaticamente após confirmação do pedido" },
    { icon: "review", title: "avalie um produto comprado", pts: "+50 pts", per: "por avaliação", note: "máximo 3 produtos por mês" },
    { icon: "share", title: "indique amigos", pts: "+200 pts", per: "por cada amigo que comprar", note: "seu amigo também ganha 10% OFF na 1ª compra" },
    { icon: "cat", title: "cadastre seu gato", pts: "+100 pts", per: "por gato", note: "ganhou +100 pts quando você cadastrou o quindim e a anchovinha", done: true },
    { icon: "birthday", title: "aniversário do gato", pts: "+500 pts", per: "no aniversário", note: "configure no perfil do seu gato" },
    { icon: "newsletter", title: "assine a newsletter", pts: "+30 pts", per: "uma vez", note: "dicas de comportamento + cupons exclusivos" },
    { icon: "first", title: "primeira compra", pts: "+150 pts", per: "uma vez", note: "✓ você já ganhou esses pontos!", done: true },
    { icon: "social", title: "marque a gente no instagram", pts: "+80 pts", per: "por post aprovado", note: "@patadeveludo · use #meuveludo" }
  ];

  const tiers = [
    { name: "Veludo", min: 0, current: true, perks: ["10% OFF na 1ª compra", "frete grátis acima de R$ 149"] },
    { name: "Veludo Ouro", min: 2500, perks: ["15% OFF sempre", "frete grátis em qualquer valor", "acesso antecipado a lançamentos"] },
    { name: "Veludo Pantera", min: 6000, perks: ["20% OFF sempre", "presente surpresa no aniversário do gato", "brinquedo grátis a cada R$ 500"] }
  ];

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal pv-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>
        <div className="pv-modal-head">
          <div className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>clube veludo</span></div>
          <h2>como ganhar mais pontos</h2>
          <p>cada ponto vira R$ 0,10 de desconto. zero pegadinha, zero validade curta (90 dias).</p>
        </div>
        <div className="pv-modal-body">
          <div className="pv-earn-grid">
            {ways.map(w => (
              <div key={w.title} className={`pv-earn-card ${w.done ? "done" : ""}`}>
                <div className="pv-earn-icon"><EarnIcon name={w.icon}/></div>
                <div className="pv-earn-info">
                  <div className="pv-earn-head">
                    <strong>{w.title}</strong>
                    <em>{w.pts}</em>
                  </div>
                  <span className="pv-earn-per">{w.per}</span>
                  <p>{w.note}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="pv-earn-tier-h">tiers do clube</h3>
          <div className="pv-tier-ladder">
            {tiers.map((t, i) => (
              <div key={t.name} className={`pv-tier-step ${t.current ? "current" : ""} ${points >= t.min ? "achieved" : ""}`}>
                <div className="pv-tier-step-head">
                  <div className="pv-tier-step-dot">{i + 1}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.min === 0 ? "ao se cadastrar" : `a partir de ${t.min.toLocaleString("pt-BR")} pts`}</span>
                  </div>
                  {t.current && <em>seu tier</em>}
                </div>
                <ul>
                  {t.perks.map(p => <li key={p}><PawGlyph size={10} color="#ed6058"/>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pv-modal-foot">
          <button className="pv-modal-back" onClick={onClose}>fechar</button>
          <button className="pv-pill pv-pill-primary" onClick={onClose}>ir comprar e ganhar pontos →</button>
        </div>
      </div>
    </div>
  );
}

function EarnIcon({ name }) {
  const c = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    shop: <path d="M5 7 L 19 7 L 17 18 L 7 18 Z M 8 7 Q 8 3 12 3 Q 16 3 16 7"/>,
    review: <path d="M12 4 L 14 9 L 19 10 L 15 14 L 16 19 L 12 16 L 8 19 L 9 14 L 5 10 L 10 9 Z"/>,
    share: <path d="M5 12 L 11 8 M 5 12 L 11 16 M 18 6 a 3 3 0 1 0 -6 0 a 3 3 0 0 0 6 0 Z M 18 18 a 3 3 0 1 0 -6 0 a 3 3 0 0 0 6 0 Z M 8 12 a 3 3 0 1 0 -6 0 a 3 3 0 0 0 6 0 Z"/>,
    cat: <path d="M6 8 L 4 4 L 8 6 M 18 8 L 20 4 L 16 6 M 6 8 Q 12 6 18 8 Q 20 14 18 18 Q 12 21 6 18 Q 4 14 6 8 Z M 10 13 V 14 M 14 13 V 14"/>,
    birthday: <path d="M5 11 H 19 V 18 H 5 Z M 12 11 V 7 M 8 11 V 8 M 16 11 V 8 M 5 14 Q 9 17 12 14 Q 15 17 19 14"/>,
    newsletter: <path d="M4 6 H 20 V 18 H 4 Z M 4 6 L 12 13 L 20 6"/>,
    first: <path d="M12 21 L 4 17 V 7 L 12 3 L 20 7 V 17 Z M 12 3 V 21 M 4 7 L 20 17 M 20 7 L 4 17"/>,
    social: <path d="M5 6 V 18 L 8 16 H 18 V 6 Z M 9 12 a 3 3 0 1 0 6 0 a 3 3 0 0 0 -6 0 Z M 16 8 V 8.5"/>
  };
  return <svg {...c}>{paths[name] || paths.shop}</svg>;
}

// Modal adicionar cartão
function AddCardModal({ onClose, onSave }) {
  const [data, setData] = uS({ number: "", name: "", exp: "", cvv: "", main: false });
  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v) => v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");
  const detectBrand = (n) => {
    const digit = n.replace(/\D/g, "")[0];
    if (digit === "4") return "Visa";
    if (digit === "5") return "Mastercard";
    if (digit === "3") return "American Express";
    if (digit === "6") return "Elo";
    return "Mastercard";
  };
  const canSave = data.number.replace(/\s/g, "").length >= 14 && data.name && data.exp.length === 5 && data.cvv.length >= 3;

  return (
    <div className="pv-modal-mask" onClick={onClose}>
      <div className="pv-modal" onClick={e => e.stopPropagation()}>
        <button className="pv-modal-close" onClick={onClose}>×</button>
        <div className="pv-modal-head">
          <span className="pv-modal-step">novo cartão</span>
          <h2>adicionar cartão</h2>
          <p>seus dados ficam criptografados. cobramos só no momento da compra.</p>
        </div>
        <div className="pv-modal-body">
          <div style={{ marginBottom: 20 }}>
            <CreditCardVisual card={{
              brand: detectBrand(data.number),
              last: (data.number.replace(/\s/g, "").slice(-4) || "0000"),
              exp: data.exp || "00/00",
              main: data.main
            }}/>
          </div>
          <div className="pv-cat-form">
            <div className="pv-set-row">
              <label>número do cartão</label>
              <input placeholder="0000 0000 0000 0000" value={data.number} onChange={e => setData({...data, number: formatCard(e.target.value)})}/>
            </div>
            <div className="pv-set-row">
              <label>nome impresso</label>
              <input placeholder="como aparece no cartão" value={data.name} onChange={e => setData({...data, name: e.target.value.toUpperCase()})}/>
            </div>
            <div className="pv-set-row-split">
              <div>
                <label>validade</label>
                <input placeholder="MM/AA" value={data.exp} onChange={e => setData({...data, exp: formatExp(e.target.value)})}/>
              </div>
              <div>
                <label>cvv</label>
                <input placeholder="•••" maxLength="4" value={data.cvv} onChange={e => setData({...data, cvv: e.target.value.replace(/\D/g, "")})}/>
              </div>
            </div>
            <div className="pv-toggle-row" style={{ borderBottom: "none", paddingBottom: 0 }}>
              <span>definir como cartão principal</span>
              <button className={`pv-toggle ${data.main ? "on" : ""}`} onClick={() => setData({...data, main: !data.main})}>
                <span/>
              </button>
            </div>
          </div>
        </div>
        <div className="pv-modal-foot">
          <button className="pv-modal-back" onClick={onClose}>cancelar</button>
          <button className="pv-pill pv-pill-primary" disabled={!canSave} onClick={() => onSave({
            brand: detectBrand(data.number),
            last: data.number.replace(/\s/g, "").slice(-4),
            exp: data.exp,
            main: data.main
          })}>salvar cartão</button>
        </div>
      </div>
    </div>
  );
}

// ───── Configurações
function ProfileSettings() {
  const u = PROFILE.user;
  return (
    <div className="pv-profile-settings">
      <h2>conta</h2>
      <Squircle color="#fdfedf" className="pv-settings-card">
        <div className="pv-set-row">
          <label>nome completo</label>
          <input defaultValue={u.name}/>
        </div>
        <div className="pv-set-row">
          <label>e-mail</label>
          <input defaultValue={u.email}/>
        </div>
        <div className="pv-set-row">
          <label>telefone</label>
          <input defaultValue={u.phone}/>
        </div>
        <div className="pv-set-row">
          <label>aniversário do gato (ganha presente)</label>
          <input type="text" placeholder="DD/MM"/>
        </div>
      </Squircle>

      <h2>preferências de comunicação</h2>
      <Squircle color="#fcebf1" className="pv-settings-card">
        <SettingToggle label="receber novidades e lançamentos por e-mail" defaultOn/>
        <SettingToggle label="receber promoções e cupons por whatsapp" defaultOn/>
        <SettingToggle label="alertas quando um favorito entrar em promoção" defaultOn/>
        <SettingToggle label="newsletter mensal de comportamento felino"/>
      </Squircle>

      <h2>segurança</h2>
      <Squircle color="#fdfedf" className="pv-settings-card">
        <button className="pv-set-btn">alterar senha</button>
        <button className="pv-set-btn">ativar autenticação em dois fatores</button>
        <button className="pv-set-btn pv-set-btn-danger">excluir minha conta</button>
      </Squircle>
    </div>
  );
}

function SettingToggle({ label, defaultOn }) {
  const [on, setOn] = uS(!!defaultOn);
  return (
    <div className="pv-toggle-row">
      <span>{label}</span>
      <button className={`pv-toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)} aria-pressed={on}>
        <span/>
      </button>
    </div>
  );
}

Object.assign(window, { ProfileView });
