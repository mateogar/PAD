package com.example.usuario_local.mindgames;


import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ActivityInfo;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;


public class MainActivity extends AppCompatActivity {
    private WebView myWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        myWebView = (WebView) this.findViewById(R.id.webView);
        myWebView.getSettings().setJavaScriptEnabled(true);
        Intent intent = getIntent();
        String message = intent.getStringExtra(FormActivity.EXTRA_MESSAGE);
        String[] data =  message.split("_");
        myWebView.loadUrl("file:///android_asset/"+data[0]+"/index.html?level="+data[1]);
        myWebView.setWebViewClient(new MyBrowser());
        JavaScriptInterface jsInterface = new JavaScriptInterface(this);
        myWebView.getSettings().setJavaScriptEnabled(true);
        myWebView.getSettings().setAllowFileAccess(true);
        myWebView.getSettings().setAllowContentAccess(true);
        myWebView.getSettings().setAllowFileAccessFromFileURLs(true);
        myWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        myWebView.addJavascriptInterface(jsInterface, "JSInterface");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setHomeButtonEnabled(true);

        // Restore preferences
        SharedPreferences settings = getSharedPreferences("MyPrefFile", 0);
        int point = settings.getInt("points", 0);

        this.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            // Respond to the action bar's Up/Home button
            case android.R.id.home:
                finish();
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void goBack(View view){
        /*Intent inten = new Intent(this, FormActivity.class);
        startActivity(inten);*/
        super.onBackPressed();
    }

    //Ejemplo para llamar a javascript desde Android
    /*public void alertWin(View view){
        int a = 3;
        myWebView.loadUrl("javascript:alertW('"+ a +"')");
    }*/

    private class MyBrowser extends WebViewClient {
    @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url){
            view.loadUrl(url);
            return true;
        }
    }

    public void putFullLayoutView(){
        getSupportActionBar().hide();
    }

    public void putGeneralLayoutView(){
        getSupportActionBar().show();
    }
}
