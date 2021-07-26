--Задание
CREATE TABLE author(
    author_id INT PRIMARY KEY AUTO_INCREMENT,
    name_author VARCHAR(50)
)

--Задание
INSERT INTO author(name_author) VALUE ("Булгаков М.А.");
INSERT INTO author(name_author) VALUE ("Достоевский Ф.М.");
INSERT INTO author(name_author) VALUE ("Есенин С.А.");
INSERT INTO author(name_author) VALUE ("Пастернак Б.Л.");

--Задание
CREATE TABLE book (
      book_id INT PRIMARY KEY AUTO_INCREMENT, 
      title VARCHAR(50), 
      author_id INT,
      FOREIGN KEY(author_id)  REFERENCES author(author_id),
      genre_id INT,
      FOREIGN KEY(genre_id) REFERENCES genre(genre_id),
      price DECIMAL(8,2), 
      amount INT
);

--Задание
CREATE TABLE book (
      book_id INT PRIMARY KEY AUTO_INCREMENT, 
      title VARCHAR(50), 
      author_id INT,
      FOREIGN KEY(author_id) REFERENCES author(author_id) ON DELETE CASCADE,
      genre_id INT,
      FOREIGN KEY(genre_id) REFERENCES genre(genre_id) ON DELETE SET NULL,
      price DECIMAL(8,2), 
      amount INT
);

--Задание
INSERT INTO book(title, author_id, genre_id, price, amount) VALUES ("Стихотворения и поэмы", 3, 2, 650, 15);
INSERT INTO book(title, author_id, genre_id, price, amount) VALUES ("Черный человек", 3, 2, 570.2, 6);
INSERT INTO book(title, author_id, genre_id, price, amount) VALUES ("Лирика", 4, 2, 518.99, 2);