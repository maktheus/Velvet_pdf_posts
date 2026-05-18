// Pata de Veludo — App principal
const { useState: usePV, useEffect: uePV, useRef: urPV, useMemo: umPV } = React;
const PV = window.PV_DATA;

// ───────── Header ─────────
function Header({ onNav, cartCount, onCart, onAccount }) {
  const [open, setOpen] = usePV(false);
  const offers = [
    "10% OFF na primeira compra: use VELUDO10",
    "Frete grátis acima de R$ 149 pra todo Brasil",
    "Compre 2 brinquedos, leve 3",
    "Parcele em até 4x sem juros",
    "Garantia de 30 dias pra trocar"
  ];
  return (
    <header className="pv-header">
      <div className="pv-header-banner">
        <Marquee items={offers} speed={32}/>
      </div>
      <div className="pv-header-row">
        <Logo size={72} onClick={() => onNav({ view: "home" })}/>
        <nav className="pv-nav">
          <button onClick={() => onNav({ view: "cat", cat: "brincar" })}>Brincar</button>
          <button onClick={() => onNav({ view: "cat", cat: "descansar" })}>Descansar</button>
          <button onClick={() => onNav({ view: "cat", cat: "hidratar" })}>Hidratar</button>
          <button onClick={() => onNav({ view: "cat", cat: "cuidar" })}>Cuidar</button>
          <button onClick={() => onNav({ view: "kits" })}>Kits</button>
          <button onClick={() => onNav({ view: "diario" })}>Diário</button>
        </nav>
        <div className="pv-header-actions">
          <button className="pv-icon-btn" aria-label="Buscar" onClick={() => setOpen(!open)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="20" y1="20" x2="15.5" y2="15.5"/></svg>
          </button>
          <button className="pv-icon-btn" aria-label="Minha conta" onClick={onAccount}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20 Q 12 14 20 20"/></svg>
          </button>
          <a className="pv-icon-btn pv-admin-link" href="#admin" aria-label="Painel Admin" title="Painel Admin">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </a>
          <button className="pv-cart-btn" aria-label="Carrinho" onClick={onCart}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 7 L 19 7 L 17 18 L 7 18 Z"/><path d="M8 7 Q 8 3 12 3 Q 16 3 16 7"/></svg>
            {cartCount > 0 && <span className="pv-cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
      {open && (
        <div className="pv-search-bar">
          <input autoFocus placeholder="o que seu gato precisa hoje?" />
          <div className="pv-search-chips">
            {["ratinho elétrico","fonte silenciosa","ninho redondo","catnip","arranhador"].map(c => (
              <button key={c}>{c}</button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ───────── Hero ─────────
function Hero({ onNav }) {
  return (
    <section className="pv-hero">
      <div className="pv-hero-grid">
        <div className="pv-hero-copy">
          <div className="pv-eyebrow">
            <PawGlyph size={18} color="#ed6058"/>
            <span>Coleção primavera · gatos primeiro</span>
          </div>
          <h1 className="pv-hero-title">
            <span>brinquedos</span>
            <span>que entendem</span>
            <span>de gato.</span>
          </h1>
          <p className="pv-hero-sub">
            Coleção pequena, escolhida com veterinária comportamental e testada na rotina de gatos de apartamento.
            Envio expresso pra todo Brasil em até 72h.
          </p>
          <div className="pv-hero-ctas">
            <PillBtn onClick={() => onNav({ view: "cat", cat: "brincar" })}>Ver brinquedos</PillBtn>
            <PillBtn variant="ghost" onClick={() => onNav({ view: "quiz" })}>
              <span>Fazer o quiz do gato</span>
            </PillBtn>
          </div>
          <div className="pv-hero-trust">
            <div><strong>10% OFF</strong><span>na sua primeira compra</span></div>
            <div><strong>72h</strong><span>frete expresso pra todo Brasil</span></div>
            <div><strong>30 dias</strong><span>pra trocar sem pergunta</span></div>
          </div>
        </div>
        <div className="pv-hero-visual">
          <Squircle color="#ed6058" className="pv-hero-tile pv-hero-tile-main">
            <img src="assets/puzzle-2.jpg" alt="Gato laranja com brinquedo" className="pv-hero-img"/>
            <div className="pv-hero-badge">
              <div className="pv-hero-badge-avatar"><img src="assets/puzzle-3.jpg" alt=""/></div>
              <div><strong>Mafalda, 4 anos</strong><span>caçadora oficial</span></div>
            </div>
          </Squircle>
          <Squircle color="#fcebf1" className="pv-hero-tile pv-hero-tile-a">
            <img src="assets/puzzle-4.jpg" alt="Gato siamês" className="pv-hero-img"/>
          </Squircle>
          <Squircle color="#fdfedf" className="pv-hero-tile pv-hero-tile-b">
            <div className="pv-hero-tile-num">
              <span>09</span>
              <em>brinquedos<br/>escolhidos a dedo</em>
            </div>
          </Squircle>
          <Squircle color="#ed6058" className="pv-hero-tile pv-hero-tile-c">
            <img src="assets/puzzle-5.jpg" alt="Gato preto" className="pv-hero-img"/>
          </Squircle>
        </div>
      </div>
    </section>
  );
}

// ───────── Compre por momento ─────────
function MomentStrip({ onNav }) {
  return (
    <section className="pv-moments">
      <div className="pv-section-head">
        <h2>compre por momento da rotina</h2>
        <p>do soneco da tarde à caçada das 3 da manhã.</p>
      </div>
      <div className="pv-moments-grid">
        {PV.categories.map((c, i) => (
          <Reveal key={c.id} delay={i * 70}>
            <button className="pv-moment" onClick={() => onNav({ view: "cat", cat: c.id })}>
              <Squircle color={i % 2 ? "#fcebf1" : "#fdfedf"}>
                <CategoryIcon kind={c.emoji} size={72} color="#ed6058"/>
              </Squircle>
              <strong>{c.label}</strong>
              <span>{c.desc}</span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ───────── Product card ─────────
function ProductCard({ p, onOpen, onAdd }) {
  return (
    <article className="pv-product" onClick={() => onOpen(p.id)}>
      <Squircle color={p.colorways[0]} className="pv-product-img">
        {p.images && p.images[0]
          ? <img src={p.images[0]} alt={p.name} className="pv-product-photo"/>
          : <ProductPlaceholder label={`foto · ${p.name.toLowerCase()}`} color="#fdfedf" bg={p.colorways[0]}/>
        }
        {p.tag && <span className="pv-product-tag">{p.tag}</span>}
        <button className="pv-product-add" onClick={(e) => { e.stopPropagation(); onAdd(p); }} aria-label="Adicionar">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </Squircle>
      <div className="pv-product-meta">
        <h3>{p.name}</h3>
        <p>{p.tagline}</p>
        <div className="pv-product-bottom">
          <div className="pv-product-price">
            {p.old && <s>R$ {p.old.toFixed(2).replace(".", ",")}</s>}
            <strong>R$ {p.price.toFixed(2).replace(".", ",")}</strong>
          </div>
          <div className="pv-product-colors">
            {p.colorways.map((c, i) => <span key={i} style={{ background: c }}/>)}
          </div>
        </div>
      </div>
    </article>
  );
}

// ───────── Featured grid (home) ─────────
function Featured({ onOpen, onAdd, onNav }) {
  const featured = PV.products.filter(p => p.cat === "brincar").slice(0, 4);
  return (
    <section className="pv-featured">
      <div className="pv-section-head">
        <h2>caça, salto, sesta.</h2>
        <p>nossa seleção de brinquedos pra gato curioso.</p>
        <button className="pv-section-link" onClick={() => onNav({ view: "cat", cat: "brincar" })}>ver todos →</button>
      </div>
      <div className="pv-products-grid">
        {featured.map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProductCard p={p} onOpen={onOpen} onAdd={onAdd}/>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ───────── Story strip ─────────
function StoryStrip() { return null; }

// Por que comprar conosco (marketing-driven)
function WhyStrip() {
  const items = [
    { icon: "truck", h: "frete expresso", p: "72h pra capitais. R$ 149 e o frete fica por nossa conta." },
    { icon: "shield", h: "compra protegida", p: "site com selo, pagamento criptografado e CNPJ ativo." },
    { icon: "swap", h: "30 dias pra trocar", p: "não curtiu? a gente troca ou devolve o seu dinheiro." },
    { icon: "chat", h: "whatsapp humano", p: "resposta em minutos das 9 às 21. zero robô chato." }
  ];
  const iconFor = (k) => {
    const map = {
      truck: <path d="M3 16 V 8 H 13 V 16 M 13 11 H 18 L 21 14 V 16 H 13 M 6 19 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 Z M 17 19 a 2 2 0 1 0 0 -4 a 2 2 0 0 0 0 4 Z"/>,
      shield: <path d="M12 3 L 4 6 V 12 Q 4 18 12 21 Q 20 18 20 12 V 6 Z M 9 12 L 11 14 L 15 10"/>,
      swap: <path d="M7 8 H 17 L 14 5 M 17 16 H 7 L 10 19"/>,
      chat: <path d="M4 5 H 20 V 16 H 13 L 8 20 V 16 H 4 Z"/>
    };
    return <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">{map[k]}</svg>;
  };
  return (
    <section className="pv-why">
      <div className="pv-why-grid">
        {items.map((it, i) => (
          <Reveal key={it.h} delay={i * 80} className="pv-why-item">
            <div className="pv-why-icon">{iconFor(it.icon)}</div>
            <h3>{it.h}</h3>
            <p>{it.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Flash sale com countdown
function FlashSale({ onNav }) {
  return (
    <section className="pv-flash">
      <Reveal>
        <Squircle color="#ed6058" className="pv-flash-card">
          <PawPattern color="#fdfedf" opacity={0.1} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-flash-grid">
            <div className="pv-flash-left">
              <div className="pv-eyebrow pv-eyebrow-dark">
                <span>oferta relâmpago · termina em</span>
              </div>
              <Countdown/>
              <h2>compre 2 brinquedos,<br/>leve 3.</h2>
              <p>o mais barato sai por nossa conta. válido em toda a coleção brincar. desconto aplicado direto no carrinho.</p>
              <div className="pv-flash-ctas">
                <PillBtn variant="cream" onClick={() => onNav({ view: "cat", cat: "brincar" })}>aproveitar agora</PillBtn>
                <span className="pv-flash-mini">+ <strong>10% OFF</strong> usando <code>VELUDO10</code> na primeira compra</span>
              </div>
            </div>
            <div className="pv-flash-right">
              <div className="pv-flash-discount">
                <span>até</span>
                <strong>33%</strong>
                <span>OFF</span>
              </div>
              <div className="pv-flash-cat">
                <CatGlyph size={140} color="#fdfedf" mood="surprise"/>
              </div>
            </div>
          </div>
        </Squircle>
      </Reveal>
    </section>
  );
}

// Social proof bar (números)
function SocialBar() {
  const stats = [
    { n: "12,4k", l: "gatos atendidos" },
    { n: "4.9", l: "★★★★★ média" },
    { n: "+97%", l: "recompram em 90d" },
    { n: "72h", l: "entrega expressa" }
  ];
  return (
    <section className="pv-social-bar">
      {stats.map((s, i) => (
        <Reveal key={s.l} delay={i * 60} className="pv-social-stat">
          <strong>{s.n}</strong>
          <span>{s.l}</span>
        </Reveal>
      ))}
    </section>
  );
}

// ───────── Kits ─────────
function KitsSection({ onAdd }) {
  return (
    <section className="pv-kits">
      <div className="pv-section-head pv-section-head-center">
        <h2>combos imperdíveis</h2>
        <p>até 33% OFF montado em segundos. preocupe-se só com o gato.</p>
      </div>
      <div className="pv-kits-grid">
        {PV.kits.map((k, i) => (
          <Reveal key={k.id} delay={i * 100}>
            <Squircle color={["#ed6058","#fcebf1","#fdfedf"][i]} className={`pv-kit pv-kit-${i}`}>
              <div className="pv-kit-tag">−{Math.round((1 - k.price / k.old) * 100)}%</div>
              <h3>{k.name}</h3>
              <p className="pv-kit-desc">{k.desc}</p>
              <ul>{k.items.map(it => <li key={it}><PawGlyph size={14} color="currentColor"/>{it}</li>)}</ul>
              <div className="pv-kit-bottom">
                <div className="pv-kit-price">
                  <s>R$ {k.old.toFixed(2).replace(".", ",")}</s>
                  <strong>R$ {k.price.toFixed(2).replace(".", ",")}</strong>
                </div>
                <PillBtn variant={i === 0 ? "cream" : "primary"} size="sm" onClick={() => onAdd({ ...k, tagline: k.desc, colorways: ["#ed6058"] })}>levar kit</PillBtn>
              </div>
            </Squircle>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ───────── Quiz teaser ─────────
function QuizTeaser({ onNav }) {
  return (
    <section className="pv-quiz-teaser">
      <Squircle color="#fcebf1" className="pv-quiz-card">
        <div className="pv-quiz-side">
          <div className="pv-eyebrow"><PawGlyph size={16} color="#ed6058"/><span>diagnóstico de 90 segundos</span></div>
          <h2>monte a rotina ideal do seu gato</h2>
          <p>cinco perguntas. brinquedos certos pra personalidade certa. tem gato sofá-cama e gato escalador — a gente sabe a diferença.</p>
          <PillBtn onClick={() => onNav({ view: "quiz" })}>começar o quiz</PillBtn>
        </div>
        <div className="pv-quiz-visual">
          <div className="pv-quiz-card-a">
            <CatGlyph size={56} color="#ed6058" mood="happy"/>
            <span>caçador</span>
          </div>
          <div className="pv-quiz-card-b">
            <CatGlyph size={56} color="#ed6058" mood="sleepy"/>
            <span>contemplativo</span>
          </div>
          <div className="pv-quiz-card-c">
            <CatGlyph size={56} color="#ed6058" mood="surprise"/>
            <span>curioso</span>
          </div>
        </div>
      </Squircle>
    </section>
  );
}

// ───────── Reviews ─────────
function Reviews() {
  return (
    <section className="pv-reviews">
      <div className="pv-section-head">
        <h2>quem mora com gato escreveu pra gente</h2>
      </div>
      <div className="pv-reviews-grid">
        {PV.reviews.map((r, i) => {
          const avatars = ["assets/puzzle-2.jpg", "assets/puzzle-5.jpg", "assets/puzzle-1.png"];
          return (
            <Reveal key={i} delay={i * 100}>
              <Squircle color={["#fdfedf","#fcebf1","#fdfedf"][i]} className="pv-review">
                <div className="pv-review-stars">{"★".repeat(r.rating)}</div>
                <p>“{r.text}”</p>
                <div className="pv-review-who">
                  <div className="pv-review-avatar"><img src={avatars[i]} alt=""/></div>
                  <div><strong>{r.who}</strong><span>{r.city}</span></div>
                </div>
              </Squircle>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

// ───────── Footer ─────────
function Footer({ onNav }) {
  return (
    <footer className="pv-footer">
      <div className="pv-footer-top">
        <div className="pv-footer-brand">
          <Logo size={120} onDark={true}/>
          <p>brinquedos pensados pra rotina de gatos de apartamento. feito por gente que mora com gato.</p>
          <div className="pv-footer-pay">
            <PaymentIcons/>
          </div>
        </div>
        <div className="pv-footer-col">
          <h4>loja</h4>
          <a onClick={() => onNav({ view: "cat", cat: "brincar" })}>brincar</a>
          <a onClick={() => onNav({ view: "cat", cat: "descansar" })}>descansar</a>
          <a onClick={() => onNav({ view: "cat", cat: "hidratar" })}>hidratar</a>
          <a onClick={() => onNav({ view: "cat", cat: "cuidar" })}>cuidar</a>
          <a onClick={() => onNav({ view: "kits" })}>kits</a>
          <a onClick={() => onNav({ view: "gift" })}>vale-presente</a>
        </div>
        <div className="pv-footer-col">
          <h4>ajuda</h4>
          <a onClick={() => onNav({ view: "track" })}>rastrear pedido</a>
          <a onClick={() => onNav({ view: "returns" })}>trocas e devoluções</a>
          <a onClick={() => onNav({ view: "shipping" })}>frete e prazo</a>
          <a onClick={() => onNav({ view: "faq" })}>perguntas frequentes</a>
          <a onClick={() => onNav({ view: "whatsapp" })}>falar no whatsapp</a>
          <a href="#admin">painel admin</a>
        </div>
        <div className="pv-footer-col pv-footer-news">
          <h4>cartinha mensal</h4>
          <p>dicas de comportamento, lançamentos e desconto de primeira compra.</p>
          <div className="pv-footer-input">
            <input placeholder="seu e-mail"/>
            <button>assinar</button>
          </div>
        </div>
      </div>
      <div className="pv-footer-bottom">
        <span>© 2026 Mutum Labs LTDA · CNPJ 00.000.000/0001-00 · Pata de Veludo® é uma marca da Mutum Labs</span>
        <span>feito com paciência em São Paulo</span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Header, Hero, MomentStrip, ProductCard, Featured, WhyStrip, FlashSale, SocialBar,
  KitsSection, QuizTeaser, Reviews, Footer
});
