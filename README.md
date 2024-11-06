# Proyecto Javier Jure - Challenge

## Descripción

API creada usando NodeJS y Express. Esta API permite interactuar con una serie de archivos y realizar búsquedas basadas en el nombre del archivo.

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

Con las dependencias instaladas, ya puedes iniciar el servidor. Para ello, ejecuta el siguiente comando:

```bash
npm start
```

### 4. Endpoints

Una vez iniciado el servidor, puedes acceder a los siguientes endpoints:

a. Ver los archivos sin errores:

```bash
http://localhost:3200/files/data
```

b. Buscar archivos por fileName:

```bash
http://localhost:3200/files/data?fileName=test2
```

c. Ver la lista de archivos disponibles:

```bash
http://localhost:3200/files/list
```

### 5. Probar el testing

Para ejecutar los tests y verificar que todo funciona correctamente, usa el siguiente comando:

```bash
npm test
```
