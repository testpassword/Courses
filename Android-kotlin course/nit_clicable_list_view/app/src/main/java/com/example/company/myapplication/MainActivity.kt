package com.example.company.myapplication

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.os.Environment
import android.support.v4.app.ActivityCompat
import android.support.v4.content.ContextCompat
import android.widget.ArrayAdapter
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val data = arrayOf("1", "2", "3")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        listView1.let {
            it.adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, data)
            //it.choiceMode = ListView.CHOICE_MODE_SINGLE
            it.setOnItemClickListener { _, view, _, _ ->
                startActivity(
                        Intent(this, ListItemActivity::class.java).apply {
                            this.putExtra("text_data", (view as TextView).text.toString())
                        }
                )
            }
        }
    }
}
