# Instalación

## Requisitos previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js 22 o superior
- npm 10 o superior
- Angular CLI 20
- Ionic CLI
- Git
- Android Studio (para Android)
- Xcode 26 o superior (para iOS, solo macOS)

---

## 1. Clonar el repositorio

```bash
git clone https://github.com/USUARIO/accenture-todo.git
```

Entrar al proyecto

```bash
cd accenture-todo
```

---

## 2. Instalar dependencias

```bash
npm install
```

---

## 3. Configurar Firebase

Crear un proyecto en Firebase.

Habilitar:

- Firebase App
- Remote Config

Copiar la configuración de Firebase dentro del archivo:

```
src/app/core/firebase/firebase.config.ts
```

Ejemplo:

```ts
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};
```

---

## 4. Configurar Remote Config

En Firebase Console crear el parámetro:

| Parámetro | Valor |
|-----------|-------|
| enable_categories | true |

Publicar los cambios.

---

## 5. Ejecutar la aplicación

```bash
ionic serve
```

La aplicación estará disponible en:

```
http://localhost:8100
```

---

# Android

## 1. Compilar la aplicación

```bash
ionic build
```

---

## 2. Sincronizar Capacitor

```bash
npx cap sync android
```

---

## 3. Abrir Android Studio

```bash
npx cap open android
```

---

## 4. Ejecutar

Seleccionar un dispositivo físico o un emulador.

Presionar:

```
Run ▶
```

---

## 5. Generar APK

Desde Android Studio:

```
Build

↓

Build Bundle(s) / APK(s)

↓

Build APK(s)
```

El APK quedará en:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

# iOS

## 1. Compilar

```bash
ionic build
```

---

## 2. Sincronizar

```bash
npx cap sync ios
```

---

## 3. Abrir Xcode

```bash
npx cap open ios
```

---

## 4. Ejecutar

Seleccionar un simulador.

Presionar:

```
Run ▶
```

---

## Nota sobre el IPA

El proyecto compila y se ejecuta correctamente en Xcode.

La generación de un archivo IPA firmado requiere una cuenta de Apple Developer para realizar la firma de distribución.

---

# Actualizar la aplicación después de realizar cambios

Después de modificar el código fuente ejecutar:

```bash
ionic build
```

Luego sincronizar Capacitor:

Android

```bash
npx cap sync android
```

iOS

```bash
npx cap sync ios
```

Si los proyectos nativos ya están abiertos, volver a compilarlos desde Android Studio o Xcode.

---

# Scripts disponibles

Ejecutar en desarrollo

```bash
ionic serve
```

Compilar

```bash
ionic build
```

Sincronizar Android

```bash
npx cap sync android
```

Sincronizar iOS

```bash
npx cap sync ios
```

Abrir Android Studio

```bash
npx cap open android
```

Abrir Xcode

```bash
npx cap open ios
```

---

# Estructura del proyecto

```
src/
│
├── app/
│   ├── core/
│   │   ├── constants/
│   │   ├── firebase/
│   │   └── services/
│   │
│   ├── features/
│   │   ├── categories/
│   │   └── tasks/
│   │
│   └── shared/
│
├── assets/
└── environments/
```
