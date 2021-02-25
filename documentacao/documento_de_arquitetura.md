# CLIMB

**Andrew Costa Silva, andrew.costa@sga.pucminas.br**

**Arthur Rocha Amaral, arthur.amaral.1100245@sga.pucminas.br**

**Gabriel Moreira Chaves, gabriel.chaves.1200613@sga.pucminas.br**

**Ian Bittecourt Andrade de Jacinto, ian.andrade@sga.pucminas.br**

**João Guilherme Martins Borborema, jborborema@sga.pucminas.br**

---

Professores:

**Hugo Bastos de Paula**

**Pedro Alves de Oliveira**

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

_**Resumo**. Escrever aqui o resumo. O resumo deve contextualizar rapidamente o trabalho, descrever seu objetivo e, ao final,
mostrar algum resultado relevante do trabalho (até 10 linhas)._

---

## Histórico de Revisões

| **Data**       | **Autor**       | **Descrição**                                                           | **Versão** |
| -------------- | --------------- | ----------------------------------------------------------------------- | ---------- |
| **24/02/2021** | Ian Bittencourt | Adição das primeiras características do Moodelo Arquitetural do projeto | 1.0        |
|                |                 |                                                                         |            |
|                |                 |                                                                         |            |

## SUMÁRIO

1. [Apresentação](#apresentacao 'Apresentação') <br />
   1.1. Problema <br />
   1.2. Objetivos do trabalho <br />
   1.3. Definições e Abreviaturas <br />

2. [Requisitos](#requisitos 'Requisitos') <br />
   ' 2.1. Requisitos Funcionais <br />
   2.2. Requisitos Não-Funcionais <br />
   2.3. Restrições Arquiteturais <br />
   2.4. Mecanismos Arquiteturais <br />

3. [Modelagem](#modelagem 'Modelagem e projeto arquitetural') <br />
   3.1. Visão de Negócio <br />
   3.2. Visão Lógica <br />
   3.3. Modelo de dados (opcional) <br />

4. [Avaliação](#avaliacao 'Avaliação da Arquitetura') <br />
   4.1. Cenários <br />
   4.2. Avaliação <br />

5. [Referências](#referencias 'REFERÊNCIAS')<br />

6. [Apêndices](#apendices 'APÊNDICES')<br />

<a name="apresentacao"></a>
# 1. Apresentação

Algumas corporações optam pelo método de implantação interna, pois proporciona mais privacidade, segurança e menor custo. Além de que, em um ambiente corporativo se faz necessário a implantação de diversos sistemas. 
Entretanto, a configuração do ambiente para hospedagem de cada projeto de forma local se torna complexa quando não se tem uma equipe especializada, além de se tornar um projeto custoso. 

Dessa forma, para obtermos um parâmetro de custo, segundo o site WTSNET, no artigo [Nuvem x On-Premises: Fatores a considerar no cálculo do ROI](https://www.wtsnet.com.br/cloud/nuvem-x-on-premises-calculo-roi/), é evidenciado como é feito o cálculo ROI, que define o ROI do serviço que será utilizado. Este cálculo é feito pela equação ```(Ganho obtido - Investimento Inicial) / Investimento inicial```. Assim, podemos concluir que o custo depende da aplicação e cabe a entidade optar por qual utilizar. No entanto, não existem meios que possam agregar um bom custo e ao mesmo tempo favorecer a facilidade de implantação de uma aplicação. 

## 1.1. Problema

O Climb pretende evitar os problemas envolvendo a alta especificidade de implantação de aplicações variadas, por muitas das vezes necessitar de uma mão de obra interna especializada, além de diminuir e ou até mesmo sanar os custos de operações e manutenções dessas aplicações.  

## 1.2. Objetivos do trabalho

O objetivo principal do nosso trabalho é construir um sistema simples e prático para implantação de aplicações escalonáveis. Os objetivos específicos serão focados em desenvolver uma aplicação que fique alocada em um ambiente local (on-premise), que desfrute de uma interface amigável, por meio de uma plataforma como um serviço. Estes, serão os pontos focais da descrição arquitetural, já que, são as circunstâncias que se integram com um ambiente de hospedagem de repositórios Git, sem a necessidade de uma equipe especializada em implantações de aplicações. 

## 1.3. Definições e Abreviaturas

- **_ROI:_** vindo do inglês, _Return on Investment_ permite saber se o retorno investido será positivo ou negativo;
- **_PaaS:_** vindo do inglês, _Platform as a Service_ é um serviço de hospedagem e implementação de hardware e software.

<a name="requisitos"></a>
# 2. Requisitos

## 2.1. Requisitos Funcionais

| **ID** | **Descrição**                                      | **Prioridade** |
| ------ | -------------------------------------------------- | -------------- |
| RF001  | Integração com GitHub                              | Essencial      |
| RF002  | Integração com GitLab                              | Opcional       |
| RF003  | Painel de controle dos usuários                    | Essencial      |
| RF004  | Construção da imagem de container com Docker Build | Essencial      |
| RF005  | Construção da imagem de container com o Pack       | Desejável      |
| RF006  | Aplicativos pré-configurados                       | Opcional       |
| RF007  | Implantação das aplicação dos usuários             | Essencial      |
| RF008  | Controle de recursos alocados                      | Desejável      |
| RF009  | Configurar implantação                             | Essencial      |
| RF010  | Monitoramento (Prometheus + Grafana)               | Desejável      |
| RF011  | Visualização de informações (Mobile)               | Desejável      |
| RF012  | Lista de atividades com Rollback                   | Essencial      |

## 2.2. Requisitos Não-Funcionais

| **ID** | **Descrição**                                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| RNF001 | Deve garantir resiliência permitindo o _rollback_ para desfazer uma implantação errônea.                                 |
| RNF002 | Deve ser capaz de servir uma grande quantidade de usuários deixando um limite a critério da corporação que for utilizar  |
| RNF003 | Deve garantir que todas as hierarquias de autorizações sejam obedecidas e que os dados sensíveis estejam seguros         |
| RNF004 | Deve garantir um bom desempenho retornando respostas com limite de 5 segundos retorno.                                   |
| RNF005 | Deve garantir robustez e confiabilidade retornando respostas adequadas à execução mesmo com algum serviço indisponíveis. |

## 2.3. Restrições Arquiteturais

As restrições impostas ao projeto que afetam sua arquitetura são (por exemplo):

- O software deverá ser desenvolvido em Python/Django;
- A comunicação da API deve seguir o padrão RESTful.

## 2.4. Mecanismos Arquiteturais

_Visão geral dos mecanismos que compõem a arquitetura do sosftware baseando-se em três estados: (1) análise, (2) design e (3) implementação. Em termos de Análise devem ser listados os aspectos gerais que compõem a arquitetura do software como: persistência, integração com sistemas legados, geração de logs do sistema, ambiente de front end, tratamento de exceções, formato dos testes, formato de distribuição/implantação (deploy), entre outros. Em Design deve-se identificar o padrão tecnológico a seguir para cada mecanismo identificado na análise. Em Implementação, deve-se identificar o produto a ser utilizado na solução.
Ex: Análise (Persistência), Design (ORM), Implementação (Hibernate)._

| **Análise**       | **Design** | **Implementação** |
| ----------------- | ---------- | ----------------- |
| Persistência      |            |                   |
| Front end         |            |                   |
| Back end          |            |                   |
| Integração        |            |                   |
| Log do sistema    |            |                   |
| Teste de Software |            |                   |
| Deploy            |            |                   |

<a name="modelagem"></a>

# 3. Modelagem e projeto arquitetural

_Apresente uma visão geral da solução proposta para o projeto e explique brevemente esse diagrama de visão geral, de forma textual. Esse diagrama não precisa seguir os padrões da UML, e deve ser completo e tão simples quanto possível, apresentando a macroarquitetura da solução._

![Visão Geral da Solução](imagens/visao.png 'Visão Geral da Solução')

**Figura 1 - Visão Geral da Solução (fonte: https://medium.com)**

Obs: substitua esta imagem por outra, adequada ao seu projeto (cada arquitetura é única).

## 3.1. Visão de Negócio (Funcionalidades)

_Apresente uma lista simples com as funcionalidades previstas no projeto (escopo do produto)._

1. O sistema deve...
2. O sistema deve...
3. ...

Obs: a quantidade e o escopo das funcionalidades deve ser negociado com os professores/orientadores do trabalho.

### Descrição resumida dos Casos de Uso / Histórias de Usuário

_Nesta seção, os casos de uso devem ser resumidos. Esse detalhamento pode ser na forma de um texto sintético ou, alternativamente, você pode optar por descrever estórias de usuários seguindo os métodos ágeis. Neste caso a seção deve chamar &quot;Histórias de usuários&quot;. Lembre-se das características de qualidade das estórias de usuários, ou seja, o que é preciso para descrever boas histórias de usuários._

Exemplos de resumo de Casos de Uso:

#### UC01 – NOME DO CASO DE USO 01

| **Descrição**             |     |
| ------------------------- | --- |
| **Atores**                |     |
| **Prioridade**            |     |
| **Requisitos associados** |     |
| **Fluxo Principal**       |     |

#### UC02 – NOME DO CASO DE USO 02

| **Descrição**             |     |
| ------------------------- | --- |
| **Atores**                |     |
| **Prioridade**            |     |
| **Requisitos associados** |     |
| **Fluxo Principal**       |     |

Exemplos de Histórias de Usuário:

- Como Fulano eu quero poder convidar meus amigos para que a gente possa se reunir...

- Como Cicrano eu quero poder organizar minhas tarefas diárias, para que...

- Como gerente eu quero conseguir entender o progresso do trabalho do meu time, para que eu possa ter relatórios periódicos dos nossos acertos e falhas.

## 3.2. Visão Lógica

_Apresente os artefatos que serão utilizados descrevendo em linhas gerais as motivações que levaram a equipe a utilizar estes diagramas._

### Diagrama de Classes

![Diagrama de classes](imagens/classes.gif 'Diagrama de classes')

**Figura 2 – Diagrama de classes (exemplo). Fonte: o próprio autor.**

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

### Diagrama de componentes

_Apresente o diagrama de componentes da aplicação, indicando, os elementos da arquitetura e as interfaces entre eles. Liste os estilos/padrões arquiteturais utilizados e faça uma descrição sucinta dos componentes indicando o papel de cada um deles dentro da arquitetura/estilo/padrão arquitetural. Indique também quais componentes serão reutilizados (navegadores, SGBDs, middlewares, etc), quais componentes serão adquiridos por serem proprietários e quais componentes precisam ser desenvolvidos._

![Diagrama de componentes](imagens/componentes.png 'Diagrama de componentes')

**Figura 3 – Diagrama de Componentes (exemplo). Fonte: o próprio autor.**

_Apresente uma descrição detalhada dos artefatos que constituem o diagrama de implantação._

Ex: conforme diagrama apresentado na Figura X, as entidades participantes da solução são:

- **Componente 1** - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nunc magna, accumsan eget porta a, tincidunt sed mauris. Suspendisse orci nulla, sagittis a lorem laoreet, tincidunt imperdiet ipsum. Morbi malesuada pretium suscipit.
- **Componente 2** - Praesent nec nisi hendrerit, ullamcorper tortor non, rutrum sem. In non lectus tortor. Nulla vel tincidunt eros.

## 3.3. Modelo de dados (opcional)

_Caso julgue necessário para explicar a arquitetura, apresente o diagrama de classes ou diagrama de Entidade/Relacionamentos ou tabelas do banco de dados. Este modelo pode ser essencial caso a arquitetura utilize uma solução de banco de dados distribuídos ou um banco NoSQL._

![Diagrama de Entidade Relacionamento (ER) ](imagens/der.png 'Diagrama de Entidade Relacionamento (ER) ')

**Figura 4 – Diagrama de Entidade Relacionamento (ER) - exemplo. Fonte: o próprio autor.**

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

<a name="avaliacao"></a>

# 4. Avaliação da Arquitetura

_Esta seção descreve a avaliação da arquitetura apresentada, baseada no método ATAM._

## 4.1. Cenários

_Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos não funcionais sendo satisfeitos. Os requisitos a seguir são apenas exemplos de possíveis requisitos, devendo ser revistos, adequados a cada projeto e complementados de forma a terem uma especificação completa e auto-explicativa._

**Cenário 1 - Acessibilidade:** Suspendisse consequat consectetur velit. Sed sem risus, dictum dictum facilisis vitae, commodo quis leo. Vivamus nulla sem, cursus a mollis quis, interdum at nulla. Nullam dictum congue mauris. Praesent nec nisi hendrerit, ullamcorper tortor non, rutrum sem. In non lectus tortor. Nulla vel tincidunt eros.

**Cenário 2 - Interoperabilidade:** Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ut accumsan erat. Pellentesque in enim tempus, iaculis sem in, semper arcu.

**Cenário 3 - Manutenibilidade:** Phasellus magna tellus, consectetur quis scelerisque eget, ultricies eu ligula. Sed rhoncus fermentum nisi, a ullamcorper leo fringilla id. Nulla lacinia sem vel magna ornare, non tincidunt ipsum rhoncus. Nam euismod semper ante id tristique. Mauris vel elit augue.

**Cenário 4 - Segurança:** Suspendisse consectetur porta tortor non convallis. Sed lobortis erat sed dignissim dignissim. Nunc eleifend elit et aliquet imperdiet. Ut eu quam at lacus tincidunt fringilla eget maximus metus. Praesent finibus, sapien eget molestie porta, neque turpis congue risus, vel porttitor sapien tortor ac nulla. Aliquam erat volutpat.

## 4.2. Avaliação

_Apresente as medidas registradas na coleta de dados. O que não for possível quantificar apresente uma justificativa baseada em evidências qualitativas que suportam o atendimento do requisito não-funcional. Apresente uma avaliação geral da arquitetura indicando os pontos fortes e as limitações da arquitetura proposta._

| **Atributo de Qualidade:** | Segurança                                                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito de Qualidade** | Acesso aos recursos restritos deve ser controlado                                                                                                                                                                                                                      |
| **Preocupação:**           | Os acessos de usuários devem ser controlados de forma que cada um tenha acesso apenas aos recursos condizentes as suas credenciais.                                                                                                                                    |
| **Cenários(s):**           | Cenário 4                                                                                                                                                                                                                                                              |
| **Ambiente:**              | Sistema em operação normal                                                                                                                                                                                                                                             |
| **Estímulo:**              | Acesso do administrador do sistema as funcionalidades de cadastro de novos produtos e exclusão de produtos.                                                                                                                                                            |
| **Mecanismo:**             | O servidor de aplicação (Rails) gera um _token_ de acesso para o usuário que se autentica no sistema. Este _token_ é transferido para a camada de visualização (Angular) após a autenticação e o tratamento visual das funcionalidades podem ser tratados neste nível. |
| **Medida de Resposta:**    | As áreas restritas do sistema devem ser disponibilizadas apenas quando há o acesso de usuários credenciados.                                                                                                                                                           |

**Considerações sobre a arquitetura:**

| **Riscos:**                  | Não existe |
| ---------------------------- | ---------- |
| **Pontos de Sensibilidade:** | Não existe |
| _ **Tradeoff** _ **:**       | Não existe |

Evidências dos testes realizados

_Apresente imagens, descreva os testes de tal forma que se comprove a realização da avaliação._

<a name="referencias"></a>

# 5. REFERÊNCIAS

_Como um projeto da arquitetura de uma aplicação não requer revisão bibliográfica, a inclusão das referências não é obrigatória. No entanto, caso você deseje incluir referências relacionadas às tecnologias, padrões, ou metodologias que serão usadas no seu trabalho, relacione-as de acordo com a ABNT._

Verifique no link abaixo como devem ser as referências no padrão ABNT:

http://www.pucminas.br/imagedb/documento/DOC\_DSC\_NOME\_ARQUI20160217102425.pdf

**[1]** - _ELMASRI, Ramez; NAVATHE, Sham. **Sistemas de banco de dados**. 7. ed. São Paulo: Pearson, c2019. E-book. ISBN 9788543025001._

**[2]** - _COPPIN, Ben. **Inteligência artificial**. Rio de Janeiro, RJ: LTC, c2010. E-book. ISBN 978-85-216-2936-8._

**[3]** - _CORMEN, Thomas H. et al. **Algoritmos: teoria e prática**. Rio de Janeiro, RJ: Elsevier, Campus, c2012. xvi, 926 p. ISBN 9788535236996._

**[4]** - _SUTHERLAND, Jeffrey Victor. **Scrum: a arte de fazer o dobro do trabalho na metade do tempo**. 2. ed. rev. São Paulo, SP: Leya, 2016. 236, [4] p. ISBN 9788544104514._

**[5]** - _RUSSELL, Stuart J.; NORVIG, Peter. **Inteligência artificial**. Rio de Janeiro: Elsevier, c2013. xxi, 988 p. ISBN 9788535237016._

<a name="apendices"></a>

# 6. APÊNDICES

_Inclua o URL do repositório (Github, Bitbucket, etc) onde você armazenou o código da sua prova de conceito/protótipo arquitetural da aplicação como anexos. A inclusão da URL desse repositório de código servirá como base para garantir a autenticidade dos trabalhos._
