<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

<p align="center">
<a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/d/total.svg" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/v/stable.svg" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://poser.pugx.org/laravel/framework/license.svg" alt="License"></a>
</p>

## How-to use source code

1.  Clone git project
2.  Run in console:
    *   `composer install` - download dependencies
    *   `php artisan ide-helper:generate` - generate `_ide_helper.php` file for PhpStorm
    *   `php artisan ide-helper:meta` - generate `.phpstorm.meta.php` file for PhpStorm
3.  Copy file `.env.example` and rename it to `.env`
4.  Create MySQL database
5.  Configure DB connection in `.env` file:
    *   `DB_HOST` - host (default localhost)
    *   `DB_PORT` - port (default 3306)
    *   `DB_DATABASE` - database name
    *   `DB_USERNAME` - user (default root)
    *   `DB_PASSWORD` - password (default empty)
6. Run `php artisan migrate`
