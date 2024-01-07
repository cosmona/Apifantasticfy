# fantasticfyPrueba

Nombre:Iñaki Perez Fernandez
Api realizada en JS/node/Express.
BD: Mongodb de atlas mongoDB

## ENDPOINTS

POST /sync
Este endpoint debe iniciar una sincronización de usuarios. Consumiendo la siguiente API pública https://jsonplaceholder.typicode.com/users se obtiene un listado de usuarios, estos, deberán ser almacenados en la base de datos siguiendo el esquema indicado al final de la prueba.

El método deberá estar preparado para que, si el usuario no existe en la base de datos lo cree como nuevo, y si ya existe actualice sus datos.

GET /users
Obtener el listado completo de todos los usuarios.

PUT /users
Crea un usuario en la base de datos.

URL:
Netifly
https://apifantasticfy.onrender.com/
