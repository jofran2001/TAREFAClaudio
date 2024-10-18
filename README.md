# Lista de Tarefas 

## Descrição
O CRUD de Lista de Tarefas é uma aplicação web simples que permite aos usuários gerenciar suas tarefas diárias de forma eficiente. A sigla CRUD refere-se às quatro operações básicas que podem ser realizadas em um sistema de gerenciamento de dados: Criar, Ler, Atualizar e Excluir.

Funcionalidades:
Criar: Os usuários podem adicionar novas tarefas, especificando o nome da tarefa e seu status (concluída ou não concluída).
Ler: A aplicação permite que os usuários visualizem todas as tarefas cadastradas, apresentando informações como nome e status de cada tarefa.
Atualizar: Os usuários podem editar as informações de uma tarefa existente, como seu nome ou status, para refletir mudanças nas suas prioridades ou no seu progresso.
Excluir: Os usuários têm a opção de remover tarefas que não são mais necessárias, mantendo a lista organizada e relevante.
Esse sistema é ideal para quem busca uma maneira simples e eficaz de gerenciar suas atividades diárias, promovendo a produtividade e a organização.



## Pré-requisitos
Antes de executar a API, certifique-se de ter os seguintes pré-requisitos instalados:

- [Node.js](https://nodejs.org/) (versão X.X.X ou superior)
- [npm](https://www.npmjs.com/) ou [Yarn](https://yarnpkg.com/) (gerenciador de pacotes)

## Instalação
Para instalar as dependências do projeto, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/jofran2001/TAREFAClaudio.git
   cd 
2. Inicie a API:
   ```bash
   node index.js
Nesse momento, o projeto estará rodando em http://localhost:3000   

# Rotas ThunderClient

<details

## 1. Ver todas as tarefas
   - Rota: GET /tarefas
   - Descrição: Retorna todas as tarefas já cadastradas.
   - Exemplo de Resposta:
    
    [
     {
        "id": 1,
        "nome": "cortar grama",
        "status": false
    },
    {
        "id": 2,
        "nome": "cortar árvore",
        "status": true
     }
    ]
   

## 2. Adicionar uma nova tarefa
   - Rota: POST /tarefas
   - Descrição: Adiciona uma nova tarefa. O status é false por padrão (não concluído).
   - Corpo da Requisição:
   ```
   {
     "nome": "Nome da tarefa"
   }
   ```
   - Exemplo de Resposta:
   ```
   {
    "id": 3,
    "nome": "Nome da tarefa",
    "status": false
   }
   ```

## 3. Atualizar uma tarefa existente
   - Rota: PUT /tarefas/:id
   - Descrição: Atualiza uma tarefa existente com base no id, permitindo modificar o nome e o status.
   - Corpo da Requisição:
   ```
   {
    "nome": "Novo nome da tarefa",
    "status": true
   }
   ```
   - Exemplo de Resposta:
   ```
   {
    "id": 1,
    "nome": "Novo nome da tarefa",
    "status": true
   }
   ```

## 4. Excluir uma tarefa
   - Rota: DELETE /tarefas/:id
   - Descrição: Remove uma tarefa da lista com base no id.
   

## 5. Filtrar tarefas por status
   - Rota: GET /tarefas?status=true ou GET /tarefas?status=false
   - Descrição: Filtra as tarefas de acordo com o status (Verdadeiro ou Falso).
   - Exemplo de Resposta:
   ```
   [
    {
     "id": 2,
     "nome": "cortar grama",
     "status": true
    }
   ]
   ```
</details>
<br>

