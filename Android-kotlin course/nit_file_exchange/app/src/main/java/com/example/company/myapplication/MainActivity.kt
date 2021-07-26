package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.widget.EditText
import kotlinx.android.synthetic.main.activity_main.*
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        perform.setOnClickListener {
            if (Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED) {
                val storagePath = Environment.getExternalStorageDirectory().absolutePath + "/"
                val file1 = Paths.get(storagePath + filepath.text.toString())
                val file2 = Paths.get(storagePath + filepath2.text.toString())
                if (!Files.exists(file1)) {
                    filepath.setText("error")
                    return@setOnClickListener
                }
                if (!Files.exists(file2)) {
                    filepath2.setText("error")
                    return@setOnClickListener
                }
                val file1Data = readFromFile(file1)
                val file2Data = readFromFile(file2)
                writeToFile(file1, file2Data)
                writeToFile(file2, file1Data)
            }
        }
    }

    private fun readFromFile(p: Path) = Files.readAllLines(p).toString().removeSurrounding("[", "]")

    private fun writeToFile(p: Path, content: String) = Files.write(p, content.toByteArray())
}