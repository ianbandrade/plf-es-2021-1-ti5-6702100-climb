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

| **Data**       | **Autor**       | **Descrição**                                                                                                      | **Versão** |
| -------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ | ---------- |
| **24/02/2021** | Ian Bittencourt | Adição das primeiras características do Modelo Arquitetural do projeto                                             | 1.0.0      |
| **24/02/2021** | Arthur Rocha    | Adição dos requisitos funcionais e requisitos não-funcionais                                                       | 1.1.0      |
| **25/02/2021** | Gabriel Chaves  | Adição das restrições arquiteturais e mecanismos arquiteturais                                                     | 1.2.0      |
| **26/02/2021** | Gabriel Chaves  | Remoção de falsas restrições arquiteturais                                                                         | 1.2.1      |
| **04/03/2021** | Ian Bitencourt  | Alteração das características do Modelo Arquitetural do projeto seguindo as considerações feitas pelos professores | 1.2.2      |
| **04/03/2021** | Arthur Rocha    | Correção de requisitos                                                                                             | 1.2.3      |
| **18/03/2021** | Gabriel Chaves  | Adição da imagem da Visão Geral da Solução                                                                         | 2.0.0      |
| **18/03/2021** | Ian Bittencourt | Adição de novas história de usuários, bem como definições e aberviaturas                                           | 2.1.0      |
| **25/03/2021** | Gabriel Chaves  | Adição de uma breve explicação da Visão Geral da Solução                                                           | 2.1.1      |
| **08/04/2021** | Gabriel Chaves  | Atualização da imagem da Visão Geral da Solução                                                                    | 2.1.2      |
| **25/04/2021** | Arthur Rocha    | Atualiza diagramas arquiteturais                                                                                   | 2.2.0      |
| **13/05/2021** | Gabriel Chaves  | Adição da Avaliação da Arquitetura sobre desempenho                                                                | 3.0.0      |

## SUMÁRIO

