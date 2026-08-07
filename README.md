## Variables de entorno con dotenv

### ¿Qué es dotenv?
Es un paquete de Node.js que carga variables desde un archivo .env hacia
process.env. Sirve para separar la configuración del código, ya que en vez de escribir
la contraseña de la base en database.js, esta se guarda en .env y el código la lee
desde ahí. Así los datos sensibles no quedan en el repositorio.

### ¿Cómo se instala?
    npm install dotenv

### ¿Cómo se configura?
1. Se crea un archivo .env en la raíz con las variables (PORT, DB_HOST, etc.).
2. Se agrega .env al .gitignore para que no se suba.
3. Se crea un .env.example con los mismos nombres pero sin valores reales.

### ¿Cómo se accede a las variables?
Se llama a dotenv.config() una vez y las variables quedan en process.env:

    import dotenv from "dotenv";
    dotenv.config();
    console.log(process.env.DB_NAME);

### Ejemplo
En src/config/database.js la conexión se arma leyendo process.env.DB_NAME,
process.env.DB_USER, etc., por lo que ningún dato sensible queda escrito en el código.