package com.example.geoquiz

import android.app.Activity
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Gravity
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*
import java.util.*

/**ы
 * Вопрос [mTextResId] для пользователя и ответ [mAnswerIsTrue] на него.
 * @author Кульбако Артемий
 */
data class Question(val mTextResId: Int, val mAnswerIsTrue: Boolean, var isAnswered: Boolean = false)

/**
 * Отображает вопросы пользователю.
 * @author Кульбако Артемий
 */
class MainActivity : AppCompatActivity() {

    val questions = QuestionManager.questions
    val TAG = this.javaClass.name
    val CHEAT_REQUEST_CODE = 1
    var cheatCounter = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        savedInstanceState?.let { restoreActivityState(it) }
        next_button.setOnClickListener { showNextQuestion() }
        prev_button.setOnClickListener { showPrevQuestion() }
        true_button.setOnClickListener {
            checkAnswer(true)
            showNextQuestion()
        }
        false_button.setOnClickListener {
            checkAnswer(false)
            showNextQuestion()
        }
        cheat_button.setOnClickListener {
            sendRequestToCheatActivity(
                Pair("QUESTION_ANSWER", questions[QuestionManager.currentIndex].mAnswerIsTrue), CHEAT_REQUEST_CODE) }
        api_shower.text = "API Level ${android.os.Build.VERSION.SDK_INT}"
        Log.d(TAG, "onCreate() выполнен")
    }

    private fun restoreActivityState(state: Bundle) {
        QuestionManager.currentIndex = state.getInt("INDEX")
        cheatCounter = state.getInt("COUNTER")
        question_text_view.setText(questions[QuestionManager.currentIndex].mTextResId)
        if (questions[QuestionManager.currentIndex].isAnswered) sequenceOf(true_button, false_button).forEach { it.isEnabled = false }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (resultCode == Activity.RESULT_OK)
            when (requestCode) {
                CHEAT_REQUEST_CODE ->
                    data?.let {
                        if (it.getBooleanExtra("USER_IS_CHEATER", false)) {
                            showToast(R.string.judgment_toast)
                            questions[QuestionManager.currentIndex].isAnswered = true
                            cheatCounter++
                            if (cheatCounter > 0) showToast("У вас осталось ${3 - cheatCounter} подсказок.")
                            else cheat_button.isEnabled = false
                            checkIsAvailableForAnswer()
                        }
                    }
            }
    }

    private fun sendRequestToCheatActivity(data: Pair<String, Boolean>, requestCode: Int) =
        startActivityForResult(
            Intent(this, CheatActivity::class.java).apply {
                this.putExtra(data.first, data.second)
            }, requestCode)

    override fun onSaveInstanceState(outState: Bundle) {
        super.onSaveInstanceState(outState)
        outState.let {
            it.putInt("INDEX", QuestionManager.currentIndex)
            it.putInt("COUNTER", cheatCounter)
        }
        Log.d(TAG, "onSaveInstanceState() выполнен")
    }

    private fun checkAnswer(userChoice: Boolean) =
        showToast(if (questions[QuestionManager.currentIndex].mAnswerIsTrue == userChoice) R.string.correct_toast else R.string.incorrect_toast)

    private fun showNextQuestion() {
        Log.d("NEXT", "click")
        questions[QuestionManager.currentIndex].isAnswered = true
        val arrayLength = questions.size - 1
        if (QuestionManager.currentIndex < arrayLength) {
            QuestionManager.currentIndex++
            question_text_view.setText(questions[QuestionManager.currentIndex].mTextResId)
            checkIsAvailableForAnswer()
        }
        if (QuestionManager.currentIndex == arrayLength && questions.all { it.isAnswered })
            showToast("${questions.count { it.isAnswered } / questions.size * 100}%")
    }

    private fun showPrevQuestion() {
        Log.d("PREV", "click")
        if (QuestionManager.currentIndex > 0) {
            QuestionManager.currentIndex--
            question_text_view.setText(questions[QuestionManager.currentIndex].mTextResId)
            checkIsAvailableForAnswer()
        }
    }

    private fun showToast(stringId: Int) =
        Toast.makeText(this, stringId, Toast.LENGTH_SHORT).apply { this.setGravity(Gravity.TOP, 0, 100) }.show()

    private fun showToast(string: String) =
        Toast.makeText(this, string, Toast.LENGTH_SHORT).apply { this.setGravity(Gravity.TOP, 0, 100) }.show()

    private fun checkIsAvailableForAnswer() =
        sequenceOf(true_button, false_button).forEach { it.isEnabled = !questions[QuestionManager.currentIndex].isAnswered }

    override fun onStart() {
        super.onStart()
        Log.d(TAG, "onStart() выполнен")
    }

    override fun onResume() {
        super.onStart()
        Log.d(TAG, "onResume() выполнен")
    }

    override fun onPause() {
        super.onStart()
        Log.d(TAG, "onPause() выполнен")
    }

    override fun onStop() {
        super.onStart()
        Log.d(TAG, "onStop() выполнен")
    }

    override fun onDestroy() {
        super.onStart()
        Log.d(TAG, "onDestroy() выполнен")
    }
}