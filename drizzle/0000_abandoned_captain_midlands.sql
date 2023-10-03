CREATE TABLE `tasks` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(110),
	`completed` boolean NOT NULL DEFAULT false,
	`todoId` bigint,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(110) NOT NULL,
	`description` varchar(256),
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `todoId_idx` ON `tasks` (`todoId`);