import { useState } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat, List, Heart, Clock } from 'lucide-react';
import { cn } from '@/utils/cn';

const currentQueue = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', thumbnail: '🎵', playing: true },
  { id: '2', title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', thumbnail: '👑', playing: false },
  { id: '3', title: 'Shape of You', artist: 'Ed Sheeran', duration: '3:53', thumbnail: '🎸', playing: false },
  { id: '4', title: 'Dance Monkey', artist: 'Tones and I', duration: '3:29', thumbnail: '🐒', playing: false },
  { id: '5', title: 'Someone Like You', artist: 'Adele', duration: '4:45', thumbnail: '💔', playing: false },
  { id: '6', title: 'Uptown Funk', artist: 'Bruno Mars', duration: '4:30', thumbnail: '🎤', playing: false },
];

export function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(45);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const currentTrack = currentQueue[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Musique</h1>
        <p className="text-slate-400 mt-1">Contrôlez la musique de votre serveur</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Now Playing */}
        <div className="col-span-2 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30">
          <div className="flex gap-8">
            {/* Album Art */}
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
              <span className="text-8xl">{currentTrack.thumbnail}</span>
            </div>

            {/* Track Info */}
            <div className="flex-1 flex flex-col justify-between py-4">
              <div>
                <p className="text-sm text-indigo-400 font-medium mb-2">EN LECTURE</p>
                <h2 className="text-4xl font-bold text-white mb-2">{currentTrack.title}</h2>
                <p className="text-xl text-slate-400">{currentTrack.artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-3">
                <div 
                  className="h-2 bg-slate-700/50 rounded-full cursor-pointer overflow-hidden"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setProgress((x / rect.width) * 100);
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
                  </div>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>1:30</span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => setShuffle(!shuffle)}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      shuffle ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <Shuffle className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <SkipBack className="w-6 h-6" />
                  </button>
                  
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-slate-900" />
                    ) : (
                      <Play className="w-6 h-6 text-slate-900 ml-1" />
                    )}
                  </button>
                  
                  <button className="p-2 text-slate-400 hover:text-white transition-colors">
                    <SkipForward className="w-6 h-6" />
                  </button>
                  
                  <button 
                    onClick={() => setRepeat(!repeat)}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      repeat ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
                    )}
                  >
                    <Repeat className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-slate-400" />
                  <div 
                    className="w-32 h-2 bg-slate-700/50 rounded-full cursor-pointer overflow-hidden"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      setVolume((x / rect.width) * 100);
                    }}
                  >
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                  <span className="text-sm text-slate-400 w-8">{Math.round(volume)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Server Info */}
        <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Music className="w-5 h-5 text-indigo-400" />
            Informations
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Serveur</p>
              <p className="font-medium text-white">Gaming Hub</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Salon vocal</p>
              <p className="font-medium text-white">🔊 Musique</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Auditeurs</p>
              <p className="font-medium text-white">12 personnes</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50">
              <p className="text-sm text-slate-400 mb-1">Qualité audio</p>
              <p className="font-medium text-emerald-400">320kbps HD</p>
            </div>
          </div>
        </div>
      </div>

      {/* Queue */}
      <div className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <List className="w-5 h-5 text-indigo-400" />
            File d'attente
          </h3>
          <span className="text-sm text-slate-400">{currentQueue.length} morceaux • 25:52 total</span>
        </div>

        <div className="space-y-2">
          {currentQueue.map((track, index) => (
            <div 
              key={track.id}
              className={cn(
                'flex items-center gap-4 p-3 rounded-xl transition-all',
                track.playing 
                  ? 'bg-indigo-500/20 border border-indigo-500/30' 
                  : 'hover:bg-slate-900/50'
              )}
            >
              <span className={cn(
                'w-8 text-center font-medium',
                track.playing ? 'text-indigo-400' : 'text-slate-500'
              )}>
                {track.playing ? '▶' : index + 1}
              </span>
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl">
                {track.thumbnail}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium truncate',
                  track.playing ? 'text-indigo-400' : 'text-white'
                )}>
                  {track.title}
                </p>
                <p className="text-sm text-slate-400 truncate">{track.artist}</p>
              </div>
              
              <button className="p-2 text-slate-500 hover:text-rose-400 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {track.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
