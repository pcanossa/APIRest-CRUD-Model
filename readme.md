# Documentação da API de Produtos

Esta é a documentação oficial da API criada de modelo, para Gerenciamento de Produtos. A API permite realizar operações de CRUD (Criar, Ler, Atualizar e Deletar) para produtos.

## URL Base

Todas as URLs dos endpoints mencionados nesta documentação são relativas à seguinte URL base:

```
http://localhost:3000
```

## Autenticação

Atualmente, a API é pública e não requer autenticação para aceder aos seus recursos.

## Pré-requisitos e Instalação

Para executar esta API localmente, certifique-se de que possui os seguintes pré-requisitos instalados em seu ambiente:

* **Node.js** (versão 14 ou superior recomendada)
* **npm** (geralmente instalado com o Node.js)
* Um servidor de banco de dados **MySQL** em execução.

### Instalação das Dependências

Após clonar o repositório do projeto, navegue até a pasta raiz e instale as dependências necessárias executando o seguinte comando:

```bash
npm install
```

Este comando irá instalar as seguintes bibliotecas principais, definidas no arquivo `package.json`:

* **`express`**: Framework web para criar o servidor e gerenciar as rotas da API.
* **`mysql2`**: Cliente para conectar a aplicação ao banco de dados MySQL, com suporte a *Prepared Statements* para segurança.
* **`dotenv`**: Para carregar variáveis de ambiente (como credenciais do banco de dados) de um arquivo `.env`.
* **`joi`**: Para validação dos dados de entrada (schema validation) nos endpoints.

---

## Endpoints da API

A seguir estão detalhados todos os endpoints disponíveis.

### 1. Criar um Novo Produto

Cria um novo registo de produto no banco de dados.

* **Método:** `POST`
* **Endpoint:** `/api/products`
* **Corpo da Requisição (Body):**
    É necessário enviar um objeto JSON com os seguintes campos:

| Campo                | Tipo    | Descrição                               | Obrigatório |
| -------------------- | ------- | --------------------------------------- | ----------- |
| `nome`               | String  | O nome do produto (mínimo 3 caracteres) | Sim         |
| `descricao`          | String  | Uma descrição opcional para o produto   | Não         |
| `preco`              | Number  | O preço do produto (deve ser positivo)  | Sim         |
| `quantidade_estoque` | Integer | A quantidade em estoque (mínimo 0)      | Sim         |

**Exemplo de Corpo (JSON):**

```json
{
    "nome": "Smartphone Modelo X",
    "descricao": "Smartphone com 128GB de armazenamento e câmera de 48MP.",
    "preco": 1999.90,
    "quantidade_estoque": 50
}
```

* **Respostas:**
    * **`201 Created` (Sucesso):** Retorna o objeto do produto recém-criado, incluindo o seu `id` gerado pelo sistema.
        ```json
        {
            "id": 1,
            "nome": "Smartphone Modelo X",
            "descricao": "Smartphone com 128GB de armazenamento e câmera de 48MP.",
            "preco": 1999.9,
            "quantidade_estoque": 50
        }
        ```
    * **`400 Bad Request` (Erro de Validação):** Ocorre se os dados enviados não estiverem de acordo com as regras.
        ```json
        {
            "message": "Dados inválidos",
            "details": [
                {
                    "message": "\"preco\" must be a positive number",
                    // ... outros detalhes de erro
                }
            ]
        }
        ```

### 2. Listar Todos os Produtos

Retorna uma lista com todos os produtos cadastrados.

* **Método:** `GET`
* **Endpoint:** `/api/products`
* **Resposta:**
    * **`200 OK` (Sucesso):** Retorna um array de objetos, onde cada objeto é um produto.
        ```json
        [
            {
                "id": 1,
                "nome": "Smartphone Modelo X",
                "descricao": "Smartphone com 128GB de armazenamento e câmera de 48MP.",
                "preco": "1999.90",
                "quantidade_estoque": 50,
                "data_criacao": "2025-07-09T14:20:10.000Z",
                "data_atualizacao": "2025-07-09T14:20:10.000Z"
            },
            {
                "id": 2,
                "nome": "Notebook Gamer Pro",
                "descricao": "Notebook com placa de vídeo dedicada e 16GB RAM.",
                "preco": "5499.00",
                "quantidade_estoque": 15,
                "data_criacao": "2025-07-09T14:22:15.000Z",
                "data_atualizacao": "2025-07-09T14:22:15.000Z"
            }
        ]
        ```

### 3. Buscar Produto por ID

Recupera as informações de um produto específico através do seu ID.

* **Método:** `GET`
* **Endpoint:** `/api/products/:id`
* **Parâmetros da URL:**
    * `id` (Integer): O ID único do produto que deseja buscar.
* **Respostas:**
    * **`200 OK` (Sucesso):** Retorna o objeto do produto correspondente ao ID.
        ```json
        {
            "id": 2,
            "nome": "Notebook Gamer Pro",
            "descricao": "Notebook com placa de vídeo dedicada e 16GB RAM.",
            "preco": "5499.00",
            "quantidade_estoque": 15,
            "data_criacao": "2025-07-09T14:22:15.000Z",
            "data_atualizacao": "2025-07-09T14:22:15.000Z"
        }
        ```
    * **`404 Not Found` (Erro):** Ocorre se nenhum produto com o ID fornecido for encontrado.
        ```json
        {
            "message": "Produto não encontrado."
        }
        ```

### 4. Atualizar um Produto

Modifica os dados de um produto existente.

* **Método:** `PUT`
* **Endpoint:** `/api/products/:id`
* **Parâmetros da URL:**
    * `id` (Integer): O ID do produto a ser atualizado.
* **Corpo da Requisição (Body):**
    * Um objeto JSON contendo os campos a serem atualizados. A estrutura é a mesma da criação de produto.
* **Respostas:**
    * **`200 OK` (Sucesso):** Retorna um objeto com os novos dados do produto.
        ```json
        {
            "id": 2,
            "nome": "Notebook Gamer Pro v2",
            "descricao": "Notebook com placa de vídeo dedicada e 32GB RAM.",
            "preco": 5999.00,
            "quantidade_estoque": 10
        }
        ```
    * **`400 Bad Request` (Erro de Validação):** Se os novos dados forem inválidos.
    * **`404 Not Found` (Erro):** Se o ID do produto a ser atualizado não existir.

### 5. Deletar um Produto

Remove permanentemente um produto do banco de dados.

* **Método:** `DELETE`
* **Endpoint:** `/api/products/:id`
* **Parâmetros da URL:**
    * `id` (Integer): O ID do produto a ser deletado.
* **Respostas:**
    * **`204 No Content` (Sucesso):** Indica que a operação foi bem-sucedida. Nenhuma informação é retornada no corpo da resposta.
    * **`404 Not Found` (Erro):** Ocorre se o ID do produto a ser deletado não existir.
        ```json
        {
            "message": "Produto não encontrado para exclusão."
        }
        