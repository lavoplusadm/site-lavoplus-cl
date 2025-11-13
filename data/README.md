# Estructura de Datos - Lavandería Lavoplus

Este directorio contiene todos los datos dinámicos del sitio web separados por componente para facilitar la actualización y mantenimiento del contenido.

## Archivos de Datos

### 📄 `business.json`
Información general del negocio:
- Nombre y slogan
- Descripción
- Dirección completa
- Datos de contacto (teléfono, email)
- Horarios de atención
- Coordenadas geográficas
- Redes sociales
- Estadísticas del negocio

**Uso:** StructuredData, Footer, Contact, Metadata

---

### 📄 `hero.json`
Contenido del banner principal (Hero):
- Títulos principales
- Descripción
- Call-to-actions (CTAs)
- Features destacados

**Uso:** Componente Hero

---

### 📄 `services.json`
Catálogo de servicios:
- Lista completa de servicios
- Descripción de cada servicio
- Características/beneficios
- Servicios especiales

**Uso:** Componente Services

---

### 📄 `quality.json`
Información sobre calidad y compromiso:
- Cualidades del servicio
- Garantías ofrecidas
- Razones para elegir el negocio

**Uso:** Componente Quality

---

### 📄 `testimonials.json`
Testimonios de clientes:
- Nombre y rol del cliente
- Testimonio completo
- Calificación (rating)

**Uso:** Componente Testimonials

---

### 📄 `contact.json`
Formulario de contacto e información:
- Configuración del formulario
- Campos y validaciones
- Información de contacto
- Call-to-action

**Uso:** Componente Contact

---

## Cómo Actualizar el Contenido

### Cambiar Información del Negocio
Edita `business.json`:
```json
{
  "name": "Nuevo Nombre",
  "contact": {
    "phone": "+56900000000",
    "email": "nuevo@email.com"
  }
}
```

### Agregar un Nuevo Servicio
Edita `services.json` y agrega un nuevo objeto al array `services`:
```json
{
  "id": "nuevo-servicio",
  "title": "Nuevo Servicio",
  "description": "Descripción del servicio",
  "features": ["Feature 1", "Feature 2"]
}
```

### Modificar Testimonios
Edita `testimonials.json` y actualiza el array `testimonials`:
```json
{
  "id": 5,
  "name": "Nuevo Cliente",
  "role": "Rol",
  "text": "Testimonio completo",
  "rating": 5
}
```

### Cambiar Textos del Hero
Edita `hero.json`:
```json
{
  "title": {
    "line1": "Nueva línea 1",
    "line2": "Nueva línea 2"
  }
}
```

## Notas Importantes

- ⚠️ Mantén la estructura JSON válida al editar
- ⚠️ No elimines campos existentes sin verificar su uso en los componentes
- ⚠️ Las imágenes se mantienen en `/public/img/`
- ⚠️ Para íconos SVG, edita directamente los componentes
- ✅ Usa un validador JSON antes de guardar cambios
- ✅ Reinicia el servidor de desarrollo después de cambios importantes

## Próximos Pasos

Para usar estos datos en los componentes, importa los JSON así:

```typescript
import businessData from '@/data/business.json';
import servicesData from '@/data/services.json';
import qualityData from '@/data/quality.json';
import testimonialsData from '@/data/testimonials.json';
import contactData from '@/data/contact.json';
import heroData from '@/data/hero.json';
```

## Validación

Antes de hacer cambios en producción:
1. Valida el JSON en https://jsonlint.com/
2. Prueba localmente con `npm run dev`
3. Verifica que todos los componentes carguen correctamente
