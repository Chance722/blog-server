const admin =
  `create table if not exists admin(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(60) NOT NULL,
	 nickname VARCHAR(100),
	 pwd VARCHAR(100) NOT NULL,
	 avator VARCHAR(60),
   token VARCHAR(200),
   signature VARCHAR(200),
   blog_title VARCHAR(100),
   page_title VARCHAR(100),
   keywords VARCHAR(100),
   blog_address VARCHAR(100),
   blog_desc VARCHAR(200),
   email VARCHAR(60),
   icp_numbers VARCHAR(60),
	 reg_time TIMESTAMP,
	 last_login_time TIMESTAMP,
	 PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const article =
  `create table if not exists article(
    id INT NOT NULL AUTO_INCREMENT,
    blog_title VARCHAR(100) NOT NULL,
    keywords VARCHAR(60),
    description VARCHAR(200),
    tags VARCHAR(60),
    content TEXT NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    open TINYINT NOT NULL DEFAULT 0,
    thumb VARCHAR(100),
    category TINYINT NOT NULL DEFAULT 0,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    views INT NOT NULL DEFAULT 0,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const tags =
  `create table if not exists tags(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(100),
    article_nums INT NOT NULL DEFAULT 0,
    create_time TIMESTAMP,
    thumb VARCHAR(200),
    type TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const article_tags =
  `create table if not exists article_tags(
    id INT NOT NULL AUTO_INCREMENT,
    articleId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const categorys =
  `create table if not exists categorys(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(100),
    article_nums INT NOT NULL DEFAULT 0,
    thumb VARCHAR(200),
    type TINYINT NOT NULL DEFAULT 1,
    create_time TIMESTAMP,
    PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const article_categorys =
  `create table if not exists article_categorys(
    id INT NOT NULL AUTO_INCREMENT,
    articleId INT NOT NULL,
    categoryId INT NOT NULL,
    PRIMARY KEY ( id )
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const comments =
  `create table if not exists comments(
    id INT NOT NULL AUTO_INCREMENT,
    post_id INT NOT NULL,
    pid INT NOT NULL DEFAULT 0,
    content TEXT NOT NULL,
    likes INT NOT NULL DEFAULT 0,
    ip VARCHAR(20),
    city VARCHAR(60),
    region VARCHAR(60),
    country VARCHAR(60),
    agent VARCHAR(200),
    author_id INT NOT NULL,
    state TINYINT NOT NULL DEFAULT 1,
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    PRIMARY KEY ( id )
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`


const album =
  `create table if not exists album(
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    tags VARCHAR(60),
    type TINYINT NOT NULL DEFAULT 1,
    likes INT NOT NULL DEFAULT 0,
    comments INT NOT NULL DEFAULT 0,
    views TINYINT NOT NULL DEFAULT 0,
    state TINYINT NOT NULL DEFAULT 1,
    weather TINYINT NOT NULL DEFAULT 1,
    address VARCHAR(60),
    color VARCHAR(60),
    create_time TIMESTAMP,
    update_time TIMESTAMP,
    PRIMARY KEY ( id )
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const statistics =
  `create table if not exists statistics(
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(60) NOT NULL,
    nums TINYINT NOT NULL DEFAULT 1,
    type_desc VARCHAR(60),
    create_time TIMESTAMP,
    PRIMARY KEY ( id )
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

const user =
  `create table if not exists user(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(60) NOT NULL,
    homepage VARCHAR(200),
    ip VARCHAR(20),
    status TINYINT NOT NULL DEFAULT 1,
    create_time TIMESTAMP,
    PRIMARY KEY ( id )
 ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`

export default {
  admin,
  article,
  tags,
  categorys,
  article_tags,
  article_categorys,
  comments,
  album,
  statistics,
  user
}
