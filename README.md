# App de Conferencias de Cerveceros

Esta es una aplicación móvil desarrollada con React Native y Expo que sirve como guía para un evento de conferencias de cerveceros artesanales. La app permite a los usuarios explorar las diferentes charlas, ver sus detalles y ubicar los lugares del evento en un mapa interactivo.

## ✨ Características Principales

- **Lista de Conferencias:** Visualiza una lista de 10 conferencias programadas, con información clave como el título, el ponente, el horario y el lugar.
- **Detalle de Conferencia:** Accede a una pantalla con información detallada de cada conferencia, incluyendo una descripción completa.
- **Mapa Interactivo:** Explora un mapa con marcadores para todas las cervecerías donde se realizan las conferencias.
- **Navegación al Mapa:** Desde la pantalla de detalle, un botón permite ir directamente al mapa, centrando la vista y resaltando la ubicación de esa conferencia en particular.
- **Persistencia Local:** La información de las conferencias se almacena en una base de datos SQLite local en el dispositivo, permitiendo el acceso sin conexión a internet después de la primera carga.

## 🛠️ Tecnologías Utilizadas

- **React Native:** Framework para el desarrollo de aplicaciones móviles multiplataforma.
- **Expo:** Plataforma y conjunto de herramientas para facilitar el desarrollo, la compilación y la publicación de apps de React Native.
- **Expo Router:** Sistema de navegación basado en archivos para una estructura de rutas intuitiva.
- **TypeScript:** Superset de JavaScript para un desarrollo más robusto y escalable.
- **Expo-SQLite:** Para la gestión de la base de datos local en el dispositivo.
- **React Native Maps:** Para la integración y visualización de mapas.

## 🚀 Instalación y Puesta en Marcha

Sigue estos pasos para ejecutar el proyecto en tu entorno de desarrollo local.

### Prerrequisitos

- [Node.js](https://nodejs.org/) (versión LTS recomendada)
- `npm` o `yarn` como gestor de paquetes.
- La aplicación **Expo Go** instalada en tu dispositivo móvil (iOS o Android) o un emulador configurado.

### Pasos

1.  **Clona el repositorio (si aplica):**
    ```bash
    git clone https://github.com/D13g0473/R-N-Conferences.git
    cd conferencias
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo de Expo:**
    ```bash
    npx expo start
    ```

4.  **Ejecuta la aplicación:**
    - Escanea el código QR que aparece en la terminal con la cámara de tu teléfono (iOS) o desde la app Expo Go (Android).

## 📜 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo de Expo.
- `npm run android`: Inicia la app en un emulador de Android o dispositivo conectado.
- `npm run ios`: Inicia la app en un simulador de iOS o dispositivo conectado.
- `npm run web`: Inicia la app en un navegador web (puede tener limitaciones de compatibilidad).
- `npm run lint`: Ejecuta el linter (`expo lint`) para analizar el código en busca de errores y problemas de estilo.
