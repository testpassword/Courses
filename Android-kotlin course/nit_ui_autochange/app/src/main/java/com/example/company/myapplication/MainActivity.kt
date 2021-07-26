package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.EditText
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    private lateinit var textView: TextView
    private lateinit var editText: EditText
    private var counter = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        textView = findViewById(R.id.textView)
        editText = findViewById(R.id.editText)
        editText.addTextChangedListener(object: TextWatcher {
            override fun afterTextChanged(p0: Editable?) = println("+")
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) = println("+")

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                val patterns = mapOf(
                        Pair("question", "answer"),
                        Pair("request", "response"),
                        Pair("problem", "task")
                )
                var str = p0.toString()
                patterns.forEach { (k, v) ->
                    if (str.contains(k)) {
                        str = str.replace(k, v)
                        counter++
                        editText.setText(str)
                        editText.setSelection(str.lastIndex + 1)
                    }
                }
                textView.text = counter.toString()
            }
        })
    }
}