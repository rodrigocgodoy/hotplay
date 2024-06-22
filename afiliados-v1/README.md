![alt text](./assets/logo-insany.svg 'Insany Design')

Um Start padrão para iniciar todos os projeto que forem ser usados em HTML puro

**Recomendado usar o Yarn para instalar as dependências e executar como administrador para que não ocorra nenhum erro de permissão.**

---

## Passos para executar o projeto

Start Project.

1. `sudo yarn`
2. `gulp`

---

- ## Criando HTML

Para agilizar a criação de HTML/SCSS/JS, criei o comando

```
node create-file.js NOME_DA_PAGINA
```

Ele ja ira criar o arquivo HTML, SCSS e JS com o nome expecifico em suas respectivas pastas.

---

- ## TinyPNG

Imagens em JPG, PNG, e JPEG são automaticamente otimizadas pela API do TinyPNG, recomendo cada DEV [criar uma conta e gerar uma API KEY](https://tinypng.com/developers) pois o TinyPNG tem uma limite de 500 conversões por mês.

API key encontra-se no gulpfile.js, linha 48.

```javascript
{
    apiKey: ['API_KEY'],
    cache: true,
    log: false,
}
```

---

- ## Imagens WEBP

Ao final do projeto, caso haja nescessidade, é possivel trocar todas as tags img com jpg, png, e jpeg por WEBP, basta executar o comando dentro da pasta do projeto

```bash
node change-img.js
```

---

- ## Include de HTML

### Exemplo

index.html

```html
<!DOCTYPE html>
<html>
  <body>
    <!-- Inserção de um código HTML  -->
    @@include('./view.html')
    <!-- Inserção de um código HTML passando valores para dentro do HTML  -->
    @@include('./var.html', { "name": "haoxin", "age":12345, "socials": { "fb":
    "facebook.com/include", "tw":"twitter.com/include" } })
  </body>
</html>
```

view.html

```html
<h1>view</h1>
```

var.html

```html
<label>@@name</label>
<label>@@age</label>
<strong>@@socials.fb</strong>
<strong>@@socials.tw</strong>
```

Resultado:

```html
<!DOCTYPE html>
<html>
  <body>
    <h1>view</h1>
    <label>haoxin</label>
    <label>12345</label>
    <strong>facebook.com/include</strong>
    <strong>twitter.com/include</strong>
  </body>
</html>
```

---

- ## Minify de HTML

  Todos os arquivos HTML são minificados por padrão, caso precise do arquivo sem o minify basta identar (option + shift + f ou alt + shift + f)

---

- ## Cache CSS e JS
  Arquivos .css e .js são automaticamente chamados com ?v=(HASH gerada automaticamente toda vez que os arquivos sofrerem alterações) para que tenhamos certeza que os clientes sempre irão ver a ultima versão que subimos

---

- ## Fake API

  Caso nescessário, para agilizar projetos com consumo de API, criar um aquivo chamado

```
fake-api.json
```

dentro do mesmo criar um exemplo de como seria o retorno da API, ex.:

```javascript
{
    "nes_games": [
        {
            "name": "Super Mario Bros.",
            "img": "https://upload.wikimedia.org/wikipedia/en/0/03/Super_Mario_Bros._box.png"
        },
        {
            "name": "Super Mario Bros. 2",
            "img": "https://www.mariowiki.com/images/thumb/e/ea/SMB2_Boxart.png/1200px-SMB2_Boxart.png"
        },
        {
            "name": "Super Mario Bros. 3",
            "img": "https://hb.imgix.net/4ea099299f6af1861ff8389bde0c34b6c4957224.jpg?auto=compress,format&fit=crop&h=353&w=616&s=86d8ce7ac94fb9cbb94b6322cb630cb1"
        }
    ]
}
```
nes_games seria o retorno que esperamos da API verdadeira.

- Exemplo de como realizar uma chamada a API (fake ou real)

```javascript
  fetch('./../../fake-api.json').then((res) => {
    res.json().then((data) => {
      console.log(data);
    });
  });
```
---

- ## Publicação do projeto (HTML)

  **Não compartilhar o repositório com o cliente!!**
    Caso o cliente precise do código fonte, **APAGAR** a pasta .github e todo o conteúdo. </br>
    Caso o cliente **não** precise do código fonte, enviar somente a pasta Build

  Não precisamos mais acessar FTP e subir arquivo na mão demorando 28dias 💃🏼 🕺🏻

  Agora toda vez que criarmos uma TAG e fazer o push para o GitHub, ele automaticamente ira para o nosso servidor dev.insanydesign.com/NOME-DO-PROJETO-NO-GIT-HUB.

  **!!!!!ATENÇÃO sempre executar os comandos da TAG após o commit!!!!!**

  Para fazermos isso precisamos rodar 3 comandos no terminal do projeto apos o commit

  1. `git tag`
      >Com esse comando ele mostra quais as tags estão criadas e publicadas
  2. `git tag 0.0`
      >Este comando cria a tag com o nome '0.0' 
  3. `git push origin --tags`
      >Para finalizar enviamos as TAGs para o servidor, com isso ele automaticamente ja vai subir no nosso servidor também!

  </br>

  ```mermaid
  stateDiagram-v2
      [*] --> Commit
      Commit --> GitHub
      Commit --> Tag
      Tag --> GitHub
      Tag --> Insany
  ```
  </br>

  **Versão das Tags**</br>
    Toda vez que subir uma versão no servidor da Insany, incrementar a versão da Tag no digito direito, exemplo, subiu primeira Tag,</br> 
    `git tag 0.0` na segunda versão que subir ficaria </br>
    `git tag 0.1` e assim por diante, e ao subir para o servidor do **cliente**, atualizar a tag incrementando o da esquerda e zerando o da direita, exemplo, subimos no servidor do **cliente**, adicionamos a tag </br>
    `git tag 1.0` e se precisarmos fazer um ajuste e subir no da insany, ficaria </br>
    `git tag 1.1` apos **cliente** aprovar e subirmos no servidor dele, </br>
    `git tag 2.0`

  <br/>

  ---
  
- ## Conversão WordPress

  Projetos em WordPress não precisarão utilizar a pasta build, e terão que importar os CSS e JS com o min, exemplo, main.min.js, estes serão os arquivos minificados, e os arquivos normais main.js serão os arquivos para desenvolvimento. Ao utilizar o Script para converter os arquivos o mesmo ja muda os imports para .min.

  `node convert-html-to-php.js`
    >Script para conversão dos arquivos HTML para PHP, e alteração dos imports para .min.
  
  `gulp wp`
    >Roda o gulp específico para o WordPress, criando os arquivos .min.   
# insanyplate-wp
