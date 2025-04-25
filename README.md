# Golden Movie Studio
### Sevidor em memória para treino dos alunos da Jornada EBAC de QA 

Referência: https://golden-movie-studio.vercel.app/

## Clonando e executando em sua máquina

### Pré-requisito:

-Node.js - Você encontra em: https://nodejs.org/en/

-Visual Studio Code ( ou editor de sua prefrência) - você encontra em: https://code.visualstudio.com/download

-Git: você encontra em: https://git-scm.com/downloads

Via terminal, rode os seguintes comandos:
```  
git clone https://github.com/EBAC-QE/server-gms.git
```
```
cd server-gms
```

#### Para instalar as dependencias:
```
npm install 
```

#### Para subir o servidor e o banco:
```
npm start
```
O banco funciona em memória em http://localhost:3000

A documentação Swagger roda em http://localhost:3000/api-docs/ 

Os dados ficam armazenados em seu projeto no arquivo **cadastro.db** que é criado só após execução do server.  

Você pode visualizar com o plugin do vscode sqlite view

Use o postman para fazer os testes iniciais. UrlBase: http://localhost:3000 

### Bom Jornada ;) 
Fábio & José Ernesto

Qualidade de software
Apoio: Leonardo Souza e Aline Keiko




