import Link from "next/link";
import { BookOpenIcon, CubeFocusIcon, DownloadSimpleIcon, TranslateIcon } from "@phosphor-icons/react/ssr";
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
    [t("Obtenha uma referência visual.", "Obtain a visual reference."), t("Envie uma imagem ou autorize a busca. Registre a pose, a silhueta, as proporções e o que cada vista permite confirmar.", "Attach an image or authorize a search. Record the pose, silhouette, proportions, and what each view can verify.")],
    [t("Modele por passagens.", "Model in passes."), t("Acerte a massa e o contorno. Trabalhe as transições e os volumes secundários antes de esculpir os detalhes.", "Establish the mass and silhouette. Refine transitions and secondary forms before sculpting details.")],
    [t("Compare com a referência.", "Compare with the reference."), t("Coloque as imagens lado a lado. Sobreponha vistas alinháveis e confira a silhueta, os marcos e as junções em recortes.", "Put the images side by side. Overlay compatible views and check the silhouette, landmarks, and junctions in close-ups.")],
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
            <a className="icon-action" href={t("/", "/pt-br")} hrefLang={t("en-US", "pt-BR")} lang={t("en-US", "pt-BR")}><TranslateIcon aria-hidden="true" />{t("English", "Português")}</a>
            <Link className="icon-action" href="/docs"><BookOpenIcon aria-hidden="true" />{t("Documentação", "Documentation")}</Link>
            <a className="icon-action" href="#instalacao"><DownloadSimpleIcon aria-hidden="true" />{t("Instalar", "Install")}</a>
          </div>
        </header>

        <h1 className="hero-title">ReShape<br />{t("Skill de modelagem 3D", "3D modeling skill")}</h1>
        <p className="lede">{t("Modele no Blender com seu agente de IA. Crie modelos 3D a partir de referências visuais, esculpa formas realistas ou low-poly e revise malhas existentes.", "Use your AI agent for 3D modeling in Blender. Create models from visual references, sculpt realistic or low-poly forms, and review existing meshes.")}</p>

        <SculptPasses locale={locale} />

        <section id="metodo" className="section">
          <div className="section__head"><h2>{t("Como funciona", "How it works")}</h2></div>
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
              <dd>{t("Cinco skills por região com guias locais de construção e revisão. Use ", "Five regional skills with local construction and review guides. Use ")}<code>$reshape-anatomy-head</code>{t(" para a cabeça e consulte o guia de olhos e pálpebras quando precisar revisar essa região.", " for the head and open the eyes and eyelids guide when reviewing that area.")}</dd>
            </div>
            <div>
              <dt>{t("Estilos", "Styles")}</dt>
              <dd><code>$reshape-styles</code>{t(" define como construir e avaliar realismo, semirrealismo, low-poly, cartoon, chibi, cel shading, argila e miniaturas. Combine decisões de forma e acabamento, como proporções cartoon com planos facetados.", " defines how to model and review realism, semi-realism, low-poly, cartoon, chibi, cel shading, clay, and miniatures. Combine form and finish choices, such as cartoon proportions with faceted planes.")}</dd>
            </div>
          </dl>
          <p>{t("O catálogo completo acompanha o ", "The complete catalog is in the ")}<a href="#instalacao">{t("pacote de instalação", "installation package")}</a>{t(", no arquivo ", " at ")}<code>reshape/references/anatomy.md</code>.</p>
        </section>

        <section id="instalacao" className="section">
          <div className="section__head"><h2>{t("Instalar a skill ReShape", "Install the ReShape skill")}</h2></div>
          <p>{t("O pacote inclui a ReShape, 10 skills de estilo e cinco skills de anatomia em inglês. Use a ReShape com Codex, Claude Code, Cursor, Antigravity ou outro agente que carregue skills. Instale o pacote na pasta de skills do seu agente. Para editar pelo MCP, abra o Blender e conecte o servidor Blender MCP ao seu agente.", "The package contains ReShape, 10 style skills, and five anatomy skills in US English. Use ReShape with Codex, Claude Code, Cursor, Antigravity, or another agent that can load skills. Extract the package to your agent’s skills directory. To edit through MCP, open Blender and connect the Blender MCP server to your agent.")}</p>
          <a className="download icon-action" href="/reshape/reshape-skill.tar.gz" download><DownloadSimpleIcon aria-hidden="true" />{t("Baixar pacote ReShape", "Download ReShape package")}</a>
          <h3>{t("Instalação no Codex", "Install in Codex")}</h3>
          <CopyCommand command={INSTALL} locale={locale} />
          <p>{t("Se estiver atualizando, mova as pastas antigas de anatomia para um backup fora do diretório de skills e reinicie o Codex após instalar o pacote.", "For upgrades, move the old anatomy folders to a backup outside the skills directory and restart Codex after installing the package.")}</p>
          <p>{t("No Codex, invoque ", "In Codex, invoke ")}<code>$reshape</code>{t(" junto com o briefing, a imagem ou o arquivo que você quer revisar.", " with the brief, image, or file you want to review.")}</p>
          <div className="prompts">
            <div><span className="prompt__label">{t("Da referência", "From a reference")}</span><span className="prompt__text"><code>$reshape</code>{t(" Modele este vaso e compare a silhueta na frente e em três quartos.", " Model this vase and compare the silhouette from the front and in three-quarter view.")}</span></div>
            <div><span className="prompt__label">{t("Da malha", "From a mesh")}</span><span className="prompt__text"><code>$reshape</code>{t(" Revise as transições do ombro e confira a deformação nas poses de teste.", " Review the shoulder transitions and check deformation in the test poses.")}</span></div>
          </div>
        </section>

        <footer className="footer">
          <span>{t("ReShape · licença MIT", "ReShape · MIT license")}</span>
        </footer>
      </main>
    </div>
  );
}
