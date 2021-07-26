=begin
Исправьте код таким образом, чтобы он проверял наличие файла "demo.txt" и выводил его содержимое, если файл существует,
а если этого файла не существует - выводил бы надпись "File does not exist".
=end
if File.file?("demo.txt")
  f = File.open("demo.txt")
  puts f.read
  f.close
else
  puts "File does not exist"
end