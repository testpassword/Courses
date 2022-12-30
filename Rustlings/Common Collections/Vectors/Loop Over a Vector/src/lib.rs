pub fn vec_loop(mut v: Vec<i32>) -> Vec<i32> {
    for i in &mut v { *i *= 2 }
    v
}
