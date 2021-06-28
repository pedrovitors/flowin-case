## Flow.in Leilões

Case - Flow.in Leilões

#### Criação da Tabela

```mysql
CREATE TABLE FLOWIN_LEILAO
(
    id              VARCHAR(255) PRIMARY KEY,
    title           VARCHAR(255) UNIQUE NOT NULL,
    initial_price   INT                 NOT NULL,
    expire_date     DATE                NOT NULL,
    bid_progression INT                 NOT NULL,
    current_bid     INT                 NULL
);
```
###Endpoints

#### Buscar todos os leilões
GET _/leilao_

#### Criar leilão
POST _/leilao/create_

body -> title, initialPrice, expireDate, bidProgression

#### Buscar por leilão pelo titulo
GET _/leilao/:title_

#### Dar lance em um leilão
POST _/bid/:id_

body -> bid
