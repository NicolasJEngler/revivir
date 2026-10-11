# Cómo contribuir

Revivir se arma entre varias personas. Cualquiera puede sumar, corregir o verificar un punto con un pull request en https://github.com/NicolasJEngler/revivir.

## Reglas

1. Solo gestores y puntos de acopio de RAEE. No se aceptan comercios de venta, talleres de reparación ni locales de reuso.
2. Todo punto necesita una fuente pública (URL) que lo respalde.
3. Coordenadas verificadas. Si son aproximadas, marcar `"estado": "aproximado"`.
4. Datos abiertos (CC0). Al contribuir, aceptás liberar el dato al dominio público.

## Formato de cada punto (`datos/puntos.json`)

```json
{
  "id": "sf-acutis",
  "nombre": "Programa Beato Carlo Acutis (UTN Santa Fe)",
  "tipo": "gestor",
  "provincia": "Santa Fe",
  "localidad": "Santa Fe",
  "direccion": "Lavaisse 610",
  "lat": -31.6167562,
  "lon": -60.6752372,
  "recibe": ["computadoras", "electrónica"],
  "no_recibe": ["pilas", "monitores de tubo", "grandes electrodomésticos"],
  "horario": "",
  "operador": "Cooperativa en formación (UTN)",
  "fuente": "https://www.unosantafe.com.ar/...",
  "estado": "verificado"
}
```

### Campos

| Campo | Obligatorio | Descripción |
|---|---|---|
| `id` | sí | Identificador único, en kebab-case (ej. `caba-punto-verde-1`). |
| `nombre` | sí | Nombre del gestor o punto. |
| `tipo` | sí | `gestor`, `planta`, `acopio` o `punto-verde`. |
| `provincia` | sí | Provincia (una de las 24 jurisdicciones). |
| `localidad` | no | Ciudad o barrio. |
| `direccion` | no | Dirección postal. |
| `lat`, `lon` | sí | Coordenadas en WGS84 (decimal). |
| `recibe` | no | Lista de materiales que acepta. |
| `no_recibe` | no | Lista de materiales que no acepta. |
| `horario` | no | Días y horas de atención. |
| `operador` | no | Municipalidad, cooperativa, empresa, etc. |
| `fuente` | sí | URL de la fuente pública. |
| `estado` | sí | `verificado` o `aproximado`. |

## Pasos

1. Hacé un *fork* de https://github.com/NicolasJEngler/revivir.
2. Agregá o editá tu punto en `datos/puntos.json` (respetá el formato).
3. Verificá que el JSON siga siendo válido (`python3 -m json.tool datos/puntos.json > /dev/null`).
4. Abrí un *pull request* contando de dónde sacaste el dato.
