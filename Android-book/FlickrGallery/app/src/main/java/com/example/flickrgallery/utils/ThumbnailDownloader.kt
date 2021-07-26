package com.example.flickrgallery.utils

import android.os.HandlerThread
import android.util.Log

class ThumbnailDownloader<T>: HandlerThread(TAG) {

    private var mHasQuit = false

    companion object { val TAG = "ThumbnailDownloader" }

    override fun quit(): Boolean {
        mHasQuit = true
        return super.quit()
    }

    fun queueThumbnail(target: T, url: String) {
        Log.i(TAG, "Got a URL: $url")
    }
}