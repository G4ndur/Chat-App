create table messages
(
    id          int          not null
        primary key,
    sent_at     datetime     null,
    content     varchar(255) null,
    sender_id   int          null,
    receiver_id int          null
);

