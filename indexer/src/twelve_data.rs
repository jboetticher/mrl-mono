use serde::Deserialize;
use worker::{ Result, Date, DateInit, console_log};

#[derive(Debug, Deserialize)]
struct TwelveDataTimeSeriesRaw {
    meta: TwelveDataTimeMeta,
    values: Vec<TimeSeriesRaw>,
    status: String,
}

#[derive(Debug, Deserialize)]
struct TwelveDataTimeMeta {
    symbol: String,
    interval: String,
    currency_base: String,
    currency_quote: String,
    exchange: String,
    r#type: String,
}

#[derive(Debug, Deserialize)]
struct TimeSeriesRaw {
    datetime: String,
    open: String,
    high: String,
    low: String,
    close: String,
}

#[derive(Default)]
pub(crate) struct TimeSeries {
    pub(crate) timestamp: u64,
    pub(crate) open: f32,
    pub(crate) high: f32,
    pub(crate) low: f32,
    // We really only care about the close
    pub(crate) close: f32,
}

impl TimeSeries {
    pub(crate) fn estimate(&self) -> f32 {
        (self.open + self.close) / 2.
    }
}

pub(crate) async fn get_twelve_data(api_key: String, symbol: String) -> Result<Vec<TimeSeries>> {
    // Ensure that the symbol string isn't a wrapped variant. Will fail if there is ever a normal coin that starts with "W"
    let sanitized_symbol = if symbol.starts_with("W") {
        let mut c = symbol.chars();
        c.next();
        c.as_str().to_owned()
    } else {
        symbol.clone()
    };

    // Send endpoint
    console_log!("Getting data from twelvedata for symbol {sanitized_symbol}/USD. Input was {symbol}");
    let endpoint = format!("https://api.twelvedata.com/time_series?apikey={api_key}&symbol={sanitized_symbol}/USD&interval=2h&outputsize=5000");

    // Get the response
    let twelve_key_response = reqwest::get(endpoint)
        .await
        .map_err(|e| worker::Error::JsError(e.to_string()))?
        .json::<TwelveDataTimeSeriesRaw>()
        .await
        .map_err(|e| worker::Error::JsError(e.to_string()))?;

    if twelve_key_response.status != "ok" {
        return Err(worker::Error::JsError(format!(
            "Error: TwelveData returned {} for status!",
            twelve_key_response.status
        )));
    }
    else if twelve_key_response.values.len() == 0 {
        return Err(worker::Error::JsError(
            "Error: TwelveData returned no data!".to_owned()
        ));
    }

    let mut data: Vec<TimeSeries> = twelve_key_response
        .values
        .iter()
        .map(|d| TimeSeries {
            timestamp: Date::from(DateInit::String(d.datetime.to_owned())).as_millis() / 1000,
            open: d.open.parse().unwrap_or(0.),
            high: d.high.parse().unwrap_or(0.),
            low: d.low.parse().unwrap_or(0.),
            close: d.close.parse().unwrap_or(0.),
        })
        .collect();

    // Lowest timestamp first
    data.sort_by(|a, b| a.timestamp.cmp(&b.timestamp));

    Ok(data)
}
