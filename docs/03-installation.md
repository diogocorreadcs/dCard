### Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

#### 1. Clonar o Repositório
```bash
git clone https://github.com/diogocorreadcs/dCard.git
cd dCard
```

#### 2. Instalar as Dependências
```bash
npm install
```

#### 3. Configurar as Variáveis de Ambiente
Escolha um perfil na pasta `envs/` ou copie o modelo padrão para a raiz como `.env.local`:
```bash
cp envs/.env.full .env.local
```
*(Lembre-se de editar o arquivo `.env.local` com as suas informações pessoais).*

#### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
O projeto estará acessível em `http://localhost:3000`.

#### 5. Executando via Docker (Opcional)
Se preferir rodar utilizando containers:
```bash
docker-compose up --build -d
```
