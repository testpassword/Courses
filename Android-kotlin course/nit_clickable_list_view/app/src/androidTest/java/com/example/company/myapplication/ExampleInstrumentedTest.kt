package com.example.company.myapplication

import android.app.Activity
import android.util.Log
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.rule.ActivityTestRule
import com.example.company.lib.Checker
import org.junit.AfterClass
import org.junit.Rule
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class Test : Checker() {

    @Rule
    @JvmField
    val mActivityRule = ActivityTestRule(MainActivity::class.java)

    override fun getActivity(): Activity? = mActivityRule.activity
}