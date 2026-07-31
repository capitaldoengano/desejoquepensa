# Capital do Engano

Site estático pronto para GitHub Pages.

## Estrutura

```text
index.html                    # Home do Capital do Engano
desejo-que-pensa/index.html   # Rota interna do Desejo que Pensa
referencias-posts.html        # Caderno visual das referências
assets/                       # Imagens, estilos e scripts
.nojekyll                     # Impede processamento do Jekyll
```

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie **o conteúdo desta pasta** para a raiz do repositório.
3. Abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a publicação.

Os caminhos são relativos e funcionam tanto em um repositório de projeto (`usuario.github.io/repositorio/`) quanto em domínio próprio.

## Posts do Instagram vinculados

- Procura amor, mas negocia por migalha: `https://www.instagram.com/p/DaG-AF5jT24/`
- Cartografia da Couraça: `https://www.instagram.com/p/DagaPlej9QJ/`
- Dados, apps e desejo: `https://www.instagram.com/p/DaJt7K4jVhq/`
- Desejo que Pensa: `https://www.instagram.com/p/DaZJoE9jdEI/`

As imagens correspondentes já estão envolvidas por links e abrem os posts em uma nova aba.

## Formulário

O formulário usa o endpoint do Google Apps Script já configurado no HTML. Ele envia os campos `email`, `turma`, `interesse`, `origem` e `consentiu`.
