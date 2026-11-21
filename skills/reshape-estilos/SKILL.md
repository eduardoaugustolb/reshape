---
name: reshape-estilos
description: Defina, aplique ou revise o estilo visual de modelos 3D no Blender com a ReShape. Use para realismo, semirrealismo, cartoon, chibi, low-poly, cel shading, plasticina, miniaturas, efeitos artesanais e combinações de estilos.
---

# Estilos de modelagem 3D

Use a [ReShape](../reshape/SKILL.md) para construir, capturar e aprovar o ativo. Esta skill traduz a direção visual em decisões de geometria, superfície e apresentação. Para figuras humanas, use também o [catálogo de anatomia](../reshape/references/anatomia.md) para identificar marcos e junções antes de estilizar.

## Defina o estilo antes do bloqueio

Registre no spec cinco decisões com evidência no briefing ou na referência:

- **Silhueta e proporções.** Quais massas identificam o objeto? Quais podem mudar de tamanho, alongar ou comprimir? Quais marcos precisam permanecer legíveis?
- **Planos e bordas.** Onde a forma deve ser contínua, facetada ou chanfrada? Onde a mudança de plano define a leitura?
- **Hierarquia de detalhes.** Defina o que aparece na distância de uso, em aproximação e em close. Priorize detalhes que alteram contorno ou identificam a peça.
- **Superfície e apresentação.** Registre cor, textura, material, luz e projeção. Identifique quais aspectos precisam existir na malha e quais pertencem ao shader ou à renderização.
- **Destino.** Registre escala de exibição, uso de rig, export e orçamento de geometria, quando informado. Para estilos mistos, indique a regra de cada dimensão e região. Exemplo de spec: proporções cartoon, planos low-poly, material fosco e iluminação neutra de revisão.

Se houver referências com prioridades incompatíveis, registre qual orienta cada decisão. Quando “low-poly” for apenas um limite técnico, avalie a contagem separadamente da aparência. Quando a identidade deve ser preservada, registre quais relações de forma sustentam a semelhança antes de exagerar.

## Escolha as regras de construção e revisão

| Estilo | Modele | Inspecione e reprove |
|---|---|---|
| Realista | Construa escala, espessura e transições plausíveis. Em orgânicos, estabeleça o suporte anatômico sob os tecidos. Em objetos, confira encaixes, folgas e construção. Acrescente microdetalhe após resolver massas, planos e bordas. | Compare marcos e perfis em vistas equivalentes. Reprove volumes incompatíveis, espessuras incoerentes, junções artificiais ou detalhe que só disfarça a forma sob determinada luz. |
| Semirrealista | Preserve estrutura e marcos reconhecíveis. Escolha quais planos, bordas ou relações de volume serão simplificados ou enfatizados, e mantenha a mesma lógica pelas regiões relacionadas. | Compare a coerência do grau de simplificação entre regiões e vistas. Reprove mudanças de linguagem sem intenção, como mãos naturalistas com articulações exageradas apenas de um lado. |
| Low-poly facetado | Distribua faces para sustentar silhueta e mudanças de plano a partir das vistas de uso. Escolha arestas e normais com intenção. Reserve mais geometria para contornos, curvas importantes e deformação. | Compare em luz neutra e em movimento, se houver rig. Reprove facetas aleatórias que criam amassados, quebra de silhueta ou tremulação. Meça os triângulos no ativo exportado se houver orçamento. |
| Baixa contagem com aparência suave | Priorize a silhueta e a deformação. Defina onde usar normais suaves, arestas duras e mapas de normais se o destino os suportar. | Confira o export na iluminação de uso. Reprove silhuetas serrilhadas fora da tolerância, artefatos de normais e juntas que colapsam. Confira a malha e o mapa separadamente. |
| Cartoon | Exagere relações de tamanho e curvas que sustentem gesto, expressão e leitura. Desenhe espaços negativos, junções e direções das massas antes de finalizar superfícies. | Examine a silhueta em tamanho de uso e em vários ângulos. Reprove traços ilegíveis, exageros inconsistentes e articulações que só funcionam na vista principal. |
| Chibi | Defina a relação cabeça–corpo e a compressão de tronco e membros a partir do alvo. Preserve apoio e encaixe de pescoço, mãos e pés, mesmo com poucos detalhes. | Confira perfil, apoio e pose. Reprove cabeça sem sustentação visual, membros fundidos sem intenção ou expressões que perdem leitura em escala pequena. |
| Anime e cel shading | Construa as formas necessárias para sustentar traços e contornos. Trate proporções anime, iluminação em faixas e traço como escolhas independentes. Delimite a faixa de câmera de soluções dependentes de vista. | Confira olhos, nariz e boca em perfil e três quartos. Teste contornos e sombras no ângulo de uso. Reprove traço duplicado, faixa de sombra instável ou geometria ilegível nas vistas exigidas. |
| Argila, plasticina ou artesanal | Modele massas contínuas, bordas e irregularidades na escala do material representado. Reserve marcas de ferramenta para regiões em que a fabricação ou o acabamento as justifica. | Confira em luz suave e rasante. Reprove ruído uniforme, marcas de ferramenta que apagam planos e junções com aparência de peças soltas sem intenção. |
| Miniatura ou toy | Projete massas, espessuras e divisões visíveis no tamanho final. Represente encaixes ou emendas se fizerem parte do design. Para impressão, verifique com o processo e a escala solicitados. | Examine o contorno no tamanho de uso e as junções em close. Reprove detalhes que desaparecem, apoios incoerentes ou espessuras abaixo do requisito de fabricação. |

## Revise a leitura antes de aprovar

1. Confira a peça em material neutro e em silhueta, em frente, perfil e três quartos. Acrescente vistas da referência e da pose de uso.
2. Confira o acabamento com o material e a iluminação previstos. Para rig ou turntable, examine as vistas intermediárias em que a forma ou a sombra pode falhar.
3. Registre divergências por região com imagem, causa e correção. Uma decisão de estilo preserva a intenção documentada e mantém as formas legíveis nas vistas exigidas. Interpenetração, colapso, artefato ou deformação fora dessa intenção bloqueiam a aprovação. Corrija e recapture, ou declare a entrega parcial.

**Casos de calibração.** Um rosto low-poly pode ter bochechas angulares. Se uma delas parecer afundada e o vinco contrariar o alvo, inspecione geometria e normais em luz neutra antes de aprovar. Um personagem cartoon pode ter olhos grandes, mas o exagero continua sujeito aos testes de encaixe, leitura de perfil e fechamento das pálpebras previstos no spec.
