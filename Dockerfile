# Utilisez une image Node.js comme base
FROM node:latest

# Créez un répertoire de travail pour votre application
WORKDIR /usr/src/app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./
COPY index.html ./
COPY script.js ./
COPY scriptGame.js ./
COPY src/output.css ./src/
COPY server.js ./
COPY image/background_NFR.png ./image/

# Installez les dépendances
RUN npm install

# Exposez le port 3000
EXPOSE 3000

# Démarrez l'application
CMD [ "node", "server.js" ]
