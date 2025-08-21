create table `chats` (
	id int primary key, 
    name varchar(255) null,
    context text(65535) null
    );

insert into `chats` (name, context) values ('chat1', "");
select * from `chats`;

SELECT * from rag_chatbot.chats;