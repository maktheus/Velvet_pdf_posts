'use client';
import { useState } from 'react';
import { PillBtn } from '../shared';

export default function ProfileView() {
  const [tab, setTab] = useState<'pedidos'|'conta'|'enderecos'>('pedidos');
  const tabs = { pedidos:'Meus pedidos', conta:'Minha conta', enderecos:'Endereços' };

  return (
    <div className="px-4 md:px-8 py-10 max-w-4xl mx-auto">
      <h1 className="font-['Bagel_Fat_One',cursive] text-3xl text-[#2a1612] mb-8">Minha conta</h1>
      <div className="flex gap-2 mb-8 overflow-x-auto" style={{ scrollbarWidth:'none' }}>
        {(Object.entries(tabs) as [typeof tab, string][]).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-5 py-2.5 rounded-full font-medium text-sm transition flex-shrink-0 ${tab===k ? 'bg-[#ed6058] text-white' : 'bg-white text-[#2a1612] hover:bg-[#2a1612]/10'}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'pedidos' && (
        <div className="bg-white rounded-[32px] p-8 text-center text-[#2a1612]/50">
          <div className="text-5xl mb-4">📦</div>
          <p className="font-semibold text-base text-[#2a1612]">Nenhum pedido ainda.</p>
          <p className="text-sm mt-1">Seu gato ainda está esperando o primeiro mimo!</p>
          <a href="/"><PillBtn size="sm" className="mt-4">Ver brinquedos</PillBtn></a>
        </div>
      )}
      {tab === 'conta' && (
        <div className="bg-white rounded-[32px] p-6 space-y-4 max-w-lg">
          {[['Nome','Maria Souza'],['Email','maria@gmail.com'],['Telefone','(11) 99999-9999']].map(([label, def]) => (
            <div key={label}>
              <label className="text-xs font-semibold text-[#2a1612]/60 uppercase tracking-wide block mb-1.5">{label}</label>
              <input className="w-full px-4 py-3 rounded-[20px] border border-[#2a1612]/20 focus:border-[#ed6058] outline-none text-sm bg-white" defaultValue={def}/>
            </div>
          ))}
          <PillBtn>Salvar alterações</PillBtn>
        </div>
      )}
      {tab === 'enderecos' && (
        <div className="bg-white rounded-[32px] p-8 text-center text-[#2a1612]/50">
          <div className="text-5xl mb-4">📍</div>
          <p className="font-semibold text-base text-[#2a1612]">Nenhum endereço salvo.</p>
          <PillBtn size="sm" className="mt-4">Adicionar endereço</PillBtn>
        </div>
      )}
    </div>
  );
}
