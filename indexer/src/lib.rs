use std::vec;

use serde::{Deserialize, Serialize};
use worker::{
    event, query, Env, Request, Response, Result, Router, ScheduleContext, ScheduledEvent, Date,
};

#[derive(Serialize)]
struct Liquidity {
    token_name: String,
    token_symbol: String,
    contract_address: String,
    tokens: u128,
    usd: f32,
    number_of_transfers: u32,
}

#[derive(Deserialize, Serialize)]
struct Token {
    id: u32,
    contract_addr: String,
    token_name: String,
    token_sym: String,
    decimals: u32,
}

#[event(fetch)]
pub async fn fetch(req: Request, _env: Env, _ctx: worker::Context) -> Result<Response> {
    let router = Router::new();

    router
        .get_async("/totalLiquidityForward", |_req: Request, _ctx| async move {
            let res: Liquidity = Liquidity {
                token_name: "Bitcoin".to_string(),
                token_symbol: "WBTC".to_string(),
                contract_address: "0x000".to_string(),
                tokens: 100,
                usd: 1000000.25,
                number_of_transfers: 30,
            };

            Response::from_json(&res)
        })
        .get_async("/getTokens", |_req, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statement = worker::query!(&d1, "SELECT * FROM Token");
            let result = statement.all().await?;

            if !result.success() {
                return Response::error(
                    result.error().unwrap_or("No error given".to_string()),
                    500,
                );
            }

            let x = result.results::<Token>()?;
            Response::from_json(&x)
        })
        .post_async("/reset", |_req, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statements = vec![
                query!(&d1, "DROP TABLE IF EXISTS Token"),
                query!(&d1, "DROP TABLE IF EXISTS TransfersForward")
            ] ;
            let result = d1.batch(statements).await?;

            let mut message: String = "".to_owned();
            for r in result {
                if r.success() {
                    message += "Success; ";
                }
                else {
                    message += &(r.error().unwrap_or("No error given".to_string()) + "; ");
                }
            }

            Response::ok(message)
        })
        .post_async("/test_data", |_req, ctx| async move {
            let d1 = ctx.env.d1("DB")?;
            let statements = vec![
                d1.prepare(
                    "
                    CREATE TABLE IF NOT EXISTS Token (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        contract_addr TEXT NOT NULL,
                        token_name TEXT NOT NULL,
                        token_sym TEXT NOT NULL,
                        decimals UNSIGNED INT NOT NULL
                    );
                "),
                d1.prepare("
                    CREATE TABLE IF NOT EXISTS TransfersForward (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        token_id INTEGER NOT NULL REFERENCES Token(id),
                        token_count INTEGER NOT NULL,
                        usd REAL NOT NULL,
                        block_num UNSIGNED INT NOT NULL,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
                        to_chain INTEGER NOT NULL
                    );
                "),
                d1.prepare(
                    "INSERT INTO Token (contract_addr, token_name, token_sym, decimals) VALUES ('0x123', 'Bitcoin', 'WBTC', 8);"),
                d1.prepare(
                    "INSERT INTO Token (contract_addr, token_name, token_sym, decimals) VALUES ('0x456', 'DAI', 'DAI', 8);"),
                d1.prepare(
                    "INSERT INTO Token (contract_addr, token_name, token_sym, decimals) VALUES ('0xABC', 'Ethereum', 'WETH', 18);"
                )
            ];

            let result = d1.batch(statements).await?;
            let mut message: String = "".to_owned();
            for r in result {
                if r.success() {
                    message += "Success; ";
                }
                else {
                    message += &(r.error().unwrap_or("No error given".to_string()) + "; ");
                }
            }

            Response::ok(message)
        })
        .run(req, _env)
        .await
}

#[event(scheduled)]
pub async fn scheduled(_event: ScheduledEvent, _env: Env, _ctx: ScheduleContext) {
    let Ok(db) = _env.d1("DB") else {
        println!("Error occurred with getting the DB during a scheduled event!");
        return
    };

    // 1. Get the last entry so that we know when to query from.
    let statement = db.prepare("SELECT MAX(block_num) AS most_recent_block FROM TransfersForward");
    let result = statement.first::<i64>(Some("most_recent_block")).await;

   let block: i64 = match result {
        Err(e) => {
            println!("Error with most_recent_block: {:?}", e);   
            4162196
        },
        Ok(Some(r)) => r,
        Ok(None) => 4162196
    };
    println!("Determined most recent block: {}", block);

    // 2. Query etherscan


    // 3. Sort data

    // 4. Place into the right data

    
}
