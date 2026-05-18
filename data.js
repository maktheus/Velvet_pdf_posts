// Catálogo Pata de Veludo — foco gatos / brinquedos
window.PV_DATA = {
  categories: [
    { id: "brincar", label: "Brincar", emoji: "play", desc: "Caça, salto e curiosidade" },
    { id: "descansar", label: "Descansar", emoji: "sleep", desc: "Toca, ninho e calor" },
    { id: "hidratar", label: "Hidratar", emoji: "water", desc: "Fontes e bebedouros" },
    { id: "passear", label: "Passear", emoji: "travel", desc: "Mochilas, transporte e janelas" },
    { id: "cuidar", label: "Cuidar", emoji: "groom", desc: "Higiene, pelo e arranhador" }
  ],
  collections: [
    {
      id: "club-caca",
      title: "Clube da caça",
      tagline: "Para o gato que finge ser pantera às 3 da manhã",
      bg: "coral"
    },
    {
      id: "rotina-zen",
      title: "Rotina zen",
      tagline: "Hidratação, descanso e silêncio (para vocês dois)",
      bg: "pink"
    },
    {
      id: "primeiro-gato",
      title: "Primeiro gato",
      tagline: "O kit essencial para os primeiros 30 dias em casa",
      bg: "cream"
    }
  ],
  products: [
    {
      id: "ratinho-eletro",
      name: "Ratinho elétrico Picapau",
      tagline: "Corre, vira e desafia o instinto.",
      price: 89.9,
      old: 129.9,
      cat: "brincar",
      colorways: ["#ed6058", "#2a1612", "#f2c98a"],
      tag: "Mais caçado",
      story: "Sensor de toque que muda o trajeto a cada vez. Ele nunca decora — e seu gato também nunca cansa.",
      specs: ["Recarregável USB-C", "Autonomia 4h", "Modo noite silencioso"]
    },
    {
      id: "varinha-pluma",
      name: "Varinha Pluma da Sereia",
      tagline: "Penas naturais, fio de elástico macio.",
      price: 49.9,
      cat: "brincar",
      colorways: ["#fcebf1", "#ed6058"],
      tag: "Favorito da casa",
      story: "Cabo de bambu leve, penas trocáveis. Acabou a pena? A gente manda refil pelo Correio em envelope rosa.",
      specs: ["Cabo 60cm", "3 plumas inclusas", "Refil disponível"]
    },
    {
      id: "tunel-veludo",
      name: "Túnel Veludo Macio",
      tagline: "Esconder. Atacar. Repetir.",
      price: 119.9,
      cat: "brincar",
      colorways: ["#ed6058", "#fcebf1", "#fdfedf"],
      tag: "Novidade",
      story: "Dois metros de túnel dobrável forrado em pelúcia. Faz o barulho de papel amassado por dentro — irresistível.",
      specs: ["2m × 25cm", "Dobrável", "Lavável à mão"]
    },
    {
      id: "bola-pena",
      name: "Bola Pena de Outono",
      tagline: "A gravidade fica do lado do gato.",
      price: 24.9,
      cat: "brincar",
      colorways: ["#ed6058", "#f2c98a", "#fcebf1"],
      tag: "Pack com 6",
      story: "Seis bolinhas de feltro com pena central. Voam, rolam e somem embaixo da geladeira — como manda a tradição.",
      specs: ["Feltro 100% lã", "Sem cola", "Pack 6 unidades"]
    },
    {
      id: "puzzle-camarao",
      name: "Puzzle Camarão Curioso",
      tagline: "Comer com a cabeça (literalmente).",
      price: 159.9,
      cat: "brincar",
      colorways: ["#ed6058", "#fdfedf"],
      tag: "Enriquecimento",
      story: "Comedouro interativo em forma de camarão. Esconde ração em 7 níveis de dificuldade — desacelera a comida e ocupa a mente.",
      specs: ["7 níveis", "Antiderrapante", "BPA-free"],
      images: ["assets/puzzle-5.jpg", "assets/puzzle-2.jpg", "assets/puzzle-3.jpg", "assets/puzzle-1.png", "assets/puzzle-4.jpg"]
    },
    {
      id: "fonte-petala",
      name: "Fonte Pétala silenciosa",
      tagline: "Água em movimento, ronronar em paz.",
      price: 229.0,
      cat: "hidratar",
      colorways: ["#fcebf1", "#fdfedf", "#ed6058"],
      tag: "Best-seller",
      story: "Motor magnético quase inaudível, 2,5L, três modos de fluxo. Cerâmica leitosa por fora, filtro de carvão por dentro.",
      specs: ["2,5L", "USB-C", "Filtro trocável"]
    },
    {
      id: "ninho-pao",
      name: "Ninho Pão Quentinho",
      tagline: "Cama redonda de bordas altas.",
      price: 189.0,
      cat: "descansar",
      colorways: ["#ed6058", "#fcebf1", "#2a1612"],
      tag: "Edição limitada",
      story: "Estofado em bouclê encorpado, base antiderrapante, miolo de espuma de alta densidade. Faz o gato virar pãozinho.",
      specs: ["Ø 55cm", "Lavável", "Bouclê reciclado"]
    },
    {
      id: "arranhador-onda",
      name: "Arranhador Onda",
      tagline: "Curva que convida a esticar.",
      price: 139.0,
      cat: "cuidar",
      colorways: ["#fdfedf", "#ed6058"],
      tag: "Recarga inclusa",
      story: "Papelão prensado de alta densidade em curva ergonômica. Vem com sachê de catnip e uma carta escrita à mão.",
      specs: ["62 × 25cm", "Catnip incluso", "Recarga vendida à parte"]
    },
    {
      id: "mochila-bolha",
      name: "Mochila Bolha de Sabão",
      tagline: "Transporte com vista panorâmica.",
      price: 349.0,
      cat: "passear",
      colorways: ["#fcebf1", "#fdfedf"],
      tag: "Aprovado vet",
      story: "Bolha de policarbonato com ventilação cruzada, alças acolchoadas, base removível para lavar. Cabe gato até 7kg.",
      specs: ["Até 7kg", "Ventilação 360°", "Base removível"]
    },
    {
      id: "torre-arranhador-luxo",
      name: "Torre Arranhador Veludo",
      tagline: "Três níveis pra reinar.",
      price: 459.9,
      old: 759.9,
      cat: "descansar",
      colorways: ["#ed6058", "#fcebf1", "#2a1612"],
      tag: "−40%",
      story: "Torre arranhador em sisal natural com três plataformas, cabine forrada em pelúcia e brinquedo suspenso. Estrutura reforçada para gatos grandes.",
      specs: ["1,20m altura", "Sisal natural", "Até 8kg por nível"]
    },
    {
      id: "tunel-3-saidas",
      name: "Túnel Triplo Aventura",
      tagline: "Três saídas, infinitas emboscadas.",
      price: 129.9,
      old: 189.0,
      cat: "brincar",
      colorways: ["#ed6058", "#fdfedf", "#fcebf1"],
      tag: "Best-seller",
      story: "Túnel modular em formato Y com três entradas. Tecido crepitante por dentro, dobrável em segundos. Combina com mais túneis pra criar labirintos.",
      specs: ["3 saídas", "Dobrável", "Tecido crepitante"]
    },
    {
      id: "varinha-laser-recarregavel",
      name: "Varinha Laser Cometa",
      tagline: "Ponto vermelho, instinto roxo.",
      price: 39.9,
      old: 89.9,
      cat: "brincar",
      colorways: ["#ed6058", "#2a1612"],
      tag: "−55%",
      story: "Laser recarregável USB-C com 3 padrões (ponto, peixe, estrela). Cabo leve, botão silencioso, autonomia de 6 horas de caçada.",
      specs: ["USB-C", "3 padrões", "Autonomia 6h"]
    },
    {
      id: "bolinhas-crocantes",
      name: "Bolinhas Crocantes",
      tagline: "Pack com 12. Some uma, ainda sobram 11.",
      price: 32.4,
      old: 35.9,
      cat: "brincar",
      colorways: ["#fcebf1", "#ed6058", "#fdfedf"],
      tag: "Pack 12",
      story: "Doze bolinhas leves de papel reciclado prensado. Fazem barulho de papel amassado, voam longe e custam quase nada — porque vão sumir embaixo do sofá mesmo.",
      specs: ["Pack 12 unidades", "Papel reciclado", "Sem corantes"]
    }
  ],
  kits: [
    {
      id: "kit-primeiro-gato",
      name: "Kit Primeiro Gato",
      items: ["Fonte Pétala", "Ninho Pão", "Arranhador Onda", "Varinha Pluma"],
      price: 549.0,
      old: 657.8,
      desc: "Tudo o que o gato precisa nos primeiros 30 dias. Embalado em caixa-presente."
    },
    {
      id: "kit-caca-noturna",
      name: "Kit Caça Noturna",
      items: ["Ratinho elétrico", "Túnel Veludo", "Bola Pena ×6"],
      price: 219.0,
      old: 234.7,
      desc: "Para o gato que acorda a casa às 3:47. Cansa antes da meia-noite."
    },
    {
      id: "kit-rotina-zen",
      name: "Kit Rotina Zen",
      items: ["Fonte Pétala", "Puzzle Camarão", "Catnip artesanal"],
      price: 389.0,
      old: 443.8,
      desc: "Hidratação contínua, alimentação desacelerada, mente ocupada."
    }
  ],
  reviews: [
    { who: "Marina e o Quindim", city: "São Paulo", text: "A fonte chegou em uma caixa rosa com um bilhete escrito à mão. O Quindim deitou em cima da caixa antes de testar a fonte. Aprovado por ele e por mim.", rating: 5 },
    { who: "Beto e a Mafalda", city: "Curitiba", text: "Comprei o Kit Caça Noturna achando que era enrolação. Dormi a noite toda pela primeira vez em meses.", rating: 5 },
    { who: "Lia, Tofu e Pipoca", city: "Recife", text: "Dois gatos brigando pelo mesmo ninho. Tive que comprar o segundo. Vocês são culpadas.", rating: 5 }
  ]
};
