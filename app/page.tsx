"use client";

import { useEffect, useRef, useState, FormEvent } from "react";

// ─── Scroll animation wrapper ─────────────────────────────────────────────

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(22px)",
        transition: `opacity 0.72s cubic-bezier(0.6, 0, 0.05, 1) ${delay}ms, transform 0.72s cubic-bezier(0.6, 0, 0.05, 1) ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// ─── Shared input style ───────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  border: "1px solid var(--border)",
  color: "var(--text)",
  backgroundColor: "var(--bg-2)",
  width: "100%",
  borderRadius: "12px",
  padding: "16px 20px",
  fontSize: "16px",
  fontFamily: "var(--font-display)",
  outline: "none",
  transition: "border-color 0.2s ease",
  appearance: "none" as const,
};

// ─── Form types ───────────────────────────────────────────────────────────

type FormData = {
  nome: string;
  marca: string;
  tipo: string;
  momento: string;
  problema: string;
  contato: string;
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [form, setForm] = useState<FormData>({
    nome: "",
    marca: "",
    tipo: "",
    momento: "",
    problema: "",
    contato: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === name ? "var(--accent)" : "var(--border)",
  });

  return (
    <>
      {/* ─── NAV ──────────────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: "1px solid var(--border)",
          backgroundColor: "rgba(25, 24, 26, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{ maxWidth: 1100, margin: "0 auto" }}
          className="flex items-center justify-between px-5 py-5 md:px-10"
        >
          <span
            style={{
              color: "var(--text)",
              fontWeight: 500,
              letterSpacing: "0.14em",
              fontSize: 13,
            }}
          >
            NAVY
          </span>
          <span style={{ color: "var(--text-2)", fontSize: 13 }}>
            moda e wellness
          </span>
        </div>
      </nav>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg)" }}
        className="px-5 pb-28 pt-20 md:px-10 md:pb-36 md:pt-28"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <h1
              style={{
                color: "var(--text)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                fontWeight: 700,
                fontFamily: "var(--font-display)",
              }}
              className="mb-8 max-w-4xl text-[38px] md:text-[60px] lg:text-[72px]"
            >
              Tem marcas que vendem todo mês.
              <br />
              Tem marcas que as pessoas nunca esquecem.
              <br />
              <span style={{ color: "var(--blue)" }}>
                A segunda é a que a gente ajuda a construir.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={140}>
            <p
              style={{
                color: "var(--text-2)",
                maxWidth: 560,
                fontSize: 18,
                lineHeight: 1.65,
              }}
              className="mb-10 md:text-xl"
            >
              A NAVY trabalha com fundadores de moda e wellness que vendem bem
              e sabem que construir um produto que vende é diferente de
              construir uma marca que fica.
            </p>
          </FadeUp>

          <FadeUp delay={240}>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <button
                onClick={() => scrollTo("formulario")}
                style={{
                  backgroundColor: "var(--blue)",
                  color: "#fff",
                  borderRadius: 999,
                  padding: "15px 28px",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "var(--font-display)",
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Quero um diagnóstico de marca
              </button>
              <button
                onClick={() => scrollTo("newsletter")}
                style={{
                  color: "var(--text-2)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "var(--font-display)",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                ou receba nossa leitura do mercado toda semana
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── SEÇÃO 2 — SINTOMA ────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg-2)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ maxWidth: 640 }}>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  marginBottom: 28,
                }}
                className="md:text-2xl"
              >
                Você sabe quando a marca ainda é só produto.
              </p>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 18,
                  lineHeight: 1.75,
                  marginBottom: 22,
                }}
                className="md:text-xl"
              >
                O cliente compra. Some. Você começa de novo. Anuncia, vende,
                entrega, repete. No dia em que o fundador para de aparecer, a
                marca para junto. No dia em que o tráfego cai, as vendas somem.
                A promoção termina e o movimento para.
              </p>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 18,
                  lineHeight: 1.75,
                }}
                className="md:text-xl"
              >
                Isso não é falta de marketing. É o que acontece quando uma
                marca compete no jogo transacional, onde cada venda nasce do
                zero e crescer em alcance não significa crescer em marca.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── SEÇÃO 3 — VIRADA ─────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <h2
              style={{
                color: "var(--text)",
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 36,
              }}
              className="md:text-[46px]"
            >
              Existe outro jogo.
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div
              style={{
                borderLeft: "2px solid var(--blue)",
                paddingLeft: 28,
                maxWidth: 580,
                marginBottom: 32,
              }}
            >
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 18,
                  lineHeight: 2.0,
                }}
                className="md:text-xl"
              >
                Nele a compra não encerra a relação. Ela abre.
                <br />
                Nele a marca não precisa gritar pra ser lembrada. Ela já está
                lá.
                <br />
                Nele o cliente não some depois de pagar. Ele volta porque
                pertence.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={180}>
            <p
              style={{
                color: "var(--text)",
                fontSize: 18,
                lineHeight: 1.75,
                maxWidth: 560,
              }}
              className="md:text-xl"
            >
              Chamamos isso de marca relacional. É o único lugar onde trocar de
              marca significa trocar de identidade.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── SEÇÃO 4 — MANIFESTO ──────────────────────────────────── */}
      <section
        style={{ background: "radial-gradient(ellipse at 50% 60%, #2e2825 0%, #19181a 72%)", color: "var(--text)" }}
        className="px-5 py-28 md:px-10 md:py-44"
      >
        <FadeUp>
          <div
            style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}
          >
            <p
              style={{
                fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                lineHeight: 1.6,
                fontWeight: 400,
                marginBottom: 32,
                letterSpacing: "0.01em",
              }}
            >
              As pessoas usam moda para expressar quem são.
              <br />
              As pessoas usam wellness para se tornarem quem querem ser.
              <br />
              No fundo, os dois mercados vendem a mesma coisa:
              <br />
              <em>Construção de identidade.</em>
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif), Georgia, 'Times New Roman', serif",
                fontSize: "clamp(15px, 1.8vw, 20px)",
                color: "var(--text-2)",
                fontWeight: 400,
                lineHeight: 1.7,
              }}
            >
              E marca, no fundo, é identidade. A sua, e a de quem ela reúne.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ─── SEÇÃO 5 — MÉTODO ─────────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <p
              style={{
                color: "var(--text)",
                fontSize: 20,
                lineHeight: 1.5,
                marginBottom: 52,
              }}
              className="md:text-2xl"
            >
              Construímos marcas relacionais em quatro movimentos.
            </p>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Posicionamento",
                body: "Seu produto não é o seu diferencial. O território que sua marca ocupa é. A gente te ajuda a nomear o que só você pode ser.",
              },
              {
                title: "Experiência",
                body: "Um território que ninguém vê, sente ou toca não existe. A gente faz a marca sair do discurso e entrar na vida real das pessoas.",
              },
              {
                title: "Conteúdo",
                body: "Entre uma compra e a próxima, a marca pode estar presente ou pode ser esquecida. A gente garante o primeiro.",
              },
              {
                title: "Comunidade",
                body: "Quando as pessoas pertencem à marca, elas param de comparar preço. A gente constrói esse pertencimento.",
              },
            ].map((card, i) => (
              <FadeUp key={card.title} delay={i * 70}>
                <div
                  style={{
                    background: "rgba(36, 36, 37, 0.7)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "36px 32px",
                    height: "100%",
                  }}
                >
                  <p
                    style={{
                      color: "var(--accent)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: 14,
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      color: "var(--text)",
                      fontSize: 16,
                      lineHeight: 1.75,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEÇÃO 6 — PARA QUEM É ────────────────────────────────── */}
      <section
        style={{ backgroundColor: "var(--bg-2)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeUp>
            <div style={{ maxWidth: 640 }}>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 20,
                  fontWeight: 500,
                  lineHeight: 1.45,
                  marginBottom: 28,
                }}
                className="md:text-2xl"
              >
                A gente não começa do zero com ninguém.
              </p>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 18,
                  lineHeight: 1.75,
                  marginBottom: 22,
                }}
                className="md:text-xl"
              >
                Trabalhamos com fundadores que já vendem, que têm um produto
                que funciona, mas que olham pra marcas como a Lululemon, a
                Farm, a Insider, e percebem que o que elas têm não é produto.
                É o espaço que ocupam na vida das pessoas.
              </p>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: 18,
                  lineHeight: 1.75,
                }}
                className="md:text-xl"
              >
                Se você está nesse momento, é com a gente que você conversa.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── SEÇÃO 7 — FORMULÁRIO ─────────────────────────────────── */}
      <section
        id="formulario"
        style={{ backgroundColor: "var(--bg)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <FadeUp>
            <h2
              style={{
                color: "var(--text)",
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 16,
              }}
              className="md:text-[44px]"
            >
              Conta sobre a sua marca.
            </h2>
            <p
              style={{
                color: "var(--text-2)",
                fontSize: 16,
                lineHeight: 1.7,
                marginBottom: 48,
              }}
              className="md:text-lg"
            >
              A gente lê, pesquisa e em até dois dias úteis te manda uma
              leitura do que vê. Onde a marca está, o que está travando e qual
              seria o próximo passo. Sem compromisso. Sem pitch. Só clareza.
            </p>
          </FadeUp>

          {submitted ? (
            <FadeUp>
              <div
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 20,
                  padding: "48px 40px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    color: "var(--text)",
                    fontSize: 20,
                    fontWeight: 500,
                    marginBottom: 12,
                  }}
                >
                  Recebido.
                </p>
                <p
                  style={{
                    color: "var(--text-2)",
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  A gente vai ler com cuidado e te manda uma leitura em até
                  dois dias úteis.
                </p>
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={80}>
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Seu nome
                  </label>
                  <input
                    type="text"
                    placeholder="Como podemos te chamar"
                    value={form.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    onFocus={() => setFocused("nome")}
                    onBlur={() => setFocused(null)}
                    style={fieldStyle("nome")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Sua marca e o @ do Instagram
                  </label>
                  <input
                    type="text"
                    placeholder="@suamarca"
                    value={form.marca}
                    onChange={(e) => update("marca", e.target.value)}
                    onFocus={() => setFocused("marca")}
                    onBlur={() => setFocused(null)}
                    style={fieldStyle("marca")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Sua marca é
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={form.tipo}
                      onChange={(e) => update("tipo", e.target.value)}
                      onFocus={() => setFocused("tipo")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...fieldStyle("tipo"),
                        color: form.tipo ? "var(--text)" : "var(--text-2)",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option value="moda">Moda</option>
                      <option value="wellness">Wellness</option>
                      <option value="os-dois">Os dois</option>
                    </select>
                    <span
                      style={{
                        position: "absolute",
                        right: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "var(--text-2)",
                        fontSize: 10,
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Onde sua marca está hoje
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={form.momento}
                      onChange={(e) => update("momento", e.target.value)}
                      onFocus={() => setFocused("momento")}
                      onBlur={() => setFocused(null)}
                      style={{
                        ...fieldStyle("momento"),
                        color: form.momento ? "var(--text)" : "var(--text-2)",
                        cursor: "pointer",
                      }}
                    >
                      <option value="" disabled>
                        Selecione
                      </option>
                      <option value="comecando">
                        Começa a vender com consistência
                      </option>
                      <option value="depende">
                        Já vende bem, mas depende de anúncio e lançamento
                      </option>
                      <option value="referencia">
                        Vende muito e quer virar referência
                      </option>
                    </select>
                    <span
                      style={{
                        position: "absolute",
                        right: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "var(--text-2)",
                        fontSize: 10,
                      }}
                    >
                      ▾
                    </span>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    O que mais te incomoda hoje
                  </label>
                  <textarea
                    placeholder="Em uma frase, o que você sente que está travando"
                    rows={3}
                    value={form.problema}
                    onChange={(e) => update("problema", e.target.value)}
                    onFocus={() => setFocused("problema")}
                    onBlur={() => setFocused(null)}
                    style={{
                      ...fieldStyle("problema"),
                      resize: "none",
                      lineHeight: 1.65,
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      color: "var(--text-2)",
                      fontSize: 14,
                      display: "block",
                      marginBottom: 8,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Melhor e-mail ou WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="pra gente te mandar a leitura"
                    value={form.contato}
                    onChange={(e) => update("contato", e.target.value)}
                    onFocus={() => setFocused("contato")}
                    onBlur={() => setFocused(null)}
                    style={fieldStyle("contato")}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: loading
                        ? "rgba(255, 234, 223, 0.25)"
                        : "var(--blue)",
                      color: "#fff",
                      width: "100%",
                      borderRadius: 999,
                      padding: "17px 28px",
                      fontSize: 15,
                      fontWeight: 500,
                      fontFamily: "var(--font-display)",
                      border: "none",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "opacity 0.2s ease, background-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) e.currentTarget.style.opacity = "0.85";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                  >
                    {loading ? "Enviando..." : "Quero minha leitura de marca"}
                  </button>
                  <p
                    style={{
                      color: "var(--text-2)",
                      fontSize: 13,
                      textAlign: "center",
                      marginTop: 14,
                    }}
                  >
                    Sem compromisso. Sem pitch. Só clareza.
                  </p>
                </div>
              </form>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ─── FOOTER — NEWSLETTER ──────────────────────────────────── */}
      <footer
        id="newsletter"
        style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}
        className="px-5 py-20 md:px-10 md:py-28"
      >
        <div
          style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}
        >
          <FadeUp>
            <p
              style={{
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 500,
                lineHeight: 1.45,
                marginBottom: 20,
              }}
            >
              A economia de lifestyle cresce 2x mais rápido que o mundo.
            </p>
            <p
              style={{
                color: "rgba(25, 24, 26, 0.55)",
                fontSize: 16,
                lineHeight: 1.75,
                marginBottom: 40,
              }}
            >
              Nossa leitura do mercado toda semana. O que está mudando, o que
              está quebrando e o que está construindo as marcas do futuro.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              className="sm:flex-row"
            >
              <input
                type="email"
                placeholder="seu melhor e-mail"
                style={{
                  flex: 1,
                  backgroundColor: "rgba(25, 24, 26, 0.07)",
                  border: "1px solid rgba(25, 24, 26, 0.2)",
                  color: "var(--bg)",
                  borderRadius: 999,
                  padding: "15px 22px",
                  fontSize: 15,
                  fontFamily: "var(--font-display)",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: "var(--bg)",
                  color: "var(--text)",
                  borderRadius: 999,
                  padding: "15px 24px",
                  fontSize: 15,
                  fontWeight: 500,
                  fontFamily: "var(--font-display)",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Quero receber
              </button>
            </form>
          </FadeUp>
        </div>
      </footer>
    </>
  );
}
