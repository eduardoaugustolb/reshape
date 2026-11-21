import { SculptMark } from "@/components/SculptMark";
import { CopyCommand } from "@/components/CopyCommand";
import { Nav, type NavItem } from "@/components/Nav";
import { SculptComparison, SculptPasses } from "@/components/SculptStudy";

const INSTALL = 'mkdir -p ~/.agents/skills && tar -xzf ~/Downloads/reshape-skill.tar.gz -C ~/.agents/skills';

const sections: NavItem[] = [
  { id: "metodo", label: "Como funciona" },
  { id: "comparacao", label: "Comparar vistas" },
  { id: "validacao", label: "Validação" },
  { id: "skills", label: "Catálogo de skills" },
  { id: "instalacao", label: "Instalar" },
];

const steps = [
  ["Leia a referência.", "Registre a pose, a silhueta, as proporções e o que cada vista permite confirmar. Para um briefing em texto, defina critérios que possam ser observados no modelo."],
  ["Modele por passagens.", "Acerte a massa e o contorno. Trabalhe as transições e os volumes secundários antes de esculpir os detalhes."],
  ["Capture as mesmas vistas.", "Mantenha câmera, escala e luz fixas entre rodadas. Compare a silhueta de longe e examine as junções de perto."],
  ["Corrija e confira de novo.", "Comece pelo desvio que mais afeta a forma. Recapture a peça e verifique se a correção alterou as regiões vizinhas."],
];

export default function Home() {
  return (
    <div className="page reshape" id="top">
      <Nav items={sections} />

      <main className="main">
        <header className="masthead">
          <span className="masthead__brand"><SculptMark /><span>ReShape <span className="masthead__context">· skill para Blender</span></span></span>
          <a href="#instalacao">Instalar</a>
        </header>

        <h1 className="hero-title">Da silhueta<br />à superfície.</h1>
        <p className="lede">Uma skill para modelar, esculpir e revisar ativos 3D no Blender, a partir de imagens, texto ou do zero.</p>

        <SculptPasses />

        <section id="metodo" className="section">
          <div className="section__head"><h2>Como funciona</h2></div>
          <p>A ReShape leva o ciclo de comparação da Reanimate para a escultura 3D. Ela orienta o agente a inspecionar cada passagem no Blender e guardar vistas comparáveis antes de seguir.</p>
          <ol className="steps">
            {steps.map(([title, body], index) => (
              <li key={title}>
                <span className="steps__n" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <p><b>{title}</b> {body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="comparacao" className="section">
          <div className="section__head"><h2>Comparar vistas</h2></div>
          <p>Alterne a câmera nas duas versões do vaso. Observe a mudança na boca, na relação entre o gargalo e o corpo e no desenho dos sulcos.</p>
          <SculptComparison />
        </section>

        <section id="validacao" className="section">
          <div className="section__head"><h2>O que precisa passar</h2></div>
          <dl className="checks">
            <div><dt>Forma</dt><dd>Silhueta, proporções, transições e acabamento conferidos nas vistas relevantes. Regiões ocultas pela referência ficam registradas como inferidas.</dd></div>
            <div><dt>Malha</dt><dd>Triângulos, normais e defeitos de geometria verificados conforme a finalidade. Aberturas e emendas intencionais são registradas.</dd></div>
            <div><dt>Uso final</dt><dd>Confira deformação para rig, fechamento e espessura para impressão, ou custo de renderização e execução para o destino.</dd></div>
          </dl>
        </section>

        <section id="skills" className="section">
          <div className="section__head"><h2>Catálogo de skills</h2></div>
          <p>Use a ReShape para conduzir a modelagem e acrescente as skills da região e do estilo que o modelo pede.</p>
          <dl className="checks">
            <div>
              <dt>Anatomia</dt>
              <dd>36 skills com marcos anatômicos, vistas de revisão e critérios de reprovação. Use <code>$reshape-anatomia-cabeca</code> para a cabeça inteira, <code>$reshape-anatomia-face</code> para integrar os traços ou <code>$reshape-anatomia-olhos</code> para revisar olhos e pálpebras.</dd>
            </div>
            <div>
              <dt>Estilos</dt>
              <dd><code>$reshape-estilos</code> define como construir e avaliar realismo, semirrealismo, low-poly, cartoon, chibi, cel shading, argila e miniaturas. Combine decisões de forma e acabamento, como proporções cartoon com planos facetados.</dd>
            </div>
          </dl>
          <p>O catálogo completo acompanha o <a href="#instalacao">pacote de instalação</a>, no arquivo <code>reshape/references/anatomia.md</code>.</p>
        </section>

        <section id="instalacao" className="section">
          <div className="section__head"><h2>Instalar</h2></div>
          <p>O pacote inclui a ReShape, a skill de estilos e as 36 skills de anatomia. Baixe e extraia na pasta de skills do Codex. Para editar pelo MCP, abra o Blender e conecte o servidor Blender MCP ao seu agente.</p>
          <a className="download" href="/reshape/reshape-skill.tar.gz" download>Baixar pacote ReShape</a>
          <CopyCommand command={INSTALL} />
          <p>No Codex, invoque <code>$reshape</code> junto com o briefing, a imagem ou o arquivo que você quer revisar.</p>
          <div className="prompts">
            <div><span className="prompt__label">Da referência</span><span className="prompt__text"><code>$reshape</code> Modele este vaso e compare a silhueta na frente e em três quartos.</span></div>
            <div><span className="prompt__label">Da malha</span><span className="prompt__text"><code>$reshape</code> Revise as transições do ombro e confira a deformação nas poses de teste.</span></div>
          </div>
        </section>

        <footer className="footer">
          <span>ReShape · licença MIT</span>
          <span>Fluxo de comparação adaptado da <a href="https://github.com/NiazMorshed2007/reanimate">Reanimate de Niaz Morshed</a>.</span>
        </footer>
      </main>
    </div>
  );
}
