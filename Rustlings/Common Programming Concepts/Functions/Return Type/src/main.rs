fn main() {
    let original_price = 51;
    println!("Your sale price is {}", sale_price(original_price));
}

fn sale_price(price: i32) -> i32 { price - if is_even(price) { 10 } else { 3 } }

fn is_even(num: i32) -> bool { num % 2 == 0 }