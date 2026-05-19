// Pata de Veludo — root app
const { useState: useS, useEffect: useE } = React;

// Session-gated admin access: requires valid token in sessionStorage
const ADMIN_TOKEN_KEY = "pv_admin_session";
const ADMIN_SECRET_HASH = "pbkdf2:veludo2025:admin"; // server should validate properly

function isAdminAuthorized() {
  try {
    const tok = sessionStorage.getItem(ADMIN_TOKEN_KEY);
    return tok === ADMIN_SECRET_HASH;
  } catch { return false; }
}

function requestAdminAccess() {
  // Temporary gate for legacy app — new Next.js admin uses OTP+Gmail
  const pass = window.prompt("Painel restrito. Digite a senha de administrador:");
  if (!pass) return false;
  // In production this should be a server-side check. This is a stopgap.
  const isValid = pass === "veludo@admin2025";
  if (isValid) {
    try { sessionStorage.setItem(ADMIN_TOKEN_KEY, ADMIN_SECRET_HASH); } catch {}
  } else {
    alert("Senha incorreta.");
  }
  return isValid;
}

function App() {
  const initialHash = window.location.hash === "#admin";
  const [route, setRoute] = useS(
    initialHash && isAdminAuthorized() ? { view: "admin" } : { view: "home" }
  );
  const [cart, setCart] = useS([]);
  const [cartOpen, setCartOpen] = useS(false);
  const [toast, setToast] = useS("");

  // Listen hash changes for /admin route
  useE(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") {
        if (isAdminAuthorized() || requestAdminAccess()) {
          setRoute({ view: "admin" });
        } else {
          // Clear hash without granting access
          window.history.replaceState(null, "", window.location.pathname);
        }
      } else if (route.view === "admin") {
        setRoute({ view: "home" });
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [route.view]);

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "coral",
    "blobIntensity": 32,
    "showPawPattern": true
  }/*EDITMODE-END*/;
  const t = useTweaks(TWEAK_DEFAULTS);

  // Apply CSS vars based on palette
  useE(() => {
    const root = document.documentElement;
    const palettes = {
      coral:    { primary: "#ed6058", cream: "#fdfedf", pink: "#fcebf1", ink: "#2a1612" },
      indigo:   { primary: "#3b54ff", cream: "#f4f6ff", pink: "#dde4ff", ink: "#0c1240" },
      mint:     { primary: "#3da888", cream: "#f3fbef", pink: "#dcf2e0", ink: "#0e2a22" },
      midnight: { primary: "#ed6058", cream: "#221814", pink: "#2e201d", ink: "#fdfedf" }
    };
    const p = palettes[t.palette] || palettes.coral;
    root.style.setProperty("--pv-primary", p.primary);
    root.style.setProperty("--pv-cream", p.cream);
    root.style.setProperty("--pv-pink", p.pink);
    root.style.setProperty("--pv-ink", p.ink);
    root.style.setProperty("--pv-radius", `${t.blobIntensity}px`);
    document.body.classList.toggle("pv-dark", t.palette === "midnight");
    document.body.classList.toggle("pv-no-paws", !t.showPawPattern);
  }, [t.palette, t.blobIntensity, t.showPawPattern]);

  useE(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [route]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (p, qty = 1) => {
    setCart(prev => {
      const ix = prev.findIndex(i => i.id === p.id);
      if (ix >= 0) {
        const next = [...prev];
        next[ix] = { ...next[ix], qty: next[ix].qty + qty };
        return next;
      }
      return [...prev, { ...p, qty }];
    });
    setToast(`${p.name} entrou no cesto`);
  };

  const removeItem = (i) => setCart(prev => prev.filter((_, ix) => ix !== i));
  const setItemQty = (i, q) => setCart(prev => prev.map((it, ix) => ix === i ? { ...it, qty: q } : it));

  const goToCheckout = () => {
    setCartOpen(false);
    setRoute({ view: "checkout" });
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  const onCheckoutComplete = (orderData) => {
    setRoute({ view: "thanks", order: orderData });
    setCart([]);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const openProduct = (id) => setRoute({ view: "product", id });
  const nav = (r) => setRoute(r);

  // Admin mode: render dedicated shell, no header/footer/cart
  if (route.view === "admin") {
    return <AdminApp onExitAdmin={() => { window.location.hash = ""; setRoute({ view: "home" }); }}/>;
  }

  // Checkout mode: dedicated focused shell (own header)
  if (route.view === "checkout") {
    return (
      <CheckoutView
        initialCart={cart.length ? cart : null}
        onClose={() => nav({ view: "home" })}
        onComplete={onCheckoutComplete}
        onNav={nav}
      />
    );
  }

  return (
    <div className="pv-app">
      <Header onNav={nav} cartCount={cartCount} onCart={() => setCartOpen(true)} onAccount={() => nav({ view: "profile" })}/>
      <main data-screen-label={`01 ${route.view}`}>
        {route.view === "home" && (
          <>
            <Hero onNav={nav}/>
            <SocialBar/>
            <MomentStrip onNav={nav}/>
            <Featured onOpen={openProduct} onAdd={addToCart} onNav={nav}/>
            <FlashSale onNav={nav}/>
            <KitsSection onAdd={addToCart}/>
            <WhyStrip/>
            <QuizTeaser onNav={nav}/>
            <Reviews/>
          </>
        )}
        {route.view === "cat" && <CategoryView cat={route.cat} onOpen={openProduct} onAdd={addToCart} onNav={nav}/>}
        {route.view === "product" && <ProductView id={route.id} onAdd={addToCart} onNav={nav} onOpen={openProduct}/>}
        {route.view === "kits" && <KitsPage onAdd={addToCart} onNav={nav}/>}
        {route.view === "quiz" && <QuizView onNav={nav} onAdd={addToCart}/>}
        {route.view === "profile" && <ProfileView onNav={nav}/>}
        {route.view === "faq" && <FaqView onNav={nav}/>}
        {route.view === "shipping" && <ShippingView onNav={nav}/>}
        {route.view === "returns" && <ReturnsView onNav={nav}/>}
        {route.view === "track" && <TrackView onNav={nav}/>}
        {route.view === "gift" && <GiftCardView onNav={nav}/>}
        {route.view === "whatsapp" && <WhatsAppView onNav={nav}/>}
        {route.view === "thanks" && (
          <ThanksView order={route.order} onNav={nav}/>
        )}
        {route.view === "diario" && (
          <div className="pv-page pv-diario">
            <div className="pv-breadcrumb"><button onClick={() => nav({ view: "home" })}>início</button><span>/</span><span>diário</span></div>
            <section className="pv-cat-hero">
              <Squircle color="#fcebf1" className="pv-cat-hero-card">
                <div className="pv-cat-hero-inner">
                  <CatGlyph size={96} color="#ed6058" mood="surprise"/>
                  <div>
                    <div className="pv-eyebrow"><span>cartas para tutores</span></div>
                    <h1>diário</h1>
                    <p>histórias, dicas comportamentais e bastidores. zero algoritmo, zero pressa.</p>
                  </div>
                </div>
              </Squircle>
            </section>
            <section className="pv-diary-grid">
              {[
                { t: "por que seu gato vira pãozinho", e: "comportamento · 4 min", c: "#ed6058", img: "uploads/sprinx-dois.png" },
                { t: "ritual de boas-vindas para gato novo", e: "rotina · 6 min", c: "#fcebf1", img: "uploads/gatos-branco.jpg" },
                { t: "fontes de água: o que importa de verdade", e: "produto · 5 min", c: "#fdfedf", img: "uploads/siames-white.jpg" },
                { t: "três caças curtas valem mais que uma longa", e: "comportamento · 3 min", c: "#fcebf1", img: "uploads/laranja-branco.jpg" },
                { t: "catnip: como, quando e quanto", e: "guia · 4 min", c: "#fdfedf", img: "uploads/XgZpL.jpg" },
                { t: "a caixa importa mais que o brinquedo?", e: "ensaio · 7 min", c: "#ed6058", img: "uploads/pasted-1778897490905-0.png" }
              ].map((a, i) => (
                <Squircle key={i} color={a.c} className={`pv-diary-card ${a.c === "#ed6058" ? "pv-diary-dark" : ""}`}>
                  <div className="pv-placeholder" style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                    <img src={a.img} alt={a.t} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                  </div>
                  <div className="pv-diary-meta">
                    <span>{a.e}</span>
                    <h3>{a.t}</h3>
                    <button>ler →</button>
                  </div>
                </Squircle>
              ))}
            </section>
          </div>
        )}
      </main>
      <Footer onNav={nav}/>
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeItem}
        onQty={setItemQty}
        onCheckout={goToCheckout}
      />
      <Toast msg={toast} onClose={() => setToast("")}/>

      <TweaksPanel title="Tweaks">
        <TweakSection title="paleta">
          <PalettePicker
            label="esquema"
            value={t.palette}
            onChange={(v) => t.setTweak("palette", v)}
            options={[
              { id: "coral", colors: ["#ed6058","#fcebf1","#fdfedf"] },
              { id: "indigo", colors: ["#3b54ff","#dde4ff","#f4f6ff"] },
              { id: "mint", colors: ["#3da888","#dcf2e0","#f3fbef"] },
              { id: "midnight", colors: ["#ed6058","#2e201d","#221814"] }
            ]}
          />
        </TweakSection>
        <TweakSection title="forma">
          <TweakSlider label="raio dos cards" value={t.blobIntensity} min={8} max={56} step={2} onChange={(v) => t.setTweak("blobIntensity", v)}/>
          <TweakToggle label="estampa de pegadas" value={t.showPawPattern} onChange={(v) => t.setTweak("showPawPattern", v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function PalettePicker({ label, value, onChange, options }) {
  const active = options.find(o => o.id === value);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 12, fontFamily: "monospace", color: "#888", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div className="tp-color-row">
        {options.map(o => (
          <button
            key={o.id}
            className={`tp-color-swatch ${o.id === value ? "active" : ""}`}
            onClick={() => onChange(o.id)}
            title={o.id}
          >
            <span className="tp-color-main" style={{ background: o.colors[0] }}/>
            <span className="tp-color-pair">
              {o.colors.slice(1).map((c, j) => <span key={j} style={{ background: c }}/>)}
            </span>
          </button>
        ))}
      </div>
      <div className="tp-color-label">{active?.id}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
