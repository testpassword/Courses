package com.example.company.myapplication

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.PersistableBundle
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener { startActivity(
                Intent(this, SecondActivity::class.java).apply {
                    this.putExtra("edit_text_data", editText.text.toString())
                }
        ) }
    }

    override fun onStop() {
        super.onStop()
        editText.text = null
    }

    override fun onResume() {
        super.onResume()
        intent?.let {
            textView.text = it.extras["edit_text_data"].toString()
        }
    }
}