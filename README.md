# Climb

Este trabalho está inserido em um contexto de ferramentas de implantação de aplicações baseadas em tecnologia de containerização que são executadas em ambientes corporativos, mais especificamente, as corporações que ainda optam por questões de segurança ao modelo de execução das aplicações em servidores _on premises_. A solução é baseada no modelo de plataforma como serviço, no qual é destinado a auxiliar o processo de implantação de aplicações em equipes não especializadas e não técnicas, de modo que a solução possa ser trazer benefícios semelhantes aos serviços oferecidos Paas em nuvem, como por exemplo, Heroku da Salesforce.

Além disso, a solução possui características de sistemas distribuídos como a comunicação em tempo real para o monitoramento, uso de sistema de mensageria para o processamento de tarefas em fila e execução da solução cliente _web_ e móvel.

## Integrantes

- Andrew Costa Silva
- Arthur Amaral Rocha
- Gabriel Moreira Chaves
- Ian Bittencourt Andrade Jacinto
- João Guilherme Martins Borborema

## Orientadores

- Hugo Bastos De Paula
- Pedro Alves De Oliveira

## Instruções de utilização

### Pré requisitos

- Docker `v20.10.x ou superior`
- Docker compose `v1.29.x ou superior`

### Inicializando o Climb

Para iniciar o Climb você deve ir ao diretório `codigo` onde encontrasse dois arquivos, o `docker-compose` que será utilizado para fazer o _bulid_ das imagens de cada serviço e o `.env.example` que contém os exemplos das variáveis de ambiente que devem ser inicializadas antes de rodar o _docker-compose_.

- Crie uma cópia do do `.env.example` e renomeie para `.env`. O arquivo terá o seguinte conteúdo:

```txt
/*golang*/

HOST=

DOCKER_ADDRESS=
DOCKER_PORT=

REGISTRY_ADDRESS=
REGISTRY_PORT=

RABBITMQ_HOST=

/*node*/

NODE_PUBLIC_API_HOST=
NODE_PROMETHEUS_HOST=

/*frontend*/

NEXT_PUBLIC_HOST=
NEXT_PUBLIC_DASHBOARD_HOST=

/*Git credentials*/

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
PUBLIC_GITHUB_SCOPE="repo"

GITLAB_CLIENT_ID=
GITLAB_CLIENT_SECRET=
PUBLIC_GITLAB_SCOPE="api"
```

- Preencha com os dados do ambiente. Segue um exemplo preenchido pelo time de desenvolvimento:

```txt
/*golang*/

HOST=

DOCKER_ADDRESS=
DOCKER_PORT=

REGISTRY_ADDRESS=
REGISTRY_PORT=

RABBITMQ_HOST=

/*node*/

NODE_PUBLIC_API_HOST=https://calm-pig-49.loca.lt /*usando localtunnel para expor a porta 3333*/
NODE_PROMETHEUS_HOST=http://climb.codes:9090

/*frontend*/

NEXT_PUBLIC_HOST=localhost:3000 /*usando o endereço do frontend*/
NEXT_PUBLIC_DASHBOARD_HOST=http://climb.codes:3000

/*Git credentials*/

/*Nessa seção substitua os '*' pelas credencias do git*/

GITHUB_CLIENT_ID="********"
GITHUB_CLIENT_SECRET="********************************"
PUBLIC_GITHUB_SCOPE="repo"

GITLAB_CLIENT_ID="********"
GITLAB_CLIENT_SECRET="*********************************"
PUBLIC_GITLAB_SCOPE="api"
```

- Coloque o arquivo de configuração do kubernetes na pasta `kubernetes` com o nome `config`.
- Para preparar a máquina que irá executar o kubernetes execute o install.sh da pasta `setup`, com a variável de ambiente DNS_TOKEN do Cloudflare. Após isso para expor os serviços basta executar o comando k8s-start na máquina.
- Execute o comando:

```bash
docker-compose up --build
```

Ao final da execução, terá criado os containers expostos nas seguintes portas:

- frontend: 3000
- api-node: 3333
- postgres: 5432
- rabbitmq: 15672

### Acessando a aplicação

Para acessar a aplicação basta navegar até `localhost:3000` e acessar utilizando as credenciais:

```
e-mail: admin@example.com
senha: password
```

Para acessar a documentação da api-node é possivél navegar até `localhost:3333/swagger`

## Histórico de versões

- 0.1.1
  - CHANGE: Atualização das documentacoes. Código permaneceu inalterado.
- 0.1.0
  - Implementação da funcionalidade X pertencente ao processo P.
- 0.0.1
  - Trabalhando na modelagem do processo de negócios.
