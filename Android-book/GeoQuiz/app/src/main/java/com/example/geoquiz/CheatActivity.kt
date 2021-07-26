package com.example.geoquiz

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import kotlinx.android.synthetic.main.activity_cheat.*

class CheatActivity : AppCompatActivity() {

    private var userIsCheater = false
    private val userIsCheaterKey = "SHOW_ANSWER_BUTTON_STATUS"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cheat)
        userIsCheater = savedInstanceState?.getBoolean(userIsCheaterKey) ?: false
        if (userIsCheater) showAnswer()
        show_answer_button.setOnClickListener { showAnswer() }
    }

    private fun showAnswer() {
        answer_text_view.text = intent.extras?.get("QUESTION_ANSWER")?.toString()
        userIsCheater = true
        setResult(Activity.RESULT_OK, Intent().apply { this.putExtra("USER_IS_CHEATER", userIsCheater) })
    }

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.putBoolean(userIsCheaterKey, userIsCheater)
    }
}