# Animal Hotels

O **"Airbnb" para seus pets**. Sistema de gerenciamento de tutores e hospedagem de animais.

---

## Sobre o Projeto

Este projeto foi desenvolvido como atividade da disciplina **Programação para Internet II** (Prof. Rogério Silva), do curso de **Análise e Desenvolvimento de Sistemas – IFPI**.

O objetivo foi criar uma **Single Page Application (SPA)** robusta utilizando **React**, aplicando conceitos de:

* Componentização e Hooks
* Consumo de API REST (Json-Server)
* Roteamento (React Router Dom)
* Formulários com validações complexas
* Prevenção de erros comuns (Race Conditions)

---

## Funcionalidades

### Autenticação e Usuários

* **Cadastro de Usuário** com validação de domínio de e-mail
* **Login** com verificação simulada
* **Prevenção de múltiplos cliques** (Race Condition)

### Gestão de Tutores

* **Listagem** de todos os tutores
* **Cadastro** com:

  * Validação de telefone
  * Validação de nome (sem números ou caracteres especiais)
  * Domínios de e-mail permitidos

### Gestão de Animais

* **Listagem** com cards estilizados
* **Relacionamento automático** do animal com tutor
* **Cadastro/Edição** com:

  * Validação de raça
  * Limite de caracteres
  * Controle de status (Aguardando, Hospedado, Finalizado)

---

## Tecnologias Utilizadas

* **React + Vite**: Core da aplicação.
* **TypeScript**: Tipagem estática para maior segurança.
* **Tailwind CSS**: Estilização utilitária e responsiva.
* **Json-server**: Simulação de API REST completa.
* **React Router DOM**: Navegação entre páginas.

---

## Deploy

* **Frontend (GitHub Pages):** [https://jpaullopes.github.io/AnimalHotel/](https://jpaullopes.github.io/AnimalHotel/)
* **Backend API (Render):** [https://backend-animalhotels.onrender.com](https://backend-animalhotels.onrender.com)

> *Nota:* O backend no Render pode demorar até 1 minuto na primeira requisição.

---

## Como rodar o projeto localmente

### Pré-requisitos

* Node.js instalado

### 1. Clone o repositório

```bash
git clone https://github.com/jpaullopes/AnimalHotel.git
cd AnimalHotel
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o Servidor (API Fake)

```bash
npm run server
```

### 4. Inicie o Frontend

```bash
npm run dev
```

Acesse: **[http://localhost:5173](http://localhost:5173)**

---

## Estrutura de Pastas

```
src/
├── components/   # Componentes reutilizáveis (Header, TutorCard, etc.)
├── pages/        # Páginas da aplicação (Home, Login, Animais, Tutores, etc.)
└── App.tsx       # Configuração de Rotas
```

---

## Autores

<table>
<tr>
<td align="center">
<a href="https://github.com/PietroDev-01">
<img src="https://avatars.githubusercontent.com/PietroDev-01" width="100px;"/>
<br />
<sub><b>Álvaro Pietro</b></sub>
</a>
</td>

<td align="center">
<a href="https://github.com/jpaullopes">
<img src="https://avatars.githubusercontent.com/jpaullopes" width="100px;"/>
<br />
<sub><b>João Paulo</b></sub>
</a>
</td>
</tr>
</table>
