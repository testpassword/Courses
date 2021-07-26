package com.example.company.myapplication

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.ArrayAdapter
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val adapter = ArrayAdapter<Int>(this, android.R.layout.simple_list_item_1,
                (0..30).toList()).apply {
            gridView.adapter = this
        }
        gridView.setOnItemClickListener { _, _, pos, _ -> adapter.remove(pos) }
    }
}