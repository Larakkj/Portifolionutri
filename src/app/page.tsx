"use client";

import { useState, useEffect } from "react";
import { ArrowRight, MessageCircle, Info, Activity, Heart, Stethoscope, Apple, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imc, setImc] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lista temporária de imagens para o carrossel. Você poderá trocar esses links depois.
  const heroImages = [
    "https://images.unsplash.com/photo-1594824436998-d8bb435534e6?auto=format&fit=crop&q=80&w=800",
    "https://image2url.com/r2/default/images/1772232431605-ff960fb0-3a5f-4b53-a40c-0e44aa08f73a.jpg",
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
  ];

  // Troca a imagem a cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const calculateIMC = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight.replace(',', '.'));
    const h = parseFloat(height.replace(',', '.'));
    if (w > 0 && h > 0) {
      setImc(w / (h * h));
    }
  };

  const getIMCClassification = (value: number) => {
    if (value < 18.5) return { label: "Abaixo do peso", color: "text-blue-600 dark:text-blue-400" };
    if (value < 25) return { label: "Normal", color: "text-primary" };
    if (value < 30) return { label: "Sobrepeso", color: "text-yellow-600 dark:text-yellow-500" };
    return { label: "Obesidade", color: "text-red-600 dark:text-red-400" };
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* HEADER / NAV (Optional, but adds a premium feel) */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-secondary">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl font-semibold tracking-tight text-primary">
            Dr. Juliana Alves
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
            <a href="#calculadora" className="hover:text-primary transition-colors">Calculadora IMC</a>
          </nav>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-all font-medium">
            <MessageCircle size={18} />
            Agendar Consulta
          </a>
        </div>
      </header>

      <main className="pt-20">
        {/* HERO SECTION */}
        <section className="relative px-6 py-20 md:py-32 overflow-hidden flex items-center min-h-[90vh]">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Nutricionista Clínica & Esportiva
              </div>

              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
                Transformando <span className="text-primary italic">saúde</span> em estilo de vida.
              </h1>

              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed max-w-lg">
                Um acompanhamento nutricional humanizado, focado nos seus objetivos sem restrições extremas. Descubra a sua melhor versão.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-primary/90 hover:scale-[1.02] transition-all font-medium text-lg">
                  <MessageCircle size={20} />
                  Falar no WhatsApp
                </a>
                <a href="#sobre" className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-4 rounded-full hover:bg-secondary/80 transition-all font-medium text-lg">
                  <Info size={20} />
                  Sobre mim
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Image Frame with Carousel */}
              <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-secondary/50 border border-secondary group">
                {heroImages.map((src, index) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Nutricionista banner ${index + 1}`}
                    className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
                      }`}
                  />
                ))}

                {/* Carousel Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {heroImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentImageIndex ? "bg-primary w-6" : "bg-white/60 hover:bg-white"
                        }`}
                      aria-label={`Ir para imagem ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-background p-6 rounded-2xl shadow-xl border border-secondary hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Heart size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 font-medium">Mais de</p>
                    <p className="text-xl font-bold text-foreground">1000+ Pacientes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="sobre" className="px-6 py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative aspect-square rounded-full overflow-hidden border-8 border-background shadow-lg max-w-md mx-auto">
              <img
                src="https://image2url.com/r2/default/images/1772226326820-95462068-b5b9-4253-aaaf-e24e1bc23195.jpeg"
                alt="Nutricionista em atendimento"
                className="object-cover object-[center_20%] w-full h-full"
              />
            </div>
            <div className="order-1 md:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif">Muito prazer, <br /> Dr. Juliana Alves</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Minha missão é mostrar que uma alimentação saudável pode ser deliciosa, prática e caber na sua rotina. Não acredito em dietas da moda, mas sim em reeducação e equilíbrio.
              </p>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-primary flex-shrink-0" />
                  <span>Formada pela <strong>Universidade UNINASSAU</strong></span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-primary flex-shrink-0" />
                  <span>Mais de <strong>5 anos de experiência</strong> profissional</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="text-primary flex-shrink-0" />
                  <span>Foco em <strong>emagrecimento e hipertrofia</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="servicos" className="px-6 py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-serif">Como posso te ajudar?</h2>
              <p className="text-lg text-foreground/70">Programas de acompanhamento personalizados de acordo com o seu perfil, rotina e objetivos de saúde.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Reeducação Alimentar", icon: Apple, desc: "Aprenda a fazer boas escolhas sem terrorismo nutricional." },
                { title: "Dieta Personalizada", icon: Activity, desc: "Um plano alimentar estruturado apenas para o seu corpo." },
                { title: "Nutrição Esportiva", icon: Heart, desc: "Otimize sua performance e ganhos nos treinos." },
                { title: "Acompanhamento Clínico", icon: Stethoscope, desc: "Tratamento de patologias e regulação metabólica." }
              ].map((service, i) => (
                <div key={i} className="group p-8 rounded-3xl bg-secondary/50 border border-secondary hover:bg-background hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <service.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <section id="calculadora" className="px-6 py-32 bg-primary text-primary-foreground relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "30px 30px" }} />

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-serif">Descubra seu IMC <br /> agora mesmo 🔥</h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed">
                Descubra sua classificação no Índice de Massa Corporal. Lembre-se que este é apenas um parâmetro geral e não substitui uma avaliação profissional que leva em conta massa muscular e gordura.
              </p>
            </div>

            <div className="bg-background text-foreground p-8 rounded-3xl shadow-2xl">
              <form onSubmit={calculateIMC} className="space-y-6">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium mb-2 opacity-80">Peso (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    step="0.1"
                    required
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex: 68.5"
                    className="w-full h-14 px-4 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium mb-2 opacity-80">Altura (m)</label>
                  <input
                    id="height"
                    type="number"
                    step="0.01"
                    required
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex: 1.70"
                    className="w-full h-14 px-4 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Activity size={20} />
                  Calcular Meu IMC
                </button>
              </form>

              {imc && (
                <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-secondary animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-sm font-medium text-foreground/70 mb-1">Seu Resultado</p>
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-4xl font-bold">{imc.toFixed(1)}</span>
                    <span className={`text-xl font-semibold mb-1 ${getIMCClassification(imc).color}`}>
                      {getIMCClassification(imc).label}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-4">
                    <div
                      className={`h-full ${getIMCClassification(imc).color.replace('text-', 'bg-')}`}
                      style={{
                        width: `${Math.min(Math.max((imc / 40) * 100, 10), 100)}%`,
                        transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)"
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="px-6 py-12 bg-background border-t border-secondary text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="font-serif text-2xl font-semibold text-primary">Dr. Juliana Alves</div>
          <div className="flex gap-4 text-foreground/60">
            <a href="mailto:nutricionistajulianaalves@outlook.com" className="hover:text-primary transition-colors">nutricionistajulianaalves@outlook.com</a>
            <span>•</span>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">(11) 99999-9999</a>
          </div>
          <p className="text-sm text-foreground/40 mt-8">
            © {new Date().getFullYear()} Dr. Juliana Alves. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
