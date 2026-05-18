// Pata de Veludo — Views (categoria, produto, carrinho, quiz)
const PV2 = window.PV_DATA;

// ───────── Category page ─────────
function CategoryView({ cat, onOpen, onAdd, onNav }) {
  const meta = PV2.categories.find(c => c.id === cat) || PV2.categories[0];
  const products = PV2.products.filter(p => p.cat === cat);
  const all = cat === "todos" ? PV2.products : products;
  const list = all.length ? all : PV2.products;
  const [sort, setSort] = React.useState("destaque");
  const sorted = React.useMemo(() => {
    const s = [...list];
    if (sort === "menor") s.sort((a,b) => a.price - b.price);
    if (sort === "maior") s.sort((a,b) => b.price - a.price);
    return s;
  }, [list, sort]);
  return (
    <div className="pv-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span>
        <span>{meta.label.toLowerCase()}</span>
      </div>
      <section className="pv-cat-hero">
        <Squircle color="#ed6058" className="pv-cat-hero-card pv-cat-hero-dark">
          <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-cat-hero-inner">
            <CategoryIcon kind={meta.emoji} size={96} color="#fdfedf"/>
            <div>
              <div className="pv-eyebrow pv-eyebrow-dark"><span>coleção</span></div>
              <h1>{meta.label.toLowerCase()}</h1>
              <p>{meta.desc.toLowerCase()}. {list.length} produtos escolhidos a dedo, testados em apartamento real.</p>
            </div>
          </div>
        </Squircle>
      </section>
      <section className="pv-cat-controls">
        <div className="pv-cat-chips">
          {["todos","novidades","best-sellers","até R$ 100","kits"].map((c, i) => (
            <button key={c} className={i === 0 ? "active" : ""}>{c}</button>
          ))}
        </div>
        <div className="pv-cat-sort">
          <span>{list.length} produtos</span>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="destaque">em destaque</option>
            <option value="menor">menor preço</option>
            <option value="maior">maior preço</option>
          </select>
        </div>
      </section>
      <section className="pv-products-grid pv-products-grid-cat">
        {sorted.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} onAdd={onAdd}/>)}
      </section>
    </div>
  );
}

