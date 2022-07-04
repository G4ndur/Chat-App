create table `notice-app`.notices
(
    `key`      varchar(45) not null
        primary key,
    payload    mediumtext  null,
    created_at datetime    not null,
    updated_at datetime    null
);

