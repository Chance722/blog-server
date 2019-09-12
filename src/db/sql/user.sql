create table if not exists user(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(60) NOT NULL comment '用户名',
   PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;