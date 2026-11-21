# Modelagem por passagens

## Operar o Blender

Use os recursos nativos do MCP para inspecionar e capturar quando estiverem disponíveis. A edição pode ser interativa ou feita inteiramente com Python via Blender MCP. O script pode criar geometria, deslocar vértices, remodelar regiões e aplicar operações nativas do Blender. Antes de cada operação, confirme o objeto ativo, a seleção, o modo e o escopo. Separe construção de massa, correção regional e acabamento em operações que possam ser inspecionadas e revertidas. Abra a captura ao final de cada passagem. Se o resultado falhar, ajuste a geometria que causa o problema e recapture antes de detalhar. Salvar o arquivo, receber sucesso na execução e obter uma malha fechada são evidências técnicas. A aprovação visual vem das vistas inspecionadas.

## Escolher uma construção

- **Orgânico.** Monte uma base contínua com topologia simples ou crie uma massa inicial unificada em cópia. Trabalhe a silhueta com deslocamentos amplos, depois mire os planos e transições com pincéis ou edição localizada. Regule a densidade antes de esculpir detalhes. Se usar remesh, confira volume perdido, dedos ou aberturas fechadas e junções involuntárias. União, remesh e suavização por si só são preparação de superfície. Ombro, cotovelo, quadril e joelho exigem volumes e transições projetados para a pose.
- **Hard surface.** Construa perfis, espessuras, encaixes e planos a partir da referência. Use modificadores reversíveis quando couber. Julgue chanfros e normais pela continuidade dos reflexos. Emendas reais, painéis e acessórios podem ser peças independentes.
- **Estilizado ou low-poly.** Preserve a leitura dos planos, o desenho das bordas e a distribuição deliberada dos polígonos. Modele a superfície contínua com controle da topologia e avalie as facetas na escala de uso. Arestas facetadas intencionais passam quando sustentam a forma.
- **Malha existente.** Identifique a origem do defeito antes de reconstruir. Preserve UVs, materiais, pesos e shape keys conforme a finalidade. Alterações de topologia podem invalidá-los. Faça a comparação na versão de trabalho antes de substituir qualquer dado.

## Ordem da forma

Acerte primeiro a relação entre marcos e massas em mais de uma vista. Refinar um plano costuma afetar dois perfis. Em seguida, resolva as transições e as peças que alteram a silhueta. Acrescente rugas, costuras, materiais ou desgaste só quando as formas que eles acompanham estiverem aprovadas. Para um personagem vestido, revise o corpo e a roupa juntos para conferir espessura, caimento e interferência, e isole camadas quando precisar localizar a causa.
