pub fn calculate_price(apples_num: i32) -> i32 {
    let price = 2;
    if apples_num < 40 { apples_num * price }
    else { apples_num }
}
