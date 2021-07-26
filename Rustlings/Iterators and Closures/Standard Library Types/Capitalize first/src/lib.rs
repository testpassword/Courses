pub fn capitalize_first(input: &str) -> String {
    let mut c = input.chars();
    match c.next() {
        None => String::new(),
        Some(first) => first/* Step 1 */.collect::<String>() + c.as_str(),
    }
}

// Step 2
pub fn iterate_string_vec() {
    let words = vec!["hello", "world"];
    let capitalized_words: Vec<String> = /* Something goes here */
    println!("{:?}", capitalized_words);
}

// Step 3
pub fn iterate_into_string() {
    let words = vec!["hello", " ", "world"];
    let capitalized_words = /* Something gos here */
    println!("{:?}", capitalized_words);
}


