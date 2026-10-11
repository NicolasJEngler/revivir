# Revivir

Directorio abierto de gestores y puntos de acopio de RAEE (residuos de aparatos eléctricos y electrónicos) en Argentina.

Sitio estático que lee un único archivo JSON local (`datos/puntos.json`) y no llama a ninguna API en tiempo de ejecución.

## Cómo funciona

- `datos/puntos.json`: los datos (licencia CC0, dominio público).
- `index.html`, `app.js` y `styles.css`: el mapa (Leaflet) y la lista, con filtros por provincia y tipo.

Los datos son locales; lo único externo es la librería Leaflet (CDN) y las teselas del mapa base (OpenStreetMap). Para un despliegue offline se puede vendorizar Leaflet y self-hostear las teselas.

## Alcance: solo gestores de RAEE

Muestra únicamente puntos de acopio y gestión de RAEE. No incluye talleres de reparación, reuso ni comercios de venta (tipo Musimundo).

Tipos: `gestor`, `planta`, `acopio`, `punto-verde`.

## Cómo correrlo

```
python3 -m http.server
```

Abrir http://localhost:8000

## Cómo contribuir

Cualquiera puede agregar, corregir o verificar un punto enviando un pull request que edite `datos/puntos.json`. Ver `CONTRIBUTING.md` para el formato y las reglas.

Repositorio: https://github.com/NicolasJEngler/revivir

## Licencias

- Datos: CC0-1.0 (dominio público).
- Código: AGPL-3.0-or-later.

## Fuentes

- Gobierno de la Ciudad de Buenos Aires: Puntos Verdes (RAEE).
- Municipalidad de Santa Fe: planta de RAEE y Eco Puntos.
- Programa Beato Carlo Acutis (UTN Santa Fe): cooperativa RAEE.
- Ley provincial 13.940 (Santa Fe) de gestión de RAEE; Ley 24.240 de Defensa del Consumidor.

## Contexto

Trabajo de promoción de Culturas Digitales Libres (UNL). Datos abiertos para la gestión responsable de RAEE.
