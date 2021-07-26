fn main() {
    for number in (1..4).rev() { println!("{}!", number) }
    println!("LIFTOFF!!!");
    let a = [10, 20, 30, 40, 50];
    for element in a.iter() { println!("the value is: {}", element) }
    let b = [10, 20, 30, 40, 50];
    let mut index = 0;
    while index < 5 {
        println!("the value is: {}", b[index]);
        index += 1;
    }
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 { break counter * 2 }
    };
    println!("The result is {}", result);
}