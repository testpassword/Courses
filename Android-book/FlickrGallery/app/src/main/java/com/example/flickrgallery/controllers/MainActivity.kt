package com.example.flickrgallery.controllers

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.flickrgallery.R

class MainActivity: AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)
        val fcId = R.id.fragmentContainer
        supportFragmentManager.let {
            if (it.findFragmentById(fcId) == null)
                it.beginTransaction().add(fcId, PhotoGalleryFragment.newInstance()).commit()
        }
    }
}