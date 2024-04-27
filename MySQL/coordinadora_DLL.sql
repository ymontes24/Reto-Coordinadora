SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema reto_coordinadora
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema reto_coordinadora
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `reto_coordinadora` DEFAULT CHARACTER SET utf8;

USE `reto_coordinadora`;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`users` (
    `idusers` VARCHAR(36) NOT NULL, `name` VARCHAR(45) NOT NULL, `lastName` VARCHAR(45) NULL, `email` VARCHAR(45) NOT NULL, `password` VARCHAR(45) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`idusers`), UNIQUE INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`roles` (
    `idroles` VARCHAR(36) NOT NULL, `roleName` VARCHAR(45) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`idroles`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`event_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`event_status` (
    `idevent_status` VARCHAR(36) NOT NULL, `status_name` VARCHAR(45) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`idevent_status`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`events` (
    `idevents` VARCHAR(36) NOT NULL, `title` VARCHAR(45) NOT NULL, `description` VARCHAR(45) NULL, `address` VARCHAR(45) NULL, `lat` VARCHAR(45) NULL, `long` VARCHAR(45) NULL, `event_status_idevent_status` VARCHAR(36) NOT NULL, `users_idcreator` VARCHAR(36) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`idevents`), INDEX `fk_events_event_status1_idx` (
        `event_status_idevent_status` ASC
    ), INDEX `fk_events_users1_idx` (`users_idcreator` ASC), CONSTRAINT `fk_events_event_status1` FOREIGN KEY (`event_status_idevent_status`) REFERENCES `reto_coordinadora`.`event_status` (`idevent_status`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `fk_events_users1` FOREIGN KEY (`users_idcreator`) REFERENCES `reto_coordinadora`.`users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`assistants`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`assistants` (
    `idassistants` VARCHAR(36) NOT NULL, `users_idusers` VARCHAR(36) NOT NULL, `events_idevents` VARCHAR(36) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`idassistants`), INDEX `fk_assistants_users1_idx` (`users_idusers` ASC), INDEX `fk_assistants_events1_idx` (`events_idevents` ASC), CONSTRAINT `fk_assistants_users1` FOREIGN KEY (`users_idusers`) REFERENCES `reto_coordinadora`.`users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `fk_assistants_events1` FOREIGN KEY (`events_idevents`) REFERENCES `reto_coordinadora`.`events` (`idevents`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `reto_coordinadora`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `reto_coordinadora`.`user_roles` (
    `iduser_roles` VARCHAR(36) NOT NULL, `roles_idroles` VARCHAR(36) NOT NULL, `users_idusers` VARCHAR(36) NOT NULL, `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, `deleted_at` TIMESTAMP NULL, PRIMARY KEY (`iduser_roles`), INDEX `fk_user_roles_roles_idx` (`roles_idroles` ASC), INDEX `fk_user_roles_users1_idx` (`users_idusers` ASC), CONSTRAINT `fk_user_roles_roles` FOREIGN KEY (`roles_idroles`) REFERENCES `reto_coordinadora`.`roles` (`idroles`) ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT `fk_user_roles_users1` FOREIGN KEY (`users_idusers`) REFERENCES `reto_coordinadora`.`users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;

SET
    GLOBAL sql_mode = (
        SELECT
        REPLACE (
                @@sql_mode, 'ONLY_FULL_GROUP_BY', ''
            )
    );