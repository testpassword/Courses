package com.example.company.myapplication

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.ArrayAdapter
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val data = MutableList(11) { i -> (i * i) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        listView.let {
            val adapter = ArrayAdapter<Int>(this, android.R.layout.simple_list_item_1, data)
            it.adapter = adapter
            it.setOnItemClickListener { _, view, _, _ ->
                adapter.remove((view as TextView).text.toString().toInt())
            }
        }
    }
}