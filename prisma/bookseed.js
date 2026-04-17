import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const books = [
  {
    isbn: "9780553103540",
    title: "A Game of Thrones",
    author: "George R. R. Martin",
  },
  {
    isbn: "9780439139601",
    title: "Harry Potter and the Goblet of Fire",
    author: "J.K. Rowling",
  },
  {
    isbn: "9780261103573",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
  },
  {
    isbn: "9780061120084",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
  },
  {
    isbn: "9780307474278",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    isbn: "9780451524935",
    title: "1984",
    author: "George Orwell",
  },
  {
    isbn: "9780141439600",
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    isbn: "9780316769488",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
  },
  {
    isbn: "9780307269751",
    title: "The Da Vinci Code",
    author: "Dan Brown",
  },
  {
    isbn: "9780062316097",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
  },
];

const main = async () => {
  console.log("Seeding books...");
  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: book,
    });

    console.log(`created book: ${book.title}`);
  }
  console.log("Book Seeding Completed");
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
