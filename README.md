# 🏴‍☠️ Grand Line API

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/pt/thumb/7/75/One_Piece_Logo.png/960px-One_Piece_Logo.png?_=20240831194247" width="500" alt="One Piece Logo" />
  <br><br>
  <strong>A API canônica do universo One Piece</strong><br>
  <em>Enciclopédia de dados, cartografia interativa e controle de acesso granular</em>
</p>

---

## 🌊 O Projeto

A **Grand Line API** é o backend de um ecossistema temático de **One Piece**. O objetivo é construir uma plataforma onde o universo da obra seja modelado como dados estruturados: sagas, arcos, ilhas, personagens, eventos históricos e suas relações — tudo exposto via uma API REST documentada, segura e extensível.

O projeto foi construído como trabalho acadêmico (P1) e segue padrões de desenvolvimento profissional, incluindo arquitetura CQRS, controle de acesso baseado em permissões (RBAC) e documentação automática via Swagger.

---

## 🗺️ Fases do Projeto

| Fase | Descrição | Status |
|---|---|---|
| **Fase 1 - API & Segurança** | Criação de todos os endpoints CRUD, implementação de RBAC, autenticação JWT e documentação Swagger | ✅ Concluída |
| **Fase 2 - Regras de Negócio** | Implementação das 10 regras de domínio complexas (bloqueios, validações de consistência) | 🔄 Em andamento |
| **Fase 3 - Dados (Seeds)** | Coleta e inserção de dados reais de One Piece: sagas, arcos, personagens, ilhas e eventos | 📋 Pendente |
| **Fase 4 - Interface** | Frontend de exploração do mapa interativo com visualização dos dados da API | 📋 Futura |
| **Fase 5 - Modelagem 3D** | Modelagem das ilhas icônicas (Alabasta, Marineford, etc.) em 3D para o mapa | 📋 Futura |

---

## 🏛️ C1 — Diagrama de Contexto

> *Quem usa o sistema e como ele se encaixa no mundo.*

```mermaid
graph TD
    USER["👤 Usuário Comum<br/>(Fã de One Piece)<br/>Consulta personagens, ilhas e eventos"]
    ADMIN["🛡️ Administrador<br/>Gerencia conteúdo e usuários da plataforma"]
    API["🏴‍☠️ Grand Line API<br/>[NestJS / PostgreSQL]<br/>API REST temática de One Piece"]
    DB[("🗄️ Banco de Dados<br/>PostgreSQL")]
    FRONTEND["🗺️ Frontend<br/>(Mapa Interativo — Fase Futura)"]

    USER -->|"HTTP/REST (JWT)"| API
    ADMIN -->|"HTTP/REST (JWT + Permissões)"| API
    API -->|"Sequelize ORM"| DB
    FRONTEND -->|"Consome a API"| API
```

### Atores Principais

| Ator | Descrição |
|---|---|
| **Usuário Comum** | Autenticado via JWT. Pode consultar sagas, arcos, ilhas, personagens e eventos. Não tem acesso a operações de escrita. |
| **Administrador** | Possui um Perfil com permissões amplas. Gerencia todo o conteúdo e os próprios usuários da plataforma. |

---

## 📦 C2 — Diagrama de Containers

> *Quais são as partes técnicas do sistema e como se comunicam.*

```mermaid
graph TD
    CLIENT["🖥️ Cliente HTTP<br/>(Swagger UI / Frontend / Postman)"]

    subgraph API ["Grand Line API (NestJS)"]
        AUTH["Auth Module<br/>Login + JWT"]
        RBAC["RBAC Module<br/>Profiles & Permissions"]
        CONTENT["Content Modules<br/>Sagas, Arcs, Islands<br/>Characters, Events"]
        GUARD["PermissionsGuard<br/>Intercepta todas as rotas<br/>valida JWT + permissão"]
    end

    DB[("PostgreSQL<br/>Banco Principal")]

    CLIENT -->|"POST /auth/login"| AUTH
    CLIENT -->|"GET/POST/PATCH/DELETE<br/>com Bearer Token"| GUARD
    GUARD --> RBAC
    GUARD --> CONTENT
    AUTH --> DB
    RBAC --> DB
    CONTENT --> DB
```

### Módulos Implementados

| Módulo | Prefixo | Responsabilidade |
|---|---|---|
| `auth` | `/auth` | Login e emissão de tokens JWT |
| `users` | `/users` | Gestão de contas de usuário |
| `profiles` | `/profiles` | Perfis de acesso e vínculo com permissões |
| `permissions` | `/permissions` | Catálogo de permissões do sistema |
| `sagas` | `/sagas` | Sagas cronológicas (ex: East Blue, Marineford) |
| `arcs` | `/arcs` | Arcos dentro das Sagas |
| `islands` | `/islands` | Ilhas com coordenadas para o mapa 3D |
| `events` | `/events` | Eventos históricos ocorridos nas ilhas |
| `characters` | `/characters` | Personagens (identidade fixa) |
| `character-versions` | `/character-versions` | Versões evolutivas por arco (recompensas, status) |
| `island-character-versions` | `/island-character-versions` | Vínculo entre personagens e as ilhas que visitaram |

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Framework | NestJS v11 |
| Linguagem | TypeScript |
| ORM | Sequelize + sequelize-typescript |
| Banco de Dados | PostgreSQL |
| Arquitetura | CQRS (Command Query Responsibility Segregation) |
| Autenticação | JWT (Passport.js) |
| Documentação | Swagger / OpenAPI |
| Infraestrutura | Docker Compose |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Docker & Docker Compose instalados
- Node.js v20+

### 1. Clonar e configurar o ambiente

```bash
git clone https://github.com/arthurair3s/web-project.git
cd web-project
cp .env.example .env
```

Edite o `.env` conforme necessário. Para desenvolvimento local, os valores padrão do `.env.example` já funcionam com o Docker.

> **Dica para testes:** Defina `IGNORE_PERMISSIONS=true` no `.env` para desativar a checagem de permissões e testar os endpoints livremente.

### 2. Subir o banco de dados

```bash
docker compose up -d
```

### 3. Instalar dependências

```bash
npm install
```

### 4. Executar Migrations e Seeds

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 5. Rodar a aplicação

```bash
npm run start:dev
```

A API estará disponível em: **`http://localhost:3000`**

A documentação Swagger estará em: **`http://localhost:3000/api`**

---

## 🔐 Autenticação

Todos os endpoints (exceto `POST /auth/login`) exigem um token JWT no header:

```
Authorization: Bearer <seu_token>
```

Para obter um token, faça login com um usuário cadastrado:

```bash
POST /auth/login
{
  "username": "admin",
  "password": "sua_senha"
}
```

---

## 📄 Licença

Desenvolvido para fins acadêmicos e de demonstração técnica. Inspirado na obra de Eiichiro Oda.
