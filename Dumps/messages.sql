create table messages
(
    id          int        null,
    content     mediumtext null,
    sent_at     datetime   null,
    sender_id   int        null,
    receiver_id int        null
);

