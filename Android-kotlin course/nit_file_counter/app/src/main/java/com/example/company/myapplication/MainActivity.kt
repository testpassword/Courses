package com.example.company.myapplication

import android.os.Bundle
import android.os.Environment
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.Exception
import java.nio.file.Files
import java.nio.file.Paths

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        perform.setOnClickListener {
            try {
                if (Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED) {
                    val fullPath = Paths.get(path.text.toString())
                    if (Files.exists(fullPath) && Files.isDirectory(fullPath))
                        result.text = Files.walk(fullPath).filter { it.toFile().isFile }.count().toString()
                }
            } catch (e: Exception) { result.text = "Error" }
        }
    }
}
