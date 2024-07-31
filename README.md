# Employees CRUD

## Node versión
nvm use 18.12.1 o superior

To start the application:

1. Open the terminal and execute ```npm install``` 
2. Execute ```npm run server ``` (Starts up the server)
3. Open a second terminal and execute ```npm run dev```


**- Per arrencar el projecte, podeu utilitzar l'editor que feu servir normalment, jo utilitzo el WebStorm i el Visual Studio Code.** 
  - Obriu el projecte amb programa escollit.
  - Obriu terminal a la carpeta del projecte i executar nvm use 18.12.1 o superior
  - Executar npm install
  - Executar npm run server (per aixecar el servidor en local)
  - Obrir una segona terminal (tenir versió nvm use 18.12.1) i executar npm run dev (per aixecar l'aplicació)
  - També teniu un Readme.md al projecte amb les instruccions.

**- He desenvolupat l'aplicació he uilitzat:**
  - Vite, per la creació ràpida d'un projecte basat en javascript, que en aquest cas només l'he fet servir per la creació de la carcassa (https://vitejs.dev/).
  - Per tenir un servidor en local he utilitzat la llibreria de node json-server (https://www.npmjs.com/package/json-server), que el que fa, és aixecar un servidor que et proporciona uns endpoints per poder atacar a un json (carpeta server/db.json) i poder fer GET, POST, PUT, PATCH, DELETE.
  - Tota l'aplicació està escrita exclusivament amb javascript, incloent també les validacions dels camps del formulari.
 
**Nota:** Si es canvia directament alguna dada del db.json, s'haurà de reiniciar el npm run server per veure els canvis.
