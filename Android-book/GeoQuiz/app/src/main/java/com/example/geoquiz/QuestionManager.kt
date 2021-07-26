package com.example.geoquiz

object QuestionManager {

    val questions = arrayOf(
        Question(R.string.shrek_question_text, true),
        Question(R.string.ipad_question_text, true),
        Question(R.string.keyboard_question_text, true)
    )
    var currentIndex = 0
}