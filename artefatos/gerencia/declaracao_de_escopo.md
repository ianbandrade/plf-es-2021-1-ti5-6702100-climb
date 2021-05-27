# Declaração de Escopo - PROJETO

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


## Descrição do Escopo

Construir um sistema simples e prático para implantação de aplicações escalonáveis, em um ambiente local (on-premise), utilizando uma interface amigável por meio de uma plataforma como um serviço, incluindo integração com um local de hospedagem de repositórios Git, sem a necessidade de uma equipe especializada em implantações de aplicações.


## Requisitos (do produto e/ou do projeto)

- Funcionais:
   - Integração com GitHub;
   - Painel de administração de usuários;
   - Construção da imagem de container com Docker Build;
   - Configurar implantação da aplicação;
   - Implantação da aplicação do usuário por meio de Webhook;
   - Lista de atividades com Rollback;
   - Diferenciar níveis de acesso de administrador e usuário
   - Controle de recursos alocados;
   - Monitoramento (Prometheus + Grafana);
   - Visualização de informações (Mobile);
   - Construção da imagem de container com o Buildpacks Pack;
   - Integração com GitLab;
   - Disponibilizar aplicativos pré configurado por meio de template;
   - Cadastro por meio de carga arquivo ou por meio do acesso a organização.
- Não-funcionais
   - Deve garantir resiliência permitindo o rollback para desfazer uma implantação errônea;
   - Deve ser capaz de servir 2000 usuários simultâneos deixando o aumento desse limite a critério da corporação com base na infraestrutura que for utilizar;
   - Deve garantir que todas as hierarquias de autorizações sejam obedecidas e que os dados sensíveis estejam seguros;
   - Deve garantir um bom desempenho retornando respostas com limite de 5 segundos de retorno;
   - Deve garantir robustez e confiabilidade retornando respostas adequadas à execução mesmo com algum serviço indisponível.


## Entregáveis
- Product Backlog definido;
- Termo de Abertura de Projeto (TAP);
- Declaração de escopo;
- Estrutura Analítica do Projeto (EAP);
- Protótipo inicial de interfaces;
- Versão inicial código;
- Novo release do software;
- Diagramas UML desenvolvidos/atualizados;
- Novo release do software;
- Documento de Arquitetura de Software;
- Versão final do Código front-end e back-end.

## Limites
- A capacidade do sistema dependerá do hardware disponibilizado pela organização que está utilizando o software.

## Restrições
- O software front-end web deve ser desenvolvido em React/Next.js;
- O software front-end mobile deve ser desenvolvido em Flutter;
- O software back-end de comunicação com front-end deve ser desenvolvido em Nest.js;
- O software back-end de comunicação com serviços de containers deve ser desenvolvido em GoLang;
- A comunicação sem necessidade de ser em tempo real entre front-end e back-end deve seguir o padrão RESTful;
- A comunicação com necessidade de ser em tempo real entre front-end e back-end deve utilizar o WebSocket;
- A comunicação assíncrona entre os back-ends devem utilizar o sistema de mensageria RabbitMQ;
- Para a persistência de dados deve ser utilizado o PostgreSQL;
- Para o cache de consultas à API deve ser utilizado o Redis;
- Para a autorização de acesso aos repositórios de aplicativos externos deve ser utilizado o OAuth;
- Para a escuta de envios de commits nos repositórios deve ser utilizado Webhooks;
- Para a orquestração de containers deve ser utilizado um implementação do Kubernetes;
- Para o controle de ingresso dos serviços do orquestrador deve ser utilizado o Traefik;
- Para o fornecimento de certificados de criptografia TLS deve ser utilizado o Let's Encrypt;
- Para a coleta de métricas do orquestrador e do controlador de ingresso deve ser utilizado o Prometheus;
- Para a visualização de métricas coletadas deve ser utilizado Prometheus Datasources como o Grafana;
- Para a resolução de nomes dos endereços IPs para o exterior deve ser utilizado o Cloudflare.


## Premissas
- O desenvolvimento da aplicação será iniciado após assinatura do Termo de Abertura de Projeto;
- Será desenvolvido uma aplicação com arquitetura de um sistema distribuído;
- A aplicação móvel deverá ser desenvolvida em Flutter.


## Marcos agendados

| Nome do Marco | Entregáveis Previstos |
| --- | --- |
| Primeira Sprint (18/02/2021) | Product Backlog definido  |
| Segunda Sprint (18/02/2021) |  Termo de Abertura de Projeto (TAP) / Estrutura Analítica do Projeto (EAP) / Declaração de escopo |
| Terceira Sprint (01/04/2021) | Diagramas UML desenvolvidos /Protótipo inicial de interfaces /Versão inicial código |
| Quarta Sprint (15/04/2021) | Diagramas UML desenvolvidos/atualizados / Novo release do software |
| Quinta Sprint (06/05/2021) | Diagramas UML desenvolvidos/atualizados / Novo release do software |
| Sexta Sprint (27/05/2021) | Documento de Arquitetura de Software/ Versão final do Código front-end e back-end |



