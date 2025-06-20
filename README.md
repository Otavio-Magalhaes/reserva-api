## 🍽️ Sistema de Reservas de Restaurante

Este projeto foi desenvolvido como parte de um desafio proposto por <a href="https://github.com/rafa-coelho">Rafael Coelho</a> e tem como objetivo simular um sistema de reservas de mesas em um restaurante.  
A API oferece funcionalidades essenciais para cenários reais, como autenticação de usuários, controle de mesas, reservas com horários disponíveis e validações robustas.   
É um projeto ideal para demonstrar habilidades em desenvolvimento backend com foco em boas práticas, arquitetura limpa (Clean Architecture) e princípios SOLID.

## 🛠 Tecnologias Utilizadas

### O projeto foi desenvolvido utilizando as seguintes tecnologias e ferramentas:

- **Node.js** 
- **Express**
- **TypeScript**
- **Prisma ORM** 
- **Zod** 
- **JWT (JSON Web Token)** 
- **BCrypt** 
- **Dotenv**
- **Docker** 

### Ambiente:  
- Banco de dados: **PostgreSQL** (via container Docker)
- Gerenciador de pacotes: **npm**


</br>

## 🚀 Como Rodar o Projeto Localmente

Este projeto utiliza **Docker** para subir tanto a API quanto o banco de dados PostgreSQL com facilidade.  
Siga os passos abaixo para rodar a aplicação localmente:

### 📋 Pré-requisitos

- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/) instalados em sua máquina.

---

### 🧱 Passos para executar

1. **Clone o repositório:**

```
git clone https://github.com/Otavio-Magalhaes/reserva-api.git
cd reserva-api
```


2. **Suba os containers com Docker Compose:**

```
docker-compose up --build
```

3. **Aplique as migrations no banco de dados:**

    Com os containers rodando, em um novo terminal, execute: 
    Isso aplica as migrations dentro do container onde o Prisma está instalado.

```
docker exec -it reservas-api npx prisma migrate
```

4. **Pronto! Acesse a API em:**
```
http://localhost:3000
```
5. **E a documentação Swagger:**
```
http://localhost:3000/api-docs
```

## 🗃 Variáveis de ambiente
Crie um .env na raiz do projeto

```
DATABASE_URL=postgresql://root:root@localhost:5432/reservas_db
JWT_SECRET=suaChaveSecretaAqui
```

## 📌 Funcionalidades da API

### 🔐 Autenticação (`/api/v1/auth`)
- `POST /auth/login`: Realiza o login e retorna um token JWT para autenticação nas demais rotas.



### 👤 Usuários (`/api/v1/users`)
- `POST /users`: Cria um novo usuário (nome, email, senha, role).
- `GET /users`: Lista todos os usuários (rota protegida, somente admin).



### 🍽️ Mesas (`/api/v1/tables`)
- `POST /tables`: Cria uma nova mesa. Requer autenticação com perfil de administrador.
- `GET /tables`: Lista todas as mesas.
- `PATCH /tables/:id`: Atualiza os dados de uma mesa existente (nome, capacidade, status).
- `DELETE /tables/:id`: Deleta uma mesa (somente se estiver vazia).

### 📅 Reservas (`/api/v1/reservations`)
- `POST /reservations`: 
  - Cria uma nova reserva para um usuário e mesa.
  - Valida se a mesa está disponível no horário desejado.
  - Horários permitidos: 10h às 22h, com pelo menos 30 minutos de antecedência.
- `GET /reservations`: Retorna todas as reservas do usuário autenticado.
</br>
</br>
</br>


# 🧱 Estrutura do Projeto

O projeto segue os princípios da Clean Architecture, com separação clara entre camadas:
```
src/
├── @Types/                   # Tipagens globais do projeto
├── application/              # Lógica de serviços 
│   └── services/
├── config/                   # Configurações como env
├── docs/                     # Documentação (Swagger)
├── domain/                   # Regras de negócio
│   ├── entities/             # Entidades 
│   ├── repositories/         # Class dos repositórios
│   ├── usecases/             # Casos de uso 
│   └── validators/           # Validações 
├── infrastructure/           
│   ├── database/
│   │   └── prisma/           # Repositórios Prisma ORM
│   └── middlewares/          
├── interfaces/               # Camada de entrada (Controllers, DTOs, Routes)
│   ├── controllers/
│   ├── dto/
│   ├── routes/
│   └── schemas/              # Schemas de validação Zod
├── docker-compose.yml
├── Dockerfile
├── server.ts                 # Inicialização do servidor
└── app.ts                    # Instância do Express
```