1. [Apresentação](#apresentacao 'Apresentação') <br />
   1.1. Problema <br />
   1.2. Objetivos do trabalho <br />
   1.3. Definições e Abreviaturas <br />

2. [Requisitos](#requisitos 'Requisitos') <br />
   2.1. Requisitos Funcionais <br />
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

Algumas corporações optam pelo método de implantação interna, pois proporciona mais privacidade, segurança e menor custo. Além de que, em um ambiente corporativo, se faz necessário a implantação de diversos sistemas.

Entretanto, a configuração do ambiente para hospedagem de cada projeto de forma local se torna complexa quando não se tem uma equipe especializada e também se torna um projeto custoso.

Segundo o site Ever It, no artigo [Custos da virtualização](https://www.everit.com.br/custos-da-virtualizacao-qual-o-valor-do-orcamento/), ter uma rede privada e um data center local custa em torno de R$ 31.290,93 + US$ 1.900,00, mais também há o custo da equipe de TI, que varia entre especialidades e responsabilidades.

Dessa forma, adotar um serviço que ajuda na redução do tempo de codificação, adição de funcionalidades de desenvolvimento sem adição de funcionários, desenvolvimento simplificado para diversas plataformas, suporte à equipes de desenvolvimento distribuído geograficamente e gerenciamento eficaz do ciclo de vida da aplicação é muito interessante para este cenário.

## 1.1. Problema

O problema principal é a necessidade de uma equipe com alta especificidade para a implantação de aplicações variadas. Dessa forma, o processo de implantação de novas aplicações se torna bastante custoso para as organizações, já que, precisarão contratar profissionais altamente qualificados para implantar e manter as aplicações.

## 1.2. Objetivos do trabalho

O objetivo principal do nosso trabalho é construir um sistema simples e prático para implantação de aplicações escalonáveis.

Os objetivos específicos são:

1. Desenvolver uma aplicação que fique alocada em um ambiente local (_on-premise_);
2. Desfrutar de uma alta usabilidade, focada numa interface amigável para a implantação de serviços sem uma equipe especializada;
3. Implementar o serviço de hospedagem _PaaS_.

## 1.3. Definições e Abreviaturas

- **_PaaS_:** vindo do inglês, _Platform as a Service_ é um serviço de hospedagem e implementação vde hardware e software;

- **_rollback_:** vindo do inglês, reversão, é a possibilidade de desfazer uma ação (no contexto, uma implantação);

- **Usuários diretos:** usuários que interagem diretamente com o sistema, na operação e execução de uma implantação;

- **Usuários indiretos:** usuários que interagem com a aplicação já implantada (serviço).

<a name="requisitos"></a>

# 2. Requisitos

## 2.1. Requisitos Funcionais

| **ID** | **Descrição**                                                          | **Prioridade** |
| ------ | ---------------------------------------------------------------------- | -------------- |
| RF001  | Integração com GitHub                                                  | Essencial      |
| RF002  | Painel de administração de usuários                                    | Essencial      |
| RF003  | Construção da imagem de container com Docker Build                     | Essencial      |
| RF004  | Configurar implantação da aplicação                                    | Essencial      |
| RF005  | Implantação da aplicação do usuário por meio de Webhook                | Essencial      |
| RF006  | Lista de atividades com Rollback                                       | Essencial      |
| RF007  | Diferenciar níveis de acesso de administrador e usuário                | Essencial      |
| RF009  | Visualização de informações (Mobile)                                   | Essencial      |
| RF010  | Monitoramento (Prometheus + Grafana)                                   | Desejável      |
| RF011  | Construção da imagem de container com o Buildpacks Pack                | Desejável      |
| RF012  | Integração com GitLab                                                  | Opcional       |
| RF013  | Disponibilizar aplicativos pré configurado por meio de template        | Opcional       |
| RF014  | Cadastro por meio de carga arquivo ou por meio do acesso a organização | Opcional       |

## 2.2. Requisitos Não-Funcionais

| **ID** | **Descrição**                                                                                                                                           |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| RNF001 | Deve garantir resiliência permitindo o _rollback_ para desfazer uma implantação errônea.                                                                |
| RNF002 | Deve ser capaz de servir 2000 usuários simultâneos deixando o aumento desse limite a critério da corporação com base na infraestrutura que for utilizar |
| RNF003 | Deve garantir que todas as hierarquias de autorizações sejam obedecidas e que os dados sensíveis estejam seguros                                        |
| RNF004 | Deve garantir um bom desempenho retornando respostas com limite de 5 segundos de retorno.                                                               |
| RNF005 | Deve garantir robustez e confiabilidade retornando respostas adequadas à execução mesmo com algum serviço indisponível.                                 |

## 2.3. Restrições Arquiteturais

1. O software front-end web deve ser desenvolvido em React/Next.js;
2. O software front-end mobile deve ser desenvolvido em Flutter;
3. O software back-end de comunicação com front-end deve ser desenvolvido em Nest.js;
4. O software back-end de comunicação com serviços de containers deve ser desenvolvido em GoLang;
5. A comunicação sem necessidade de ser em tempo real entre front-end e back-end deve seguir o padrão RESTful;
6. A comunicação com necessidade de ser em tempo real entre front-end e back-end deve utilizar o WebSocket;
7. A comunicação síncrona entre os back-ends devem utilizar o framework gRPC;
8. A comunicação assíncrona entre os back-ends devem utilizar o sistema de mensageria RabbitMQ;
9. Para a persistência de dados deve ser utilizado o PostgreSQL;
10. Para o cache de consultas à API deve ser utilizado o Redis;
11. Para a autorização de acesso aos repositórios de aplicativos externos deve ser utilizado o OAuth;
12. Para a escuta de envios de commits nos repositórios deve ser utilizado Webhooks;
13. Para a orquestração de containers deve ser utilizado um implementação do Kubernetes;
14. Para o controle de ingresso dos serviços do orquestrador deve ser utilizado o Traefik;
15. Para o fornecimento de certificados de criptografia TLS deve ser utilizado o Let's Encrypt;
16. Para a coleta de métricas do orquestrador e do controlador de ingresso deve ser utilizado o Prometheus;
17. Para a visualização de métricas coletadas deve ser utilizado Prometheus Datasources como o Grafana;
18. Para a resolução de nomes dos endereços IPs para o exterior deve ser utilizado o Cloudflare.

## 2.4. Mecanismos Arquiteturais

| **Análise**    | **Design**               | **Implementação** |
| -------------- | ------------------------ | ----------------- |
| Apresentação   | Front-end web            | React/Next.js     |
| Apresentação   | Front-end mobile         | Flutter           |
| Negócio        | Back-end web             | Nest.js           |
| Negócio        | Back-end web             | GoLang            |
| Comunicação    | Front-Back non-real-time | Restful           |
| Comunicação    | Front-Back real-time     | WebSocket         |
| Comunicação    | Back-Back point-to-point | gRPC              |
| Comunicação    | Back-Back broker-based   | RabbitMQ          |
| Persistência   | Relational SGBD          | PostgreSQL        |
| Cache          | In-memory                | Redis             |
| Implantação    | Container Orchestration  | Kubernetes        |
| Acesso externo | Ingress-controller       | Traefik           |
| Monitoramento  | Pull-based               | Prometheus        |

<a name="modelagem"></a>

# 3. Modelagem e projeto arquitetural

![Visão Geral da Solução](imagens/diagrama_de_visao_geral.png 'Visão Geral da Solução')

**Figura 1 - Visão Geral da Solução**

O projeto terá dois tipos de front-end, web e móvel nativo, sendo que o móvel usará uma comunicação em tempo real. Eles se comunicarão com uma aplicação de back-end, na qual possui a função de servir os dados referentes aos usuários, realizar integrações com o GitHub e Gitlab, e encaminhar solicitações de orquestração das aplicações dos usuários para outro serviço de back-end. Este outro serviço tem como objetivo realizar o gerenciamento da orquestração das aplicações, utilizando para isso o Kubernetes em conjunto com o Traefik, que serão monitorados pela dupla Prometheus e Grafana.

## 3.1. Visão de Negócio (Funcionalidades)

1. O sistema deve permitir a implantação de aplicações escolhidas pelos usuários;
2. O sistema deve disponibilizar domínios personalizados para cada aplicação;
3. O sistema deve permitr que o administrador cadastre usuários na plataforma;
4. O sistema deve permitir um usuário vincular sua conta do GitHub ou GitLab;
5. O sistema deve atualizar as aplicações implantadas com base nos Webhooks dos seus respectivos repositórios;
6. O sistema deve permitir reverter um implantação;
7. O sistema deve monitorar e gerenciar o recurso de cada aplicação implantada;
8. O sistema deve disponibilizar um painel para monitoramento de cada aplicação;

### Histórias de Usuário

- Como usuário direto, eu quero implantar minhas aplicações clonadas diretamente do GitHub ou GitLab;
- Como administrador, eu quero cadastrar usuários diretos e outros administradores;
- Como administrador, eu quero deletar usuários diretos;
- Como usuário direto, eu quero ver as minhas aplicações implantadas serem atualizadas a partir dos seus repositórios fonte;
- Como usuário direto, eu quero personalizar o domínio que dará acesso à minha aplicação implantada;
- Como usuário direto, eu quero configurar o ambiente em que minha aplicação esta rodando;
- Como usuário indireto, eu quero acessar as aplicações implantadas pelos usuários diretos;
- Como usuário direto, eu quero monitorar os recursos utilizados por minhas aplicações;
- Como usuário direto, eu quero desfazer alguma implantação.

## 3.2. Visão Lógica

_Apresente os artefatos que serão utilizados descrevendo em linhas gerais as motivações que levaram a equipe a utilizar estes diagramas._

### Diagrama de Classes

![Diagrama de classes](imagens/diagrama_de_classe.png 'Diagrama de classes')

**Figura 2 – Diagrama de classes (exemplo). Fonte: o próprio autor.**

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

### Diagrama de componentes

_Apresente o diagrama de componentes da aplicação, indicando, os elementos da arquitetura e as interfaces entre eles. Liste os estilos/padrões arquiteturais utilizados e faça uma descrição sucinta dos componentes indicando o papel de cada um deles dentro da arquitetura/estilo/padrão arquitetural. Indique também quais componentes serão reutilizados (navegadores, SGBDs, middlewares, etc), quais componentes serão adquiridos por serem proprietários e quais componentes precisam ser desenvolvidos._

![Diagrama de componentes](imagens/diagrama_de_componentes.png 'Diagrama de componentes')

**Figura 3 – Diagrama de Componentes (exemplo). Fonte: o próprio autor.**

_Apresente uma descrição detalhada dos artefatos que constituem o diagrama de implantação._

Ex: conforme diagrama apresentado na Figura 3, as entidades participantes da solução são:

- **Componente 1** - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nunc magna, accumsan eget porta a, tincidunt sed mauris. Suspendisse orci nulla, sagittis a lorem laoreet, tincidunt imperdiet ipsum. Morbi malesuada pretium suscipit.
- **Componente 2** - Praesent nec nisi hendrerit, ullamcorper tortor non, rutrum sem. In non lectus tortor. Nulla vel tincidunt eros.

Obs: Acrescente uma breve descrição sobre o diagrama apresentado na Figura 3.

<a name="avaliacao"></a>

# 4. Avaliação da Arquitetura

_Esta seção descreve a avaliação da arquitetura apresentada, baseada no método ATAM._

## 4.1. Cenários

_Apresente os cenários de testes utilizados na realização dos testes da sua aplicação. Escolha cenários de testes que demonstrem os requisitos não funcionais sendo satisfeitos. Os requisitos a seguir são apenas exemplos de possíveis requisitos, devendo ser revistos, adequados a cada projeto e complementados de forma a terem uma especificação completa e auto-explicativa._

**Cenário 1 - Resistencia a falhas:** A aplicação deverá manter em funcionamento mesmo em condições de falhas, as mensagens de exceção deverão ser retornadas para o usuário.

**Cenário 2 - Segurança:** Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ut accumsan erat. Pellentesque in enim tempus, iaculis sem in, semper arcu.

**Cenário 3 - Desempenho:** O sistema deve garantir um tempo de resposta adequado. Foi estipulado que devido a proposta do projeto ser uma aplicação que permitirá os membros de uma instituição que deseja que as suas aplicações desenvolvidas sejam expostas, a quantidade de usuários simultâneos raramente deve ultrapassar a quantidade de 100 usuários. Estipulamos que em condições de funcionamento comum o tempo de resposta não deve ultrapassar 5 segundos de resposta, então fizemos um teste com 200 usuários virtuais, por ser o dobro do que consideramos que raramente deve acontecer. Estipulamos também que o sistema deve continuar funcionando pelo menos com 2000 usuários simultâneos sem que a aplicação pare de funcionar, este valor foi pensado por ser 20 vezes a quantidade que raramente deve ter. É claro que o tempo de resposta será bem maior, porém o interesse é saber se o sistema irá continuar em funcionamento.

**Cenário 4 - Manuntenbilidade:** Para realizar a manuntenbilidade do sistema, no *front-end*,foi necessário adotar padrões e princípios de organização e código. Como organização, a criação de pastas foi feita, para que seja necessário identificar e separar cada cenário e sua responsabilidade em relação ao sistema, por exemplo: a pasta 'shared' é interessante quando há necessidade de se compartilhar, de forma global, alguma funcionalidade específica do código, que outras funcionalidades utilizariam. Além disso, a linguagem TypeScript foi escolhida para compor o sistema, pois, nela é possível determiarmos tipos, dessa forma o desenvolvedor que necessita atualizar algum trecho do código, com a ajuda do *IntelliSense* de sua IDE, conseguirá ter visibilidade de como será implantado o retorno ou recebimento desta alteração. Além disso, acatamos as documentações do [Next.JS](https://nextjs.org/) (*framework* React.JS utilizado) e do [Chakra UI](https://chakra-ui.com/) (biblioteca de UI utilizada) como guias, aplicando todos os padrões descritos nelas. Já no *back-end*, com a intenção de facilitar a visualização das rotas, adotamos a utilização do [Swagger UI](https://swagger.io/), no qual proporciona uma documentação padronizada da API, contendo um guia de como todas as chamadas são feitas. Na imagem a seguir, temos uma parte do Swagger implementado: 

![Swagger UI](imagens/swagger_ui.png 'Swagger UI')

## 4.2. Avaliação

| | | |
|-|-|-|
|**Atributo de Qualidade:**|Resistência a falhas |
|**Requisito de Qualidade:**|Ser robusto perante falhas|
|**Preocupação:**|O Sistema manter seu funcionamento  mesmo  em casos de falhas|
|**Cenário(s):**|Cenário 1|
|**Ambiente:**|Sistema em operação|
|**Estímulo:**|Entrada de informações inválidas e falha de comunicação entre sistema|
|**Mecanismo:**|Componente do tipo _tooltip_ é exibido quando um erro ocorre e suas cores verde, amarelo e vermelho representam seu grau de importância.|
|**Medida de Resposta:**|Mensagens de erros são exibidas para o usuário|
---

| **Considerações sobre a arquitetura:** |            |
| -------------------------------------- | ---------- |
| **Riscos:**                            | Não existe |
| **Pontos de Sensibilidade:**           | Não existe |
| **_Tradeoff_:**                        | Não existe |

---

| **Atributo de Qualidade:** | Tempo de resposta adequado.                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Requisito de Qualidade** | O tempo de resposta do sistema não deve ultrapassar 5 segundos.                                                                                                                                                                                                                                                                                                                                                                          |
| **Preocupação:**           | Os usuários devem ter uma boa experiência ao utilizar o sistema, não tendo que aguardar muito pelas respostas do sistema.                                                                                                                                                                                                                                                                                                                |
| **Cenário:**               | Cenário 3.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Ambiente:**              | Sistema simulando o dobro de usuários simultâneos que raramente o sistema deve ter.                                                                                                                                                                                                                                                                                                                                                      |
| **Estímulo:**              | A boa experiência do usuário ao utilizar o sistema.                                                                                                                                                                                                                                                                                                                                                                                      |
| **Mecanismo:**             | Para a avaliação foi utilizada a stack K6 (ferramenta de teste de carga utilizado) + InfluxDB (banco de dados de séries temporais para armazenar os dados coletados pelo K6) + Grafana (ferramenta para visualização interativa para visualizar os dados do InfluxDB). O teste foi realizado com 3 estágios: alcançando 200 usuários em 5 segundos, permanecendo com 200 usuários por 10 segundos e voltando a 0 usuários em 5 segundos. |
| **Medida de Resposta:**    | Foi analisado se o tempo de resposta nesse ambiente não ultrapassou os 5 segundos de tempo de resposta por meio da visualização do maior tempo de resposta relatado. Nesse ambiente o tempo de resposta máximo foi de 4,59 segundos, sendo um caso que ultrapassa muitos a quantidade de usuários simultâneos esperados, o resultado foi bem satisfatório.                                                                               |

| **Considerações sobre a arquitetura:** |            |
| -------------------------------------- | ---------- |
| **Riscos:**                            | Não existe |
| **Pontos de Sensibilidade:**           | Não existe |
| **_Tradeoff_:**                        | Não existe |

---

| **Atributo de Qualidade:** | Vários usuários simultâneos                                                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Requisito de Qualidade** | O sistema deve ser capaz de servir 2000 usuários simultâneos.                                                                                                                                                                                                                                                                                                                                                                              |
| **Preocupação:**           | O sistema deve continuar funcionando em um ambiente que ultrapasse muito a quantidade de usuários simultâneos esperados, que pode acontecer em ataques antes desse acesso malicioso ser bloqueado.                                                                                                                                                                                                                                         |
| **Cenário:**               | Cenário 3.                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Ambiente:**              | Sistema simulando uma altíssima quantidade de usuários simultâneos esperados no sistema.                                                                                                                                                                                                                                                                                                                                                   |
| **Estímulo:**              | Viabilizar que o sistema continue funcionando sem erros devido a grande quantidade de usuários simultâneos de acordo com a quantidade esperada.                                                                                                                                                                                                                                                                                            |
| **Mecanismo:**             | Para a avaliação foi utilizada a stack K6 (ferramenta de teste de carga utilizado) + InfluxDB (banco de dados de séries temporais para armazenar os dados coletados pelo K6) + Grafana (ferramenta para visualização interativa para visualizar os dados do InfluxDB). O teste foi realizado com 3 estágios: alcançando 2000 usuários em 5 segundos, permanecendo com 2000 usuários por 10 segundos e voltando a 0 usuários em 5 segundos. |
| **Medida de Resposta:**    | Foi analisado se não ocorreram falhas de resposta. Nesse ambiente não houve nenhum erro de resposta do sistema.                                                                                                                                                                                                                                                                                                                            |

| **Considerações sobre a arquitetura:** |            |
| -------------------------------------- | ---------- |
| **Riscos:**                            | Não existe |
| **Pontos de Sensibilidade:**           | Não existe |
| **_Tradeoff_:**                        | Não existe |

---

### **Evidências dos testes realizados:**

**Resistência a falhas - falha de comunicação entre sistemas**

![Mensagem de falha de comunicação entre sistema](https://user-images.githubusercontent.com/16245919/118180648-2992e780-b40d-11eb-8277-5bad060ee87f.png
'erro ao acessar rota não autenticada')

**Resistência a falhas - entrada de dados inválidas**

![Entrada de dados inválidas](imagens/entrada_dado_invalido.png
'Mensagem de aviso sobre formato incorreto de entrada')

**Tempo de resposta adequado**

![Tempo de resposta adequado](imagens/tempo_de_resposta.png 'Tempo de resposta adequado')

**Vários usuários simultâneos**

![Vários usuários simultâneos](imagens/usuarios_simultaneos.png 'Vários usuários simultâneos')

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
