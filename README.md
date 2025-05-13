# Teste Técnico Montink

Esse repositório contém a implementação do teste técnico para a vaga de Front-end na Montink. Aqui você encontra uma página de produto de e‑commerce, desenvolvida com foco em flexibilidade, performance e experiência do usuário.

[👉 Acesse a demonstração do projeto aqui](https://teste-vaga-montink.vercel.app)

---

## 🚀 Tecnologias

- **Next.js** (React + SSR)
- **TypeScript**
- **Tailwind CSS**
- **API ViaCEP** para consulta de CEP
- **localStorage** para persistência de estado (15 minutos)

---

## 📦 Funcionalidades

1. **Galeria de Imagens**

   - Imagem principal (35% da largura)
   - Miniaturas clicáveis que atualizam a imagem principal
   - Zoom interativo ao passar o mouse sobre a imagem principal

2. **Detalhes do Produto**

   - Título e preço formatado em moeda BRL
   - Seletores dinâmicos de variantes (tamanho e cor)
   - Exibição de opções esgotadas (`(Esgotado)`) e `disabled` quando fora de estoque

3. **Consulta de Frete**

   - Campo de CEP com máscara `00000-000`
   - Validação de formato e chamada à API ViaCEP
   - Exibição automática do endereço completo se o CEP existir

4. **Persistência de Estado**

   - Todas as seleções do usuário (imagem, variante, CEP, endereço) são salvas em `localStorage`
   - Expiração automática após 15 minutos do último movimento do usuário

---

## 🛠️ Como Executar

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/teste-vaga-montink.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd teste-vaga-montink
   ```

3. Instale as dependências:

   ```bash
   yarn install
   ```

4. Inicie em modo de desenvolvimento:

   ```bash
   yarn dev
   ```

5. Acesse `http://localhost:3000` no seu navegador.
