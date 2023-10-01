use worker::{event, Env, Request, Response, Result};

#[derive(serde::Deserialize)]
struct Payload {
    value: usize,
}

#[event(fetch, respond_with_errors)]
pub async fn fetch(mut req: Request, _env: Env, _ctx: worker::Context) -> Result<Response> {
    let payload = req.json::<Payload>().await?;

    Response::ok("Yeah that value was: ".to_owned() + &payload.value.to_string())
}
