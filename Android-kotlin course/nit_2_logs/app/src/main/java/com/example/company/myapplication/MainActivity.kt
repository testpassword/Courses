package com.example.company.myapplication

import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import com.example.company.lib.Log

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        Log.d("CHECKER", "DEBUG")
        Log.w("CHECKER","WARNING")
        Log.e("CHECKER","ERROR")
        Log.i("CHECKER","INFO")
        Log.printAnswer()
    }
}
