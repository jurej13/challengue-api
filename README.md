# Proyecto Javier Jure - Challenge

## Descripción

Challenge api, api creada usando NodeJS + Express.

## Tecnologías

- NodeJS
- Express

---

## Requisitos previos

- Node.js (>= v14)

## Instalación

### 1. Clonar el repositorio

Para comenzar, clona este repositorio en tu máquina local utilizando uno de los siguientes comandos:

Https:

```bash
git clone https://github.com/jurej13/challengue-api.git
```

SSH:

```bash
git clone git@github.com:jurej13/challengue-api.git
```

### 2. Instalar dependencias

Una vez descargado el proyecto, accede a la carpeta y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
npm install
```

### 3. Ejecutar el servidor

Con las dependencias instaladas, ya puedes iniciar el servidor.

Para iniciar el servidor:

```bash
npm start
```

### 4. Endpoints

Una vez iniciado el servidor, puede acceder a los siguientes endpoints:

a. En este endpoint se podra ver los files que no posean errores.

```bash
http://localhost:3200/files/data
```

b. Buscador por fileName:

```bash
http://localhost:3200/files/data?fileName=test2
```

c. En este endpoint se podra ver la lista de files.

```bash
http://localhost:3200/files/list
```

### 5. Probar el testing

Para ver los tests:

```bash
npm test
```
