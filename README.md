# 🚀 Hire-Link Platform

**Hire-Link Platform** – A modern job portal built with **Laravel**, connecting job seekers and employers through intuitive job listings, profile management, and recruitment tools.

---

## ✨ Features

- 📝 Job listing and application system  
- 👤 User roles for employers and job seekers  
- 🔐 Secure authentication and registration  
- 📄 CV and profile management  
- 📊 Dashboard and statistics for admins  
- 📬 Contact and messaging system

---

## 🧰 Tech Stack

| Layer         | Technology                |
|---------------|----------------------------|
| Backend       | PHP 8+ (Laravel Framework) |
| Database      | MySQL (via XAMPP)          |
| Local Server  | Apache (via XAMPP)         |
| Package Manager | Composer                 |
| Version Control | Git & GitHub             |

---

## 🧪 Getting Started (with XAMPP)

### 🛠️ Requirements

- ✅ [XAMPP](https://www.apachefriends.org/)  
- ✅ [Composer](https://getcomposer.org/)  
- ✅ PHP 8.1 or later  
- ✅ Git

---

### 📥 1. Clone the repository

```bash
git clone git@github.com:Mohammed-Almikhlafi/hire-ink.git
cd hire-ink
```

---

### 📦 2. Install dependencies

```bash
composer install
```

---

### ⚙️ 3. Create and configure the `.env` file

```bash
cp .env.example .env
```

Then open the `.env` file and update the MySQL database configuration like this:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=hire_link
DB_USERNAME=root
DB_PASSWORD=
```

> Make sure the `hire_link` database exists in phpMyAdmin inside XAMPP. Create it manually if needed.

---

### 🔑 4. Generate application key

```bash
php artisan key:generate
```

---

### 🗃️ 5. Run migrations

```bash
php artisan migrate
```

---

### ▶️ 6. Start the local development server

```bash
php artisan serve
```

Then open your browser and go to:  
🌐 [http://localhost:8000](http://localhost:8000)

---

## 📄 License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).

---

## 🤝 Contributing

Contributions are welcome! Fork the repo and submit a pull request ✅
