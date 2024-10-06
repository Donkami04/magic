# API REST de Marketplace

Esta es una API REST para un marketplace que permite la gestión de usuarios y productos, así como la autenticación de usuarios. 

## Base de la API

La base de la API es: `/api/v1/marketplace`

## Rutas de la API

### Obtener Usuarios

- **Método:** `GET`
- **Ruta:** `/api/v1/marketplace/users`
- **Autenticación:** Requiere autenticación JWT y rol de administrador.
- **Descripción:** Obtiene una lista de usuarios registrados. El campo `password` es eliminado de la respuesta.

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "Usuarios obtenidos con éxito",
  "data": [
    {
      "user_id": "uuid-1234",
      "name": "John Doe",
      "email": "john@example.com"
      // password se elimina de la respuesta
    },
    // más usuarios...
  ]
}
```

### Registrar Usuario

- **Método:** `POST`
- **Ruta:** `/api/v1/marketplace/users/new`
- **Descripción:** Registra un nuevo usuario. Se requiere validar los datos según el esquema `createUserSchema`.

#### Ejemplo de cuerpo de la solicitud

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

#### Ejemplo de respuesta

```json
{
  "statusCode": 201,
  "message": "Usuario creado con éxito",
  "data": {
    "user_id": 3,
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
}
```

### Autenticación de Usuario

#### Login

- **Método:** `POST`
- **Ruta:** `/api/v1/marketplace/users/login`
- **Descripción:** Inicia sesión con email y contraseña. Devuelve un token JWT en caso de éxito.

#### Ejemplo de cuerpo de la solicitud

```json
{
  "email": "jane@example.com",
  "password": "securepassword123"
}
```

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "Ok",
  "data": {
    "token": "jwt-token-string"
  }
}
```

## Rutas de Productos

### Obtener Productos

- **Método:** `GET`
- **Ruta:** `/api/v1/marketplace/products`
- **Descripción:** Obtiene una lista de todos los productos registrados en el marketplace.

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "Product information successfully obtained",
  "data": [
    {
      "product_id": 1,
      "name": "Producto 1",
      "sku": "SKU123",
      "quantity": 10,
      "price": 2233,
      "user_id": 3
    },
    // más productos...
  ]
}
```

### Obtener Productos Filtrados

- **Método:** `GET`
- **Ruta:** `/api/v1/marketplace/products/filter`
- **Descripción:** Obtiene productos filtrados por nombre, SKU y/o precio.

#### Parámetros de consulta

- `name` (opcional): Filtra por nombre del producto.
- `sku` (opcional): Filtra por SKU del producto.
- `price` (opcional): Filtra productos con un precio menor o igual al especificado.

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "Productos filtrados obtenidos exitosamente",
  "data": [
    {
      "product_id": "uuid-1234",
      "name": "Producto 1",
      "sku": "SKU123",
      "quantity": 10,
      "price": 20.99,
      "user_id": 3
    },
    // más productos filtrados...
  ]
}
```

### Obtener Productos por Vendedor

- **Método:** `GET`
- **Ruta:** `/api/v1/marketplace/products/myproducts`
- **Descripción:** Obtiene los productos registrados por el vendedor autenticado.

### Obtener Productos por ID de Vendedor

- **Método:** `GET`
- **Ruta:** `/api/v1/marketplace/products/seller/:id`
- **Descripción:** Obtiene los productos registrados por un vendedor específico, verificado con rol de administrador.

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "Product information successfully obtained",
  "data": [
    {
      "product_id": "uuid-1234",
      "name": "Producto 1",
      "sku": "SKU123",
      "quantity": 10,
      "price": 20.99,
      "user_id": 3
    },
    // más productos del vendedor...
  ]
}
```

### Registrar Producto

- **Método:** `POST`
- **Ruta:** `/api/v1/marketplace/products/new`
- **Descripción:** Registra un nuevo producto. Solo los usuarios autenticados con rol de vendedor pueden acceder a esta ruta.

#### Ejemplo de cuerpo de la solicitud

```json
{
  "name": "Nuevo Producto",
  "sku": "SKU999",
  "quantity": 5,
  "price": 15.99
}
```

#### Ejemplo de respuesta

```json
{
  "statusCode": 201,
  "message": "Producto creado",
  "data": {
    "product_id": 3,
    "name": "Nuevo Producto",
    "sku": "SKU999",
    "quantity": 5,
    "price": 15.99,
    "user_id": "uuid-1234"
  }
}
```

### Editar Producto

- **Método:** `PUT`
- **Ruta:** `/api/v1/marketplace/products/edit/:id`
- **Descripción:** Edita un producto existente. Solo el vendedor que creó el producto puede editarlo.

#### Ejemplo de cuerpo de la solicitud

```json
{
  "name": "Producto Editado",
  "price": 25.99
}
```

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "The product has been successfully edited"
}
```

### Eliminar Producto

- **Método:** `DELETE`
- **Ruta:** `/api/v1/marketplace/products/delete/:id`
- **Descripción:** Elimina un producto existente. Solo el vendedor que creó el producto puede eliminarlo.

#### Ejemplo de respuesta

```json
{
  "statusCode": 200,
  "message": "The product has been deleted successfully"
}
```

## Requisitos

- Asegúrate de que las siguientes dependencias estén instaladas en tu proyecto:

  - `express`
  - `sequelize`
  - `passport`
  - `bcrypt`
  - `jsonwebtoken`
  - `dotenv`
  - `sequelize-cli`


## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`.

## Uso

Ejecuta el servidor:

```bash
npm start
```

La API estará disponible en `http://localhost:3000/api/v1/marketplace`.
