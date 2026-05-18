// Pata de Veludo Admin — dados simulados
(function () {
  // ───── Helpers
  const rand = (a, b) => a + Math.random() * (b - a);
  const irand = (a, b) => Math.floor(rand(a, b + 1));
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const NOW = new Date();
  const daysAgo = (n) => { const d = new Date(NOW); d.setDate(d.getDate() - n); return d; };

  // ───── Vendas dos últimos 30 dias (orders + revenue por dia)
  const dailySales = [];
  for (let i = 29; i >= 0; i--) {
    const d = daysAgo(i);
    const dow = d.getDay();
    const isWeekend = dow === 0 || dow === 6;
    const base = isWeekend ? rand(38, 62) : rand(22, 48);
    const orders = Math.round(base + (29 - i) * 0.35); // tendência de alta
    const aov = rand(165, 245);
    dailySales.push({
      date: d.toISOString().slice(0, 10),
      day: d.getDate(),
      dow,
      orders,
      revenue: Math.round(orders * aov),
      sessions: Math.round(orders * rand(45, 75)),
      addToCart: Math.round(orders * rand(4, 7)),
    });
  }

  // ───── Pedidos recentes (últimos 14 dias, mais detalhados)
  const customers = [
    { name: "Marina Albuquerque", cat: "Quindim", city: "São Paulo, SP", email: "marina@email.com" },
    { name: "Beto Camargo", cat: "Mafalda", city: "Curitiba, PR", email: "beto@email.com" },
    { name: "Lia Souza", cat: "Tofu & Pipoca", city: "Recife, PE", email: "lia@email.com" },
    { name: "Caio Almeida", cat: "Trovão", city: "Rio de Janeiro, RJ", email: "caio@email.com" },
    { name: "Helena Vieira", cat: "Biscoito", city: "Belo Horizonte, MG", email: "helena@email.com" },
    { name: "Rafael Tanaka", cat: "Sushi", city: "São Paulo, SP", email: "rafa@email.com" },
    { name: "Júlia Mendes", cat: "Cleópatra", city: "Porto Alegre, RS", email: "julia@email.com" },
    { name: "Pedro Hauser", cat: "Lord Pelúcio", city: "Florianópolis, SC", email: "pedro@email.com" },
    { name: "Amanda Lopes", cat: "Nuvem", city: "Salvador, BA", email: "amanda@email.com" },
    { name: "Diego Ferraz", cat: "Pixel", city: "Brasília, DF", email: "diego@email.com" },
    { name: "Sofia Reis", cat: "Madonna", city: "Fortaleza, CE", email: "sofia@email.com" },
    { name: "Bruno Sato", cat: "Tofu", city: "São Paulo, SP", email: "bruno@email.com" },
    { name: "Camila Prado", cat: "Anchovinha", city: "Niterói, RJ", email: "cami@email.com" },
    { name: "Tiago Olliver", cat: "Schrödinger", city: "Campinas, SP", email: "tiago@email.com" },
    { name: "Larissa Brito", cat: "Bolinha", city: "Manaus, AM", email: "lari@email.com" }
  ];

  const productNames = [
    { name: "Ratinho elétrico Picapau", price: 89.9 },
    { name: "Varinha Pluma da Sereia", price: 49.9 },
    { name: "Túnel Veludo Macio", price: 119.9 },
    { name: "Bola Pena de Outono", price: 24.9 },
    { name: "Puzzle Camarão Curioso", price: 159.9 },
    { name: "Fonte Pétala silenciosa", price: 229.0 },
    { name: "Ninho Pão Quentinho", price: 189.0 },
    { name: "Arranhador Onda", price: 139.0 },
    { name: "Mochila Bolha de Sabão", price: 349.0 },
    { name: "Torre Arranhador Veludo", price: 459.9 },
    { name: "Túnel Triplo Aventura", price: 129.9 },
    { name: "Varinha Laser Cometa", price: 39.9 },
    { name: "Bolinhas Crocantes", price: 32.4 },
    { name: "Kit Caça Noturna", price: 219.0 },
    { name: "Kit Rotina Zen", price: 389.0 }
  ];

  const statuses = ["pendente", "pago", "enviado", "entregue", "cancelado"];
  const statusWeights = [0.08, 0.18, 0.28, 0.42, 0.04];
  const weighted = (opts, w) => {
    const r = Math.random();
    let acc = 0;
    for (let i = 0; i < opts.length; i++) {
      acc += w[i];
      if (r <= acc) return opts[i];
    }
    return opts[opts.length - 1];
  };

  const orders = [];
  for (let i = 0; i < 42; i++) {
    const c = pick(customers);
    const numItems = irand(1, 4);
    const items = [];
    let subtotal = 0;
    for (let j = 0; j < numItems; j++) {
      const p = pick(productNames);
      const qty = irand(1, 2);
      items.push({ name: p.name, qty, price: p.price });
      subtotal += p.price * qty;
    }
    const freight = subtotal >= 149 ? 0 : irand(15, 28);
    const total = subtotal + freight;
    const date = daysAgo(irand(0, 14));
    date.setHours(irand(8, 22), irand(0, 59));
    const status = weighted(statuses, statusWeights);
    const payment = pick(["Pix", "Cartão", "Cartão", "Cartão", "Boleto"]);
    orders.push({
      id: `#PV-${(2604 + i).toString()}`,
      date,
      customer: c,
      items,
      subtotal: +subtotal.toFixed(2),
      freight,
      total: +total.toFixed(2),
      status,
      payment
    });
  }
  orders.sort((a, b) => b.date - a.date);

  // ───── Top produtos (somando dos pedidos)
  const productAgg = {};
  orders.forEach(o => {
    o.items.forEach(it => {
      if (!productAgg[it.name]) productAgg[it.name] = { name: it.name, units: 0, revenue: 0 };
      productAgg[it.name].units += it.qty;
      productAgg[it.name].revenue += it.qty * it.price;
    });
  });
  const topProducts = Object.values(productAgg)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 8)
    .map(p => ({ ...p, revenue: +p.revenue.toFixed(2) }));

  // ───── Funil de conversão (últimos 30d)
  const funnel = (() => {
    const totalSessions = dailySales.reduce((s, d) => s + d.sessions, 0);
    const totalATC = dailySales.reduce((s, d) => s + d.addToCart, 0);
    const totalOrders = dailySales.reduce((s, d) => s + d.orders, 0);
    return [
      { label: "Sessões", value: totalSessions, pct: 100 },
      { label: "Viu produto", value: Math.round(totalSessions * 0.62), pct: 62 },
      { label: "Adicionou ao carrinho", value: totalATC, pct: +(totalATC / totalSessions * 100).toFixed(1) },
      { label: "Iniciou checkout", value: Math.round(totalATC * 0.45), pct: +(totalATC * 0.45 / totalSessions * 100).toFixed(1) },
      { label: "Pagou", value: totalOrders, pct: +(totalOrders / totalSessions * 100).toFixed(2) }
    ];
  })();

  // ───── Tráfego por origem
  const trafficSources = [
    { source: "Instagram", sessions: 4820, conv: 2.4, color: "#ed6058" },
    { source: "Google (orgânico)", sessions: 3145, conv: 3.8, color: "#3da888" },
    { source: "Google Ads", sessions: 2210, conv: 4.1, color: "#3b54ff" },
    { source: "Direto", sessions: 1480, conv: 5.2, color: "#2a1612" },
    { source: "TikTok", sessions: 980, conv: 1.6, color: "#f2c98a" },
    { source: "Email", sessions: 520, conv: 6.8, color: "#fcebf1" }
  ];

  // ───── Core Web Vitals (últimos 30d, p75)
  const webVitals = {
    LCP: { value: 1.8, unit: "s", target: 2.5, label: "Largest Contentful Paint", trend: -0.2 },
    INP: { value: 142, unit: "ms", target: 200, label: "Interaction to Next Paint", trend: -8 },
    CLS: { value: 0.04, unit: "", target: 0.1, label: "Cumulative Layout Shift", trend: 0.01 },
    FCP: { value: 1.1, unit: "s", target: 1.8, label: "First Contentful Paint", trend: -0.1 },
    TTFB: { value: 280, unit: "ms", target: 600, label: "Time to First Byte", trend: -22 }
  };

  // ───── Uptime últimos 60 dias
  const uptime = [];
  for (let i = 59; i >= 0; i--) {
    const r = Math.random();
    let status = "ok";
    if (r < 0.01) status = "down";
    else if (r < 0.04) status = "degraded";
    uptime.push({ date: daysAgo(i).toISOString().slice(0, 10), status });
  }

  // ───── Eventos / logs recentes
  const events = [
    { type: "info", msg: "Deploy main → produção", at: "há 8 min", source: "vercel" },
    { type: "error", msg: "Falha na API de frete (Melhor Envio) — timeout 5xx", at: "há 2h", source: "api/shipping" },
    { type: "warn", msg: "LCP acima de 2.5s em /produto/torre-arranhador-veludo (mobile)", at: "há 3h", source: "rum" },
    { type: "info", msg: "Webhook Mercado Pago: 28 eventos processados", at: "há 4h", source: "mercadopago" },
    { type: "warn", msg: "Estoque baixo: Varinha Laser Cometa (3 unidades)", at: "há 6h", source: "inventory" },
    { type: "info", msg: "Cupom VELUDO10 usado 18 vezes hoje", at: "há 9h", source: "promo" },
    { type: "error", msg: "Imagem 404 em /assets/old-banner.jpg (12 hits)", at: "há 11h", source: "cdn" },
    { type: "info", msg: "Backup banco de dados concluído (2.3 GB)", at: "ontem", source: "supabase" }
  ];

  // ───── Estoque (snapshot)
  const inventory = productNames.slice(0, 12).map(p => ({
    name: p.name,
    sku: "SKU-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
    stock: irand(0, 80),
    sold30d: irand(8, 120),
    price: p.price
  })).sort((a, b) => a.stock - b.stock);

  // ───── KPIs do mês (com comparação MoM)
  const totalRevenue = dailySales.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = dailySales.reduce((s, d) => s + d.orders, 0);
  const totalSessions = dailySales.reduce((s, d) => s + d.sessions, 0);
  const kpis = {
    revenue: { value: totalRevenue, delta: 18.4, label: "Receita 30d" },
    orders: { value: totalOrders, delta: 14.2, label: "Pedidos 30d" },
    aov: { value: totalRevenue / totalOrders, delta: 3.7, label: "Ticket médio" },
    conversion: { value: (totalOrders / totalSessions * 100), delta: 0.4, label: "Conversão" },
    sessions: { value: totalSessions, delta: 22.1, label: "Sessões" },
    refunds: { value: 8, delta: -12, label: "Reembolsos" }
  };

  // ───── Top clicks (elementos mais clicados na home)
  const topClicks = [
    { selector: "header > .cta-buscar-brinquedos", label: "CTA 'Ver brinquedos' (hero)", page: "/", clicks: 8420, rate: 14.2 },
    { selector: "product-card[id='ratinho-eletro']", label: "Card Ratinho elétrico Picapau", page: "/", clicks: 6210, rate: 10.5 },
    { selector: ".pv-moment[data-cat='brincar']", label: "Categoria Brincar", page: "/", clicks: 5840, rate: 9.9 },
    { selector: ".pv-flash-card .pv-pill", label: "CTA 'aproveitar agora' (flash sale)", page: "/", clicks: 4920, rate: 8.3 },
    { selector: ".pv-cart-btn", label: "Ícone carrinho (header)", page: "*", clicks: 4180, rate: 7.1 },
    { selector: ".pv-product-add", label: "Botão '+' adicionar (cards)", page: "/cat/brincar", clicks: 3640, rate: 6.2 },
    { selector: ".pv-quiz-card .pv-pill", label: "CTA 'começar o quiz'", page: "/", clicks: 2810, rate: 4.8 },
    { selector: ".pv-kit-bottom .pv-pill", label: "Botão 'levar kit' (combos)", page: "/", clicks: 2340, rate: 4.0 },
    { selector: ".pv-product-tag[data-tag='Best-seller']", label: "Tag Best-seller", page: "*", clicks: 1980, rate: 3.4 },
    { selector: ".pv-pdp-cta-add", label: "CTA 'adicionar' (PDP)", page: "/produto/[id]", clicks: 1840, rate: 3.1 }
  ];

  // ───── Páginas mais visitadas
  const topPages = [
    { path: "/", views: 38420, avgTime: "1m 48s", bounce: 32, exit: 28 },
    { path: "/produto/puzzle-camarao", views: 8240, avgTime: "2m 14s", bounce: 18, exit: 22 },
    { path: "/cat/brincar", views: 7180, avgTime: "1m 32s", bounce: 24, exit: 35 },
    { path: "/produto/ratinho-eletro", views: 6420, avgTime: "2m 03s", bounce: 21, exit: 26 },
    { path: "/quiz", views: 5180, avgTime: "3m 22s", bounce: 12, exit: 18 },
    { path: "/produto/fonte-petala", views: 4220, avgTime: "2m 41s", bounce: 16, exit: 24 },
    { path: "/kits", views: 3140, avgTime: "1m 58s", bounce: 28, exit: 42 },
    { path: "/produto/torre-arranhador-luxo", views: 2840, avgTime: "2m 36s", bounce: 22, exit: 30 },
    { path: "/checkout", views: 2120, avgTime: "4m 12s", bounce: 8, exit: 64 }
  ];

  // ───── Heatmap zonas da home (regiões + cliques relativos)
  const heatmap = [
    // formato: x%, y%, width%, height%, intensity (0-1), label
    { x: 6, y: 18, w: 28, h: 12, i: 0.95, label: "CTA hero principal" },
    { x: 6, y: 36, w: 18, h: 8, i: 0.62, label: "CTA quiz" },
    { x: 52, y: 8, w: 36, h: 28, i: 0.78, label: "Foto principal hero" },
    { x: 8, y: 56, w: 84, h: 14, i: 0.85, label: "Grade categorias" },
    { x: 8, y: 78, w: 38, h: 18, i: 0.71, label: "Card produto #1" },
    { x: 48, y: 78, w: 38, h: 18, i: 0.58, label: "Card produto #2" }
  ];

  // ───── Cliques em tempo real (últimos 60 min, em buckets de 1 min)
  const liveClicks = [];
  for (let i = 59; i >= 0; i--) {
    const base = 28 + Math.sin(i * 0.4) * 8;
    liveClicks.push({ min: i, clicks: Math.round(base + Math.random() * 16) });
  }

  // ───── Dispositivos
  const devices = [
    { name: "Mobile", pct: 62.4, sessions: 16230, conv: 2.1 },
    { name: "Desktop", pct: 31.8, sessions: 8270, conv: 4.6 },
    { name: "Tablet", pct: 5.8, sessions: 1508, conv: 2.9 }
  ];

  window.PV_ADMIN = {
    dailySales, orders, topProducts, funnel, trafficSources,
    webVitals, uptime, events, inventory, kpis,
    topClicks, topPages, heatmap, liveClicks, devices
  };
})();
