fn main() {
    let mut message = String::from("");
    let part1 = "Rust ";
    let part2 = "is the ";
    let part3 = "greatest programming language";
    for s in [part1, part2, part3] { message.push_str(s) }
    println!("{}", message)
}
