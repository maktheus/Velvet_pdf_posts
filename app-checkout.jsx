// Pata de Veludo — Checkout
const { useState: cS, useMemo: cM } = React;

const fmtBRL2 = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const SHIPPING_OPTIONS = [
  { id: "expressa", label: "Expressa", days: "até 2 dias úteis", price: 24.90, badge: "mais rápida" },
  { id: "normal", label: "Padrão", days: "5 a 7 dias úteis", price: 14.90, badge: null },
  { id: "free", label: "Frete grátis", days: "7 a 12 dias úteis", price: 0, badge: "grátis · só hoje", minSubtotal: 149 },
  { id: "retira", label: "Retirar na loja", days: "Pinheiros, SP · em 24h", price: 0, badge: null }
];

const PAYMENT_METHODS = [
  { id: "pix", label: "Pix", discount: 0.05, sub: "5% OFF · aprovação na hora" },
  { id: "card", label: "Cartão", sub: "até 4× sem juros" },
  { id: "boleto", label: "Boleto", sub: "vence em 3 dias úteis" }
];

function CheckoutView({ initialCart, onClose, onComplete, onNav }) {
  const [step, setStep] = cS(0);
  const [items, setItems] = cS(initialCart || [
    { id: "puzzle-camarao", name: "Puzzle Camarão Curioso", tagline: "Comer com a cabeça.", price: 159.9, qty: 1, colorways: ["#ed6058"], images: ["assets/puzzle-5.jpg"] },
    { id: "fonte-petala", name: "Fonte Pétala silenciosa", tagline: "Água em movimento.", price: 229.0, qty: 1, colorways: ["#fcebf1"] }
  ]);
  const [coupon, setCoupon] = cS("");
  const [appliedCoupon, setAppliedCoupon] = cS(null);
  const [couponMsg, setCouponMsg] = cS("");
  const [address, setAddress] = cS(1);
  const [shipping, setShipping] = cS("expressa");
  const [payment, setPayment] = cS("pix");
  const [cardData, setCardData] = cS({ number: "", name: "", exp: "", cvv: "", installments: 1 });
  const [accepted, setAccepted] = cS(false);
  const [donate, setDonate] = cS(true);

  const PERFIL = window.PROFILE || {
    user: { name: "Marina Albuquerque", email: "marina@email.com", points: 1840 },
    addresses: [
      { id: 1, label: "Casa", line1: "Rua Augusta, 1234, apto 72", line2: "Consolação · São Paulo, SP", zip: "01304-001" },
      { id: 2, label: "Trabalho", line1: "Av. Paulista, 1230, 14º andar", line2: "Bela Vista · São Paulo, SP", zip: "01310-100" }
    ],
    cards: [
      { id: 1, brand: "Visa", last: "4429", exp: "08/28" }
    ]
  };

  // Totais
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingOpt = SHIPPING_OPTIONS.find(s => s.id === shipping);
  const shippingPrice = (shippingOpt.minSubtotal && subtotal < shippingOpt.minSubtotal) ? 14.90 : shippingOpt.price;
  const couponDiscount = appliedCoupon ? subtotal * appliedCoupon.value : 0;
  const paymentMethod = PAYMENT_METHODS.find(p => p.id === payment);
  const paymentDiscount = paymentMethod.discount ? (subtotal - couponDiscount) * paymentMethod.discount : 0;
  const donation = donate ? 2 : 0;
  const total = subtotal + shippingPrice + donation - couponDiscount - paymentDiscount;
  const points = Math.floor(total / 10);

  const steps = [
    { id: "cart", label: "cesto" },
    { id: "delivery", label: "entrega" },
    { id: "payment", label: "pagamento" },
    { id: "review", label: "revisão" }
  ];

  const updateQty = (i, q) => {
    if (q <= 0) setItems(items.filter((_, ix) => ix !== i));
    else setItems(items.map((it, ix) => ix === i ? { ...it, qty: q } : it));
  };

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    const codes = {
      "VELUDO10": { code: "VELUDO10", value: 0.10, label: "10% OFF na primeira compra" },
      "GATOFELIZ": { code: "GATOFELIZ", value: 0.15, label: "15% OFF brinquedos" },
      "FRETE0": { code: "FRETE0", value: 0, label: "frete grátis" }
    };
    if (codes[c]) {
      setAppliedCoupon(codes[c]);
      setCouponMsg(`✓ cupom aplicado: ${codes[c].label}`);
      setCoupon("");
    } else {
      setCouponMsg("cupom inválido ou expirado");
    }
  };

  const canProceed = () => {
    if (step === 0) return items.length > 0;
    if (step === 1) return shipping && address;
    if (step === 2) {
      if (payment === "card") return cardData.number.length >= 14 && cardData.name && cardData.exp && cardData.cvv.length >= 3;
      return true;
    }
    if (step === 3) return accepted;
    return false;
  };

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onComplete({ items, total, payment, address, shipping });
    }
  };

  return (
    <div className="pv-checkout">
      {/* Sticky header */}
      <header className="pv-co-header">
        <button className="pv-co-back" onClick={() => step === 0 ? onClose() : setStep(step - 1)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 6 L 9 12 L 15 18"/></svg>
          <span>{step === 0 ? "voltar à loja" : "voltar"}</span>
        </button>
        <Logo size={42}/>
        <div className="pv-co-secure">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 3 L 4 6 V 12 Q 4 18 12 21 Q 20 18 20 12 V 6 Z"/></svg>
          <span>checkout 100% seguro</span>
        </div>
      </header>

      {/* Steps progress */}
      <div className="pv-co-steps">
        {steps.map((s, i) => (
          <div key={s.id} className={`pv-co-step ${i === step ? "current" : ""} ${i < step ? "done" : ""}`}>
            <div className="pv-co-step-dot">
              {i < step
                ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 13 10 18 19 7"/></svg>
                : <span>{i + 1}</span>}
            </div>
            <span className="pv-co-step-label">{s.label}</span>
            {i < steps.length - 1 && <div className="pv-co-step-line"/>}
          </div>
        ))}
      </div>

      <div className="pv-co-shell">
        <div className="pv-co-main">
          {step === 0 && (
            <CartStep
              items={items}
              updateQty={updateQty}
              subtotal={subtotal}
              coupon={coupon} setCoupon={setCoupon}
              applyCoupon={applyCoupon}
              appliedCoupon={appliedCoupon}
              removeCoupon={() => { setAppliedCoupon(null); setCouponMsg(""); }}
              couponMsg={couponMsg}
              onContinueShopping={onClose}
            />
          )}
          {step === 1 && (
            <DeliveryStep
              addresses={PERFIL.addresses}
              address={address} setAddress={setAddress}
              shipping={shipping} setShipping={setShipping}
              subtotal={subtotal}
            />
          )}
          {step === 2 && (
            <PaymentStep
              payment={payment} setPayment={setPayment}
              cardData={cardData} setCardData={setCardData}
              savedCards={PERFIL.cards}
              total={subtotal + shippingPrice}
              points={PERFIL.user.points}
            />
          )}
          {step === 3 && (
            <ReviewStep
              items={items}
              address={PERFIL.addresses.find(a => a.id === address)}
              shipping={SHIPPING_OPTIONS.find(s => s.id === shipping)}
              payment={paymentMethod}
              cardData={cardData}
              accepted={accepted} setAccepted={setAccepted}
              donate={donate} setDonate={setDonate}
            />
          )}
        </div>

        {/* Summary sidebar */}
        <aside className="pv-co-summary">
          <Squircle color="#fdfedf" className="pv-co-summary-card">
            <h3>resumo do pedido</h3>
            <div className="pv-co-summary-items">
              {items.map((it, i) => (
                <div key={i} className="pv-co-sumitem">
                  <div className="pv-co-sumimg" style={{ background: it.colorways?.[0] || "#fcebf1" }}>
                    {it.images?.[0] && <img src={it.images[0]} alt=""/>}
                    <span className="pv-co-sumqty">{it.qty}</span>
                  </div>
                  <div className="pv-co-suminfo">
                    <strong>{it.name}</strong>
                    <span>{fmtBRL2(it.price * it.qty)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pv-co-summary-rows">
              <div><span>subtotal</span><span>{fmtBRL2(subtotal)}</span></div>
              {appliedCoupon && couponDiscount > 0 && (
                <div className="pv-co-discount">
                  <span>cupom {appliedCoupon.code}</span>
                  <span>−{fmtBRL2(couponDiscount)}</span>
                </div>
              )}
              <div>
                <span>frete · {SHIPPING_OPTIONS.find(s => s.id === shipping)?.label.toLowerCase()}</span>
                <span>{shippingPrice === 0 ? "grátis" : fmtBRL2(shippingPrice)}</span>
              </div>
              {paymentDiscount > 0 && (
                <div className="pv-co-discount">
                  <span>desconto Pix</span>
                  <span>−{fmtBRL2(paymentDiscount)}</span>
                </div>
              )}
              {donation > 0 && (
                <div><span>doação Anjos de Patinhas</span><span>{fmtBRL2(donation)}</span></div>
              )}
            </div>
            <div className="pv-co-summary-total">
              <span>total</span>
              <strong>{fmtBRL2(total)}</strong>
            </div>
            <div className="pv-co-summary-points">
              <PawGlyph size={16} color="#ed6058"/>
              <span>você ganha <strong>{points} pontos</strong> no Clube Veludo com esse pedido</span>
            </div>
            {step < steps.length - 1 ? (
              <button className="pv-pill pv-pill-primary pv-co-cta" onClick={next} disabled={!canProceed()}>
                continuar →
              </button>
            ) : (
              <button className="pv-pill pv-pill-primary pv-co-cta" onClick={next} disabled={!canProceed()}>
                pagar {fmtBRL2(total)}
              </button>
            )}
            <div className="pv-co-trust">
              <PaymentIcons/>
              <span>parcele em até 4× sem juros</span>
            </div>
          </Squircle>
        </aside>
      </div>
    </div>
  );
}

// ─────────── Step 1: Carrinho
function CartStep({ items, updateQty, subtotal, coupon, setCoupon, applyCoupon, appliedCoupon, removeCoupon, couponMsg, onContinueShopping }) {
  return (
    <section className="pv-co-section">
      <h2>seu cesto <em>· {items.length} {items.length === 1 ? "produto" : "produtos"}</em></h2>
      {items.length === 0 ? (
        <Squircle color="#fcebf1" className="pv-co-empty">
          <CatGlyph size={72} color="#ed6058" mood="sleepy"/>
          <h3>cesto vazio</h3>
          <p>adicione algum brinquedo antes de continuar.</p>
          <PillBtn onClick={onContinueShopping}>voltar à loja</PillBtn>
        </Squircle>
      ) : (
        <>
          <div className="pv-co-cart">
            {items.map((it, i) => (
              <div key={i} className="pv-co-cart-row">
                <div className="pv-co-cart-img" style={{ background: it.colorways?.[0] || "#fcebf1" }}>
                  {it.images?.[0] && <img src={it.images[0]} alt={it.name}/>}
                </div>
                <div className="pv-co-cart-info">
                  <strong>{it.name}</strong>
                  <p>{it.tagline}</p>
                  <div className="pv-co-cart-controls">
                    <div className="pv-co-qty">
                      <button onClick={() => updateQty(i, it.qty - 1)}>−</button>
                      <span>{it.qty}</span>
                      <button onClick={() => updateQty(i, it.qty + 1)}>+</button>
                    </div>
                    <button className="pv-co-cart-remove" onClick={() => updateQty(i, 0)}>remover</button>
                  </div>
                </div>
                <div className="pv-co-cart-price">
                  <strong>{fmtBRL2(it.price * it.qty)}</strong>
                  {it.qty > 1 && <span>{fmtBRL2(it.price)} cada</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Coupon */}
          <Squircle color="#fcebf1" className="pv-co-coupon">
            <div className="pv-co-coupon-head">
              <PawGlyph size={20} color="#ed6058"/>
              <strong>tem cupom?</strong>
              <em>experimente: VELUDO10, GATOFELIZ, FRETE0</em>
            </div>
            {appliedCoupon ? (
              <div className="pv-co-coupon-applied">
                <div>
                  <span className="pv-co-coupon-tag">{appliedCoupon.code}</span>
                  <span>{appliedCoupon.label}</span>
                </div>
                <button onClick={removeCoupon}>remover</button>
              </div>
            ) : (
              <div className="pv-co-coupon-input">
                <input
                  placeholder="código do cupom"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value.toUpperCase())}
                  onKeyDown={e => e.key === "Enter" && applyCoupon()}
                />
                <button onClick={applyCoupon}>aplicar</button>
              </div>
            )}
            {couponMsg && !appliedCoupon && <span className="pv-co-coupon-msg">{couponMsg}</span>}
          </Squircle>

          {/* Cross-sell */}
          <div className="pv-co-upsell">
            <h3>complete seu pedido com</h3>
            <div className="pv-co-upsell-grid">
              {[
                { name: "Catnip artesanal 30g", price: 24.90, color: "#fdfedf" },
                { name: "Sachê de areia premium", price: 18.90, color: "#fcebf1" },
                { name: "Petisco crocante 80g", price: 16.50, color: "#ed6058" }
              ].map(p => (
                <div key={p.name} className="pv-co-upsell-card">
                  <div className="pv-co-upsell-img" style={{ background: p.color }}>
                    <PawGlyph size={32} color={p.color === "#ed6058" ? "#fdfedf" : "#ed6058"}/>
                  </div>
                  <div>
                    <strong>{p.name}</strong>
                    <span>{fmtBRL2(p.price)}</span>
                  </div>
                  <button>+</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

// ─────────── Step 2: Entrega
function DeliveryStep({ addresses, address, setAddress, shipping, setShipping, subtotal }) {
  const [adding, setAdding] = cS(false);
  return (
    <>
      <section className="pv-co-section">
        <h2>endereço de entrega</h2>
        <div className="pv-co-address-grid">
          {addresses.map(a => (
            <label key={a.id} className={`pv-co-card-radio ${address === a.id ? "on" : ""}`}>
              <input type="radio" name="addr" checked={address === a.id} onChange={() => setAddress(a.id)}/>
              <div className="pv-co-radio-dot"/>
              <div className="pv-co-card-info">
                <div className="pv-co-card-head">
                  <strong>{a.label}</strong>
                </div>
                <p>{a.line1}</p>
                <p>{a.line2}</p>
                <span>CEP {a.zip}</span>
              </div>
            </label>
          ))}
          <button className="pv-co-add-card" onClick={() => setAdding(true)}>
            <span className="pv-co-add-plus">+</span>
            <strong>novo endereço</strong>
            <span>cadastrar outro</span>
          </button>
        </div>
        {adding && (
          <div className="pv-modal-mask" onClick={() => setAdding(false)}>
            <div className="pv-modal" onClick={e => e.stopPropagation()}>
              <button className="pv-modal-close" onClick={() => setAdding(false)}>×</button>
              <div className="pv-modal-head">
                <span className="pv-modal-step">novo endereço</span>
                <h2>onde a gente entrega?</h2>
              </div>
              <div className="pv-modal-body">
                <div className="pv-cat-form">
                  <div className="pv-set-row">
                    <label>cep</label>
                    <input placeholder="00000-000"/>
                  </div>
                  <div className="pv-set-row">
                    <label>logradouro e número</label>
                    <input placeholder="Rua, número, complemento"/>
                  </div>
                  <div className="pv-set-row-split">
                    <div><label>bairro</label><input placeholder="bairro"/></div>
                    <div><label>cidade</label><input placeholder="cidade"/></div>
                  </div>
                  <div className="pv-set-row">
                    <label>apelido (opcional)</label>
                    <input placeholder="ex: casa da minha mãe"/>
                  </div>
                </div>
              </div>
              <div className="pv-modal-foot">
                <button className="pv-modal-back" onClick={() => setAdding(false)}>cancelar</button>
                <button className="pv-pill pv-pill-primary" onClick={() => setAdding(false)}>salvar endereço</button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="pv-co-section">
        <h2>modo de entrega</h2>
        <div className="pv-co-shipping">
          {SHIPPING_OPTIONS.map(s => {
            const blocked = s.minSubtotal && subtotal < s.minSubtotal;
            return (
              <label
                key={s.id}
                className={`pv-co-card-radio ${shipping === s.id ? "on" : ""} ${blocked ? "disabled" : ""}`}
              >
                <input
                  type="radio" name="ship"
                  disabled={blocked}
                  checked={shipping === s.id}
                  onChange={() => setShipping(s.id)}
                />
                <div className="pv-co-radio-dot"/>
                <div className="pv-co-card-info">
                  <div className="pv-co-card-head">
                    <strong>{s.label}</strong>
                    {s.badge && <span className="pv-co-badge">{s.badge}</span>}
                  </div>
                  <p>{s.days}</p>
                  {blocked && <span className="pv-co-block">disponível acima de {fmtBRL2(s.minSubtotal)}</span>}
                </div>
                <div className="pv-co-shipping-price">
                  {s.price === 0 ? <strong>grátis</strong> : <strong>{fmtBRL2(s.price)}</strong>}
                </div>
              </label>
            );
          })}
        </div>
      </section>
    </>
  );
}

// ─────────── Step 3: Pagamento
function PaymentStep({ payment, setPayment, cardData, setCardData, savedCards, total, points }) {
  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExp = (v) => v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(?=\d)/, "$1/");
  return (
    <>
      <section className="pv-co-section">
        <h2>como você vai pagar?</h2>
        <div className="pv-co-payment-tabs">
          {PAYMENT_METHODS.map(p => (
            <button
              key={p.id}
              className={`pv-co-pay-tab ${payment === p.id ? "on" : ""}`}
              onClick={() => setPayment(p.id)}
            >
              <PaymentLogo type={p.id}/>
              <div>
                <strong>{p.label}</strong>
                <span>{p.sub}</span>
              </div>
              {p.discount && <em>−{Math.round(p.discount * 100)}%</em>}
            </button>
          ))}
        </div>

        {payment === "pix" && (
          <Squircle color="#fcebf1" className="pv-co-payment-panel">
            <div className="pv-pix-illustration">
              <div className="pv-pix-qr">
                {/* Fake QR code grid */}
                <div className="pv-pix-qr-inner">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <span key={i} style={{ background: Math.random() > 0.45 ? "#2a1612" : "transparent" }}/>
                  ))}
                </div>
              </div>
              <div>
                <strong>pagamento na hora</strong>
                <p>após confirmar o pedido, você verá o QR Code e a chave pix copia-e-cola. O envio começa em 30 minutos depois do pagamento.</p>
                <div className="pv-pix-bonus">
                  <PawGlyph size={16} color="#ed6058"/>
                  <span><strong>5% OFF</strong> aplicado automaticamente no total</span>
                </div>
              </div>
            </div>
          </Squircle>
        )}

        {payment === "card" && (
          <Squircle color="#fcebf1" className="pv-co-payment-panel">
            {savedCards.length > 0 && (
              <div className="pv-co-saved-cards">
                <div className="pv-eyebrow"><PawGlyph size={12} color="#ed6058"/><span>cartão salvo</span></div>
                {savedCards.map(c => (
                  <label key={c.id} className="pv-co-saved-card">
                    <input type="radio" name="card" defaultChecked/>
                    <div className="pv-co-radio-dot"/>
                    <PaymentLogo type={c.brand.toLowerCase()}/>
                    <strong>{c.brand} •••• {c.last}</strong>
                    <span>exp {c.exp}</span>
                  </label>
                ))}
                <button className="pv-co-add-link">+ usar outro cartão</button>
              </div>
            )}
            <div className="pv-cat-form" style={{ paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <div className="pv-set-row">
                <label>número do cartão</label>
                <input
                  placeholder="0000 0000 0000 0000"
                  value={cardData.number}
                  onChange={e => setCardData({ ...cardData, number: formatCard(e.target.value) })}
                />
              </div>
              <div className="pv-set-row">
                <label>nome impresso no cartão</label>
                <input
                  placeholder="como está no cartão"
                  value={cardData.name}
                  onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                />
              </div>
              <div className="pv-set-row-split">
                <div>
                  <label>validade</label>
                  <input
                    placeholder="MM/AA"
                    value={cardData.exp}
                    onChange={e => setCardData({ ...cardData, exp: formatExp(e.target.value) })}
                  />
                </div>
                <div>
                  <label>cvv</label>
                  <input
                    placeholder="•••"
                    maxLength="4"
                    value={cardData.cvv}
                    onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
              </div>
              <div className="pv-set-row">
                <label>parcelas</label>
                <select value={cardData.installments} onChange={e => setCardData({ ...cardData, installments: +e.target.value })}>
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>
                      {n}× de {fmtBRL2(total / n)} {n === 1 ? "à vista" : "sem juros"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Squircle>
        )}

        {payment === "boleto" && (
          <Squircle color="#fcebf1" className="pv-co-payment-panel">
            <div className="pv-boleto">
              <div className="pv-boleto-icon">
                <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
                  <g fill="#1a1f1f">
                    <rect x="6" y="6" width="3" height="20"/>
                    <rect x="11" y="6" width="1" height="20"/>
                    <rect x="14" y="6" width="4" height="20"/>
                    <rect x="20" y="6" width="2" height="20"/>
                    <rect x="24" y="6" width="3" height="20"/>
                    <rect x="29" y="6" width="1" height="20"/>
                    <rect x="32" y="6" width="4" height="20"/>
                    <rect x="38" y="6" width="2" height="20"/>
                  </g>
                </svg>
              </div>
              <div>
                <strong>boleto bancário</strong>
                <p>vence em 3 dias úteis. confirmação do pagamento em até 1 dia útil após pagar.</p>
                <p className="pv-boleto-warn">⚠ envio começa só após confirmação do banco.</p>
              </div>
            </div>
          </Squircle>
        )}
      </section>

      <section className="pv-co-section">
        <h2>usar pontos do clube</h2>
        <Squircle color="#fdfedf" className="pv-co-points">
          <div className="pv-co-points-info">
            <PawGlyph size={28} color="#ed6058"/>
            <div>
              <strong>você tem {points} pontos disponíveis</strong>
              <span>cada 10 pontos = R$ 1,00 de desconto</span>
            </div>
          </div>
          <button className="pv-co-points-btn">resgatar 1.840 pontos · −R$ 184,00</button>
        </Squircle>
      </section>
    </>
  );
}

function PaymentLogo({ type }) {
  const t = type?.toLowerCase();
  if (t === "visa") return <div className="pv-co-paylogo"><span style={{ color: "#1a1f71", fontWeight: 800, fontStyle: "italic", fontSize: 14 }}>VISA</span></div>;
  if (t === "mastercard") return <div className="pv-co-paylogo"><div style={{ width: 14, height: 14, borderRadius: "50%", background: "#eb001b", marginRight: -6 }}/><div style={{ width: 14, height: 14, borderRadius: "50%", background: "#f79e1b" }}/></div>;
  if (t === "pix") return <div className="pv-co-paylogo"><span style={{ color: "#32bcad", fontWeight: 700, fontSize: 13 }}>pix</span></div>;
  if (t === "card") return <div className="pv-co-paylogo"><svg width="22" height="14" viewBox="0 0 22 14" fill="none"><rect width="22" height="14" rx="2" stroke="#2a1612" strokeWidth="1.5"/><line x1="0" y1="4" x2="22" y2="4" stroke="#2a1612" strokeWidth="1.5"/></svg></div>;
  if (t === "boleto") return <div className="pv-co-paylogo"><div style={{ display: "flex", gap: 1 }}><span style={{ width: 2, height: 14, background: "#1a1f1f" }}/><span style={{ width: 1, height: 14, background: "#1a1f1f" }}/><span style={{ width: 3, height: 14, background: "#1a1f1f" }}/><span style={{ width: 1, height: 14, background: "#1a1f1f" }}/><span style={{ width: 2, height: 14, background: "#1a1f1f" }}/></div></div>;
  return null;
}

// ─────────── Step 4: Revisão
function ReviewStep({ items, address, shipping, payment, cardData, accepted, setAccepted, donate, setDonate }) {
  return (
    <>
      <section className="pv-co-section">
        <h2>quase lá. confere antes de pagar?</h2>

        <div className="pv-co-review-grid">
          <Squircle color="#fcebf1" className="pv-co-review-card">
            <div className="pv-co-review-head">
              <strong>entrega em</strong>
              <button>editar</button>
            </div>
            <p><strong>{address.label}</strong></p>
            <p>{address.line1}</p>
            <p>{address.line2}</p>
            <p className="pv-co-review-meta">CEP {address.zip}</p>
            <div className="pv-co-review-meta-row">
              <span>{shipping.label} · {shipping.days}</span>
            </div>
          </Squircle>

          <Squircle color="#fdfedf" className="pv-co-review-card">
            <div className="pv-co-review-head">
              <strong>pagamento</strong>
              <button>editar</button>
            </div>
            <div className="pv-co-review-pay">
              <PaymentLogo type={payment.id}/>
              <div>
                <p><strong>{payment.label}</strong></p>
                {payment.id === "card" && cardData.number ? (
                  <p>{cardData.number.slice(-4) ? `•••• ${cardData.number.slice(-4)}` : "novo cartão"} · {cardData.installments}× sem juros</p>
                ) : (
                  <p>{payment.sub}</p>
                )}
              </div>
            </div>
          </Squircle>
        </div>

        <div className="pv-co-review-items">
          <h3>itens do pedido</h3>
          {items.map((it, i) => (
            <div key={i} className="pv-co-review-item">
              <div className="pv-co-cart-img" style={{ background: it.colorways?.[0] || "#fcebf1" }}>
                {it.images?.[0] && <img src={it.images[0]} alt=""/>}
              </div>
              <div className="pv-co-review-iteminfo">
                <strong>{it.name}</strong>
                <span>{it.qty} unidade{it.qty > 1 ? "s" : ""} · {fmtBRL2(it.price)}</span>
              </div>
              <strong>{fmtBRL2(it.price * it.qty)}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="pv-co-section">
        <Squircle color="#fcebf1" className="pv-co-donate">
          <div className="pv-co-donate-icon">
            <CatGlyph size={48} color="#ed6058" mood="happy"/>
          </div>
          <div className="pv-co-donate-text">
            <div className="pv-eyebrow"><PawGlyph size={12} color="#ed6058"/><span>arredondamento solidário</span></div>
            <strong>somar R$ 2,00 para <em>Anjos de Patinhas</em>?</strong>
            <p>doamos 100% do valor pra ONG que resgata gatos em situação de rua em SP.</p>
          </div>
          <button className={`pv-toggle ${donate ? "on" : ""}`} onClick={() => setDonate(!donate)}>
            <span/>
          </button>
        </Squircle>

        <Squircle color="#fdfedf" className="pv-co-terms">
          <label>
            <input type="checkbox" checked={accepted} onChange={e => setAccepted(e.target.checked)}/>
            <span className="pv-co-check"/>
            <span>li e aceito os <a>termos de uso</a>, a <a>política de privacidade</a> e a <a>política de trocas</a>. confirmo que o endereço e os dados de pagamento estão corretos.</span>
          </label>
        </Squircle>
      </section>
    </>
  );
}

Object.assign(window, { CheckoutView });

// ─────────── Thanks / Success view
function ThanksView({ order, onNav }) {
  const orderNum = "#PV-" + Math.floor(2700 + Math.random() * 99);
  const eta = (() => {
    const d = new Date();
    d.setDate(d.getDate() + (order?.shipping === "expressa" ? 2 : order?.shipping === "retira" ? 1 : 6));
    return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  })();
  return (
    <div className="pv-thanks">
      <div className="pv-thanks-shell">
        <Squircle color="#ed6058" className="pv-thanks-card">
          <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-thanks-inner">
            <div className="pv-thanks-check">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="5 13 10 18 19 7"/>
              </svg>
            </div>
            <div className="pv-eyebrow pv-eyebrow-dark"><span>pedido confirmado</span></div>
            <h1>obrigado! 🐾</h1>
            <p className="pv-thanks-sub">seu pedido <strong>{orderNum}</strong> tá na nossa lista. o gato vai amar.</p>
            <div className="pv-thanks-stats">
              <div><span>total pago</span><strong>{fmtBRL2(order?.total || 0)}</strong></div>
              <div><span>chega até</span><strong>{eta}</strong></div>
              <div><span>pontos ganhos</span><strong>+{Math.floor((order?.total || 0) / 10)}</strong></div>
            </div>
            <div className="pv-thanks-ctas">
              <PillBtn variant="cream" onClick={() => onNav({ view: "profile" })}>ver meus pedidos</PillBtn>
              <PillBtn variant="ghost" onClick={() => onNav({ view: "home" })}>
                <span style={{ color: "#fdfedf" }}>continuar comprando</span>
              </PillBtn>
            </div>
          </div>
        </Squircle>
        <Squircle color="#fcebf1" className="pv-thanks-tips">
          <h3>enquanto seu pedido viaja...</h3>
          <ul>
            <li><PawGlyph size={16} color="#ed6058"/><span>você vai receber um e-mail com o código de rastreio em até 24h</span></li>
            <li><PawGlyph size={16} color="#ed6058"/><span>seus pontos do clube aparecem no perfil em até 1h</span></li>
            <li><PawGlyph size={16} color="#ed6058"/><span>caso precise mudar algo, é só chamar a gente no WhatsApp</span></li>
          </ul>
        </Squircle>
      </div>
    </div>
  );
}
Object.assign(window, { ThanksView });
