package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.IllegalArgumentException
import java.nio.file.Files
import java.nio.file.Paths


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        perform.setOnClickListener {
            try {
                val userPartPath = filepath.text.toString()
                if (userPartPath.isBlank()) throw IllegalArgumentException()
                if (Environment.getExternalStorageState() == Environment.MEDIA_MOUNTED) {
                    val fullPath = Environment.getExternalStorageDirectory().absolutePath + "/" + userPartPath
                    val data = Files.readAllLines(Paths.get(fullPath))
                    result.text = data.toString().removeSurrounding("[", "]")
                }
            } catch (e: Exception) { result.text = e.toString() }
        }
      }
}
