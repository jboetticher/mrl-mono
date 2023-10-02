use std::{result, vec};

use serde::{Serialize, Deserialize};
use worker::{event, Env, Request, Response, Result, Router, query};

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
    decimals: u32
    /*
    id INT PRIMARY KEY,
    contract_addr VARCHAR(255) NOT NULL,
    token_name VARCHAR(255) NOT NULL,
    token_sym VARCHAR(255) NOT NULL,
    decimals UNSIGNED INT NOT NULL
    */
}

#[event(fetch)]
pub async fn fetch(mut req: Request, _env: Env, _ctx: worker::Context) -> Result<Response> {
    let router = Router::new();

    router
        .get_async("/totalLiquidityForward", |_req, ctx| async move {
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
            
            Response::error("Error when retrieving data!", 500)

            // match x {
            //     Some(r) => Response::from_json(&r),
            //     None => Response::error("Error when retrieving data!", 500)
            // }
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
                CREATE TABLE Token (
                    id INT PRIMARY KEY,
                    contract_addr VARCHAR(255) NOT NULL,
                    token_name VARCHAR(255) NOT NULL,
                    token_sym VARCHAR(255) NOT NULL,
                    decimals UNSIGNED INT NOT NULL
                );
                "),
                d1.prepare("
                CREATE TABLE TransfersForward (
                    ID INT PRIMARY KEY,
                    token_ID INT REFERENCES Token(id),
                    token_count INT NOT NULL,
                    usd INT NOT NULL,
                    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    to_chain INT NOT NULL
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
