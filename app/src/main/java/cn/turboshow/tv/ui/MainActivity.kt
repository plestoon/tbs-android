package cn.turboshow.tv.ui

import android.net.Uri
import android.os.Bundle
import android.view.KeyEvent
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import cn.turboshow.tv.AppViewModel
import cn.turboshow.tv.R
import cn.turboshow.tv.TBSPlayer
import cn.turboshow.tv.data.SettingsRepository
import cn.turboshow.tv.di.viewModelProvider
import dagger.android.support.DaggerAppCompatActivity
import kotlinx.android.synthetic.main.activity_main.*
import javax.inject.Inject


class MainActivity : DaggerAppCompatActivity() {
    @Inject
    lateinit var viewModelFactory: ViewModelProvider.Factory
    @Inject
    lateinit var settingsRepository: SettingsRepository
    private lateinit var viewModel: AppViewModel
    private lateinit var player: TBSPlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContentView(R.layout.activity_main)
        player = TBSPlayer(this, videoView)

        viewModel = viewModelProvider(viewModelFactory)
        viewModel.startWebServer()
    }

    private fun play() {
        viewModel.currentChannel.value?.let {
            val uri =
                if (it.url.startsWith("rtp:") && viewModel.udpxyAddr.value != null)
                    "http://${settingsRepository.udpxyAddr.value}/${it.url.replace("://", "/")}"
                else
                    it.url
            player.play(Uri.parse(uri))
        }
    }

    private fun stop() {
        player.stop()
    }

    private fun showChannelsDialog() {
        val dialog = ChannelSelectorFragment.newInstance()
        dialog.show(supportFragmentManager, "channels")
    }

    override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
        return when (keyCode) {
            KeyEvent.KEYCODE_DPAD_UP -> {
                viewModel.nextChannel()
                true
            }
            KeyEvent.KEYCODE_DPAD_DOWN -> {
                viewModel.prevChannel()
                true
            }
            KeyEvent.KEYCODE_ENTER, KeyEvent.KEYCODE_DPAD_CENTER -> {
                showChannelsDialog()
                true
            }
            else -> super.onKeyUp(keyCode, event)
        }
    }

    override fun onStart() {
        super.onStart()

        viewModel.currentChannel.observe(this, Observer {
            play()
        })

        viewModel.udpxyAddr.observe(this, Observer {
            play()
        })
    }

    override fun onStop() {
        super.onStop()

        stop()

        viewModel.currentChannel.removeObservers(this)
        viewModel.udpxyAddr.removeObservers(this)
    }

    override fun onDestroy() {
        viewModel.stopWebServer()
        player.release()

        super.onDestroy()
    }
}
