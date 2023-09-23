# Tray Chrome extension

Extensão do chrome com recursos que facilitam o trabalho com lojas Tray.
## Recursos
### Aba Loja
#### Dados da loja
- ID da loja
- ID da sessão
- Código do GTM
- Código do GA4
- Código do Pixel do Facebook

#### Recursos úteis
- Remover Tema
- Remover Scripts Externos
- Report de scripts inlines bloqueados por CSP
#### Histórico de uso da extensão
- Histórico das últimas 4 lojas visitadas.
  
### Aba Ferramentas
- Gerar CPF com um click
- Limpar localStorage
- Whats My Dns
- Pagespeed
- Search Console
- Sitemap
- Robots
- Tag Assistant
- Documentação de APIs
- Documentação de Temas
## Uso

Para usar a versão simples no seu navegador, basta seguir as orientações https://github.com/Ricardofreitasdev/Tray-chrome-extension/tree/build#uso 

## Desenvolvimento

Clone o repositório

```sh
git clone https://github.com/Ricardofreitasdev/Tray-chrome-extension.git
```

Entre na pasta do projeto

```sh
cd Tray-chrome-extension
```

Instale as dependencias 
```sh
yarn install
```

Execute a aplicação 
```sh
yarn dev
```

Após desenvolvimento faça o build

```sh
yarn build
```

### Uso da versão com ambiente de DEV

Para instalar a versão de DEV é necessário ter o arquivo **tray-chrome-extension.sh** com as chaves de ambiente.

Tendo o script, basta realizar o processo:

- De permissão para o script

```bash
chmod +x tray-chrome-extension.sh
```

- Instale o projeto e dependências

```bash
./tray-chrome-extension.sh
```

