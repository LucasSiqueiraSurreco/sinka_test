# Etapa de build
FROM node:20.11-alpine as build

WORKDIR /app

# Copie os arquivos necessários e instale as dependências
COPY package.json package-lock.json ./

RUN npm install --ignore-scripts

COPY . .

RUN npm run build

# Remova dependências de desenvolvimento
RUN npm prune --production --ignore-scripts

# Etapa de produção
FROM node:20.11-alpine

ENV NODE_ENV=production

WORKDIR /app

# Copie os artefatos do estágio de build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./

# Defina a variável PORT para expor a porta correta
ENV PORT=8080

EXPOSE ${PORT}



CMD ["node", "dist/main"]