// ───────── Product Detail ─────────
function ProductView({ id, onAdd, onNav, onOpen }) {
  const p = PV2.products.find(x => x.id === id) || PV2.products[0];
  const [color, setColor] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState("historia");
  const [activeImg, setActiveImg] = React.useState(0);
  const related = PV2.products.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  React.useEffect(() => { setActiveImg(0); setColor(0); setQty(1); }, [id]);
  const images = p.images || [];
  return (
    <div className="pv-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span>
        <button onClick={() => onNav({ view: "cat", cat: p.cat })}>{PV2.categories.find(c => c.id === p.cat)?.label.toLowerCase()}</button>
        <span>/</span>
        <span>{p.name.toLowerCase()}</span>
      </div>
      <section className="pv-pdp">
        <div className="pv-pdp-gallery">
          <Squircle color={p.colorways[color]} className="pv-pdp-main">
            {images.length
              ? <img src={images[activeImg]} alt={p.name} className="pv-pdp-photo"/>
              : <ProductPlaceholder label={`foto · ${p.name.toLowerCase()}`} color="#fdfedf" bg={p.colorways[color]}/>
            }
            {p.tag && <span className="pv-product-tag">{p.tag}</span>}
          </Squircle>
          <div className="pv-pdp-thumbs">
            {(images.length ? images : [0,1,2,3]).map((src, i) => (
              <Squircle
                key={i}
                color={p.colorways[i % p.colorways.length]}
                className={`pv-pdp-thumb ${images.length && i === activeImg ? "active" : ""}`}
                onClick={() => images.length && setActiveImg(i)}
              >
                {images.length
                  ? <img src={src} alt={`${p.name} ${i+1}`} className="pv-pdp-photo"/>
                  : <ProductPlaceholder label={`foto ${i+1}`} color="#fdfedf" bg={p.colorways[i % p.colorways.length]}/>
                }
              </Squircle>
            ))}
          </div>
        </div>
        <div className="pv-pdp-info">
          <div className="pv-eyebrow"><PawGlyph size={16} color="#ed6058"/><span>{PV2.categories.find(c => c.id === p.cat)?.label.toLowerCase()}</span></div>
          <h1>{p.name.toLowerCase()}</h1>
          <p className="pv-pdp-tag">{p.tagline}</p>
          <div className="pv-pdp-stars">★★★★★ <span>· 184 tutores</span></div>
          <div className="pv-pdp-price">
            {p.old && <s>R$ {p.old.toFixed(2).replace(".", ",")}</s>}
            <strong>R$ {p.price.toFixed(2).replace(".", ",")}</strong>
            <span className="pv-pdp-installments">ou 4× de R$ {(p.price/4).toFixed(2).replace(".", ",")} sem juros</span>
          </div>
          <div className="pv-pdp-row">
            <div className="pv-pdp-label">cor</div>
            <div className="pv-pdp-colors">
              {p.colorways.map((c, i) => (
                <button key={i} className={i === color ? "active" : ""} style={{ background: c }} onClick={() => setColor(i)}/>
              ))}
            </div>
          </div>
          <div className="pv-pdp-row">
            <div className="pv-pdp-label">quantidade</div>
            <div className="pv-pdp-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>
          <div className="pv-pdp-ctas">
            <PillBtn onClick={() => onAdd(p, qty)} size="lg">adicionar — R$ {(p.price * qty).toFixed(2).replace(".", ",")}</PillBtn>
            <button className="pv-pdp-fav" aria-label="Favoritar">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"><path d="M12 20 L 4 13 Q 1 9 5 5 Q 9 1 12 6 Q 15 1 19 5 Q 23 9 20 13 Z"/></svg>
            </button>
          </div>
          <div className="pv-pdp-promises">
            <div><strong>frete grátis</strong><span>acima de R$ 149</span></div>
            <div><strong>72h</strong><span>capitais</span></div>
            <div><strong>30 dias</strong><span>pra trocar</span></div>
          </div>
          <div className="pv-pdp-tabs">
            {[["historia","história"],["specs","ficha"],["usar","como usar"],["faq","perguntas"]].map(([k, l]) => (
              <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>
          <div className="pv-pdp-tabpane">
            {tab === "historia" && <p>{p.story}</p>}
            {tab === "specs" && <ul>{p.specs.map(s => <li key={s}><PawGlyph size={12} color="#ed6058"/>{s}</li>)}</ul>}
            {tab === "usar" && (
              <ol>
                <li><strong>1.</strong> Tire da caixa (o gato vai querer a caixa primeiro — deixa).</li>
                <li><strong>2.</strong> Apresente o brinquedo num ambiente calmo, sem outros estímulos.</li>
                <li><strong>3.</strong> Brinque por 10–15 minutos. Termine sempre com uma "captura".</li>
              </ol>
            )}
            {tab === "faq" && (
              <div className="pv-faq">
                <details open><summary>serve pra filhote?</summary><p>sim, a partir de 3 meses, sempre com supervisão.</p></details>
                <details><summary>como limpar?</summary><p>pano úmido com sabão neutro. nunca máquina de lavar.</p></details>
                <details><summary>tem garantia?</summary><p>30 dias pra trocar sem perguntar. defeito de fabricação, garantia de 6 meses.</p></details>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="pv-pdp-also">
        <div className="pv-section-head">
          <h2>gatos que gostaram desse também gostaram</h2>
        </div>
        <div className="pv-products-grid">
          {related.map(rp => <ProductCard key={rp.id} p={rp} onOpen={onOpen} onAdd={onAdd}/>)}
        </div>
      </section>
    </div>
  );
}

// ───────── Cart Drawer ─────────
function CartDrawer({ open, items, onClose, onRemove, onQty, onCheckout }) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const freeFrom = 149;
  const remaining = Math.max(0, freeFrom - subtotal);
  const progress = Math.min(100, (subtotal / freeFrom) * 100);
  return (
    <>
      <div className={`pv-drawer-mask ${open ? "open" : ""}`} onClick={onClose}/>
      <aside className={`pv-drawer ${open ? "open" : ""}`}>
        <div className="pv-drawer-head">
          <h3>cesto do seu gato</h3>
          <button className="pv-icon-btn" onClick={onClose} aria-label="Fechar">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
          </button>
        </div>
        <div className="pv-drawer-progress">
          <div className="pv-progress-bar"><div style={{ width: `${progress}%` }}/></div>
          {remaining > 0
            ? <p>falta <strong>R$ {remaining.toFixed(2).replace(".", ",")}</strong> pro frete grátis</p>
            : <p>✨ você ganhou <strong>frete grátis</strong></p>
          }
        </div>
        <div className="pv-drawer-items">
          {items.length === 0 && (
            <div className="pv-drawer-empty">
              <CatGlyph size={72} color="#ed6058" mood="sleepy"/>
              <p>seu cesto tá quietinho. talvez seu gato escolha primeiro?</p>
            </div>
          )}
          {items.map((it, i) => (
            <div key={i} className="pv-drawer-item">
              <Squircle color={it.colorways?.[0] || "#fcebf1"} className="pv-drawer-thumb">
                {it.images && it.images[0]
                  ? <img src={it.images[0]} alt={it.name} className="pv-product-photo"/>
                  : <ProductPlaceholder label="" color="#fdfedf" bg={it.colorways?.[0] || "#fcebf1"}/>
                }
              </Squircle>
              <div className="pv-drawer-item-info">
                <strong>{it.name}</strong>
                <span>{it.tagline}</span>
                <div className="pv-drawer-qty">
                  <button onClick={() => onQty(i, Math.max(1, it.qty - 1))}>−</button>
                  <span>{it.qty}</span>
                  <button onClick={() => onQty(i, it.qty + 1)}>+</button>
                  <button className="pv-drawer-remove" onClick={() => onRemove(i)}>remover</button>
                </div>
              </div>
              <div className="pv-drawer-item-price">R$ {(it.price * it.qty).toFixed(2).replace(".", ",")}</div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="pv-drawer-foot">
            <div className="pv-drawer-totals">
              <div><span>subtotal</span><strong>R$ {subtotal.toFixed(2).replace(".", ",")}</strong></div>
              <div><span>frete</span><strong>{remaining > 0 ? "calculado no checkout" : "grátis"}</strong></div>
            </div>
            <PillBtn size="lg" onClick={() => { onClose(); onCheckout && onCheckout(); }}>finalizar — R$ {subtotal.toFixed(2).replace(".", ",")}</PillBtn>
            <p className="pv-drawer-note">frete grátis acima de R$ 149 · 10% OFF na 1ª compra com VELUDO10</p>
          </div>
        )}
      </aside>
    </>
  );
}

// ───────── Quiz ─────────
function QuizView({ onNav, onAdd }) {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const questions = [
    { id: "energia", q: "como é o nível de energia do seu gato?", opts: ["calmo e contemplativo","equilibrado","caçador noturno","explosivo o dia todo"] },
    { id: "espaco", q: "onde ele vive a maior parte do tempo?", opts: ["apartamento pequeno","apartamento com varanda","casa com quintal","tela em tudo"] },
    { id: "dor", q: "o que mais te incomoda hoje?", opts: ["ele bebe pouca água","ele me acorda de madrugada","ele coça o sofá","ele parece entediado"] },
    { id: "tamanho", q: "qual o porte dele?", opts: ["filhote (até 6m)","pequeno (até 4kg)","médio (4-6kg)","grandão (6kg+)"] },
    { id: "estilo", q: "qual a estética da sua casa?", opts: ["minimalista","colorida","aconchegante","misturada"] }
  ];

  if (step >= questions.length) {
    const rec = PV2.products.slice(0, 3);
    return (
      <div className="pv-page pv-quiz-page">
        <div className="pv-quiz-result">
          <Squircle color="#ed6058" className="pv-quiz-result-hero">
            <PawPattern color="#fdfedf" opacity={0.15} style={{ position: "absolute", inset: 0 }}/>
            <div className="pv-quiz-result-inner">
              <CatGlyph size={88} color="#fdfedf" mood="happy"/>
              <div className="pv-eyebrow pv-eyebrow-dark"><span>perfil identificado</span></div>
              <h1>seu gato é um caçador zen</h1>
              <p>energia alta, mas precisa descomprimir à noite. nossa receita: brinquedos de caça curtos + um ninho que abraça.</p>
            </div>
          </Squircle>
          <h2 className="pv-quiz-result-h">três coisas que a gente recomenda:</h2>
          <div className="pv-products-grid">
            {rec.map(p => <ProductCard key={p.id} p={p} onOpen={() => onNav({ view: "product", id: p.id })} onAdd={onAdd}/>)}
          </div>
          <div className="pv-quiz-actions">
            <PillBtn onClick={() => { setStep(0); setAnswers({}); }} variant="ghost">refazer quiz</PillBtn>
            <PillBtn onClick={() => onNav({ view: "home" })}>voltar pra loja</PillBtn>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="pv-page pv-quiz-page">
      <div className="pv-quiz-shell">
        <div className="pv-quiz-progress">
          {questions.map((_, i) => <span key={i} className={i <= step ? "active" : ""}/>)}
        </div>
        <div className="pv-quiz-step">
          <span className="pv-quiz-num">pergunta {step + 1} de {questions.length}</span>
          <h1>{q.q}</h1>
          <div className="pv-quiz-opts">
            {q.opts.map((o, i) => (
              <button
                key={o}
                className={`pv-quiz-opt ${answers[q.id] === o ? "active" : ""}`}
                onClick={() => {
                  setAnswers({ ...answers, [q.id]: o });
                  setTimeout(() => setStep(step + 1), 280);
                }}
              >
                <span className="pv-quiz-bullet"><PawGlyph size={20} color="currentColor"/></span>
                <span>{o}</span>
              </button>
            ))}
          </div>
          <div className="pv-quiz-back">
            {step > 0 && <button onClick={() => setStep(step - 1)}>← voltar</button>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────── Kits page ─────────
function KitsPage({ onAdd, onNav }) {
  return (
    <div className="pv-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>kits</span>
      </div>
      <section className="pv-cat-hero">
        <Squircle color="#fcebf1" className="pv-cat-hero-card">
          <div className="pv-cat-hero-inner">
            <CatGlyph size={96} color="#ed6058" mood="happy"/>
            <div>
              <div className="pv-eyebrow"><span>coleção curada</span></div>
              <h1>kits</h1>
              <p>combinações que resolvem uma rotina inteira. desconto aplicado automaticamente, caixa-presente sempre.</p>
            </div>
          </div>
        </Squircle>
      </section>
      <KitsSection onAdd={onAdd}/>
    </div>
  );
}

Object.assign(window, { CategoryView, ProductView, CartDrawer, QuizView, KitsPage });
