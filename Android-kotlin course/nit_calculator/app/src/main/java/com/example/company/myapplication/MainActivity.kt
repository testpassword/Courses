package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.ArithmeticException
import kotlin.NumberFormatException

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        add.setOnClickListener { addButtonHandler() }
        subtr.setOnClickListener { subtrButtonHandler() }
        mul.setOnClickListener { mulButtonHandler() }
        divide.setOnClickListener { divideButtonHandler() }
    }

    private fun addButtonHandler() {
        try {
            answer.text = (getArg(arg1) + getArg(arg2)).toString()
        } catch (e: Exception) {
            when (e) {
                is NumberFormatException -> answer.text = "Input Error"
                is ArithmeticException -> answer.text = "Div by zero"
            }
        }
    }

    private fun subtrButtonHandler() {
        try {
            answer.text = (getArg(arg1) - getArg(arg2)).toString()
        } catch (e: Exception) {
            when (e) {
                is NumberFormatException -> answer.text = "Input Error"
                is ArithmeticException -> answer.text = "Div by zero"
            }
        }
    }

    private fun mulButtonHandler() {
        try {
            answer.text = (getArg(arg1) * getArg(arg2)).toString()
        } catch (e: Exception) {
            when (e) {
                is NumberFormatException -> answer.text = "Input Error"
                is ArithmeticException -> answer.text = "Div by zero"
            }
        }
    }

    private fun divideButtonHandler() {
        try {
            answer.text = (getArg(arg1) / getArg(arg2)).toString()
        } catch (e: Exception) {
            when (e) {
                is NumberFormatException -> answer.text = "Input Error"
                is ArithmeticException -> answer.text = "Div by zero"
            }
        }
    }

    private fun getArg(inputField: EditText) = inputField.text.toString().toInt()

}
