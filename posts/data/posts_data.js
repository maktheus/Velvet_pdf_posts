'use strict';

module.exports = [
  // ─────────────────────────────────────────
  // POST 01 — Bebedouro (product_in_use)
  // ─────────────────────────────────────────
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
        { id: 'badge', type: 'pill', text: 'saúde felina 🐾', style: 'badge_primary', position: { top: 40, right: 32 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — cat drinking from automatic fountain, natural light, close on face',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 650 },
          overlay: 'linear-gradient(to bottom, transparent 40%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Seu gato bebe\nágua parada?',
          font: { family: 'Georgia, serif', size: 44, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 580, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Isso pode causar problemas renais.\nNosso bebedouro resolve. 🌊',
          font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.55, align: 'center' },
          position: { top: 710, left: 64, right: 64 }
        },
        { id: 'cta', type: 'pill', text: 'Link na bio', style: 'pill_cta', position: { bottom: 48, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Seu gato bebe água parada? Isso pode estar prejudicando a saúde dele 🚨',
      body: 'Gatos têm instinto de evitar água parada — na natureza, água parada pode estar contaminada.\n\nO resultado? Eles bebem menos do que deveriam e ficam cronicamente desidratados.\n\nNosso bebedouro automático com filtro simula água corrente e estimula o gato a beber muito mais. 🌊\n\nSeu gato vai amar. Os rins dele também. 🐾',
      cta_line: '🔗 Link na bio para garantir o seu',
      hashtags: '#gatos #gatosbrasil #catlovers #saudefelina #bebedourogato #cuidadoscomgatos #gatosdobrasil #petlovers #patadeveludo #velvetpaw',
      pinned_comment: '💧 Bebedouros automáticos reduzem o risco de pedras nos rins e infecções urinárias em gatos — sabia? Salva esse post!'
    }
  },

  // ─────────────────────────────────────────
  // POST 02 — Carousel Desidratação (7 slides)
  // ─────────────────────────────────────────
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
            { id: 'icon', type: 'emoji', text: '💧', font_size: 120, position: { top: 160, align: 'center' } },
            {
              id: 'headline', type: 'text',
              text: '5 sinais que seu\ngato está\ndesidratado 😱',
              font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'center' },
              position: { top: 340, left: 56, right: 56 }
            },
            {
              id: 'swipe', type: 'text', text: 'Deslize para ver →',
              font: { family: 'sans-serif', size: 14, weight: 500, color: '#C4826A', align: 'center' },
              position: { bottom: 56, align: 'center' }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🤏', font_size: 72, position: { top: 180, align: 'center' } },
            { id: 'title', type: 'text', text: 'Pele sem elasticidade', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 310, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Belisque levemente a pele da nuca.\nSe demorar pra voltar ao normal,\nseu gato pode estar desidratado.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 400, left: 80, right: 80 } },
            { id: 'progress', type: 'progress_dots', total: 7, active: 2, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '👁️', font_size: 72, position: { top: 180, align: 'center' } },
            { id: 'title', type: 'text', text: 'Olhos fundos e opacos', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 310, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Olhos saudáveis são brilhantes.\nOlhos sem brilho e levemente\nafundados indicam falta de água.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 400, left: 80, right: 80 } },
            { id: 'progress', type: 'progress_dots', total: 7, active: 3, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🦷', font_size: 72, position: { top: 180, align: 'center' } },
            { id: 'title', type: 'text', text: 'Gengiva seca ou pegajosa', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 310, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Toque a gengiva com o dedo.\nDeve estar úmida e escorregadia.\nSeca = sinal de alerta.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 400, left: 80, right: 80 } },
            { id: 'progress', type: 'progress_dots', total: 7, active: 4, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 5, filename: 'slide_05.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '04', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '😴', font_size: 72, position: { top: 180, align: 'center' } },
            { id: 'title', type: 'text', text: 'Letargia e pouca energia', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 310, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Gato que não quer brincar, dorme\no dia todo ou parece apático pode\nestar desidratado.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 400, left: 80, right: 80 } },
            { id: 'progress', type: 'progress_dots', total: 7, active: 5, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 6, filename: 'slide_06.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '05', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🚽', font_size: 72, position: { top: 180, align: 'center' } },
            { id: 'title', type: 'text', text: 'Urina escura ou menos frequente', font: { family: 'Georgia, serif', size: 32, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 310, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Urina muito amarela ou idas raras à\ncaixinha são sinais de que seu gato\nprecisa de mais água.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 420, left: 80, right: 80 } },
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
              id: 'headline', type: 'text', text: 'A solução mais\nsimples? 🌊',
              font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 200, left: 56, right: 56 }
            },
            {
              id: 'subheadline', type: 'text',
              text: 'Um bebedouro com fluxo contínuo faz\nseu gato beber até 40% mais água.',
              font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#F5EDD8', opacity: 0.88, lineHeight: 1.55, align: 'center' },
              position: { top: 380, left: 80, right: 80 }
            },
            { id: 'cta', type: 'pill', text: 'Ver bebedouros → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'Seu gato bebe pouca água? Pode estar te dando sinais que você não reconhece 👇',
      body: 'A maioria dos tutores só descobre que o gato estava desidratado quando vai ao veterinário.\n\nMas existem 5 sinais que você pode observar em casa — agora mesmo.\n\nDeslize para ver todos 👉',
      cta_line: '💾 Salva esse post — você vai precisar dele',
      hashtags: '#gatos #saudefelina #dicasdegato #gatosbrasil #cuidadoscomgatos #catlovers #gatosdobrasil #petcare #patadeveludo',
      pinned_comment: 'Qual sinal você nunca tinha percebido? Me conta nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────
  // POST 03 — Lifestyle dormindo
  // ─────────────────────────────────────────
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
          src: 'PLACEHOLDER — beautiful sleeping cat, cozy aesthetic, warm light',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 1080 },
          overlay: 'linear-gradient(to bottom, transparent 50%, #F5EDD8 96%)'
        },
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        {
          id: 'quote', type: 'text',
          text: 'Não é teu gato.\nTu és do gato. 🐾',
          font: { family: 'Georgia, serif', size: 38, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'left' },
          position: { bottom: 80, left: 48, right: 48 }
        },
        {
          id: 'handle', type: 'text', text: '@patadeveludo',
          font: { family: 'sans-serif', size: 14, weight: 400, color: '#C4826A', align: 'left' },
          position: { bottom: 44, left: 48 }
        }
      ]
    },
    caption: {
      hook: 'Não é teu gato. Tu és do gato. 🐾',
      body: 'E a gente não reclama né?\n\nMe conta: como se chama o seu? 👇',
      hashtags: '#gatos #gatosbrasil #catlovers #felinofofinho #gatinhos #meugato #gatosdobrasil #catlover #patadeveludo',
      pinned_comment: '❤️ Marca aquela pessoa que definitivamente é escrava do gato dela'
    },
    stories: [
      { type: 'poll', question: 'Seu gato manda em você?', option_a: 'Sim 😂', option_b: 'Totalmente 👑' },
      { type: 'question_box', prompt: 'Me conta o nome do seu gato 🐾' }
    ]
  },

  // ─────────────────────────────────────────
  // POST 04 — Lançamento (dark bg)
  // ─────────────────────────────────────────
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
        { id: 'divider', type: 'line', color: '#C4826A', width: 40, height: 2, position: { top: 184, align: 'center' } },
        {
          id: 'headline', type: 'text', text: 'A Pata de Veludo\nchegouu 🐾',
          font: { family: 'Georgia, serif', size: 46, weight: 700, color: '#F5EDD8', lineHeight: 1.15, align: 'center' },
          position: { top: 210, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Produtos pensados pra quem\nama gato de verdade.',
          font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#C4826A', lineHeight: 1.5, align: 'center' },
          position: { top: 390, left: 64, right: 64 }
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
          position: { top: 490, left: 48, right: 48 }
        },
        { id: 'cta', type: 'pill', text: 'Frete grátis nos primeiros pedidos 🎁', style: 'pill_cta', position: { bottom: 48, align: 'center' } }
      ]
    },
    caption: {
      hook: 'A Pata de Veludo chegou! 🐾',
      body: 'Criamos uma loja pensada de verdade para quem ama gato.\n\nNão é qualquer produto — cada item passa pela nossa curadoria antes de entrar no catálogo.\n\nBebedouros automáticos, brinquedos interativos, camas premium e muito mais.\n\nPorque seu gato merece o melhor. E você sabe disso. ✨',
      cta_line: '🔗 Link na bio | Frete grátis nos primeiros pedidos',
      hashtags: '#patadeveludo #velvetpaw #lancamento #lojadegatos #gatosbrasil #produtosparaGatos #catlovers #gatosdobrasil #newstore #petlovers',
      pinned_comment: '🐾 Salva esse perfil — toda semana tem conteúdo novo sobre saúde e bem-estar felino!'
    }
  },

  // ─────────────────────────────────────────
  // POST 05 — Brinquedo (product_in_use)
  // ─────────────────────────────────────────
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
          src: 'PLACEHOLDER — cat in hunting pose attacking interactive toy, motion blur or frozen action',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 680 },
          overlay: 'linear-gradient(to bottom, transparent 45%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text', text: 'Modo caça\nativado. 🐾',
          font: { family: 'Georgia, serif', size: 46, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 610, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: '15 minutos de brincadeira por dia\nevitam depressão e ansiedade felina.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.55, align: 'center' },
          position: { top: 740, left: 64, right: 64 }
        },
        { id: 'price_pill', type: 'pill', text: 'a partir de R$45', style: 'pill_inverse', position: { top: 830, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Ver brinquedos → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Seu gato fica entediado em casa? Isso é mais sério do que parece 😿',
      body: 'Gatos precisam de estímulo mental e físico diariamente.\n\nSem isso: ansiedade, arranhões no sofá, comer demais, agressividade.\n\nNosso brinquedo interativo automático mantém ele ativo mesmo quando você não está em casa. 🎯\n\nO instinto de caça dele vai agradecer.',
      cta_line: '🔗 Link na bio — vários modelos disponíveis',
      hashtags: '#gatos #brinquedoparagato #gatosbrasil #saudefelina #gatosdobrasil #catlovers #estimulofelino #patadeveludo',
      pinned_comment: 'Seu gato prefere brincar sozinho ou só com você por perto? 👇'
    }
  },

  // ─────────────────────────────────────────
  // POST 06 — Carousel Arranhar (5 slides)
  // ─────────────────────────────────────────
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
            { id: 'icon', type: 'emoji', text: '🛋️', font_size: 120, position: { top: 160, align: 'center' } },
            {
              id: 'headline', type: 'text', text: 'Seu gato arranha\ntudo em casa? 🛋️',
              font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'center' },
              position: { top: 340, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text', text: 'Não é maldade — é necessidade.\nDeslize para entender →',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
              position: { top: 530, left: 64, right: 64 }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🐾', font_size: 72, position: { top: 200, align: 'center' } },
            { id: 'title', type: 'text', text: 'Arranhar é instinto,\nnão birra', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 330, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Gatos arranham para marcar território,\nalongar os músculos e remover a camada\nvelha das garras. É 100% natural.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 450, left: 80, right: 80 } }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🛋️', font_size: 72, position: { top: 200, align: 'center' } },
            { id: 'title', type: 'text', text: 'O problema real:\nfalta de opção', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 330, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Quando não tem um arranhador adequado,\no gato usa o que encontra. O sofá é\na melhor opção disponível para ele.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 460, left: 80, right: 80 } }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#F5EDD8',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.12, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '✅', font_size: 72, position: { top: 200, align: 'center' } },
            { id: 'title', type: 'text', text: 'A solução é simples', font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#2D1A0E', align: 'center' }, position: { top: 330, left: 64, right: 64 } },
            { id: 'body', type: 'text', text: 'Arranhador na altura certa, material\nque o gato prefere (sisal ou carpete)\ne posição estratégica na casa.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#5A3A22', lineHeight: 1.6, align: 'center' }, position: { top: 440, left: 80, right: 80 } }
          ]
        }
      },
      {
        slide: 5, filename: 'slide_05_cta.png',
        layout: {
          background: '#C4826A',
          sections: [
            { id: 'emoji', type: 'emoji', text: '🐾', font_size: 80, position: { top: 160, align: 'center' } },
            { id: 'title', type: 'text', text: 'Seu sofá agradece.', font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#F5EDD8', align: 'center' }, position: { top: 310, left: 56, right: 56 } },
            { id: 'body', type: 'text', text: 'Conheça nossos arranhadores premium —\ntamanho e material certos para\nqualquer gato.', font: { family: 'Georgia, serif', size: 20, weight: 400, color: '#F5EDD8', opacity: 0.88, lineHeight: 1.55, align: 'center' }, position: { top: 430, left: 80, right: 80 } },
            { id: 'cta', type: 'pill', text: 'Ver arranhadores → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'Seu gato destrói o sofá? A culpa não é dele — e tem solução 👇',
      body: 'Arranhar é um comportamento 100% natural e necessário para os gatos.\n\nO problema é quando não oferecemos a alternativa certa.\n\nDeslize para entender por que seu gato faz isso e como resolver de vez 👉',
      cta_line: '💾 Salva e manda pra quem precisa ver isso',
      hashtags: '#gatos #comportamentofelino #gatosbrasil #dicasdegato #arranhador #catlovers #patadeveludo',
      pinned_comment: 'Seu gato tem um arranhador mas ainda prefere o sofá? Me conta nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────
  // POST 07 — Lifestyle cantinho
  // ─────────────────────────────────────────
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
          src: 'PLACEHOLDER — cat inside igloo bed or cozy corner, warm light, clean home',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 1080 },
          overlay: 'linear-gradient(to bottom, transparent 55%, #F5EDD8 98%)'
        },
        { id: 'logo', type: 'image', src: 'logo', position: { top: 28, left: 28 }, size: { width: 56, height: 56 } },
        {
          id: 'quote', type: 'text',
          text: 'Cada gato merece\num cantinho\nsó dele. 🐾',
          font: { family: 'Georgia, serif', size: 36, weight: 700, color: '#2D1A0E', lineHeight: 1.2, align: 'left' },
          position: { bottom: 80, left: 48, right: 48 }
        },
        {
          id: 'handle', type: 'text', text: '@patadeveludo',
          font: { family: 'sans-serif', size: 14, weight: 400, color: '#C4826A', align: 'left' },
          position: { bottom: 44, left: 48 }
        }
      ]
    },
    caption: {
      hook: 'Cada gato merece um cantinho só dele. 🐾',
      body: 'Aquele lugar que é completamente dele — seguro, quentinho e aconchegante.\n\nSeu gato tem o cantinho ideal?\n\nMe conta nos comentários como é o espacinho do seu 👇',
      hashtags: '#gatos #gatosbrasil #catlovers #cantinhodoGato #casadegato #gatosdobrasil #felinofofinho #patadeveludo',
      pinned_comment: '❤️ Marca aquela pessoa que mimou demais o gato dela'
    },
    stories: [
      { type: 'poll', question: 'Seu gato tem cama própria?', option_a: 'Sim 😻', option_b: 'Dorme na minha 🛌' },
      { type: 'emoji_slider', question: 'O quanto você mima seu gato?', emoji: '🐾' }
    ]
  },

  // ─────────────────────────────────────────
  // POST 08 — Bastidores (behind_the_scenes)
  // ─────────────────────────────────────────
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
          src: 'PLACEHOLDER — hands opening product box, close-up on product quality and filter',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 660 },
          overlay: 'linear-gradient(to bottom, transparent 50%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text', text: 'Antes de vender,\neu testo. 🔍',
          font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 600, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Cada produto passa pela minha análise\nantes de entrar no catálogo.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.55, align: 'center' },
          position: { top: 730, left: 64, right: 64 }
        },
        { id: 'verdict', type: 'pill', text: '✅ APROVADO', style: 'badge_sage', position: { top: 840, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Link na bio — ver produtos aprovados', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Antes de colocar qualquer produto na Pata de Veludo, eu faço isso 👇',
      body: 'Recebi o bebedouro automático essa semana.\n\nAbri, montei, testei por 3 dias.\n\nO que eu avaliei:\n✅ Qualidade do motor — silencioso e potente\n✅ Filtro — retém pelos e partículas\n✅ Material — sem cheiro, BPA free\n✅ Fácil de lavar — importantíssimo\n\nVeredicto: APROVADO. Entrou no catálogo.\n\nSeu gato vai amar. 🐾',
      cta_line: '🔗 Link na bio para ver todos os produtos aprovados',
      hashtags: '#patadeveludo #bastidores #qualidade #bebedourogato #gatosbrasil #catlovers #honestidade #dropshipping',
      pinned_comment: 'Tem algum produto que você queria ver na loja? Me manda nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────
  // POST 09 — Cama iglu (product_in_use)
  // ─────────────────────────────────────────
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
          src: 'PLACEHOLDER — cat inside igloo bed, only head or paws visible, warm light, relaxed expression',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 660 },
          overlay: 'linear-gradient(to bottom, transparent 45%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text', text: 'Seu gato merece\nesse cantinho. 🐾',
          font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 600, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Cama premium estilo iglu — quentinha,\naconchegante e irresistível.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.55, align: 'center' },
          position: { top: 730, left: 64, right: 64 }
        },
        { id: 'price_pill', type: 'pill', text: 'a partir de R$180', style: 'pill_inverse', position: { top: 830, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Garantir a minha → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Esse é o produto que a gente compra e fica esperando ansioso pra ver a reação do gato 🥺',
      body: 'A cama iglu foi feita para gatos que amam se esconder e se sentir protegidos.\n\nMaterial macio por dentro, estrutura firme por fora.\n\nDeixa a casa mais bonita E o gato mais feliz.\n\nWin-win. 🐾',
      cta_line: '🔗 Link na bio — estoque limitado',
      hashtags: '#gatos #camadegato #gatosbrasil #mimandoogato #catlovers #casadegato #gatosdobrasil #iglu #patadeveludo',
      pinned_comment: 'Seu gato prefere dormir escondido ou em lugar aberto? 👇'
    }
  }
];
