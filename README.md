# ♻️ Recicloop – Punto Inteligente de Recolección de Botellas PET

> Prototipo IoT funcional que promueve el reciclaje automatizado mediante tecnologías web y dispositivos inteligentes, enfocado en entornos académicos.

---

## 🧠 Descripción General

**Recicloop** es una solución IoT inicialmente pensada como proyecto personal y fue posteriormente desarrollado en el marco académico para la electiva de Desarrollo de Software - Web Semántica IoT. **Recicloop** es un proyecto que fomenta el reciclaje mediante un sistema inteligente de recolección de botellas plásticas PET. Integra software y hardware con tecnologías modernas para ofrecer una experiencia interactiva, automatizada y educativa.

---

## 🧪 Características

- Permite el registro y autenticación de usuarios
- Controla y automatiza el prototipo físico desde software
- Muestra historial de reciclaje, perfil y progreso de usuarios
- Visualiza la recolección en tiempo real
- Asocia eventos físicos (botella ingresada, longitud) a eventos del sistema
- Integra sistema de recompensas y gamificación
- Muestra puntos de reciclaje en un mapa
- Difunde noticias y contenido educativo

---

## 🎯 Objetivos logrados

Desarrollar un prototipo funcional de una máquina recolectora automática de botellas PET, conectada a una plataforma web que:
- Identifica usuarios mediante un código único
- Recolecta botellas y mide su longitud
- Asigna puntos reciclables a la cuenta del usuario
- Visualiza el historial (metadatos) de recolección

---

## ⚙️ Arquitectura y Tecnologías

| Capa              | Tecnología              |
|-------------------|----------------------------------------|
| Dispositivo IoT   | ESP32, sensores IR, ultrasónicos, servomotores, etc. |
| Backend           | NestJS |
| Frontend          | Angular (PWA) |
| Base de Datos     | PostgreSQL                            |
| Comunicación      | MQTT (Mosquitto), REST API y WebSockets                        |
| Despliegue   | Cloudflare Tunnel en backend local              |
---


## 📦 Repositorios

- [Backend (NestJS)](https://github.com/SebastianBonilla13/Recicloop-Back)
- [Frontend (Angular)](https://github.com/SebastianBonilla13/Recicloop-Front)
- [Código Arduino (ESP32)](https://github.com/ader148/maquinaReciclajePET_IOT)

---

## 🧱 Componentes del Prototipo

- Pantalla OLED
- Teclado matricial 4x4
- Sensores IR, ultrasónico y celda de carga
- Banda transportadora con motorreductor y servomotores
- Estructura física modular

---

## 📌 Trabajo futuro

- Implementar registro de usuarios desde frontend
- Uso de websockets en recolección en tiempo real
- Conexión remota MQTT con servicios escalables
- Implementar gamificación, tienda virtual, mapa y sección educativa
- Desarrollar app móvil nativa con Ionic
- Optimizar prototipo físico para uso prolongado y ambientes reales

---

## 📸 Capturas

- App web:
![111](https://github.com/user-attachments/assets/237bcb12-3f5a-4102-aa96-59af9be00500)
---
![222](https://github.com/user-attachments/assets/8d1deb36-ff30-42c3-9485-14258d8c283d)
---

- Prototipo físico
![prototipo-interior](https://github.com/user-attachments/assets/af194809-b1f2-4a40-90f9-f13487550aba)
---
![prototipo-exterior](https://github.com/user-attachments/assets/b35f7c7c-802b-42a5-8e70-1e27845514b1)
---

- Diagrama de arquitectura
![arq](https://github.com/user-attachments/assets/816e0f58-e022-4e90-a9fc-fc3168e8e5c5)

---

- Diagrama entidad-relación
![diagrama e-r](https://github.com/user-attachments/assets/87856647-0b54-42de-a76e-26ddbc37a90b)
---
