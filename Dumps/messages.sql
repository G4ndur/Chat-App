create table messages
(
    id         int          not null
        primary key,
    sentat     datetime     null,
    content    varchar(255) null,
    senderid   int          null,
    receiverid int          null
);

