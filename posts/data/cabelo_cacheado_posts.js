'use strict';

// Posts data — cabelo cacheado / hidratação
// Research-backed: curvatura capilar, frequência de hidratação, química dos fios
// Hook types: bold statement, info-gap, PAS copy, founder voice

module.exports = [

  // ─────────────────────────────────────────────────────────────────────────
  // POST 01 — Problema central | Hidratar a cada 3–4 dias
  // Hook type: bold statement + pain point imediato
  // Research: fios cacheados perdem água 4x mais rápido por curvatura da cutícula
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cache_01',
    order: 1,
    type: 'product_in_use',
    publish_day: 1,
    filename_output: 'cache_01_hidratacao_frequencia.png',
    layout: {
      background: '#1A0E2B',
      sections: [
        { id: 'badge', type: 'pill', text: 'pesquisa capilar 🔬', style: 'badge_primary', position: { top: 40, right: 32 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — close-up de cachos definidos, brilhantes, com gotas de água visíveis, iluminação lateral dourada',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 580 },
          overlay: 'linear-gradient(to bottom, transparent 35%, #1A0E2B 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Você hidrata\ntodo mês.\nSeu cabelo pede\na cada 3 dias.',
          font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#F5EDD8', lineHeight: 1.15, align: 'center' },
          position: { top: 508, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'A curvatura do fio cacheado impede o sebo\nnatural de descer. Resultado: ressecamento crônico.',
          font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.5, align: 'center' },
          position: { top: 730, left: 72, right: 72 }
        },
        {
          id: 'stat', type: 'pill',
          text: 'fios cacheados perdem umidade 4× mais rápido',
          style: 'badge_dark',
          position: { top: 838, align: 'center' }
        },
        { id: 'cta', type: 'pill', text: 'Ver rotina completa → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Passei anos achando que meu cabelo era "difícil". Era só mal hidratado.',
      body: 'Fiz minha primeira hidratação intensa numa quarta-feira.\n\nNo domingo seguinte, o cabelo já estava seco de novo.\n\nFui pesquisar por quê.\n\nA resposta está na física do fio cacheado:\n\nO sebo natural que o couro cabeludo produz não consegue percorrer toda a extensão de um fio enrolado. Em cabelo liso, ele desce facilmente. No cacheado, fica preso nas curvas.\n\nSem proteção natural → o fio absorve e perde água constantemente.\n\nA ciência recomenda: hidratação intensa a cada 3 a 4 dias.\n\nNão é exagero. É a frequência que o seu fio precisa para manter o equilíbrio hídrico. 💧',
      cta_line: '🔗 Link na bio — rotina de hidratação que funciona para todos os tipos de cacho',
      hashtags: '#cabelocacheado #hidratacaocapilar #cachos #rotinacapilar #cacheadosdobrasil #metodocurly #dicascapilar #cachosnaturais #cabelocrespo #cuidadoscapilares',
      pinned_comment: '💜 Salva esse post. Sua rotina muda depois de entender isso.'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 02 — Carousel educacional | Por que o cacheado resseca tanto?
  // 7 slides — Info gap: a ciência por trás do ressecamento
  // Hook: command — "você vai entender agora"
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cache_02',
    order: 2,
    type: 'educational_carousel',
    publish_day: 2,
    filename_output: 'cache_02_carousel_ressecamento/',
    slides_count: 7,
    slides: [
      {
        slide: 1, filename: 'slide_01_cover.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'icon', type: 'emoji', text: '💧', font_size: 100, position: { top: 140, align: 'center' } },
            {
              id: 'headline', type: 'text',
              text: 'Por que seu\ncachinho resseca\ntão rápido?',
              font: { family: 'Georgia, serif', size: 44, weight: 700, color: '#F5EDD8', lineHeight: 1.1, align: 'center' },
              position: { top: 300, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: 'A resposta está na estrutura do seu fio.\nE muda tudo sobre sua rotina.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.5, align: 'center' },
              position: { top: 520, left: 80, right: 80 }
            },
            {
              id: 'swipe', type: 'text', text: 'Deslize → Vem entender',
              font: { family: 'sans-serif', size: 14, weight: 600, color: '#C4826A', align: 'center' },
              position: { bottom: 52, align: 'center' }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🌀', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'A curvatura\nbloqueou o sebo',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'No cabelo liso, o sebo escorrega do couro cabeludo até as pontas — hidratação natural constante.\n\nNo cacheado, a curvatura interrompe esse caminho em cada espiral.\n\nResultado: pontas cronicamente secas, mesmo com couro oleoso.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 400, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 2, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🔓', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Cutícula naturalmente\nmais aberta',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Pesquisas de tricologia mostram que fios com alta porosidade (comum nos cacheados) têm cutículas levantadas por natureza.\n\nCutícula aberta = entra umidade fácil, mas perde também fácil.\n\nPor isso a hidratação "some" em 2 dias.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 400, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 3, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '📊', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'O que a pesquisa\ndiz sobre frequência',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Estudos de ciência capilar mostram que fios cacheados perdem entre 15% e 25% de umidade nas primeiras 72 horas após hidratação.\n\nFrequência ideal: a cada 3 a 4 dias.\n\nNão é capricho. É reposição do que o fio não consegue manter sozinho.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 390, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 4, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 5, filename: 'slide_05.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '04', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '⚖️', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Hidratação sem\nproteína é ciclo vazio',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Água entra, mas sem proteína a cutícula não fecha.\n\nO equilíbrio certo: hidratação profunda (umectante + emoliente) + nutrição com proteína a cada 2 semanas.\n\nSó hidratação frequente sem nutrição → fio mole, sem definição.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 400, left: 80, right: 80 }
            },
            { id: 'progress', type: 'progress_dots', total: 7, active: 5, color: '#C4826A', position: { bottom: 48, align: 'center' } }
          ]
        }
      },
      {
        slide: 6, filename: 'slide_06.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '05', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '✅', font_size: 72, position: { top: 160, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Sinais de que\nvocê está acertando',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 290, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: '✅ Cacho definido do dia 1 ao dia 4\n✅ Sem frizz na transição entre lavagens\n✅ Pontas sem partição visível\n✅ Fio com elasticidade (estica e volta)\n✅ Brilho natural sem produto oleoso\n\nSe só 1 ou 2 dias do ciclo têm isso → a frequência está baixa.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 400, left: 80, right: 80 }
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
            {
              id: 'headline', type: 'text',
              text: 'Seu cacho merece\nmais do que uma\nvez por semana.\n💜',
              font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 180, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: 'A hidratação a cada 3–4 dias não é luxo — é o mínimo que a ciência recomenda para fios cacheados manterem equilíbrio hídrico.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#F5EDD8', opacity: 0.9, lineHeight: 1.55, align: 'center' },
              position: { top: 450, left: 72, right: 72 }
            },
            {
              id: 'note', type: 'text',
              text: 'Salva esse post e manda pra uma amiga de cacho.',
              font: { family: 'sans-serif', size: 13, weight: 600, color: '#F5EDD8', opacity: 0.75, align: 'center' },
              position: { top: 620, align: 'center' }
            },
            { id: 'cta', type: 'pill', text: 'Ver rotina completa → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'Você sabia que fios cacheados precisam de hidratação a cada 3 a 4 dias? A maioria só faz uma vez por semana — e acha que o cabelo é "difícil".',
      body: 'O problema não é o cacho. É a frequência.\n\nA ciência explica por quê:\n→ A curvatura do fio impede o sebo de descer\n→ A cutícula naturalmente mais aberta perde água fácil\n→ Sem reposição frequente = frizz e ressecamento crônicos\n\nDeslize e entenda de uma vez por todas 👉\n\n(Salva antes — você vai querer reler isso)',
      cta_line: '💾 Salva e manda pra uma amiga que acha que o cachinho dela é "ruim"',
      hashtags: '#cabelocacheado #hidratacaocapilar #rotinacapilar #cachos #cacheadosdobrasil #metodocurly #dicascapilar #cabelocrespo #tricologia #cachosnaturais',
      pinned_comment: 'Quantas vezes por semana você hidrata? Me conta nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 03 — Lifestyle | Hook: ironic + relatable, engagement via comentários
  // Strategy: identificação com a cacheada que "errou a rotina por anos"
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cache_03',
    order: 3,
    type: 'lifestyle',
    publish_day: 4,
    filename_output: 'cache_03_lifestyle_ressecamento.png',
    layout: {
      background: '#1A0E2B',
      sections: [
        {
          id: 'photo_full', type: 'image_fill',
          src: 'PLACEHOLDER — mulher com cabelo cacheado sorrindo, cachos bem definidos, luz natural, atmosfera leve e confiante',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 1080 },
          overlay: 'linear-gradient(to bottom, transparent 48%, #1A0E2B 95%)'
        },
        {
          id: 'quote', type: 'text',
          text: 'Não era\ncabelo ruim.\nEra rotina\nerrada. 💜',
          font: { family: 'Georgia, serif', size: 36, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'left' },
          position: { bottom: 76, left: 48, right: 48 }
        },
        {
          id: 'handle', type: 'text', text: '@velvet.cachos',
          font: { family: 'sans-serif', size: 14, weight: 400, color: '#C4826A', align: 'left' },
          position: { bottom: 44, left: 48 }
        }
      ]
    },
    caption: {
      hook: 'Por 6 anos eu chapinhei, alispi, odiei meu cabelo. Depois aprendi uma coisa simples.',
      body: 'Que fios cacheados precisam de hidratação a cada 3 dias.\n\nNão a cada 7.\nNão uma vez por mês.\nA cada 3 dias.\n\nSabe quanto tempo levei pra saber disso? 6 anos de cabelo ressecado, frizz constante, e acreditando que meu cabelo era "difícil por natureza".\n\nNão era difícil. Era mal hidratado.\n\nQual foi a informação que mudou sua relação com o seu cacho? Me conta 👇',
      hashtags: '#cabelocacheado #aceitacaocapilar #cachos #cacheadosdobrasil #transicaocanosa #rotinacapilar #cachosnaturais #cabelocrespo #empoderamento',
      pinned_comment: '❤️ Marca a amiga que ainda acha que o cabelo dela é o problema'
    },
    stories: [
      { type: 'poll', question: 'Você já achou que seu cabelo era "difícil"?', option_a: 'Sim, por anos 😤', option_b: 'Não, sempre amei 💜' },
      { type: 'question_box', prompt: 'Qual foi o maior erro da sua rotina capilar? 🌀' }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 04 — Rotina guia | Carousel 5 slides
  // Hook: "você faz isso errado" — curiosity gap + solução prática
  // Strategy: rotina de 3 passos fácil de seguir = save + share
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cache_04',
    order: 4,
    type: 'educational_carousel',
    publish_day: 6,
    filename_output: 'cache_04_carousel_rotina/',
    slides_count: 5,
    slides: [
      {
        slide: 1, filename: 'slide_01_cover.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'icon', type: 'emoji', text: '🧴', font_size: 110, position: { top: 150, align: 'center' } },
            {
              id: 'headline', type: 'text',
              text: 'A rotina de\nhidratação que\nrealmente funciona\npara cacheados.',
              font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#F5EDD8', lineHeight: 1.15, align: 'center' },
              position: { top: 320, left: 56, right: 56 }
            },
            {
              id: 'sub', type: 'text',
              text: '3 passos. A cada 3–4 dias. Deslize →',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.5, align: 'center' },
              position: { top: 590, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 2, filename: 'slide_02.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '01', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🚿', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Lavagem com\ncondicionador first',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Aplique condicionador nos fios ANTES do shampoo (co-wash ou condicionador leave-in leve).\n\nDedilhe do comprimento para as raízes.\nEspere 3–5 min.\n\nIsso protege a cutícula durante a limpeza e evita a perda de umidade já existente.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 440, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 3, filename: 'slide_03.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '02', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '💜', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Máscara umectante\n+ emoliente',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'A hidratação real tem dois tempos:\n\n① Umectante: atrai água para dentro do fio (mel, glicerina, aloe vera).\n② Emoliente: fecha a cutícula e retém a umidade (óleos vegetais, manteigas).\n\nSó umectante sem emoliente = água sai tão rápido quanto entrou.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
              position: { top: 430, left: 80, right: 80 }
            }
          ]
        }
      },
      {
        slide: 4, filename: 'slide_04.png',
        layout: {
          background: '#1A0E2B',
          sections: [
            { id: 'number_bg', type: 'text', text: '03', font: { size: 200, weight: 700, color: '#C4826A', opacity: 0.1, align: 'right' }, position: { top: 40, right: 32 } },
            { id: 'emoji', type: 'emoji', text: '🌬️', font_size: 72, position: { top: 180, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Finalização\ncom lacre',
              font: { family: 'Georgia, serif', size: 34, weight: 700, color: '#F5EDD8', lineHeight: 1.2, align: 'center' },
              position: { top: 308, left: 64, right: 64 }
            },
            {
              id: 'body', type: 'text',
              text: 'Após enxaguar a máscara, aplique leave-in ainda com o fio encharcado.\n\nDepois, ative o cacho com creme definidor.\n\nEsse "lacre" mantém a umidade dentro do fio por mais dias — a diferença entre durar 2 dias e durar 4.',
              font: { family: 'Georgia, serif', size: 18, weight: 400, color: '#C4A8D8', lineHeight: 1.65, align: 'center' },
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
            { id: 'emoji', type: 'emoji', text: '🌀', font_size: 80, position: { top: 150, align: 'center' } },
            {
              id: 'title', type: 'text', text: 'Do dia 1 ao\ndia 4 com\ncacho bonito.',
              font: { family: 'Georgia, serif', size: 42, weight: 700, color: '#F5EDD8', lineHeight: 1.15, align: 'center' },
              position: { top: 290, left: 56, right: 56 }
            },
            {
              id: 'body', type: 'text',
              text: 'Quando a frequência e a técnica estão certas, o cacho não precisa mais de "retoque" no dia 2.',
              font: { family: 'Georgia, serif', size: 19, weight: 400, color: '#F5EDD8', opacity: 0.9, lineHeight: 1.55, align: 'center' },
              position: { top: 500, left: 80, right: 80 }
            },
            { id: 'cta', type: 'pill', text: 'Ver produtos recomendados → Link na bio', style: 'pill_inverse', position: { bottom: 80, align: 'center' } }
          ]
        }
      }
    ],
    caption: {
      hook: 'A rotina de hidratação para cacheado não é complicada. Ela só precisa estar certa nas 3 etapas — e repetida a cada 3 a 4 dias.',
      body: 'Erro mais comum que vejo: fazer tudo certo, mas só uma vez por semana.\n\nAí na quarta-feira o fio já está seco e a culpa vai pro produto.\n\nO produto não é o problema. A frequência é.\n\nDeslize pra ver os 3 passos que mantêm o cacho hidratado por mais tempo 👉\n\n(Salva — você vai querer consultar de novo)',
      cta_line: '💾 Salva e manda pra uma amiga de cacho que ainda está na fase "meu cabelo não aceita nada"',
      hashtags: '#cabelocacheado #rotinacapilar #hidratacaocapilar #cachos #cacheadosdobrasil #metodocurly #dicascapilar #cabelocrespo #lavagemcomcondi',
      pinned_comment: 'Qual etapa você pulava? Me conta nos comentários 👇'
    }
  },

  // ─────────────────────────────────────────────────────────────────────────
  // POST 05 — Bastidores / credibilidade | Produtos que falham
  // Hook: founder voice + specific rejection = credibilidade real
  // Strategy: "por que paramos de recomendar X" — posiciona antes de vender
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'cache_05',
    order: 5,
    type: 'behind_the_scenes',
    publish_day: 8,
    filename_output: 'cache_05_bastidores_produtos.png',
    layout: {
      background: '#F5EDD8',
      sections: [
        { id: 'badge', type: 'pill', text: 'bastidores 🔍', style: 'badge_dark', position: { top: 36, right: 28 } },
        {
          id: 'product_image', type: 'image_fill',
          src: 'PLACEHOLDER — mãos testando textura de máscara capilar, potes abertos em bancada, iluminação natural e honesta',
          position: { top: 0, left: 0 }, size: { width: 1080, height: 640 },
          overlay: 'linear-gradient(to bottom, transparent 48%, #F5EDD8 100%)'
        },
        {
          id: 'headline', type: 'text',
          text: 'Testei 11 máscaras\ness mês.\nAprovei 3.',
          font: { family: 'Georgia, serif', size: 40, weight: 700, color: '#2D1A0E', lineHeight: 1.15, align: 'center' },
          position: { top: 578, left: 48, right: 48 }
        },
        {
          id: 'subheadline', type: 'text',
          text: 'Critério principal: durar 3 a 4 dias no fio\nsem precisar de retoque.',
          font: { family: 'Georgia, serif', size: 17, weight: 400, color: '#5A3A22', lineHeight: 1.5, align: 'center' },
          position: { top: 720, left: 72, right: 72 }
        },
        { id: 'verdict', type: 'pill', text: '3 aprovadas de 11 testadas', style: 'badge_sage', position: { top: 822, align: 'center' } },
        { id: 'cta', type: 'pill', text: 'Ver aprovadas → Link na bio', style: 'pill_cta', position: { bottom: 44, align: 'center' } }
      ]
    },
    caption: {
      hook: 'Antes de indicar qualquer produto para vocês, faço isso:',
      body: 'Aplico no cabelo limpo, sigo a rotina completa e avalio por 4 dias seguidos.\n\nMeus critérios inegociáveis:\n\n✅ Cacho definido no dia 1 E no dia 3\n✅ Sem frizz na transição entre dias\n✅ Fio com elasticidade (não parte ao esticar)\n✅ Absorção em até 10 minutos (não fica pesado)\n✅ Sem build-up após 3 lavagens seguidas\n\nO que foi reprovado esse mês:\n⛔ Máscara que definia no dia 1, mas deixava fio duro no dia 2\n⛔ Produto que prometia 72h mas evaporava em 36h\n⛔ Emoliente que tamponava a cutícula sem hidratar de verdade\n\nAs 3 aprovadas estão no link. As outras 8, não. 💜',
      cta_line: '🔗 Link na bio — somente o que passou no teste de 4 dias',
      hashtags: '#cabelocacheado #hidratacaocapilar #resenha #maskcarpilar #rotinacapilar #cachos #cacheadosdobrasil #dicascapilar #curadoria',
      pinned_comment: 'Tem algum produto que você quer que eu teste? Me manda nos comentários 👇'
    }
  }
];
