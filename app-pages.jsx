// Pata de Veludo — Páginas institucionais (FAQ, frete, trocas, rastreio, vale-presente)
const { useState: iS } = React;

// ───────── FAQ ─────────
function FaqView({ onNav }) {
  const [search, setSearch] = iS("");
  const [openItem, setOpenItem] = iS(null);

  const categories = [
    {
      id: "pedidos",
      label: "Pedidos e entrega",
      icon: "package",
      items: [
        { q: "como acompanho meu pedido?", a: "assim que ele é despachado, você recebe por e-mail o código de rastreio. ele também aparece no seu perfil → meus pedidos → ver detalhes, com a linha do tempo atualizada em tempo real." },
        { q: "qual o prazo de entrega?", a: "expressa: até 2 dias úteis pra capitais. padrão: 5 a 7 dias úteis. frete grátis (acima de R$ 149): 7 a 12 dias úteis. todos os prazos começam a contar depois da confirmação do pagamento." },
        { q: "posso mudar o endereço depois de comprar?", a: "se o pedido ainda estiver como 'pendente' ou 'pago', sim — é só falar com a gente no whatsapp. depois que vira 'enviado', o endereço não pode mais ser alterado." },
        { q: "meu pedido atrasou. e agora?", a: "chama a gente no whatsapp com o número do pedido. a gente verifica em tempo real e, se for atraso confirmado, garantimos reembolso do frete + 200 pontos no clube." }
      ]
    },
    {
      id: "trocas",
      label: "Trocas e devoluções",
      icon: "swap",
      items: [
        { q: "posso devolver se meu gato não gostou?", a: "pode. você tem 30 dias pra trocar ou devolver, mesmo se o gato simplesmente ignorou. a gente cobre o frete da devolução pra pedidos acima de R$ 100." },
        { q: "como faço a devolução?", a: "no seu perfil → meus pedidos → ver detalhes → precisa de ajuda. preencha o motivo, escolha 'troca' ou 'devolução' e a gente gera a etiqueta de postagem grátis." },
        { q: "produto chegou com defeito. e agora?", a: "envia um vídeo ou foto pelo whatsapp. a gente troca em 48h sem você precisar devolver o defeituoso — pode usar como cama de papelão." }
      ]
    },
    {
      id: "pagamento",
      label: "Pagamento",
      icon: "wallet",
      items: [
        { q: "quais formas de pagamento aceitam?", a: "Pix (com 5% OFF automático), Cartão de crédito (em até 4x sem juros) e Boleto bancário (vence em 3 dias úteis)." },
        { q: "é seguro digitar meu cartão aqui?", a: "100%. usamos criptografia SSL e processamento via Mercado Pago. seus dados nunca passam pelos nossos servidores." },
        { q: "posso parcelar em mais vezes?", a: "no momento, parcelamos sem juros até 4x. acima disso, o cartão da bandeira cobra os juros — não recomendamos." }
      ]
    },
    {
      id: "clube",
      label: "Clube Veludo (pontos)",
      icon: "star",
      items: [
        { q: "como funciona o clube de pontos?", a: "a cada R$ 10 gastos, você ganha 1 ponto. cada ponto vale R$ 0,10 de desconto na próxima compra. existem várias outras formas de ganhar pontos no perfil → carteira → como ganhar mais." },
        { q: "os pontos vencem?", a: "sim, em 90 dias. mas é fácil renovar — qualquer compra ou ação no clube reseta o contador." },
        { q: "posso usar pontos junto com cupom?", a: "não. você escolhe usar pontos OU cupom em cada pedido. o sistema sugere automaticamente o desconto maior." }
      ]
    },
    {
      id: "produtos",
      label: "Produtos",
      icon: "box",
      items: [
        { q: "os brinquedos são testados?", a: "todos passam por trinta gatos antes de virar produto. são testados em apartamento real, não em laboratório." },
        { q: "tem certificado para os elétricos?", a: "sim, todos os brinquedos com bateria têm Inmetro e bivolt automático." },
        { q: "como sei qual brinquedo combina com meu gato?", a: "cadastre seu gato no perfil → meus gatos. depois faça o quiz (90 segundos). a gente sugere 5 brinquedos certeiros baseados na personalidade." }
      ]
    },
    {
      id: "conta",
      label: "Minha conta",
      icon: "user",
      items: [
        { q: "como cadastrar mais de um gato?", a: "perfil → meus gatos → + adicionar gato. quanto mais a gente conhece, melhores ficam as recomendações." },
        { q: "como excluir minha conta?", a: "perfil → conta → segurança → excluir minha conta. respeitamos a LGPD e apagamos todos os seus dados em até 7 dias." },
        { q: "esqueci minha senha", a: "na tela de login, clique em 'esqueci minha senha'. enviamos um link de recuperação pro seu e-mail." }
      ]
    }
  ];

  const filtered = search
    ? categories.map(c => ({
        ...c,
        items: c.items.filter(i => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase()))
      })).filter(c => c.items.length > 0)
    : categories;

  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>perguntas frequentes</span>
      </div>
      <section className="pv-inst-hero">
        <Squircle color="#ed6058" className="pv-inst-hero-card">
          <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-inst-hero-inner">
            <div className="pv-eyebrow pv-eyebrow-dark"><span>central de ajuda</span></div>
            <h1>perguntas frequentes</h1>
            <p>antes de chamar a gente, dá uma busca rápida aqui. respostas curtas, sem enrolação.</p>
            <div className="pv-inst-search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16" y2="16"/></svg>
              <input
                placeholder="o que você quer saber?"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Squircle>
      </section>

      <section className="pv-faq-grid">
        {filtered.map(cat => (
          <div key={cat.id} className="pv-faq-cat">
            <div className="pv-faq-cat-head">
              <div className="pv-faq-cat-icon"><CatIcon name={cat.icon}/></div>
              <h2>{cat.label}</h2>
              <span className="pv-faq-count">{cat.items.length}</span>
            </div>
            <div className="pv-faq-items">
              {cat.items.map((it, i) => {
                const key = `${cat.id}-${i}`;
                const open = openItem === key;
                return (
                  <div key={key} className={`pv-faq-item ${open ? "open" : ""}`}>
                    <button onClick={() => setOpenItem(open ? null : key)}>
                      <span>{it.q}</span>
                      <em>{open ? "−" : "+"}</em>
                    </button>
                    {open && <p>{it.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <Squircle color="#fcebf1" className="pv-empty-state" style={{ gridColumn: "1 / -1" }}>
            <CatGlyph size={64} color="#ed6058" mood="surprise"/>
            <h3>nada encontrado pra "{search}"</h3>
            <p>tenta outra palavra ou fala com a gente no whatsapp.</p>
            <PillBtn onClick={() => onNav({ view: "whatsapp" })}>chamar no whatsapp</PillBtn>
          </Squircle>
        )}
      </section>

      <section className="pv-inst-cta">
        <Squircle color="#fdfedf" className="pv-inst-cta-card">
          <CatGlyph size={56} color="#ed6058" mood="happy"/>
          <div>
            <h3>não achou o que procurava?</h3>
            <p>resposta no whatsapp em minutos, das 9h às 21h. zero robô.</p>
          </div>
          <PillBtn onClick={() => onNav({ view: "whatsapp" })}>chamar no whatsapp</PillBtn>
        </Squircle>
      </section>
    </div>
  );
}

// ───────── Frete e Prazo ─────────
function ShippingView({ onNav }) {
  const [zip, setZip] = iS("");
  const [result, setResult] = iS(null);

  const calculate = () => {
    const clean = zip.replace(/\D/g, "");
    if (clean.length !== 8) return;
    setResult({
      expressa: { days: "2 dias úteis", price: "R$ 24,90" },
      padrao: { days: "5 a 7 dias úteis", price: "R$ 14,90" },
      free: { days: "7 a 12 dias úteis", price: "grátis acima de R$ 149", note: "frete grátis disponível" }
    });
  };

  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>frete e prazo</span>
      </div>
      <section className="pv-inst-hero">
        <Squircle color="#fcebf1" className="pv-inst-hero-card">
          <div className="pv-inst-hero-inner">
            <div className="pv-eyebrow"><span>como entregamos</span></div>
            <h1>frete e prazo</h1>
            <p>entregamos pra todo o brasil. capitais em até 2 dias úteis, interior depende da região dos correios.</p>
          </div>
        </Squircle>
      </section>

      <section className="pv-shipping-calc">
        <Squircle color="#ed6058" className="pv-shipping-calc-card">
          <div className="pv-shipping-calc-inner">
            <div>
              <div className="pv-eyebrow pv-eyebrow-dark"><span>calculadora</span></div>
              <h2>quanto custa pra te entregar?</h2>
              <p>digita seu CEP e a gente mostra todos os modos e prazos.</p>
            </div>
            <div className="pv-shipping-calc-form">
              <input
                placeholder="00000-000"
                value={zip}
                onChange={e => setZip(e.target.value.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2"))}
              />
              <button onClick={calculate}>calcular</button>
            </div>
          </div>
        </Squircle>
      </section>

      {result && (
        <section className="pv-shipping-results">
          <h3>opções pra CEP {zip}</h3>
          <div className="pv-shipping-options">
            <Squircle color="#fcebf1" className="pv-shipping-option">
              <div className="pv-shipping-opt-head">
                <strong>Expressa</strong>
                <span className="pv-co-badge">mais rápida</span>
              </div>
              <p>{result.expressa.days}</p>
              <strong className="pv-shipping-opt-price">{result.expressa.price}</strong>
            </Squircle>
            <Squircle color="#fdfedf" className="pv-shipping-option">
              <div className="pv-shipping-opt-head">
                <strong>Padrão</strong>
              </div>
              <p>{result.padrao.days}</p>
              <strong className="pv-shipping-opt-price">{result.padrao.price}</strong>
            </Squircle>
            <Squircle color="#ed6058" className="pv-shipping-option pv-shipping-opt-free">
              <div className="pv-shipping-opt-head">
                <strong>Frete grátis</strong>
                <span className="pv-co-badge" style={{ background: "var(--pv-cream)", color: "var(--pv-primary)" }}>economia</span>
              </div>
              <p>{result.free.days}</p>
              <strong className="pv-shipping-opt-price">{result.free.price}</strong>
            </Squircle>
          </div>
        </section>
      )}

      <section className="pv-shipping-table">
        <h3>tabela de regiões</h3>
        <div className="pv-shipping-region-grid">
          {[
            { region: "Capitais SP, RJ, MG, PR, SC, RS", express: "2 dias", normal: "5 dias" },
            { region: "Demais capitais Sudeste/Sul", express: "3 dias", normal: "5 a 7 dias" },
            { region: "Capitais Nordeste e Centro-Oeste", express: "4 dias", normal: "7 a 10 dias" },
            { region: "Capitais Norte (BA, AM, PA)", express: "5 dias", normal: "10 a 15 dias" },
            { region: "Interior em geral", express: "soma +2 dias", normal: "soma +3 a 5 dias" }
          ].map(r => (
            <div key={r.region} className="pv-shipping-region">
              <strong>{r.region}</strong>
              <div className="pv-shipping-region-times">
                <span><em>expressa</em>{r.express}</span>
                <span><em>padrão</em>{r.normal}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pv-shipping-trust">
        {[
          { i: "leaf", h: "embalagem pet-safe", p: "papelão reciclado, sem plásticos desnecessários, lacre com etiqueta colorida." },
          { i: "shield", h: "rastreio em tempo real", p: "acompanhe cada etapa pelo seu perfil. notificações por e-mail e whatsapp." },
          { i: "smile", h: "atraso? frete reembolsado", p: "atraso de mais de 3 dias úteis: a gente devolve o frete + 200 pontos." }
        ].map(t => (
          <Squircle key={t.h} color="#fdfedf" className="pv-shipping-trust-card">
            <CatIcon name={t.i}/>
            <strong>{t.h}</strong>
            <p>{t.p}</p>
          </Squircle>
        ))}
      </section>
    </div>
  );
}

// ───────── Trocas e devoluções ─────────
function ReturnsView({ onNav }) {
  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>trocas e devoluções</span>
      </div>
      <section className="pv-inst-hero">
        <Squircle color="#ed6058" className="pv-inst-hero-card">
          <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-inst-hero-inner">
            <div className="pv-eyebrow pv-eyebrow-dark"><span>política simples</span></div>
            <h1>30 dias pra trocar.<br/>sem pergunta.</h1>
            <p>seu gato é o juiz. se ele ignorou o brinquedo ou virou as costas, a gente troca ou devolve seu dinheiro. simples assim.</p>
          </div>
        </Squircle>
      </section>

      <section className="pv-returns-steps">
        <h2>como funciona</h2>
        <div className="pv-returns-steps-grid">
          {[
            { n: "01", t: "abre uma solicitação", d: "no seu perfil → meus pedidos → ver detalhes → precisa de ajuda. ou pelo whatsapp." },
            { n: "02", t: "etiqueta na sua porta", d: "geramos a etiqueta dos correios e enviamos por e-mail. é só imprimir e postar." },
            { n: "03", t: "produto chega no nosso CD", d: "em 5 a 7 dias úteis. assim que recebermos, te avisamos." },
            { n: "04", t: "troca ou dinheiro de volta", d: "no mesmo método de pagamento, em até 5 dias úteis. ou crédito na conta com 10% bônus." }
          ].map(s => (
            <Squircle key={s.n} color="#fcebf1" className="pv-returns-step">
              <span className="pv-returns-step-num">{s.n}</span>
              <strong>{s.t}</strong>
              <p>{s.d}</p>
            </Squircle>
          ))}
        </div>
      </section>

      <section className="pv-returns-cases">
        <h2>casos que cobrimos</h2>
        <div className="pv-returns-cases-grid">
          {[
            { ok: true, t: "o gato simplesmente não quis", d: "sim, isso é um motivo válido. acontece." },
            { ok: true, t: "chegou com defeito", d: "trocamos em 48h sem precisar devolver o defeituoso." },
            { ok: true, t: "não combinou com o gato", d: "trocamos por outro produto de valor equivalente." },
            { ok: true, t: "tamanho errado", d: "trocamos sem custo de frete." },
            { ok: false, t: "produto usado mais de 30 dias", d: "fora do prazo, infelizmente." },
            { ok: false, t: "personalizados", d: "como vale-presente já resgatado." }
          ].map(c => (
            <div key={c.t} className={`pv-returns-case ${c.ok ? "ok" : "no"}`}>
              <span className="pv-returns-case-icon">{c.ok ? "✓" : "×"}</span>
              <div>
                <strong>{c.t}</strong>
                <p>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pv-inst-cta">
        <Squircle color="#fdfedf" className="pv-inst-cta-card">
          <CatGlyph size={56} color="#ed6058" mood="sleepy"/>
          <div>
            <h3>quero abrir uma troca agora</h3>
            <p>vai pro seu perfil ou chama no whatsapp pra ser mais rápido.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <PillBtn variant="ghost" onClick={() => onNav({ view: "profile" })}>meu perfil</PillBtn>
            <PillBtn onClick={() => onNav({ view: "whatsapp" })}>chamar no whatsapp</PillBtn>
          </div>
        </Squircle>
      </section>
    </div>
  );
}

// ───────── Rastrear pedido (sem login) ─────────
function TrackView({ onNav }) {
  const [code, setCode] = iS("");
  const [email, setEmail] = iS("");
  const [tracking, setTracking] = iS(null);

  const search = () => {
    if (!code || !email) return;
    setTracking({
      orderId: code.toUpperCase().startsWith("#") ? code.toUpperCase() : "#" + code.toUpperCase(),
      product: "Fonte Pétala silenciosa + Bolinhas Crocantes",
      eta: "15 de maio",
      tracking: "BR123456789BR",
      stages: [
        { label: "Pagamento confirmado", date: "12 mai, 09:42", done: true },
        { label: "Preparando envio", date: "12 mai, 14:18", done: true },
        { label: "Saiu do CD São Paulo", date: "13 mai, 08:05", done: true },
        { label: "Em trânsito · Campinas", date: "13 mai, 19:30", done: true, current: true },
        { label: "Saiu para entrega", date: "previsto 15 mai", future: true },
        { label: "Entregue", date: "previsto 15 mai", future: true }
      ]
    });
  };

  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>rastrear pedido</span>
      </div>
      <section className="pv-inst-hero">
        <Squircle color="#fcebf1" className="pv-inst-hero-card">
          <div className="pv-inst-hero-inner">
            <div className="pv-eyebrow"><span>onde tá meu pedido?</span></div>
            <h1>rastrear pedido</h1>
            <p>se você tem conta, pode acompanhar pelo perfil. se quer rastrear como convidado, use o formulário abaixo.</p>
          </div>
        </Squircle>
      </section>

      <section className="pv-track-form-section">
        <Squircle color="#ed6058" className="pv-track-form-card">
          <PawPattern color="#fdfedf" opacity={0.12} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-track-form-inner">
            <h2>tem o número do pedido?</h2>
            <p>digite o ID que chegou no seu e-mail (começa com #PV-)</p>
            <div className="pv-track-form-fields">
              <input placeholder="#PV-2647" value={code} onChange={e => setCode(e.target.value)}/>
              <input placeholder="e-mail usado na compra" value={email} onChange={e => setEmail(e.target.value)}/>
              <button onClick={search}>rastrear pedido →</button>
            </div>
            <button className="pv-track-login" onClick={() => onNav({ view: "profile" })}>
              ou entre na sua conta e veja todos os pedidos →
            </button>
          </div>
        </Squircle>
      </section>

      {tracking && (
        <section className="pv-track-result">
          <Squircle color="#fdfedf" className="pv-track-result-card">
            <div className="pv-track-result-head">
              <div>
                <span className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>encontramos seu pedido</span></span>
                <h2>{tracking.orderId}</h2>
                <p>{tracking.product}</p>
              </div>
              <div className="pv-track-eta">
                <span>previsto pra</span>
                <strong>{tracking.eta}</strong>
              </div>
            </div>
            <div className="pv-tracking" style={{ marginBottom: 16 }}>
              <span>rastreio:</span>
              <code>{tracking.tracking}</code>
              <button onClick={() => navigator.clipboard?.writeText(tracking.tracking)}>copiar</button>
            </div>
            <ol className="pv-od-timeline">
              {tracking.stages.map((s, i) => (
                <li key={i} className={`${s.done ? "done" : ""} ${s.current ? "current" : ""} ${s.future ? "future" : ""}`}>
                  <div className="pv-od-tl-dot">
                    {s.done && !s.current && (
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
          </Squircle>
        </section>
      )}
    </div>
  );
}

// ───────── Vale-presente ─────────
function GiftCardView({ onNav }) {
  const values = [50, 100, 150, 200, 300, 500];
  const [value, setValue] = iS(150);
  const [custom, setCustom] = iS(false);
  const [data, setData] = iS({ from: "", to: "", email: "", message: "", schedule: "" });

  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>vale-presente</span>
      </div>
      <section className="pv-inst-hero">
        <Squircle color="#ed6058" className="pv-inst-hero-card">
          <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-inst-hero-inner">
            <div className="pv-eyebrow pv-eyebrow-dark"><span>presente que o gato vai amar</span></div>
            <h1>vale-presente</h1>
            <p>perfeito pra amigos com gato novo, aniversários ou só pra alegrar. chega por e-mail na data que você escolher.</p>
          </div>
        </Squircle>
      </section>

      <section className="pv-gift-shell">
        <div className="pv-gift-form">
          <h2>monte seu vale</h2>
          <div className="pv-gift-step">
            <label>valor do vale</label>
            <div className="pv-gift-values">
              {values.map(v => (
                <button
                  key={v}
                  className={`pv-gift-value ${!custom && value === v ? "on" : ""}`}
                  onClick={() => { setValue(v); setCustom(false); }}
                >
                  R$ {v}
                </button>
              ))}
              <button
                className={`pv-gift-value pv-gift-value-custom ${custom ? "on" : ""}`}
                onClick={() => setCustom(true)}
              >
                outro valor
              </button>
            </div>
            {custom && (
              <input
                type="number"
                placeholder="digite o valor"
                value={value}
                onChange={e => setValue(+e.target.value)}
                className="pv-gift-custom-input"
              />
            )}
          </div>

          <div className="pv-gift-step">
            <label>de quem é o presente?</label>
            <input placeholder="seu nome" value={data.from} onChange={e => setData({ ...data, from: e.target.value })}/>
          </div>

          <div className="pv-gift-step">
            <label>para quem?</label>
            <div className="pv-set-row-split">
              <input placeholder="nome da pessoa" value={data.to} onChange={e => setData({ ...data, to: e.target.value })}/>
              <input placeholder="e-mail da pessoa" value={data.email} onChange={e => setData({ ...data, email: e.target.value })}/>
            </div>
          </div>

          <div className="pv-gift-step">
            <label>recadinho (opcional)</label>
            <textarea
              rows="3"
              placeholder="ex: feliz aniversário pra você e a Mafalda! que venham muitos brinquedos."
              value={data.message}
              onChange={e => setData({ ...data, message: e.target.value })}
            />
          </div>

          <div className="pv-gift-step">
            <label>enviar quando?</label>
            <input type="date" value={data.schedule} onChange={e => setData({ ...data, schedule: e.target.value })}/>
            <span className="pv-gift-hint">deixe vazio pra enviar agora.</span>
          </div>

          <PillBtn size="lg">comprar vale R$ {value} →</PillBtn>
        </div>

        <div className="pv-gift-preview">
          <span className="pv-eyebrow"><PawGlyph size={14} color="#ed6058"/><span>preview</span></span>
          <div className="pv-gift-card-preview">
            <PawPattern color="#fdfedf" opacity={0.14} style={{ position: "absolute", inset: 0 }}/>
            <div className="pv-gift-card-inner">
              <div className="pv-gift-card-head">
                <Logo size={36} onDark={false}/>
                <span>vale-presente</span>
              </div>
              <div className="pv-gift-card-value">
                <strong>R$ {value}</strong>
              </div>
              {data.message && <p className="pv-gift-card-msg">"{data.message}"</p>}
              <div className="pv-gift-card-foot">
                <span>{data.from ? `de ${data.from}` : "de [seu nome]"}</span>
                <span>{data.to ? `para ${data.to}` : "para [nome da pessoa]"}</span>
              </div>
            </div>
          </div>
          <p className="pv-gift-disclaimer">o vale chega no e-mail com o código. válido por 1 ano. pode ser usado em qualquer produto.</p>
        </div>
      </section>
    </div>
  );
}

// ───────── WhatsApp landing ─────────
function WhatsAppView({ onNav }) {
  return (
    <div className="pv-page pv-inst-page">
      <div className="pv-breadcrumb">
        <button onClick={() => onNav({ view: "home" })}>início</button>
        <span>/</span><span>whatsapp</span>
      </div>
      <section className="pv-wa-shell">
        <Squircle color="#3da888" className="pv-wa-card">
          <PawPattern color="#fdfedf" opacity={0.12} style={{ position: "absolute", inset: 0 }}/>
          <div className="pv-wa-inner">
            <div className="pv-wa-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 14.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.8-2.8-1.5-3.9-3.5-.3-.5.3-.5.9-1.5.1-.2 0-.4 0-.5l-1-2.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6 0 1.6 1.1 3.1 1.3 3.3.2.2 2.2 3.4 5.4 4.8 2 .9 2.8.9 3.8.8.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4Z"/>
                <path d="M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2h.1c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18c-1.5 0-3-.4-4.2-1.2l-.3-.2-3.1.8.8-3.1-.2-.3c-.8-1.3-1.3-2.8-1.3-4.4 0-4.4 3.6-8 8-8s8 3.6 8 8c0 4.5-3.6 8.4-8 8.4Z"/>
              </svg>
            </div>
            <div className="pv-eyebrow pv-eyebrow-dark"><span>atendimento humano</span></div>
            <h1>fale com a gente no<br/>whatsapp</h1>
            <p>resposta em minutos das 9h às 21h, todos os dias.<br/>respondemos por nós mesmos — zero robô, zero menu.</p>
            <a href="https://wa.me/5511999999999" className="pv-pill pv-pill-cream pv-pill-lg" style={{ color: "#3da888" }}>
              <span>abrir conversa</span>
            </a>
            <div className="pv-wa-stats">
              <div><strong>3 min</strong><span>tempo médio de resposta</span></div>
              <div><strong>4.9★</strong><span>nota dos tutores</span></div>
              <div><strong>24/7</strong><span>na entrega de pedidos</span></div>
            </div>
          </div>
        </Squircle>

        <Squircle color="#fcebf1" className="pv-wa-quick">
          <h3>perguntas que mais fazemos por lá</h3>
          <div className="pv-wa-quick-grid">
            {[
              "onde tá meu pedido?",
              "quero trocar um produto",
              "qual brinquedo pro meu gato?",
              "tem desconto pra primeira compra?",
              "como funciona o clube de pontos?",
              "vocês entregam na minha região?"
            ].map(q => (
              <button key={q} className="pv-wa-quick-item">
                <PawGlyph size={14} color="#ed6058"/>
                <span>{q}</span>
              </button>
            ))}
          </div>
        </Squircle>
      </section>
    </div>
  );
}

// Helper icon component
function CatIcon({ name, size = 32 }) {
  const c = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    package: <path d="M3 7 L12 3 L21 7 V17 L12 21 L3 17 Z M3 7 L12 11 L21 7 M12 11 V21"/>,
    swap: <path d="M7 8 H 17 L 14 5 M 17 16 H 7 L 10 19"/>,
    wallet: <path d="M3 8 V 18 H 21 V 8 M 3 8 V 6 H 19 V 8 M 17 13 H 19"/>,
    star: <path d="M12 4 L 14 9 L 19 10 L 15 14 L 16 19 L 12 16 L 8 19 L 9 14 L 5 10 L 10 9 Z"/>,
    box: <path d="M3 7 L 12 3 L 21 7 V 17 L 12 21 L 3 17 Z"/>,
    user: <path d="M12 12 a 4 4 0 1 0 0 -8 a 4 4 0 0 0 0 8 Z M 4 20 Q 12 14 20 20"/>,
    leaf: <path d="M5 19 Q 5 5 19 5 Q 19 13 13 17 Q 9 19 5 19 Z M 5 19 L 13 11"/>,
    shield: <path d="M12 3 L 4 6 V 12 Q 4 18 12 21 Q 20 18 20 12 V 6 Z"/>,
    smile: <path d="M12 21 a 9 9 0 1 0 0 -18 a 9 9 0 0 0 0 18 Z M 9 10 V 10.5 M 15 10 V 10.5 M 9 15 Q 12 17 15 15"/>
  };
  return <svg {...c}>{paths[name] || paths.box}</svg>;
}

Object.assign(window, { FaqView, ShippingView, ReturnsView, TrackView, GiftCardView, WhatsAppView });
