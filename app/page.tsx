"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

// ─── Scroll animation ─────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.unobserve(el); } },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.6,0,0.05,1) ${delay}ms, transform 0.8s cubic-bezier(0.6,0,0.05,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Hero visual card ─────────────────────────────────────────────────────────
function BrandCard() {
  return (
    <div
      style={{
        background: "rgba(30, 29, 31, 0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,234,223,0.1)",
        borderRadius: 24,
        padding: "28px 28px 24px",
        width: 340,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,234,223,0.06)",
        fontFamily: "var(--font-display)",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#efd6bd", display: "inline-block" }} />
          <span style={{ color: "rgba(255,234,223,0.45)", fontSize: 11, letterSpacing: "0.1em" }}>
            LEITURA DE MARCA
          </span>
        </div>
        <span style={{ color: "rgba(255,234,223,0.2)", fontSize: 11 }}>2 dias úteis</span>
      </div>

      {/* Brand identity */}
      <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,234,223,0.07)" }}>
        <p style={{ color: "rgba(255,234,223,0.35)", fontSize: 10, letterSpacing: "0.1em", marginBottom: 8 }}>MARCA</p>
        <p style={{ color: "#ffeadf", fontSize: 20, fontWeight: 600, letterSpacing: "-0.025em", marginBottom: 4 }}>
          Studio Noma
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{
            fontSize: 11, color: "rgba(255,234,223,0.45)",
            backgroundColor: "rgba(255,234,223,0.07)",
            border: "1px solid rgba(255,234,223,0.1)",
            borderRadius: 100, padding: "3px 10px",
          }}>
            Wellness
          </span>
          <span style={{
            fontSize: 11, color: "rgba(255,234,223,0.45)",
            backgroundColor: "rgba(255,234,223,0.07)",
            border: "1px solid rgba(255,234,223,0.1)",
            borderRadius: 100, padding: "3px 10px",
          }}>
            São Paulo
          </span>
        </div>
      </div>

      {/* Diagnosis */}
      <div style={{ marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,234,223,0.07)" }}>
        <p style={{ color: "rgba(255,234,223,0.35)", fontSize: 10, letterSpacing: "0.1em", marginBottom: 10 }}>O QUE VEMOS</p>
        <p style={{ color: "rgba(255,234,223,0.75)", fontSize: 14, lineHeight: 1.65 }}>
          "Produto forte, território sem dono. As pessoas compram — mas não ficam."
        </p>
      </div>

      {/* Next step */}
      <div>
        <p style={{ color: "rgba(255,234,223,0.35)", fontSize: 10, letterSpacing: "0.1em", marginBottom: 10 }}>PRÓXIMO PASSO</p>
        <div style={{
          backgroundColor: "rgba(239,214,189,0.08)",
          border: "1px solid rgba(239,214,189,0.18)",
          borderRadius: 12,
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <p style={{ color: "#efd6bd", fontSize: 14, fontWeight: 500 }}>
            Posicionamento relacional
          </p>
          <span style={{ color: "rgba(239,214,189,0.6)", fontSize: 14 }}>→</span>
        </div>
      </div>
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
type FormData = { nome: string; marca: string; tipo: string; momento: string; problema: string; contato: string };

const base: React.CSSProperties = {
  width: "100%",
  borderRadius: 12,
  padding: "15px 18px",
  fontSize: 15,
  fontFamily: "var(--font-display)",
  outline: "none",
  transition: "border-color 0.18s",
  appearance: "none" as const,
  color: "#ffeadf",
  backgroundColor: "rgba(36,36,37,0.8)",
  border: "1px solid rgba(255,234,223,0.1)",
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState<FormData>({ nome: "", marca: "", tipo: "", momento: "", problema: "", contato: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function submit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const field = (name: string): React.CSSProperties => ({
    ...base,
    borderColor: focused === name ? "rgba(239,214,189,0.45)" : "rgba(255,234,223,0.1)",
  });

  const label: React.CSSProperties = {
    color: "rgba(255,234,223,0.4)",
    fontSize: 11,
    letterSpacing: "0.1em",
    display: "block",
    marginBottom: 8,
    fontFamily: "var(--font-display)",
  };

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: "rgba(25,24,26,0.82)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,234,223,0.06)",
      }}>
        <div
          style={{ maxWidth: 1120, margin: "0 auto" }}
          className="flex items-center justify-between px-6 py-5 md:px-12"
        >
          <span style={{ color: "#ffeadf", fontWeight: 500, letterSpacing: "0.16em", fontSize: 12, fontFamily: "var(--font-display)" }}>
            NAVY
          </span>
          <button
            onClick={() => go("formulario")}
            style={{
              color: "rgba(255,234,223,0.5)", fontSize: 13, background: "none", border: "none",
              cursor: "pointer", fontFamily: "var(--font-display)", letterSpacing: "0.01em",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ffeadf")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,234,223,0.5)")}
          >
            Diagnóstico gratuito →
          </button>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "#19181a", minHeight: "92vh", display: "flex", alignItems: "center" }}
        className="px-6 pt-16 pb-24 md:px-12"
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", width: "100%" }}>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">

            {/* Left — copy */}
            <div>
              <FadeUp>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "rgba(239,214,189,0.07)",
                  border: "1px solid rgba(239,214,189,0.14)",
                  borderRadius: 100, padding: "5px 14px", marginBottom: 36,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#efd6bd", display: "inline-block", flexShrink: 0 }} />
                  <span style={{ color: "#efd6bd", fontSize: 11, letterSpacing: "0.1em", fontFamily: "var(--font-display)" }}>
                    BRANDING RELACIONAL
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={70}>
                <h1
                  style={{
                    color: "#ffeadf",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    lineHeight: 1.06,
                    letterSpacing: "-0.03em",
                    marginBottom: 28,
                  }}
                  className="text-[40px] md:text-[56px] lg:text-[66px]"
                >
                  Tem marcas que vendem todo mês.{" "}
                  Tem marcas que as pessoas nunca esquecem.{" "}
                  <span style={{ color: "#efd6bd" }}>
                    A segunda é a que a gente ajuda a construir.
                  </span>
                </h1>
              </FadeUp>

              <FadeUp delay={150}>
                <p style={{
                  color: "rgba(255,234,223,0.5)",
                  fontSize: 18,
                  lineHeight: 1.7,
                  maxWidth: 500,
                  marginBottom: 40,
                  fontFamily: "var(--font-display)",
                }}>
                  A NAVY trabalha com fundadores de moda e wellness que vendem bem e sabem que construir um produto que vende é diferente de construir uma marca que fica.
                </p>
              </FadeUp>

              <FadeUp delay={210}>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => go("formulario")}
                    style={{
                      background: "#ffeadf", color: "#19181a",
                      borderRadius: 100, padding: "15px 28px",
                      fontSize: 15, fontWeight: 600,
                      fontFamily: "var(--font-display)",
                      border: "none", cursor: "pointer",
                      transition: "opacity 0.2s",
                      letterSpacing: "-0.01em",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Quero um diagnóstico de marca
                  </button>
                  <button
                    onClick={() => go("newsletter")}
                    style={{
                      color: "rgba(255,234,223,0.4)",
                      background: "none", border: "none",
                      cursor: "pointer", fontSize: 14,
                      fontFamily: "var(--font-display)",
                      textDecoration: "underline",
                      textUnderlineOffset: 4,
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,234,223,0.7)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,234,223,0.4)")}
                  >
                    ou receba nossa leitura do mercado toda semana
                  </button>
                </div>
              </FadeUp>
            </div>

            {/* Right — brand card visual */}
            <FadeUp delay={340} className="hidden lg:flex justify-end">
              <BrandCard />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SINTOMA ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#242425" }} className="px-6 py-24 md:px-12 md:py-32">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ maxWidth: 660 }}>
              <p style={{
                color: "#ffeadf",
                fontSize: "clamp(21px, 2.8vw, 28px)",
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: "-0.025em",
                marginBottom: 28,
                fontFamily: "var(--font-display)",
              }}>
                Você sabe quando a marca ainda é só produto.
              </p>
              <p style={{ color: "rgba(255,234,223,0.5)", fontSize: 17, lineHeight: 1.8, marginBottom: 18, fontFamily: "var(--font-display)" }}>
                O cliente compra. Some. Você começa de novo. Anuncia, vende, entrega, repete. No dia em que o fundador para de aparecer, a marca para junto. No dia em que o tráfego cai, as vendas somem. A promoção termina e o movimento para.
              </p>
              <p style={{ color: "rgba(255,234,223,0.5)", fontSize: 17, lineHeight: 1.8, fontFamily: "var(--font-display)" }}>
                Isso não é falta de marketing. É o que acontece quando uma marca compete no jogo transacional, onde cada venda nasce do zero e crescer em alcance não significa crescer em marca.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── MÉTODO ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#19181a" }} className="px-6 py-24 md:px-12 md:py-32">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeUp>
            <p style={{ color: "rgba(255,234,223,0.35)", fontSize: 11, letterSpacing: "0.12em", fontFamily: "var(--font-display)", marginBottom: 14 }}>
              O MÉTODO
            </p>
            <p style={{
              color: "#ffeadf",
              fontSize: "clamp(21px, 2.8vw, 28px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.35,
              marginBottom: 48,
              fontFamily: "var(--font-display)",
              maxWidth: 500,
            }}>
              Construímos marcas relacionais em quatro movimentos.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Posicionamento", body: "Seu produto não é o seu diferencial. O território que sua marca ocupa é. A gente te ajuda a nomear o que só você pode ser." },
              { title: "Experiência", body: "Um território que ninguém vê, sente ou toca não existe. A gente faz a marca sair do discurso e entrar na vida real das pessoas." },
              { title: "Conteúdo", body: "Entre uma compra e a próxima, a marca pode estar presente ou pode ser esquecida. A gente garante o primeiro." },
              { title: "Comunidade", body: "Quando as pessoas pertencem à marca, elas param de comparar preço. A gente constrói esse pertencimento." },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 70}>
                <div style={{
                  background: "rgba(36,36,37,0.6)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,234,223,0.07)",
                  borderRadius: 20,
                  padding: "28px 24px",
                  height: "100%",
                  fontFamily: "var(--font-display)",
                }}>
                  <p style={{ color: "#efd6bd", fontSize: 10, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
                    {card.title}
                  </p>
                  <p style={{ color: "rgba(255,234,223,0.55)", fontSize: 15, lineHeight: 1.7 }}>
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIRADA ──────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#242425" }} className="px-6 py-24 md:px-12 md:py-32">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeUp>
            <h2 style={{
              color: "#ffeadf",
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              marginBottom: 44,
              fontFamily: "var(--font-display)",
            }}>
              Existe outro jogo.
            </h2>
          </FadeUp>

          <FadeUp delay={90}>
            <div style={{ borderLeft: "2px solid rgba(239,214,189,0.35)", paddingLeft: 28, maxWidth: 560, marginBottom: 36 }}>
              <p style={{ color: "#ffeadf", fontSize: 18, lineHeight: 1.95, fontFamily: "var(--font-display)" }}>
                Nele a compra não encerra a relação. Ela abre.
                <br />
                Nele a marca não precisa gritar pra ser lembrada. Ela já está lá.
                <br />
                Nele o cliente não some depois de pagar. Ele volta porque pertence.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={170}>
            <p style={{ color: "rgba(255,234,223,0.5)", fontSize: 17, lineHeight: 1.8, maxWidth: 540, fontFamily: "var(--font-display)" }}>
              Chamamos isso de marca relacional. É o único lugar onde trocar de marca significa trocar de identidade.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── MANIFESTO ───────────────────────────────────────────────────── */}
      <section
        style={{ background: "radial-gradient(ellipse at 50% 55%, #2e2825 0%, #19181a 68%)" }}
        className="px-6 py-32 md:px-12 md:py-48"
      >
        <FadeUp>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(22px, 3.2vw, 38px)",
              lineHeight: 1.7,
              fontWeight: 400,
              color: "#ffeadf",
              marginBottom: 32,
              letterSpacing: "0.005em",
            }}>
              As pessoas usam moda para expressar quem são.
              <br />
              As pessoas usam wellness para se tornarem quem querem ser.
              <br />
              No fundo, os dois mercados vendem a mesma coisa:
              <br />
              <em>Construção de identidade.</em>
            </p>
            <p style={{
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(15px, 1.8vw, 20px)",
              color: "rgba(255,234,223,0.4)",
              fontWeight: 400,
              lineHeight: 1.7,
            }}>
              E marca, no fundo, é identidade. A sua, e a de quem ela reúne.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── PARA QUEM ───────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#242425" }} className="px-6 py-24 md:px-12 md:py-32">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ maxWidth: 660 }}>
              <p style={{
                color: "#ffeadf",
                fontSize: "clamp(21px, 2.8vw, 28px)",
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: "-0.025em",
                marginBottom: 28,
                fontFamily: "var(--font-display)",
              }}>
                A gente não começa do zero com ninguém.
              </p>
              <p style={{ color: "rgba(255,234,223,0.5)", fontSize: 17, lineHeight: 1.8, marginBottom: 18, fontFamily: "var(--font-display)" }}>
                Trabalhamos com fundadores que já vendem, que têm um produto que funciona, mas que olham pra marcas como a Lululemon, a Farm, a Insider, e percebem que o que elas têm não é produto. É o espaço que ocupam na vida das pessoas.
              </p>
              <p style={{ color: "rgba(255,234,223,0.5)", fontSize: 17, lineHeight: 1.8, fontFamily: "var(--font-display)" }}>
                Se você está nesse momento, é com a gente que você conversa.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FORMULÁRIO ──────────────────────────────────────────────────── */}
      <section id="formulario" style={{ backgroundColor: "#19181a" }} className="px-6 py-24 md:px-12 md:py-32">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FadeUp>
            <h2 style={{
              color: "#ffeadf",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
              marginBottom: 16,
              fontFamily: "var(--font-display)",
            }}>
              Conta sobre a sua marca.
            </h2>
            <p style={{ color: "rgba(255,234,223,0.45)", fontSize: 16, lineHeight: 1.7, marginBottom: 44, fontFamily: "var(--font-display)" }}>
              A gente lê, pesquisa e em até dois dias úteis te manda uma leitura do que vê. Onde a marca está, o que está travando e qual seria o próximo passo. Sem compromisso. Sem pitch. Só clareza.
            </p>
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div style={{
                background: "rgba(36,36,37,0.6)",
                border: "1px solid rgba(255,234,223,0.08)",
                borderRadius: 20,
                padding: "48px 36px",
                textAlign: "center",
                fontFamily: "var(--font-display)",
              }}>
                <p style={{ color: "#ffeadf", fontSize: 20, fontWeight: 500, marginBottom: 12 }}>Recebido.</p>
                <p style={{ color: "rgba(255,234,223,0.45)", fontSize: 15, lineHeight: 1.7 }}>
                  A gente vai ler com cuidado e te manda uma leitura em até dois dias úteis.
                </p>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={70}>
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                <div>
                  <label style={label}>SEU NOME</label>
                  <input type="text" placeholder="Como podemos te chamar"
                    value={form.nome} onChange={e => update("nome", e.target.value)}
                    onFocus={() => setFocused("nome")} onBlur={() => setFocused(null)}
                    style={field("nome")} />
                </div>

                <div>
                  <label style={label}>SUA MARCA E O @ DO INSTAGRAM</label>
                  <input type="text" placeholder="@suamarca"
                    value={form.marca} onChange={e => update("marca", e.target.value)}
                    onFocus={() => setFocused("marca")} onBlur={() => setFocused(null)}
                    style={field("marca")} />
                </div>

                <div>
                  <label style={label}>SUA MARCA É</label>
                  <div style={{ position: "relative" }}>
                    <select value={form.tipo} onChange={e => update("tipo", e.target.value)}
                      onFocus={() => setFocused("tipo")} onBlur={() => setFocused(null)}
                      style={{ ...field("tipo"), color: form.tipo ? "#ffeadf" : "rgba(255,234,223,0.28)", cursor: "pointer" }}>
                      <option value="" disabled>Selecione</option>
                      <option value="moda">Moda</option>
                      <option value="wellness">Wellness</option>
                      <option value="os-dois">Os dois</option>
                    </select>
                    <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,234,223,0.35)", fontSize: 10 }}>▾</span>
                  </div>
                </div>

                <div>
                  <label style={label}>ONDE SUA MARCA ESTÁ HOJE</label>
                  <div style={{ position: "relative" }}>
                    <select value={form.momento} onChange={e => update("momento", e.target.value)}
                      onFocus={() => setFocused("momento")} onBlur={() => setFocused(null)}
                      style={{ ...field("momento"), color: form.momento ? "#ffeadf" : "rgba(255,234,223,0.28)", cursor: "pointer" }}>
                      <option value="" disabled>Selecione</option>
                      <option value="comecando">Começa a vender com consistência</option>
                      <option value="depende">Já vende bem, mas depende de anúncio e lançamento</option>
                      <option value="referencia">Vende muito e quer virar referência</option>
                    </select>
                    <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "rgba(255,234,223,0.35)", fontSize: 10 }}>▾</span>
                  </div>
                </div>

                <div>
                  <label style={label}>O QUE MAIS TE INCOMODA HOJE</label>
                  <textarea placeholder="Em uma frase, o que você sente que está travando"
                    rows={3} value={form.problema} onChange={e => update("problema", e.target.value)}
                    onFocus={() => setFocused("problema")} onBlur={() => setFocused(null)}
                    style={{ ...field("problema"), resize: "none", lineHeight: 1.65 }} />
                </div>

                <div>
                  <label style={label}>MELHOR E-MAIL OU WHATSAPP</label>
                  <input type="text" placeholder="pra gente te mandar a leitura"
                    value={form.contato} onChange={e => update("contato", e.target.value)}
                    onFocus={() => setFocused("contato")} onBlur={() => setFocused(null)}
                    style={field("contato")} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 8,
                    backgroundColor: loading ? "rgba(255,234,223,0.15)" : "#ffeadf",
                    color: loading ? "rgba(255,234,223,0.4)" : "#19181a",
                    width: "100%",
                    borderRadius: 100,
                    padding: "16px 28px",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "var(--font-display)",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "opacity 0.2s, background-color 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}
                >
                  {loading ? "Enviando..." : "Quero minha leitura de marca"}
                </button>
                <p style={{ color: "rgba(255,234,223,0.28)", fontSize: 13, textAlign: "center", fontFamily: "var(--font-display)" }}>
                  Sem compromisso. Sem pitch. Só clareza.
                </p>
              </form>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ── FOOTER — newsletter + credits ───────────────────────────────── */}
      <footer id="newsletter" style={{ backgroundColor: "#ffeadf" }} className="px-6 py-20 md:px-12 md:py-28">
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_auto]">

            {/* Newsletter */}
            <div style={{ maxWidth: 480 }}>
              <FadeUp>
                <p style={{
                  color: "#19181a",
                  fontSize: "clamp(18px, 2.4vw, 24px)",
                  fontWeight: 500,
                  lineHeight: 1.4,
                  letterSpacing: "-0.025em",
                  marginBottom: 14,
                  fontFamily: "var(--font-display)",
                }}>
                  A economia de lifestyle cresce 2x mais rápido que o mundo.
                </p>
                <p style={{ color: "rgba(25,24,26,0.5)", fontSize: 15, lineHeight: 1.75, marginBottom: 28, fontFamily: "var(--font-display)" }}>
                  Nossa leitura do mercado toda semana. O que está mudando, o que está quebrando e o que está construindo as marcas do futuro.
                </p>
                <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-3 sm:flex-row">
                  <input type="email" placeholder="seu melhor e-mail"
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(25,24,26,0.06)",
                      border: "1px solid rgba(25,24,26,0.14)",
                      color: "#19181a",
                      borderRadius: 100,
                      padding: "13px 20px",
                      fontSize: 14,
                      fontFamily: "var(--font-display)",
                      outline: "none",
                    }} />
                  <button type="submit"
                    style={{
                      backgroundColor: "#19181a",
                      color: "#ffeadf",
                      borderRadius: 100,
                      padding: "13px 22px",
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: "var(--font-display)",
                      border: "none",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Quero receber
                  </button>
                </form>
              </FadeUp>
            </div>

            {/* Identity */}
            <FadeUp delay={100} className="flex flex-col justify-between">
              <div>
                <p style={{ color: "#19181a", fontWeight: 500, letterSpacing: "0.14em", fontSize: 12, fontFamily: "var(--font-display)", marginBottom: 8 }}>
                  NAVY
                </p>
                <p style={{ color: "rgba(25,24,26,0.45)", fontSize: 13, fontFamily: "var(--font-display)", lineHeight: 1.6 }}>
                  Marcas relacionais para
                  <br />moda e wellness.
                </p>
              </div>
              <p style={{ color: "rgba(25,24,26,0.3)", fontSize: 12, fontFamily: "var(--font-display)", marginTop: 40 }}>
                © 2025 Navy Studio
              </p>
            </FadeUp>

          </div>
        </div>
      </footer>
    </>
  );
}
