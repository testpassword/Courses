package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.EditText
import android.widget.TextView
import java.lang.NumberFormatException

class MainActivity : AppCompatActivity() {

    private lateinit var editText: EditText
    private lateinit var editText2: EditText
    private lateinit var status: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        editText = findViewById(R.id.editText)
        editText2 = findViewById(R.id.editText2)
        status = findViewById(R.id.status)
        editText.addTextChangedListener(object: TextWatcher {
            override fun afterTextChanged(p0: Editable?) = Unit
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) = Unit

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                if (currentFocus == editText) {
                    try {
                        editText2.setText(Units.convert(editText.text.toString().toFloat(), Units.INCH).toString())
                        status.visibility = View.INVISIBLE
                    } catch (e: NumberFormatException) { status.visibility = View.VISIBLE }
                }
            }
        })
        editText2.addTextChangedListener(object: TextWatcher {
            override fun afterTextChanged(p0: Editable?) = Unit
            override fun beforeTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) = Unit

            override fun onTextChanged(p0: CharSequence?, p1: Int, p2: Int, p3: Int) {
                if (currentFocus == editText2) {
                    try {
                        editText.setText(Units.convert(editText2.text.toString().toFloat(), Units.KM).toString())
                        status.visibility = View.INVISIBLE
                    } catch (e: NumberFormatException) { status.visibility = View.VISIBLE }
                }
            }
        })
    }

    enum class Units {
        INCH, KM;

        companion object {
            fun convert(amount: Float, from: Units) =
                    when (from) {
                        INCH -> amount / 39370
                        KM -> amount * 39370
                    }
        }
    }
}