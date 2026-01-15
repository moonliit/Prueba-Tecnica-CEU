FROM python:3.13-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /backend

# Configuración de Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Instalar uv
RUN pip install --no-cache-dir uv

# Copiar archivos de dependencias
COPY pyproject.toml uv.lock ./

# Instalar dependencias
RUN uv sync --frozen

# Copiar el código del backend
COPY . .

# Exponer puerto del backend
EXPOSE 8000

# Ejecutar servidor Django
CMD ["uv", "run", "python", "manage.py", "runserver", "0.0.0.0:8000"]
