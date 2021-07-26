package com.example.company.myapplication

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import kotlinx.android.synthetic.main.activity_main.*
import java.lang.Exception
import java.net.URISyntaxException

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        button.setOnClickListener {
            try {
                val url = editText.text.toString().trim()
                if (url.isBlank()) throw URISyntaxException(url, "$url is empty string")
                val queue = Volley.newRequestQueue(this)
                val req = StringRequest(Request.Method.GET, url,
                        Response.Listener<String>{ textView.text = "Ok" },
                        Response.ErrorListener { textView.text = "Failed" })
                queue.add(req)
            } catch (e: Exception) { textView.text = "Failed" }
        }
    }
}
