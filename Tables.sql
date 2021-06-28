### Criação da Tabela

CREATE TABLE FLOWIN_LEILAO
(
    id              VARCHAR(255) PRIMARY KEY,
    title           VARCHAR(255) UNIQUE NOT NULL,
    initial_price   INT                 NOT NULL,
    expire_date     DATE                NOT NULL,
    bid_progression INT                 NOT NULL,
    current_bid     INT                 NULL
);