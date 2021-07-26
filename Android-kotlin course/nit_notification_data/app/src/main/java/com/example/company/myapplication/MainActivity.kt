package com.example.company.myapplication

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.NotificationCompat
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val notificationsMap = mutableMapOf<Int, Notification>()
    private var notificationCounter = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        notify.setOnClickListener {
            val notification = getNotificationBuilder(this).apply {
                setSmallIcon(android.R.mipmap.sym_def_app_icon)
                setContentTitle("Title")
                setContentText(editText.text.toString()) }.build()
            notificationsMap.putIfAbsent(notificationCounter++, notification)
            getNotificationManager(this).notify(notificationCounter, notification)
        }
    }

    fun getNotificationBuilder(context: Context): NotificationCompat.Builder {
        // Для версии Android не менее 8.0 (Oreo)
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = getNotificationChannel()
            val manager = getNotificationManager(context)
            manager.createNotificationChannel(channel)
            NotificationCompat.Builder(context, channel.id)
        } else NotificationCompat.Builder(context)
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun getNotificationChannel(): NotificationChannel {
        val chanelId = "3939"
        val name = "Channel"
        val description = "Description"
        val importance = NotificationManager.IMPORTANCE_HIGH
        val channel = NotificationChannel(chanelId, name, importance)
        channel.description = description
        channel.enableLights(true)
        channel.lightColor = Color.BLUE
        return channel
    }

    private fun getNotificationManager(context: Context) = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
}
