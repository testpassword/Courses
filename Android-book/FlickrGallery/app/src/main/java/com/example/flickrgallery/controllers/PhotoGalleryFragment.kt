package com.example.flickrgallery.controllers

import android.content.Context
import android.os.Bundle
import android.util.Log
import android.view.*
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.*
import com.android.volley.Response
import com.example.flickrgallery.R
import com.example.flickrgallery.models.GalleryItem
import com.example.flickrgallery.utils.FlickrAPIHelper
import com.example.flickrgallery.utils.ThumbnailDownloader
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import org.json.JSONObject

class PhotoGalleryFragment private constructor(): Fragment() {

    private lateinit var photoRV: RecyclerView
    private lateinit var emptyTV: TextView

    private var pageCounter = 1
    private val photos: MutableList<GalleryItem> = mutableListOf()
    private val parser = Gson()
    private val listener = Response.Listener<String>{
        val token = object: TypeToken<Collection<GalleryItem>>(){}.type
        val rawArray= JSONObject(it.toString()).getJSONObject("photos").getJSONArray("photo").toString()
        val oldSize = photos.size
        photos.addAll(parser.fromJson(rawArray, token))
        if (photos.size - oldSize != 0) {
            photoRV.adapter!!.notifyDataSetChanged()
            (this.activity as AppCompatActivity).supportActionBar!!.subtitle = photos.size.toString()
            if (this.photos.isNotEmpty()) emptyTV.visibility = View.GONE
            pageCounter++
        }
    }
    private val errorListener = Response.ErrorListener { Snackbar.make(photoRV, it.message!!, Snackbar.LENGTH_SHORT) }
    private lateinit var thumbnailDownloader: ThumbnailDownloader<PhotoHolder>

    companion object {
        val TAG = this::class.java.name

        fun newInstance() = PhotoGalleryFragment()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.retainInstance = true
        thumbnailDownloader = ThumbnailDownloader()
        thumbnailDownloader.let {
            it.start()
            it.looper
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {

        fun bindControls(v: View) {
            photoRV = v.findViewById(R.id.photo_recycler_view)
            emptyTV = v.findViewById(R.id.empty_data_hint)
        }

        fun initViewsDisplay() {
            photoRV.layoutManager = GridLayoutManager(activity, 3)
            photoRV.adapter = PhotoAdapter(this.photos)
        }

        fun addListeners() {
            photoRV.addOnScrollListener(object: RecyclerView.OnScrollListener() {
                override fun onScrollStateChanged(recyclerView: RecyclerView, newState: Int) {
                    super.onScrollStateChanged(recyclerView, newState)
                    if (!photoRV.canScrollVertically(1)) loadPhotosWrapper()
                }
            })
        }

        val v = inflater.inflate(R.layout.gallery_fragment, container, false)!!
        bindControls(v)
        initViewsDisplay()
        addListeners()
        loadPhotosWrapper()
        return v
    }

    override fun onDestroy() {
        super.onDestroy()
        thumbnailDownloader.quit()
    }

    private fun loadPhotosWrapper() =
            FlickrAPIHelper.loadRecentPhotos(this.activity as Context, listener, errorListener, pageCounter)



    private inner class PhotoHolder(itemView: View): RecyclerView.ViewHolder(itemView) {

        private val titleTV: TextView = itemView.findViewById(R.id.item_title)
        private val imageIV: ImageView = itemView.findViewById(R.id.item_image)

        fun bindGalleryItem(item: GalleryItem) {
            titleTV.text = item.title
            //TODO: здесь будет правильное изображение
            imageIV.setImageResource(R.drawable.plug)
        }
    }



    private inner class PhotoAdapter(val items: List<GalleryItem>): RecyclerView.Adapter<PhotoHolder>() {

        override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PhotoHolder {
            val inflater = LayoutInflater.from(this@PhotoGalleryFragment.activity)
            return PhotoHolder(inflater.inflate(R.layout.gallery_item, parent, false))
        }

        override fun onBindViewHolder(holder: PhotoHolder, pos: Int) {
            val item = items[pos]
            holder.bindGalleryItem(item)
            this@PhotoGalleryFragment.thumbnailDownloader.queueThumbnail(holder, item.url)
        }

        override fun getItemCount() = items.size
    }
}