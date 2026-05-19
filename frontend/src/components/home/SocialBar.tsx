'use client';
const posts = [
  { img:'/uploads/sprinx-um.png', likes:'4.2k', caption:'o Quindim e o novo ratinho 🐾' },
  { img:'/uploads/sprinx-dois.png', likes:'3.8k', caption:'Mafalda aprova o ninho 😻' },
  { img:'/uploads/gato-laranja.webp', likes:'2.9k', caption:'fonte pétala em ação 💧' },
  { img:'/uploads/gato-malhado.webp', likes:'5.1k', caption:'arranhador onda hit! 🌊' },
  { img:'/uploads/cat-bengal.jpg', likes:'3.3k', caption:'mochila bolha aprovada 🎒' },
  { img:'/uploads/cat-persa.jpg', likes:'6.2k', caption:'kit primeiro gato ❤️' },
];

export default function SocialBar() {
  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Bagel_Fat_One',cursive] text-2xl md:text-3xl text-[#2a1612]">@patadeveludo</h2>
        <a href="#" className="text-[#ed6058] text-sm font-semibold hover:underline">seguir →</a>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {posts.map((p, i) => (
          <div key={i} className="aspect-square rounded-[20px] overflow-hidden relative group cursor-pointer">
            <img src={p.img} alt={p.caption} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-[#2a1612]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs text-center p-2">
              <span className="font-bold">❤️ {p.likes}</span>
              <span className="mt-1 leading-tight">{p.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
