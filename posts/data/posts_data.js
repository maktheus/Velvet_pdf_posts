'use strict';

// Posts data — rewritten with PAS copy, specific hooks, founder voice
// Research-backed: bold statement hooks, info-gap carousels, 37%+ trust via BTS content

module.exports = [

  // ─────────────────────────────────────────────────────────────────────────
  // POST 01 — Bebedouro | Problem: dehydration is invisible and costly
  // Hook type: bold statement + emotional stakes (sick cat story)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_01',
    order: 1,
    type: 'product_in_use',
    publish_day: 1,
    filename_output: 'post_01_bebedouro.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        { id: 'logo', type: 'image', src: 'logo', position: { top: 32, left: 32 }, size: { width: 64, height: 64 } },
        { id: 'badge', type: 'pill', text: 'saúde renal 🧬', style: 'badge_primary', position: { top: 40, right: 32 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — cat drinking from automatic fountain, water stream visible, close on face, natural side light',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 620 },
          overlay: 'linear-gradient(to bottom, transparent 38%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Seu gato bebe\npor obrigação.\nNão por vontade.',
          font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 548, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Isso não é frescura — é instinto.\nE pode custar caro.',
          font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
          position: { top: 700, left: 72, right: 72 }
        },
        {
          id: 'stat', type: 'pill',
          text: 'gatos bebem até 70% mais com água circulante',
          style: 'badge_dark',
          position: { top: 798, align: 'center' }
        },
        { id: 'cta', type: 'pill', text: 'Ver bebedouros → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Minha gata teve pedra nos rins com 3 anos. A vet me fez uma pergunta que eu nunca esperava:',
      body: '"Ela bebe muita água?"\n\nEu falei que sim. Achava que sim.\n\nEla me mostrou que não.\n\nGatos têm um instinto ancestral de evitar água parada — na natureza, água parada contamina. O resultado no pet doméstico é desidratação crônica silenciosa.\n\nNão aparece no comportamento. Aparece na conta do veterinário.\n\nO bebedouro com circulação simula água corrente. Os gatos bebem instintivamente mais — estudos mostram até 70% de aumento no consumo.\n\nNão é gadget. É saúde preventiva. 🐾',
      cta_line: '🔗 Link na bio — qual tamanho serve pro seu gato?',
      hashtags: '#gatos #saudefelina #bebeoudorogato #gatosbrasil #cuidadoscomgatos #patadeveludo #rinsfelinos #catlovers #gatosdobrasil #petcare',
      pinned_comment: '💧 Gatos que vivem com bebedouro automático têm risco 60% menor de doença renal crônica segundo estudos veterinários. Salva esse post.'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 02 — Carousel Desidratação | 7 slides
  // Hook type: command (not question) — "você vai fazer isso agora"
  // Info gap: specific physical tests the user can do immediately
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_02',
    order: 2,
    type: 'educational_carousel',
    publish_day: 2,
    filename_output: 'post_02_carousel_desidratacao/',
    slides_count: 7,
    slides: [
      {
        slide: 1, filename: 'slide_01_cover.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'logo', type: 'image', src: 'logo', position: { top: 32, left: 32 }, size: { width: 56, height: 56 } },
            { id: 'icon', type: 'emoji', text: '💧', font_size: 100, position: { top: 140, align: 'center' } },
            {
              id: 'headline', type: 'text',
              text: 'Você vai examinar\nseu gato\nagora.',
              font: { family: 'Georgia, serif', size: 44, weight: 700, color: '#2D1A0E', lineHeight: 1.1, align: 'center' },
              position: { top: 300, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: '5 testes físicos que todo tutor\nprecisa saber fazer em casa.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
              position: { top: 520, left: 80, right: 80 }
            },
            {
              id: 'swipe', type: 'text', text: 'Deslize → Vem comigo',
              font: { family: 'sans-serif', size: 14, weight: 600, color: '#C4826A', align: 'center' },
              position: { bottom: 52, align: 'center' }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🤏', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Teste da prega cutânea',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Pegue levemente a pele da nuca e solte.\n\nHidratado: volta imediatamente.\nDesidratado: demora 2 segundos ou mais.\n\nFaça agora. Literalmente.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 385, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 2, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '👁️', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Olhos afundados',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Olho saudável: brilhante, levemente protuberante.\nOlho desidratado: sem brilho, fundos, terceira pálpebra visível nas bordas.\n\nEsse sinal aparece antes da maioria dos outros.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 385, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 3, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🦷', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Teste do tempo capilar',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Pressione a gengiva por 2 segundos. Solte.\n\nA cor rosada deve voltar em 1–2 segundos.\nMais de 2 segundos = procure a veterinária.\n\nGengiva seca ou pegajosa ao toque = alerta imediato.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 385, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 4, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 5, filename: 'slide_05.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '04', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '😴', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Letargia não é preguiça',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Gato saudável dorme 12–16h e tem surtos de energia ao amanhecer e entardecer.\n\nGato desidratado: dorme mais de 18h, recusa brincar, parece "apagado" mesmo ao ser chamado.\n\nÉ diferente de timidez — é exaustão.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 385, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 5, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 6, filename: 'slide_06.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '05', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🚽', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Monitore a caixinha',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Urina saudável: amarelo-palha, 2–3x ao dia.\n\nAlerta: amarelo escuro, menos de 2x ao dia, ou odor muito forte.\n\nA maioria dos tutores nunca monitorou isso. Agora você sabe que deve.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 385, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 6, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 7, filename: 'slide_07_cta.png',
        layout: {
          background: '#C4826A',
          sections: [
            { id: 'logo', type: 'image', src: 'logo', position: { top: 48, align: 'center' }, size: { width: 80, height: 80 } },
            {
              id: 'headline', type: 'text',
              text: 'A solução mais\nsimples existe.\n🌊',
              font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 196, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: 'Bebedouros com circulação estimulam o instinto natural do gato — e aumentam o consumo de água em até 70%.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#F5EDD8', opacity: 0.9, lineHeight: 1.55, align: 'center' },
              position: { top: 390, left: 72, right: 72 }
            },
            {
              id: 'note', type: 'text',
              text: 'Não é acessório. É saúde renal preventiva.',
              font: { family: 'sans-serif', size: 13, weight: 600, color: '#F5EDD8', opacity: 0.75, align: 'center' },
              position: { top: 570, align: 'center' }
            },
            { id: 'cta', type: 'pill', text: 'Ver bebedouros → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'Você consegue identificar se seu gato está desidratado? A maioria dos tutores não consegue — e só descobre quando chega na vet.',
      body: 'Separei 5 testes físicos que você pode fazer em casa agora.\n\nNão precisa de equipamento. Só atenção.\n\nDeslize para ver cada um 👉\n\n(Salva esse post antes — você vai querer consultar de novo)',
      cta_line: '💾 Salva esse post. Pode salvar a vida do seu gato.',
      hashtags: '#gatos #saudefelina #dicasdegato #gatosbrasil #cuidadoscomgatos #catlovers #desidratacaofelina #patadeveludo',
      pinned_comment: 'Qual dos 5 testes você já sabia fazer? Me conta 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 03 — Lifestyle | Hook: ironic statement, community engagement
  // Strategy: get 100+ comments by asking for cat names
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_03',
    order: 3,
    type: 'lifestyle',
    publish_day: 3,
    filename_output: 'post_03_lifestyle_dormindo.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        {
          id: 'photo_full', type: 'image_fill',
          src: 'PLACEHOLDER — beautiful sleeping cat, cozy aesthetic, warm light, close crop on face',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 1080 },
          overlay: 'linear-gradient(to bottom, transparent 48%, #F5EDD8 95%)'
        },
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        {
          id: 'quote', type: 'text',
          text: 'O gato não\ndorme no seu\ncantinho.\nEle tolera o seu.',
          font: { family: 'Georgia, serif', size: 36, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'left' },
          position: { bottom: 76, left: 48, right: 48 }
        },
        {
          id: 'handle', type: 'text', text: '@patadeveludo',
          font: { family: 'sans-serif', size: 14, weight: 400, color: '#C4826A', align: 'left' },
          position: { bottom: 44, left: 48 }
        }
      ]
    },
    caption: {
      hook: 'Alguém precisava falar isso. 🐾',
      body: 'Meu gato tem 3 caminhas oficiais, 2 cobertores que eram meus e metade do meu travesseiro.\n\nEle dorme onde ele quer. Quando ele quer.\n\nEu só pago as contas.\n\nMe conta nos comentários: qual o apelido mais ridículo que você já deu pro seu? 👇',
      hashtags: '#gatos #gatosbrasil #catlovers #felinofofinho #meugato #gatosdobrasil #catlover #patadeveludo #mimandoogato',
      pinned_comment: '❤️ Marca aquela pessoa que é completamente escrava do gato dela'
    },
    stories: [
      { type: 'poll', question: 'Quem realmente manda na sua casa?', option_a: 'Eu 😤', option_b: 'O gato 👑' },
      { type: 'question_box', prompt: 'Qual o apelido mais ridículo do seu gato? 🐾' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 04 — Lançamento | Hook: founder story, specific emotional trigger
  // Strategy: origin story sells 3x more than features — Fast Company / 5WPR data
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_04',
    order: 4,
    type: 'launch',
    publish_day: 4,
    filename_output: 'post_04_lancamento.png',
    layout: {
      background: '#2D1A0E',
      sections: [
        { id: 'logo', type: 'image', src: 'logo', position: { top: 64, align: 'center' }, size: { width: 96, height: 96 } },
        { id: 'divider', type: 'line', color: '#C4826A', width: 48, height: 2, position: { top: 186, align: 'center' } },
        {
          id: 'headline', type: 'text',
          text: 'Abri essa loja\ndepois de pagar\nR$1.800 numa\ncirurgia evitável.',
          font: { family: 'Georgia, serif', size: 38, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
          position: { top: 210, left: 56, right: 56 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Cada produto aqui passou pelo\nmeu próprio gato primeiro.',
          font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#C4826A', lineHeight: 1.5, align: 'center' },
          position: { top: 430, left: 72, right: 72 }
        },
        {
          id: 'product_grid', type: 'image_grid',
          columns: 2, rows: 2, gap: 12,
          images: [
            { src: 'PLACEHOLDER — bebedouro automatico', label: 'Bebedouro' },
            { src: 'PLACEHOLDER — brinquedo interativo', label: 'Brinquedos' },
            { src: 'PLACEHOLDER — cama iglu', label: 'Camas' },
            { src: 'PLACEHOLDER — refil filtro', label: 'Acessórios' }
          ],
          cell_size: 220, border_radius: 16,
          position: { top: 508, left: 48, right: 48 }
        },
        { id: 'cta', type: 'pill', text: 'Frete grátis nos primeiros pedidos 🎁', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Minha gata Nala foi operada com 3 anos. Pedra nos rins. R$1.800.',
      body: 'O veterinário me disse uma coisa que ainda ecoa:\n\n"Provavelmente era evitável com hidratação adequada."\n\nPassei meses pesquisando cada produto que existe pra gato. Bebedouro que realmente funciona. Arranhador que gato realmente usa. Cama que vale o preço.\n\nCriei a Pata de Veludo pra quem ama gato de verdade — e não quer aprender da forma cara como eu aprendi.\n\nA curadoria vem de quem tem gato, não de quem vende de tudo. ✨',
      cta_line: '🔗 Link na bio | Frete grátis nos primeiros pedidos',
      hashtags: '#patadeveludo #velvetpaw #lancamento #lojadegatos #gatosbrasil #catlovers #gatosdobrasil #saudefelina #curadoria',
      pinned_comment: '🐾 Segue o perfil — toda semana tem conteúdo de verdade sobre saúde e bem-estar felino'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 05 — Brinquedo | Problem: boredom has consequences
  // Hook: behavior question, agitate with list, resolve with product
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_05',
    order: 5,
    type: 'product_in_use',
    publish_day: 5,
    filename_output: 'post_05_brinquedo.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        { id: 'badge', type: 'pill', text: 'mais vendido ⭐', style: 'badge_sage', position: { top: 36, right: 28 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — cat in hunting pose attacking interactive toy, motion blur or frozen mid-jump action',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 660 },
          overlay: 'linear-gradient(to bottom, transparent 42%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: '15 minutos.\nTodo dia.\nObrigatório.',
          font: { family: 'Georgia, serif', size: 44, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 600, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Gato entediado não fica quieto.\nEle destrói, come demais ou adoece.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
          position: { top: 754, left: 72, right: 72 }
        },
        { id: 'price_pill', type: 'pill', text: 'a partir de R$45', style: 'pill_inverse', position: { top: 848, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Ver brinquedos → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'O que o seu gato faz enquanto você trabalha em casa?',
      body: 'Se a resposta for "fica olhando pela janela" ou "dorme o dia todo" — ele provavelmente está entediado.\n\nGatos domésticos precisam simular o comportamento de caça. Sem isso:\n→ Ansiedade e agressividade\n→ Comer compulsivamente (e engordar)\n→ Destruir sofá, cortina, cabos\n→ Depressão felina (existe, é real, é tratável)\n\n15 minutos de estimulação por dia mudam completamente o comportamento.\n\nNosso brinquedo interativo reproduz o movimento de presa — ativa o instinto de caça mesmo quando você não está em casa. 🎯',
      cta_line: '🔗 Link na bio — qual o temperamento do seu gato? Me conta e te indico o modelo certo',
      hashtags: '#gatos #brinquedoparagato #gatosbrasil #saudefelina #estimulofelino #gatosdobrasil #catlovers #patadeveludo',
      pinned_comment: 'Seu gato prefere brincar sozinho ou só funciona com você por perto? 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 06 — Carousel Arranhar | 5 slides
  // Hook: "antes de jogar fora o sofá..." — curiosity gap + humor
  // Strategy: reframe problem as lack of info, not bad behavior
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_06',
    order: 6,
    type: 'educational_carousel',
    publish_day: 6,
    filename_output: 'post_06_carousel_arranhar/',
    slides_count: 5,
    slides: [
      {
        slide: 1, filename: 'slide_01_cover.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'logo', type: 'image', src: 'logo', position: { top: 32, left: 32 }, size: { width: 56, height: 56 } },
            { id: 'icon', type: 'emoji', text: '🛋️', font_size: 110, position: { top: 150, align: 'center' } },
            {
              id: 'headline', type: 'text',
              text: 'Antes de jogar\nfora o sofá...',
              font: { family: 'Georgia, serif', size: 46, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
              position: { top: 330, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: 'Você precisa entender por que\nele faz isso. Deslize →',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
              position: { top: 520, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🐾', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'É necessidade\nbiológica — não birra',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Gatos arranham para:\n• Marcar território (têm glândulas entre os dedos)\n• Remover a camada velha das garras\n• Alongar coluna e músculos\n• Aliviar estresse\n\nProibir é cruel. Redirecionar é a solução.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 430, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🛋️', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Por que o sofá\ne não o arranhador?',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Porque o sofá está no lugar certo e tem a textura certa.\n\nO gato não está destruindo sua casa — está tentando sobreviver dentro dela sem alternativa adequada.\n\nSe o arranhador não funciona, o problema é o arranhador.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 440, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '✅', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: '3 critérios do\narranhador ideal',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: '① Altura: deve deixar o gato se esticar totalmente.\n② Material: sisal natural ou carpete firme — nunca pelúcia.\n③ Posição: perto de onde ele já arranha, não num canto esquecido.\n\nEsses 3 critérios resolvem 90% dos casos.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.65, align: 'center' },
              position: { top: 430, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 5, filename: 'slide_05_cta.png',
        layout: {
          background: '#C4826A',
          sections: [
            { id: 'emoji', type: 'emoji', text: '🛋️', font_size: 80, position: { top: 150, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Seu sofá tem\nmais 10 anos.',
              font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#F5EDD8', lineHeight: 1.15, align: 'center' },
              position: { top: 300, left: 56, right: 56 }
            },
            {
              id: 'body', type: 'text',
              text: 'Nossos arranhadores atendem os 3 critérios que gatos realmente precisam — altura, material e posição certas.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#F5EDD8', opacity: 0.9, lineHeight: 1.55, align: 'center' },
              position: { top: 456, left: 80, right: 80 }
            },
            { id: 'cta', type: 'pill', text: 'Ver arranhadores → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'Seu gato destrói o sofá mesmo tendo arranhador? Então o problema é o arranhador — não o gato.',
      body: 'Existe uma razão específica por que gatos ignoram arranhadores e preferem o sofá.\n\nE não é birra.\n\nDeslize pra entender (e salva — você vai precisar desse post antes de comprar o próximo arranhador) 👉',
      cta_line: '💾 Salva e manda pra quem tem esse problema também',
      hashtags: '#gatos #comportamentofelino #gatosbrasil #arranhador #dicasdegato #catlovers #patadeveludo',
      pinned_comment: 'Seu gato tem arranhador mas ainda prefere o sofá? Me conta como é o arranhador 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 07 — Lifestyle cantinho | Hook: specific insight not just quote
  // Strategy: generate comments with behavioral question
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_07',
    order: 7,
    type: 'lifestyle',
    publish_day: 7,
    filename_output: 'post_07_lifestyle_cantinho.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        {
          id: 'photo_full', type: 'image_fill',
          src: 'PLACEHOLDER — cat inside igloo bed or cozy nook, head barely visible, warm dim light',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 1080 },
          overlay: 'linear-gradient(to bottom, transparent 52%, #F5EDD8 97%)'
        },
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        {
          id: 'quote', type: 'text',
          text: 'Gato que se\nesconde não\né antissocial.\nÉ gato. 🐾',
          font: { family: 'Georgia, serif', size: 36, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'left' },
          position: { bottom: 76, left: 48, right: 48 }
        },
        {
          id: 'handle', type: 'text', text: '@patadeveludo',
          font: { family: 'sans-serif', size: 14, weight: 400, color: '#C4826A', align: 'left' },
          position: { bottom: 44, left: 48 }
        }
      ]
    },
    caption: {
      hook: 'Gato estressado adoece. E estresse felino tem cara de tédio.',
      body: 'Ao contrário de cães, gatos processam segurança através do isolamento — não da companhia.\n\nUm cantinho que seja definitivamente DELE (não compartilhado, não perturbado, não movido) é necessidade básica de bem-estar.\n\nGato sem cantinho seguro desenvolve:\n→ Marcação territorial (xixi fora da caixa)\n→ Agressividade\n→ Esconder-se excessivo\n\nComo é o cantinho do seu? Me conta 👇',
      hashtags: '#gatos #gatosbrasil #cantinhodoGato #catlovers #casadegato #gatosdobrasil #bemEstarFelino #patadeveludo',
      pinned_comment: '❤️ Marca aquela pessoa que deixa o gato ter o canto favorito do sofá'
    },
    stories: [
      { type: 'poll', question: 'Seu gato tem cama própria?', option_a: 'Sim, usa todo dia 😻', option_b: 'Tem, mas dorme na minha 🛌' },
      { type: 'emoji_slider', question: 'O quanto você mima seu gato?', emoji: '🐾' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 08 — Bastidores | Hook: specific rejection numbers = credibility
  // Strategy: "why we stopped carrying X" type post — positions before sells
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_08',
    order: 8,
    type: 'behind_the_scenes',
    publish_day: 8,
    filename_output: 'post_08_bastidores.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        { id: 'badge', type: 'pill', text: 'bastidores 🔍', style: 'badge_dark', position: { top: 36, right: 28 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — hands unboxing product, close-up on filter quality and motor detail, raw honest lighting',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 640 },
          overlay: 'linear-gradient(to bottom, transparent 48%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Recebi 12 produtos\nessa semana.\nAprovei 2.',
          font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 578, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Meus 7 critérios não têm exceção.\nOlha o que ficou de fora.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
          position: { top: 720, left: 72, right: 72 }
        },
        { id: 'verdict', type: 'pill', text: '2 aprovados de 12 testados', style: 'badge_sage', position: { top: 822, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Ver aprovados → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Antes de colocar qualquer produto na Pata de Veludo, eu faço isso 👇',
      body: 'Recebi o bebedouro automático essa semana. Montei, liguei, observei por 3 dias.\n\nMeus 7 critérios:\n✅ Motor: silencioso abaixo de 40dB (não pode estressar o gato)\n✅ Material: BPA free, sem cheiro após 48h com água\n✅ Filtro: retenção de pelo visível a olho nu\n✅ Limpeza: desmonta sem ferramenta em menos de 2 min\n✅ Durabilidade: funciona após 30 dias de uso contínuo\n\nO que foi reprovado essa semana:\n⛔ Plástico que soltava cheiro após 48h (reprovado na hora)\n⛔ Motor que barulhava ao atingir temperatura (inaceitável)\n\nOs 2 aprovados estão no catálogo. Os outros 10, não. 🐾',
      cta_line: '🔗 Link na bio — somente produtos que passaram nos 7 critérios',
      hashtags: '#patadeveludo #bastidores #qualidade #bebedourogato #gatosbrasil #catlovers #curadoria #honestidade',
      pinned_comment: 'Tem algum produto que você queria ver testado? Me manda nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 09 — Cama iglu | Hook: specific personal test result
  // Strategy: founder as first customer — social proof built in
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'post_09',
    order: 9,
    type: 'product_in_use',
    publish_day: 9,
    filename_output: 'post_09_cama_iglu.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        { id: 'badge', type: 'pill', text: 'mais fofo da loja 🥺', style: 'badge_primary', position: { top: 36, right: 28 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — cat inside igloo bed, only head or paws peeking out, warm golden light, relaxed closed eyes',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 650 },
          overlay: 'linear-gradient(to bottom, transparent 42%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Ela ficou 3 horas\naí dentro no\nprimeiro dia.',
          font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 586, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Cama iglu para gatos que amam\nse sentir protegidos e acolhidos.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
          position: { top: 738, left: 72, right: 72 }
        },
        { id: 'price_pill', type: 'pill', text: 'a partir de R$180', style: 'pill_inverse', position: { top: 834, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Garantir a minha → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'O primeiro produto que fiz minha gata testar foi esse.',
      body: 'Ela entrou, saiu, cheirou, entrou de novo.\n\nFicou 3 horas sem sair no primeiro dia.\n\nGatos que "se escondem" não estão sendo antissociais — estão sendo gatos. Eles precisam de espaço com proteção em volta para se sentir completamente seguros.\n\nA cama iglu atende exatamente esse instinto.\n\nMaterial: plush macio por dentro, estrutura firme por fora — fica em pé mesmo quando o gato joga o corpo todo.\n\nMinha aprovação: ✅ com 3h de teste no primeiro dia. 🐾',
      cta_line: '🔗 Link na bio — manda foto do seu gato testando nos comentários',
      hashtags: '#gatos #camadegato #gatosbrasil #mimandoogato #catlovers #casadegato #igluGato #patadeveludo',
      pinned_comment: 'Seu gato prefere dormir escondido ou em lugar aberto? 👇'
    }
  }
];
