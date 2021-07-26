pub fn fizz_if_foo(fizzish: &str) -> &str {
    if fizzish == "fuzz" { "foo" }
    else if fizzish == "faz" { "bar" }
    else { "fuzz" }
}

