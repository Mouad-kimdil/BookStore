# BookStore

Full-stack bookstore app — React + Vite frontend, Django REST Framework backend.

## Configuration

Backend reads configuration from environment via a git-ignored `.env` file (`django-environ`).

1. Copy the example file:

   ```bash
   cp .env.example .env
   ```

2. Generate a new `SECRET_KEY`:

   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

   Put the output in `.env` as `SECRET_KEY=...`.

3. Set database credentials in `.env` (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`). PostgreSQL is required (`ENGINE=django.db.backends.postgresql`).

4. Install and run the backend:

   ```bash
   pip install -r requirements.txt
   python bookstore/manage.py check
   python bookstore/manage.py runserver
   ```
