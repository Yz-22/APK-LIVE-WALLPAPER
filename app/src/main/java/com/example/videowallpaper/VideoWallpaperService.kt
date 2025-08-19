package com.example.videowallpaper

import android.media.MediaPlayer
import android.net.Uri
import android.service.wallpaper.WallpaperService
import android.view.SurfaceHolder

class VideoWallpaperService : WallpaperService() {
    override fun onCreateEngine(): Engine = VideoEngine()

    inner class VideoEngine : Engine(), MediaPlayer.OnPreparedListener, MediaPlayer.OnErrorListener {
        private var mediaPlayer: MediaPlayer? = null

        override fun onCreate(surfaceHolder: SurfaceHolder) {
            super.onCreate(surfaceHolder)
            preparePlayer(surfaceHolder)
        }

        private fun preparePlayer(holder: SurfaceHolder) {
            releasePlayer()
            val prefs = getSharedPreferences("wallpaper", MODE_PRIVATE)
            val uriStr = prefs.getString("video_uri", null) ?: return
            val uri = Uri.parse(uriStr)

            mediaPlayer = MediaPlayer().apply {
                setOnPreparedListener(this@VideoEngine)
                setOnErrorListener(this@VideoEngine)
                isLooping = true
                setSurface(holder.surface)
                try {
                    setDataSource(applicationContext, uri)
                    prepareAsync()
                } catch (_: Exception) {
                    releasePlayer()
                }
            }
        }

        override fun onVisibilityChanged(visible: Boolean) {
            super.onVisibilityChanged(visible)
            if (visible) {
                mediaPlayer?.start()
            } else {
                mediaPlayer?.pause()
            }
        }

        override fun onDestroy() {
            super.onDestroy()
            releasePlayer()
        }

        override fun onSurfaceDestroyed(holder: SurfaceHolder) {
            super.onSurfaceDestroyed(holder)
            releasePlayer()
        }

        private fun releasePlayer() {
            mediaPlayer?.stop()
            mediaPlayer?.release()
            mediaPlayer = null
        }

        override fun onPrepared(mp: MediaPlayer?) {
            mediaPlayer?.start()
        }

        override fun onError(mp: MediaPlayer?, what: Int, extra: Int): Boolean {
            releasePlayer()
            return true
        }
    }
}
