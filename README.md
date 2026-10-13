# Mochila de viagem

Lista de itens de viagem que pratica eventos, criação de elementos e armazenamento no navegador.

## Tecnologias

HTML, CSS e JavaScript. Sem framework de interface.

## Executar

Na raiz do repositório, com Python 3 instalado:

```sh
python -m http.server 8000
```

Abra http://localhost:8000/.

## Recursos e melhorias

- Adicionar nomes e quantidades inteiras positivas; repetir o nome atualiza a quantidade.
- Remover itens com botões identificados, mensagens de estado e foco no formulário.
- Texto do usuário não é interpretado como HTML. Dados inválidos no armazenamento não interrompem a página.
- Layout responsivo que preserva a mochila desenhada em CSS.

## Testes

Com Node.js 18 ou superior, execute na raiz:

```sh
node --test tests/*.test.cjs
```

Os testes de regressão usam o test runner nativo, DOM e serviços simulados, sem instalar dependências. Cobrem fluxos específicos de lógica, não substituem testes visuais, de acessibilidade ou integração em navegador real.

## Escopo e limitações

A lista fica no localStorage deste navegador, sem sincronização ou servidor. Se o armazenamento estiver bloqueado, a página avisa; mudanças podem se perder ao fechar.

## Contexto

Projeto de estudos de Eduardo (EduT3). A proposta e os recursos originais foram preservados; as melhorias priorizam correção, uso por teclado, adaptação de layout e documentação.

### Links registrados na versão original

- https://mochila-javascript-one.vercel.app

Esses links foram preservados como referência e não representam publicação desta revisão.
