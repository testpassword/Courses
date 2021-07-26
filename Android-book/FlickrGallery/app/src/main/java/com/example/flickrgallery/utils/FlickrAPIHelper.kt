package com.example.flickrgallery.utils

import android.content.Context
import android.net.Uri
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.example.flickrgallery.R

object FlickrAPIHelper {

    fun loadRecentPhotos(c: Context, listener: Response.Listener<String>, errorListener: Response.ErrorListener, pageNumber: Int) {
        val queue = Volley.newRequestQueue(c)
        val url = Uri.parse(c.getString(R.string.DEFAULT_URL)).buildUpon()
            .appendQueryParameter("method", "flickr.photos.getRecent")
            .appendQueryParameter("api_key", c.getString(R.string.API_KEY))
            .appendQueryParameter("format", "json")
            .appendQueryParameter("nojsoncallback", "1")
            .appendQueryParameter("page", pageNumber.toString())
            .build().toString()
        val req = StringRequest(Request.Method.POST, url, listener, errorListener)
        queue.add(req)
    }
}