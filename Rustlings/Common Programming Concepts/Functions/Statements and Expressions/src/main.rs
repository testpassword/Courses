fn five() -> i32 { 5 }

fn plus_one(x: i32) -> i32 { x + 1 }

fn main() {
    let template = "The value of is: {}";
    let mut x = five();
    println!(template, x);
    let y = {
        let x = 3;
        x + 1
    };
    println!(template, y);
    x = plus_one(5);
    println!(template, x);
}