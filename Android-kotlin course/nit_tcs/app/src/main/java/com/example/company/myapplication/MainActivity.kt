package com.example.company.myapplication

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import java.lang.NumberFormatException

class MainActivity : AppCompatActivity() {

    private lateinit var number: EditText
    private lateinit var systemOfCalculus: EditText
    private lateinit var convertResult: TextView
    private lateinit var convertButton: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        number = findViewById(R.id.number)
        systemOfCalculus = findViewById(R.id.systemOfCalculus)
        convertResult = findViewById(R.id.convertResult)
        convertButton = findViewById(R.id.convertButton)
        convertButton.setOnClickListener {
            convertResult.text =
                    try {
                        number.text.toString().toInt().toString(systemOfCalculus.text.toString().toInt())
                    } catch (e: NumberFormatException) { "Error" }
        }
    }
}