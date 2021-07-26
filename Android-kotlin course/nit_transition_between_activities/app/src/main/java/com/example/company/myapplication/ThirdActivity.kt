package com.example.company.myapplication

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button

class ThirdActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_third)
        findViewById<Button>(R.id.button_prev3).setOnClickListener { startActivity(Intent(this, SecondActivity::class.java)) }
        findViewById<Button>(R.id.button_next3).setOnClickListener { startActivity(Intent(this, MainActivity::class.java)) }
    }
}
