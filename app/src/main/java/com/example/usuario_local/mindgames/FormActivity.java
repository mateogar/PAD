package com.example.usuario_local.mindgames;

import android.content.Context;
import android.content.Intent;
import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

public class FormActivity extends AppCompatActivity {
    public final static String EXTRA_MESSAGE = "com.example.usuario_local.mindgames.MESSAGE";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_form);
        readOnly();
        //readFiles();
    }

    public void changeGame(View view) {
        Intent intent = new Intent(this, MainActivity.class);
        String message = "";

        if (view.getId() == R.id.buttonCualEsMayor) {
            message = "CualEsMayor";
        } else {
            if (view.getId() == R.id.buttonAskMe) {
                message = "AskMe";
            } else {
                if (view.getId() == R.id.buttonMemory) {
                    message = "MemoryGame";
                } else {
                    if (view.getId() == R.id.buttonPerception) {
                        message = "PerceptionGame";
                    } else {
                        if (view.getId() == R.id.buttonSecuencia)
                            message = "secuencia";
                    }
                }

            }
        }

        intent.putExtra(EXTRA_MESSAGE, message);
        startActivity(intent);
    }

    //Método ejemplo para leer el archivo de preguntas
    private void readOnly() {

        try
        {
            InputStream fraw =
                    getResources().openRawResource(R.raw.ejemplo);

            BufferedReader brin =
                    new BufferedReader(new InputStreamReader(fraw));


            String linea = brin.readLine();

            Log.i("json",linea);

            fraw.close();
        }
        catch (Exception ex)
        {
            Log.e("Ficheros", "Error al leer fichero desde recurso raw");
        }


    }


    //Método ejemplo para almacenar y leer las puntuaciones
    private void readAndWrite() {



        //Escribimos en el archivo
        try
        {
            OutputStreamWriter fout=
                    new OutputStreamWriter(
                            openFileOutput("prueba_int.txt", Context.MODE_PRIVATE));

            fout.write("Texto de prueba.");
            fout.close();
        }
        catch (Exception ex)
        {
            Log.e("Ficheros", "Error al escribir fichero a memoria interna");
        }

        //Leemos del archivo
        try
        {
            BufferedReader fin =
                    new BufferedReader(
                            new InputStreamReader(
                                    openFileInput("prueba_int.txt")));

            String texto = fin.readLine();
            fin.close();
        }
        catch (Exception ex)
        {
            Log.e("Ficheros", "Error al leer fichero desde memoria interna");
        }


    }
}