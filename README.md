# 📌 Teste Técnico Front-end – FIAP

## 📄 Descrição

Este projeto consiste na implementação de uma landing page responsiva, desenvolvida como parte do teste técnico para a FIAP, seguindo o layout e as especificações fornecidas em Figma.

A aplicação foi construída utilizando Next.js com foco em performance, organização de componentes, responsividade e animações.

Repositório:

👉 [https://github.com/pedrosouza423/fiap-landing-page](https://github.com/pedrosouza423/fiap-landing-page)

---

## 🛠️ Tecnologias Utilizadas

* Next.js
* TypeScript
* SCSS (Sass Modules)
* GSAP (animações)
* Jest (testes unitários)
* NPM

---

## ▶️ Como Executar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/pedrosouza423/fiap-landing-page.git
cd fiap-landing-page
```

---

### 2. Instalar dependências

```bash
npm install
```

---

### 3. Executar em modo desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

### 4. Build de produção (opcional)

```bash
npm run build
npm start
```

---

## 🧪 Executar Testes

O projeto conta com testes unitários implementados com Jest.

Para rodar os testes:

```bash
npm test
```

Ou:

```bash
npm run test
```

---

## 📱 Responsividade

O projeto foi desenvolvido com foco em adaptação para diferentes tamanhos de tela.

### Resoluções testadas:

* ✅ 2560x1440
* ✅ 2560x1080
* ✅ 1920x1080 (principal)
* ✅ 1600x900
* ✅ 1440x900
* ✅ 1366x768
* ✅ 414x736 (mobile principal)

A versão mobile foi desenvolvida separadamente da versão desktop, com ajustes específicos de layout e comportamento.

---

## 🎬 Animações

Foram aplicadas animações em praticamente todas as seções da aplicação utilizando GSAP, incluindo:

* Navbar (barra de progresso)
* Header
* Marquee
* Intro
* Cursos
* FAQ

A seção **Water Transition** foi mantida sem animação, conforme decisão técnica.

Além disso, há diferenciação de comportamento entre desktop e mobile para melhor experiência do usuário.

---

## 📐 Observações de Layout

### Espaçamento dos Cursos

No layout original do Figma, o espaçamento horizontal entre o título dos cursos e suas tags apresenta pequenas variações, sem um valor fixo definido.

Para manter consistência visual, foi adotado um espaçamento médio de:

```
26px (1.625rem)
```

entre esses elementos.

---

## 💡 Decisões Técnicas

* Separação entre estilos mobile e desktop
* Uso de rem para escalabilidade
* Componentização modular
* Respeito a prefers-reduced-motion
* Water oculto no mobile para performance
* SCSS Modules para organização
* Estrutura orientada a componentes

---

## 🌐 Compatibilidade

Testado nos principais navegadores modernos:

* Chrome
* Firefox
* Edge

---

## 👤 Autor

Pedro Henrique Fernandes Souza

---

## 📎 Observação Final

O projeto foi desenvolvido respeitando o escopo proposto, buscando fidelidade ao layout, qualidade de código, responsividade e boas práticas de desenvolvimento front-end.
