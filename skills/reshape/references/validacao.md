# Validação visual e técnica

## Prepare critérios verificáveis

Para cada requisito, registre a região, o alvo, a vista ou teste, a tolerância quando mensurável e a evidência esperada. Use proporções normalizadas, como largura dos ombros dividida pela altura projetada, quando faltar escala. Escolha tolerâncias compatíveis com resolução, perspectiva e finalidade. Declare-as antes da comparação. Para briefing textual, formule verificações como “silhueta afunila dos ombros à cintura na vista frontal” e associe cada decisão inferida ao briefing.

## Capture e leia cada rodada

- Registre câmera, pose, escala, enquadramento, resolução, luz e modo de sombreamento. Mantenha essas condições entre rodadas. Para comparar uma foto, alinhe pose e projeção pelos marcos confiáveis. Use sobreposição e razões apenas onde o alinhamento sustentar a medida. Uma perspectiva desconhecida reduz a confiança na profundidade. Registre quais vistas têm correspondência e quais conferem somente a coerência do modelo.
- Capture frente, perfil e três quartos, além da traseira quando a forma pedir. Isole a silhueta e use sombreamento neutro para ler volumes. Use closes nas transições e wireframe para diagnosticar a malha. Compare acabamento sob condições coerentes com o destino. Abra todas as vistas usadas no relatório.
- Inspecione, nesta ordem, pose e proporções, contorno e espaços negativos, volumes e junções, planos e artefatos de superfície, depois detalhes e acabamento. Compare as peças com a mesma escala visual. Registre o desvio na vista em que aparece e o que precisa mudar.
- Use os estados aprovado, reprovado, não verificado e não aplicável. Para um critério obrigatório, somente aprovado encerra a validação. Uma face oculta pode ter coerência verificada sem ter fidelidade à referência comprovada. Preserve a distinção entre as duas no relatório.

## Verifique malha e destino

- Meça vértices, triângulos e objetos, incluindo a malha avaliada após modificadores quando ela representar a entrega. Inspecione normais, faces degeneradas, interseções, ilhas e bordas abertas nas regiões em que são defeitos. Registre onde camadas, painéis ou aberturas são intencionais.
- Para produção em tempo real, confira os limites aplicáveis de triângulos, materiais, texturas e memória no export ou aplicativo de destino. Só reporte FPS ou tempo como medição se houver teste com cena, máquina e condições registradas. Sem orçamento explícito, reporte as contagens e o custo observado, com o limite em aberto.
- Para rig, teste poses representativas nas articulações e confira deformação e interpenetração. Para impressão, teste fechamento, espessura e escala. Para render, confira artefatos e os custos de viewport ou render quando forem relevantes. Para export solicitado, reabra ou reimporte em cena isolada e confira escala, orientação, malhas e recursos exigidos.
- Registre cada rodada com região, critério, esperado, observado, evidência, estado e correção. Após corrigir, compare com a referência e com a rodada anterior. Se o ajuste causar regressão, reverta ou refine a causa antes de prosseguir.

## Caso de calibração

Uma referência apresenta um personagem estilizado e vestido em três quartos. O candidato é um manequim frontal de blocos e cápsulas com juntas esféricas. A diferença de câmera impede medir a sobreposição direta. Mesmo assim, o candidato reprova na continuidade entre ombro e peito, na transição do quadril e no desenho das articulações. Se a roupa faz parte da entrega, seus volumes externos e sua influência no contorno também precisam aparecer. O próximo passo é capturar um três quartos compatível, corrigir proporções e esculpir as transições, depois recapturar frente, perfil e três quartos. Aprovar a malha exige inspeção própria. A imagem, sozinha, não demonstra contagem de triângulos, fechamento nem deformação sob rig.
