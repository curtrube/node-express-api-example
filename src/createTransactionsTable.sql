CREATE TABLE transactions(
    id SERIAL PRIMARY KEY NOT NULL,
    merchant TEXT,
    amount MONEY,
    date DATE
)