CREATE TABLE
    `operators` (
        `id` varchar(36) NOT NULL DEFAULT (uuid ()),
        `name` varchar(255) NOT NULL UNIQUE,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `deleted_at` timestamp NULL DEFAULT NULL,
        `created_by` varchar(36) NOT NULL,
        `updated_by` varchar(36) DEFAULT NULL,
        `deleted_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `operators_id_uindex` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `clients` (
        `id` varchar(36) NOT NULL DEFAULT (uuid ()),
        `name` varchar(255) NOT NULL,
        `birth` date DEFAULT NULL,
        `email` varchar(255) UNIQUE DEFAULT NULL,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `deleted_at` timestamp NULL DEFAULT NULL,
        `created_by` varchar(36) NOT NULL,
        `updated_by` varchar(36) DEFAULT NULL,
        `deleted_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `clients_id_uindex` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
    `assignments` (
        `id` varchar(36) NOT NULL DEFAULT (uuid ()),
        `operator_id` varchar(36) NOT NULL,
        `client_id` varchar(36) NOT NULL,
        `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
        `deleted_at` timestamp NULL DEFAULT NULL,
        `created_by` varchar(36) NOT NULL,
        `updated_by` varchar(36) DEFAULT NULL,
        `deleted_by` varchar(36) DEFAULT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `assignments_id_uindex` (`id`),
        UNIQUE KEY `assignments_operator_client_uindex` (`operator_id`, `client_id`),
        KEY `assignments_operator_id_idx` (`operator_id`),
        KEY `assignments_client_id_idx` (`client_id`),
        CONSTRAINT `assignments_operator_id_fk` FOREIGN KEY (`operator_id`) REFERENCES `operators` (`id`),
        CONSTRAINT `assignments_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;