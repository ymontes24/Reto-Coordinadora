-- Establecer modo de SQL
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- Obtener el UID del usuario recién creado
SET @user_uid = UUID();

-- Crear el usuario super Admin con UID autogenerado
INSERT INTO
    `reto_coordinadora`.`users` (
        `idusers`, `name`, `lastName`, `email`, `password`, `created_at`, `updated_at`, `deleted_at`
    )
VALUES (
        @user_uid, 'Super', 'Admin', 'superadmin@superadmin.com', 'dYlaQc1trK**', NOW(), NOW(), NULL
    );

-- Obtener el UID del rol recién creado
SET @role_uid = UUID();

-- Crear el rol super admin con UID autogenerado
INSERT INTO
    `reto_coordinadora`.`roles` (
        `idroles`, `roleName`, `created_at`, `updated_at`, `deleted_at`
    )
VALUES (
        @role_uid, 'super admin', NOW(), NOW(), NULL
    );

-- Asignar el rol super admin al usuario super Admin
INSERT INTO
    `reto_coordinadora`.`user_roles` (
        `iduser_roles`, `roles_idroles`, `users_idusers`, `created_at`, `updated_at`, `deleted_at`
    )
VALUES (
        UUID(), @role_uid, @user_uid, NOW(), NOW(), NULL
    );

-- Restaurar modo de SQL
SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;