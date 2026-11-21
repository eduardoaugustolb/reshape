import { CubeFocusIcon, DownloadSimpleIcon, TranslateIcon } from "@phosphor-icons/react/ssr";
import { HeaderMotion } from "@/components/HeaderMotion";
import { translate, type Locale } from "@/i18n";
import { SculptMark } from "@/components/SculptMark";
import { CopyCommand } from "@/components/CopyCommand";
import { Nav, type NavItem } from "@/components/Nav";
import { SculptComparison, SculptPasses } from "@/components/SculptStudy";

const INSTALL = 'mkdir -p ~/.agents/skills && tar -xzf ~/Downloads/reshape-skill.tar.gz -C ~/.agents/skills';

export default function Home({ locale }: { locale: Locale }) {
  const t = translate(locale);
  const sections: NavItem[] = [
    { id: "metodo", label: t("Como funciona", "How it works") },
    { id: "comparacao", label: t("Comparar vistas", "Compare views") },
    { id: "validacao", label: t("Validação", "Validation") },
    { id: "skills", label: t("Catálogo de skills", "Skill catalog") },
    { id: "instalacao", label: t("Instalar", "Install") },
  ];
  const steps = [
    [t("Leia a referência.", "Study the reference."), t("Registre a pose, a silhueta, as proporções e o que cada vista permite confirmar. Para um briefing em texto, defina critérios que possam ser observados no modelo.", "Record pose, silhouette, proportions, and what each view can verify. For a written brief, define criteria you can observe on the model.")],
    [t("Modele por passagens.", "Model in passes."), t("Acerte a massa e o contorno. Trabalhe as transições e os volumes secundários antes de esculpir os detalhes.", "Establish the mass and silhouette. Refine transitions and secondary forms before sculpting details.")],
    [t("Capture as mesmas vistas.", "Capture matching views."), t("Mantenha câmera, escala e luz fixas entre rodadas. Compare a silhueta de longe e examine as junções de perto.", "Keep camera, scale, and lighting fixed across iterations. Compare the silhouette at a distance and inspect junctions up close.")],
    [t("Corrija e confira de novo.", "Correct and recheck."), t("Comece pelo desvio que mais afeta a forma. Recapture a peça e verifique se a correção alterou as regiões vizinhas.", "Start with the discrepancy that most affects the form. Recapture the model and check for changes in adjacent regions.")],
  ];

  return (
    <div className="page reshape" id="top">
      <Nav items={sections} label={t("Nesta página", "On this page")} />

      <main className="main">
        <header className="masthead">
          <span className="masthead__brand"><SculptMark /><span>ReShape <span className="masthead__context">{t("· skill para Blender", "· Blender skill")}</span></span></span>
          <div className="masthead__actions">
            <HeaderMotion locale={locale} />
            <a className="icon-action" href={t("/", "/pt-br/")} hrefLang={t("en-US", "pt-BR")} lang={t("en-US", "pt-BR")}><TranslateIcon aria-hidden="true" />{t("English", "Português")}</a>
            <a className="icon-action" href="#instalacao"><DownloadSimpleIcon aria-hidden="true" />{t("Instalar", "Install")}</a>
          </div>
        </header>

        <h1 className="hero-title">{t("Da silhueta", "From silhouette")}<br />{t("à superfície.", "to surface.")}</h1>
        <p className="lede">{t("Uma skill para modelar, esculpir e revisar ativos 3D no Blender, a partir de imagens, texto ou do zero.", "A skill for modeling, sculpting, and reviewing 3D assets in Blender from images, a written brief, or scratch.")}</p>

        <SculptPasses locale={locale} />

        <section id="metodo" className="section">
          <div className="section__head"><h2>{t("Como funciona", "How it works")}</h2></div>
          <p>{t("A ReShape leva o ciclo de comparação da Reanimate para a escultura 3D. Ela orienta o agente a inspecionar cada passagem no Blender e guardar vistas comparáveis antes de seguir.", "ReShape brings Reanimate’s comparison process to 3D sculpting. It guides the agent through inspecting each pass in Blender and saving comparable views before moving on.")}</p>
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
          <div className="section__head"><h2 className="icon-action"><CubeFocusIcon aria-hidden="true" />{t("Comparar vistas", "Compare views")}</h2></div>
          <p>{t("Alterne a câmera nas duas versões do vaso. Observe a mudança na boca, na relação entre o gargalo e o corpo e no desenho dos sulcos.", "Switch the camera on both versions of the vase. Look for changes in the opening, the relationship between the neck and body, and the shape of the grooves.")}</p>
          <SculptComparison locale={locale} />
        </section>

        <section id="validacao" className="section">
          <div className="section__head"><h2>{t("O que precisa passar", "What needs to pass")}</h2></div>
          <dl className="checks">
            <div><dt>{t("Forma", "Form")}</dt><dd>{t("Silhueta, proporções, transições e acabamento conferidos nas vistas relevantes. Regiões ocultas pela referência ficam registradas como inferidas.", "Check silhouette, proportions, transitions, and finish in the relevant views. Record regions hidden in the reference as inferred.")}</dd></div>
            <div><dt>{t("Malha", "Mesh")}</dt><dd>{t("Triângulos, normais e defeitos de geometria verificados conforme a finalidade. Aberturas e emendas intencionais são registradas.", "Check triangles, normals, and geometry defects for the intended use. Document intentional openings and seams.")}</dd></div>
            <div><dt>{t("Uso final", "Final use")}</dt><dd>{t("Confira deformação para rig, fechamento e espessura para impressão, ou custo de renderização e execução para o destino.", "Check deformation for rigging, closure and thickness for printing, or rendering and runtime costs on the target platform.")}</dd></div>
          </dl>
        </section>

        <section id="skills" className="section">
          <div className="section__head"><h2>{t("Catálogo de skills", "Skill catalog")}</h2></div>
          <p>{t("Use a ReShape para conduzir a modelagem e acrescente as skills da região e do estilo que o modelo pede.", "Use ReShape to guide the modeling process, then add the skills for the region and style you need.")}</p>
          <dl className="checks">
            <div>
              <dt>{t("Anatomia", "Anatomy")}</dt>
              <dd>{t("44 skills com marcos anatômicos, vistas de revisão e critérios de reprovação. Use ", "44 skills with anatomical landmarks, inspection views, and rejection criteria. Use ")}<code>$reshape-anatomia-cabeca</code>{t(" para a cabeça inteira, ", " for the whole head, ")}<code>$reshape-anatomia-face</code>{t(" para integrar os traços ou ", " to integrate facial features, or ")}<code>$reshape-anatomia-olhos</code>{t(" para revisar olhos e pálpebras.", " to review eyes and eyelids.")}</dd>
            </div>
            <div>
              <dt>{t("Estilos", "Styles")}</dt>
              <dd><code>$reshape-estilos</code>{t(" define como construir e avaliar realismo, semirrealismo, low-poly, cartoon, chibi, cel shading, argila e miniaturas. Combine decisões de forma e acabamento, como proporções cartoon com planos facetados.", " defines how to model and review realism, semi-realism, low-poly, cartoon, chibi, cel shading, clay, and miniatures. Combine form and finish choices, such as cartoon proportions with faceted planes.")}</dd>
            </div>
          </dl>
          <p>{t("O catálogo completo acompanha o ", "The complete catalog is in the ")}<a href="#instalacao">{t("pacote de instalação", "installation package")}</a>{t(", no arquivo ", " at ")}<code>reshape/references/anatomia.md</code>.</p>
        </section>

        <section id="instalacao" className="section">
          <div className="section__head"><h2>{t("Instalar", "Install")}</h2></div>
          <p>{t("O pacote inclui a ReShape, as 10 skills de estilo e as 44 skills de anatomia em inglês. Baixe e extraia na pasta de skills do Codex. Para editar pelo MCP, abra o Blender e conecte o servidor Blender MCP ao seu agente.", "The package contains ReShape, 10 specialized style skills, and all 44 anatomy skills in US English. Download and extract it to the Codex skills folder. To edit through MCP, open Blender and connect the Blender MCP server to your agent.")}</p>
          <a className="download icon-action" href="/reshape/reshape-skill.tar.gz" download><DownloadSimpleIcon aria-hidden="true" />{t("Baixar pacote ReShape", "Download ReShape package")}</a>
          <CopyCommand command={INSTALL} locale={locale} />
          <p>{t("No Codex, invoque ", "In Codex, invoke ")}<code>$reshape</code>{t(" junto com o briefing, a imagem ou o arquivo que você quer revisar.", " with the brief, image, or file you want to review.")}</p>
          <div className="prompts">
            <div><span className="prompt__label">{t("Da referência", "From a reference")}</span><span className="prompt__text"><code>$reshape</code>{t(" Modele este vaso e compare a silhueta na frente e em três quartos.", " Model this vase and compare the silhouette from the front and in three-quarter view.")}</span></div>
            <div><span className="prompt__label">{t("Da malha", "From a mesh")}</span><span className="prompt__text"><code>$reshape</code>{t(" Revise as transições do ombro e confira a deformação nas poses de teste.", " Review the shoulder transitions and check deformation in the test poses.")}</span></div>
          </div>
        </section>

        <footer className="footer">
          <span>{t("ReShape · licença MIT", "ReShape · MIT license")}</span>
          <span>{t("Fluxo de comparação adaptado da ", "Comparison workflow adapted from ")}<a href="https://github.com/NiazMorshed2007/reanimate">{t("Reanimate de Niaz Morshed", "Reanimate by Niaz Morshed")}</a>.</span>
        </footer>
      </main>
    </div>
  );
}
