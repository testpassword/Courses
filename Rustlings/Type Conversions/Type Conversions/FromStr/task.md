## FromStr

This does practically the same thing that `TryFrom<&str>` does.
Additionally, upon implementing `FromStr`, you can use the `parse` method
on strings to generate an object of the implementor type.
You can read more about it at https://doc.rust-lang.org/std/str/trait.FromStr.html

Steps:
1. If the length of the provided string is 0, then return an error
2. Split the given string on the commas present in it
3. Extract the first element from the split operation and use it as the name
4. If the name is empty, then return an error
5. Extract the other element from the split operation and parse it into a `usize` as the age
with something like `"4".parse::<usize>()`.
If while parsing the age, something goes wrong, then return an error.
Otherwise, return a `Result` of a `Person` object

<div class="hint">The implementation of <code>FromStr</code> should return an <code>Ok</code> with a <code>Person</code> object,
or an <code>Err</code> with a string if the string is not valid.
This is almost like the try_from_into exercise.</div>