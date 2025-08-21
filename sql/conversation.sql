create table `conversation` (
	id int primary key auto_increment,
    chat_id int references chats(id),
    question text not null,
    answer text null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into `conversation` (chat_id, question, answer) values (
	1, "This is the first question in the chat", "This is the corrosponsing answer");
    
insert into `conversation` (chat_id, question, answer) values (
	1, "This is the second question in the chat", "This is the corrosponsing answer to that second question");
    
insert into `conversation` (chat_id, question, answer) values (
	1, "Why are you gay?", "Who said i was gay");
    
select * from `conversation`;