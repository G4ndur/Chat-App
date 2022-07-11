create table messages
(
    payload   varchar(255) null,
    timestamp varchar(255) null,
    `key`     int          not null,
    constraint messages_pk
        primary key (`key`)
);

