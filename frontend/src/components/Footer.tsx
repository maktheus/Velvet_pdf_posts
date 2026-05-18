import Link from 'next/link';
import { Logo, PawGlyph } from './shared';

export default function Footer() {
  return (
    <footer className="bg-[#2a1612] text-[#fdfedf] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Logo size={80} />
            <p className="text-[#fdfedf]/60 text-sm mt-3 leading-relaxed">
              Brinquedos para gatos de apartamento. Curadoria com veterinária comportamental felina.
            </p>
          </div>
          {[
            { title: 'Loja', links: [['Brincar','/cat/brincar'],['Descansar','/cat/descansar'],['Hidratar','/cat/hidratar'],['Cuidar','/cat/cuidar'],['Kits','/kits']] },
            { title: 'Ajuda', links: [['Como funciona','#'],['Trocas e devoluções','#'],['Frete e prazos','#'],['FAQ','#'],['Painel Admin','/admin']] },
            { title: 'Social', links: [['Instagram','#'],['TikTok','#'],['Pinterest','#'],['YouTube','#']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-sans font-bold text-sm mb-4 text-[#ed6058]">{col.title}</h4>
              <ul className="space-y-2 text-sm text-[#fdfedf]/70">
                {col.links.map(([label, href]) => (
                  <li key={label}><Link href={href} className="hover:text-[#ed6058] transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#fdfedf]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#fdfedf]/40">
          <p>© 2025 Mutum Labs LTDA — Pata de Veludo® marca registrada</p>
          <p className="flex items-center gap-1"><PawGlyph size={14} color="#ed6058"/> Feito com amor por quem tem gato.</p>
        </div>
      </div>
    </footer>
  );
}
