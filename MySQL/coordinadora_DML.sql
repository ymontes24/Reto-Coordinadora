-- Establecer modo de SQL
SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

INSERT INTO
    `reto_coordinadora`.`roles` (`roleName`)
VALUES ('SuperAdmin'),
    ('Admin'),
    ('User');

INSERT INTO
    `reto_coordinadora`.`users` (
        `name`, `lastName`, `email`, `password`
    )
VALUES (
        'SuperAdmin', 'SuperAdmin', 'superadmin@superadmin.com', '$2b$10$lv6ZZw/iUtUvsCC.Zj0h2e5RjJMJVRTLdZl7iSG5qHlgTONg36Rlm'
    );

INSERT INTO
    `reto_coordinadora`.`user_roles` (
        `roles_idroles`, `users_idusers`
    )
VALUES (1, 1);

INSERT INTO
    `reto_coordinadora`.`user_roles` (roles_idroles, users_idusers)
VALUES (2, 1);

INSERT INTO
    `reto_coordinadora`.`user_roles` (roles_idroles, users_idusers)
VALUES (3, 1);

-- Restaurar modo de SQL
SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;