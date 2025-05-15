# 🛒 Proyecto Backend: E-commerce con Express, MongoDB y Handlebars

## Descripción

Este proyecto es una aplicación de backend para un e-commerce desarrollada con Node.js, Express y MongoDB. Permite gestionar productos y carritos de compra, y utiliza Handlebars para renderizar las vistas. Es parte de la entrega final para la materia **Programación Backend I**.

---

## Funcionalidades principales

### 📦 Productos
- Listado de productos con paginación, filtros y ordenamiento.
- Vista detallada de cada producto.
- Agregado de productos a un carrito desde la vista.

### 🛒 Carritos
- Creación automática de carrito al iniciar sesión (o al entrar a `/products` si no hay uno en sesión).
- Posibilidad de agregar productos al carrito.
- Visualización del carrito y sus productos.

### 💻 Frontend con Handlebars
- Vistas para:
  - Página de inicio (`/`)
  - Listado de productos (`/products`)
  - Detalle de producto (`/products/:pid`)
  - Carrito actual (`/cart`)

---

## Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- Handlebars
- Express-session
- Dotenv

---

## Cómo usar el proyecto

### 🧪 Requisitos

- Tener Node.js y MongoDB instalados.
- Crear un archivo `.env` en la raíz del proyecto con tu URI de conexión a MongoDB:

```env
MONGO_URL=mongodb+srv://pabloromerolivio:28S3SlG72HxaDIyJ@cluter0.5gvr4as.mongodb.net/?retryWrites=true&w=majority&appName=cluter0

