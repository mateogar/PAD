package com.example.usuario_local.mindgames;

import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
import android.webkit.JavascriptInterface;

/**
 * Created by usuario_local on 16/05/2017.
 */
public class JavaScriptInterface {
    private Activity activity;

    public JavaScriptInterface(Activity activiy) {
        this.activity = activiy;
    }

   /* @JavascriptInterface
    public void goBack(){
        activity.onBackPressed();
    }*/
    @JavascriptInterface
    public void updatePnts(int acerts, int fails){
        // We need an Editor object to make preference changes.
        // All objects are from android.context.Context
        SharedPreferences settings = this.activity.getSharedPreferences("MyPrefFile", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putInt("points", acerts);

        // Commit the edits!
        editor.commit();
        int p = settings.getInt("points",1000);
        Log.d("MindGames", String.valueOf(p));
    }
}