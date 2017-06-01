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
    public void updatePnts(int acerts, int fails, String gameName, String level){
        // We need an Editor object to make preference changes.
        // All objects are from android.context.Context
        SharedPreferences settings = this.activity.getSharedPreferences("MyPrefFile", 0);
        SharedPreferences.Editor editor = settings.edit();
        editor.putInt("points_" + gameName + "_" + level, acerts);
        // Commit the edits!
        editor.commit();
        int p = settings.getInt("points",1000);
        Log.d("MindGames", String.valueOf(p));
    }

    @JavascriptInterface
    public void share(int success,  String gameName, String level){
        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        String message = "Hey!\nI just played MindGames.\nI got a score of " + success + " in the game " + gameName + " on its ";
        message += level +" level.";
        sendIntent.putExtra(Intent.EXTRA_TEXT, message);
        sendIntent.setType("text/plain");
        this.activity.startActivity(Intent.createChooser(sendIntent, "Share with"));
    }

    @JavascriptInterface
    public String loadLevel(){
        return "LOW";
    }

    @JavascriptInterface
    public int getRecord(String nameGame, String level){
        SharedPreferences settings = this.activity.getSharedPreferences("MyPrefFile", 0);
        int record = settings.getInt("points_" + nameGame + "_" + level,0);
        return record;
    }

}