package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.TextWatcher
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import java.lang.Exception
import java.lang.NumberFormatException

class MainActivity : AppCompatActivity() {

    private lateinit var textView: TextView
    private lateinit var editText: EditText
    private lateinit var checkBtn: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textView = findViewById(R.id.textView)
        editText = findViewById(R.id.editText)
        checkBtn = findViewById(R.id.checkBtn)
        checkBtn.setOnClickListener {
            textView.text = try {
                if (isPrime(editText.text.toString().toInt())) "prime" else "not prime"
            } catch (e: NumberFormatException) { "error" }
        }
    }

    private fun isPrime(n: Int) = if (n < 2) false else (2 .. n / 2).all { n % it != 0 }
}