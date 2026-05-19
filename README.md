# Coworking API

API REST para gestionar un espacio de coworking. Node.js + Express + MongoDB + Mongoose · ES6 Modules · Arquitectura MVC.

## Instalación

```bash
npm install
```

Crea el archivo `.env`:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/coworking-api
NODE_ENV=development
```

```bash
npm run dev
```

---

## Endpoints

### Members

#### GET /api/members
```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro", "active": true }
  ]
}
```

#### GET /api/members/:id
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro", "active": true }
}
```

#### POST /api/members
```json
// Request
{ "name": "Ana García", "email": "ana@mail.com", "plan": "pro" }

// Response 201
{ "success": true, "data": { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro", "active": true } }
```

#### PUT /api/members/:id
```json
// Request
{ "plan": "enterprise" }

// Response 200
{ "success": true, "data": { "_id": "...", "name": "Ana García", "plan": "enterprise", "active": true } }
```

#### DELETE /api/members/:id
```json
{ "success": true, "message": "Miembro eliminado correctamente" }
```

---

### Rooms

#### GET /api/rooms
```json
{
  "success": true,
  "data": [
    { "_id": "...", "name": "Sala Creativa", "capacity": 8, "type": "meeting_room", "pricePerHour": 25 }
  ]
}
```

#### GET /api/rooms/:id
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Sala Creativa", "capacity": 8, "type": "meeting_room", "pricePerHour": 25 }
}
```

#### POST /api/rooms
```json
// Request
{ "name": "Sala Creativa", "capacity": 8, "type": "meeting_room", "pricePerHour": 25 }

// Response 201
{ "success": true, "data": { "_id": "...", "name": "Sala Creativa", "capacity": 8, "type": "meeting_room", "pricePerHour": 25 } }
```

#### PUT /api/rooms/:id
```json
// Request
{ "pricePerHour": 30 }

// Response 200
{ "success": true, "data": { "_id": "...", "name": "Sala Creativa", "capacity": 8, "type": "meeting_room", "pricePerHour": 30 } }
```

#### DELETE /api/rooms/:id
```json
{ "success": true, "message": "Sala eliminada correctamente" }
```

---

### Bookings

#### GET /api/bookings
Acepta `?status=` y `?roomId=` como query params opcionales y combinables.

```
GET /api/bookings?status=confirmed&roomId=664a2b3c4d5e6f001e7c8901
```

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "...",
      "startDate": "2025-06-15T09:00:00.000Z",
      "endDate": "2025-06-15T12:00:00.000Z",
      "status": "confirmed",
      "notes": "Reunión de equipo",
      "member": { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro" },
      "room": { "_id": "...", "name": "Sala Creativa", "type": "meeting_room", "capacity": 8, "pricePerHour": 25 }
    }
  ]
}
```

#### GET /api/bookings/:id
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "startDate": "2025-06-15T09:00:00.000Z",
    "endDate": "2025-06-15T12:00:00.000Z",
    "status": "pending",
    "member": { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro", "active": true },
    "room": { "_id": "...", "name": "Sala Creativa", "type": "meeting_room", "capacity": 8, "pricePerHour": 25 }
  }
}
```

#### POST /api/bookings
La fecha de fin debe ser mayor a la fecha de inicio.

```json
// Request
{
  "startDate": "2025-06-15T09:00:00.000Z",
  "endDate": "2025-06-15T12:00:00.000Z",
  "member": "664a1f2e3b2a4c001e8d1234",
  "room": "664a2b3c4d5e6f001e7c8901",
  "notes": "Reunión de equipo"
}

// Response 201
{
  "success": true,
  "data": {
    "_id": "...",
    "startDate": "2025-06-15T09:00:00.000Z",
    "endDate": "2025-06-15T12:00:00.000Z",
    "status": "pending",
    "notes": "Reunión de equipo",
    "member": "664a1f2e3b2a4c001e8d1234",
    "room": "664a2b3c4d5e6f001e7c8901"
  }
}

// Response 400 (fechas inválidas)
{ "success": false, "message": "La fecha de fin debe ser mayor a la fecha de inicio" }
```

#### PATCH /api/bookings/:id/status
Cambia únicamente el estado de la reserva.

```json
// Request
{ "status": "confirmed" }

// Response 200
{
  "success": true,
  "data": {
    "_id": "...",
    "startDate": "2025-06-15T09:00:00.000Z",
    "endDate": "2025-06-15T12:00:00.000Z",
    "status": "confirmed",
    "member": { "_id": "...", "name": "Ana García", "email": "ana@mail.com", "plan": "pro" },
    "room": { "_id": "...", "name": "Sala Creativa", "type": "meeting_room", "capacity": 8, "pricePerHour": 25 }
  }
}

// Response 400 (estado inválido)
{ "success": false, "message": "El estado debe ser uno de: pending, confirmed, cancelled" }
```
