> **Nota:** Aunque el enunciado de la prueba menciona Cordova, este proyecto fue desarrollado utilizando **Capacitor 8**, la solución oficialmente recomendada por el equipo de Ionic para aplicaciones híbridas modernas. La aplicación ha sido validada correctamente en **Web, Android e iOS**.

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
git clone https://github.com/jhoanjimz2/accenture-todo.git
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

Por motivos de seguridad, el archivo con la configuración real de Firebase **no está incluido** en el repositorio.

Se proporciona un archivo de ejemplo:

```text
src/app/core/firebase/firebase.config-example.ts
```

### Pasos para configurarlo

1. Crear un proyecto en Firebase.

2. Registrar una aplicación Web.

3. Renombrar el archivo:

```text
src/app/core/firebase/firebase.config-example.ts
```

por:

```text
src/app/core/firebase/firebase.config.ts
```

4. Reemplazar los valores del objeto `firebaseConfig` con la configuración de tu proyecto.

Ejemplo:

```ts
export const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID',
};
```

> **Nota:** El archivo `firebase.config.ts` está incluido en el `.gitignore`, por lo que cada desarrollador debe crear su propia configuración local utilizando `firebase.config-example.ts` como plantilla.

---

## 4. Configurar Firebase Remote Config

En Firebase Console habilita **Remote Config** y crea el siguiente parámetro:

| Parámetro | Valor |
|-----------|-------|
| `enable_categories` | `true` |

Finalmente, publica los cambios.

---

## 5. Ejecutar la aplicación

```bash
ionic serve
```

La aplicación estará disponible en:

```text
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

Seleccionar un dispositivo físico o un emulador y presionar **Run ▶**.

---

## 5. Generar APK

Desde Android Studio:

```text
Build
    ↓
Build Bundle(s) / APK(s)
    ↓
Build APK(s)
```

El APK será generado en:

```text
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

Seleccionar un simulador y presionar **Run ▶**.

---

## Nota sobre el IPA

El proyecto compila y se ejecuta correctamente en Xcode.

La generación de un archivo **IPA firmado para distribución** requiere una cuenta de **Apple Developer** para realizar el proceso de firma (Code Signing). Por esta razón, únicamente se valida la ejecución de la aplicación en el simulador de iOS.

---

# Actualizar la aplicación después de realizar cambios

Después de modificar el código fuente ejecutar:

```bash
ionic build
```

Luego sincronizar Capacitor.

Android:

```bash
npx cap sync android
```

iOS:

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

```text
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
