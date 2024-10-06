# API de Marketplace

Esta API permite gestionar un marketplace, incluyendo funciones de autenticación de usuarios.

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:


## Rutas

### POST /login

- **Descripción**: Inicia sesión un usuario y devuelve un token JWT.
- **Requiere**:
  - `email`: El correo electrónico del usuario.
  - `password`: La contraseña del usuario.
- **Validación**: Se valida la información de inicio de sesión utilizando `loginSchema`.
- **Autenticación**: Utiliza Passport para la autenticación local.
- **Respuesta**:
  - **Éxito (200)**:
    ```json
    {
      "statusCode": 200,
      "message": "Ok",
      "data": {
        "user": { /* información del usuario sin la contraseña */ },
        "token": "JWT_TOKEN"
      }
    }
    ```
  - **Error (400)**:
    ```json
    {
      "statusCode": 400,
      "message": "Email y password requeridos"
    }
    ```
  - **Error (401)**:
    ```json
    {
      "statusCode": 401,
      "message": "Email o password incorrectos",
      "data": null
    }
    ```

### GET /decode/jwt

- **Descripción**: Obtiene la información del usuario a partir del token JWT.
- **Autenticación**: Requiere un token JWT válido.
- **Respuesta**:
  - **Éxito (200)**:
    ```json
    {
      "statusCode": 200,
      "data": {
        "user_id": "USER_ID",
        "rol": "USER_ROLE"
      }
    }
    ```
  - **Error (401)**: Retorna error si el token es inválido o ha expirado.

## Controladores

### auth.controller.js

- **Funciones**:
  - `loginUser(email, password)`: Autentica al usuario verificando las credenciales y devolviendo un objeto con el estado y la información del usuario.
  - `signToken(user)`: Genera un token JWT utilizando la información del usuario.

## Middleware

### validator.handler.js

Este middleware se encarga de validar los datos de entrada según los esquemas definidos. En este caso, se utiliza para validar los datos de inicio de sesión.

## Ejemplo de Uso

Para iniciar sesión, envía una solicitud POST a `/login` con el siguiente cuerpo:

```json
{
  "email": "usuario@example.com",
  "password": "tu_contraseña"
}
