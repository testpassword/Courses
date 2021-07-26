package com.example.company.myapplication

import android.content.Intent
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val data = arrayOf("ANDROID", "IOS", "WINDOWS 10 MOBILE")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        listView1.let {
            it.adapter = ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, data)
            //it.choiceMode = ListView.CHOICE_MODE_SINGLE
            listView1.setOnItemClickListener { parent, view, position, id ->
                startActivity(
                        Intent(this, ListItemActivity::class.java).apply {
                            this.putExtra("text_data", (view as TextView).text.toString())
                        }
                )
            }
        }
    }
}
