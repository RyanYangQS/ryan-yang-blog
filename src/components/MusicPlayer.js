import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Music,
  Upload,
  Shuffle,
  Repeat,
  List,
  ChevronLeft,
  ChevronRight,
  Minimize2,
  Maximize2
} from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState('none');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showUpload, setShowUpload] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 340, y: window.innerHeight - 200 });
  const [isAttached, setIsAttached] = useState(false);
  
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const playerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // 默认音乐列表
  const defaultTracks = [
    {
      id: 1,
      title: "Lofi Study",
      artist: "Chill Beats",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Ambient Dreams",
      artist: "Relaxing Music",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      title: "Coding Night",
      artist: "Focus Music",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop"
    }
  ];

  const [tracks, setTracks] = useState(defaultTracks);

  // 下一首
  const handleNext = useCallback(() => {
    const newIndex = currentTrack === tracks.length - 1 ? 0 : currentTrack + 1;
    setCurrentTrack(newIndex);
    setIsPlaying(false);
  }, [currentTrack, tracks.length]);

  // 音频事件处理
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [handleNext]);

  // 播放/暂停
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 上一首
  const handlePrevious = () => {
    const newIndex = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(newIndex);
    setIsPlaying(false);
  };

  // 音量控制
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  // 静音切换
  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  // 进度条控制
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // 重复模式切换
  const toggleRepeat = () => {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  // 文件上传处理
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newTracks = files.map((file, index) => ({
      id: tracks.length + index + 1,
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: "Local File",
      url: URL.createObjectURL(file),
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop",
      isLocal: true
    }));
    
    setTracks([...tracks, ...newTracks]);
    setShowUpload(false);
  };

  // 格式化时间
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // 计算进度百分比
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 拖动处理
  const handleMouseDown = (e) => {
    if (e.target.closest('button') || e.target.closest('input')) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;

    // 检查是否靠近边缘
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const playerWidth = isCollapsed ? 60 : 320;
    const playerHeight = isCollapsed ? 60 : 200;

    // 检查是否应该吸附到侧边
    if (newX < 50) {
      setPosition({ x: 0, y: newY });
      setIsAttached(true);
      setIsCollapsed(true);
    } else if (newX > windowWidth - playerWidth - 50) {
      setPosition({ x: windowWidth - playerWidth, y: newY });
      setIsAttached(true);
      setIsCollapsed(true);
    } else {
      setPosition({ x: newX, y: newY });
      setIsAttached(false);
    }
  }, [isDragging, isCollapsed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 展开/收起
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <motion.div
      ref={playerRef}
      initial={{ x: position.x, y: position.y }}
      animate={{ x: position.x, y: position.y }}
      className={`fixed z-50 ${isAttached ? 'transition-all duration-300' : ''}`}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none'
      }}
      onMouseDown={handleMouseDown}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`glass-effect rounded-2xl shadow-2xl border border-dark-600 ${
          isCollapsed ? 'w-15 h-15' : 'w-80'
        }`}
      >
        {isCollapsed ? (
          // 收起状态
          <div className="p-3 flex flex-col items-center justify-center h-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCollapse}
              className="p-2 text-primary-400 hover:text-white transition-colors"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </motion.button>
            <img
              src={tracks[currentTrack]?.cover}
              alt={tracks[currentTrack]?.title}
              className="w-8 h-8 rounded-lg mt-2"
            />
          </div>
        ) : (
          // 展开状态
          <div className="p-4">
            {/* 播放器头部 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Music className="w-5 h-5 text-primary-400" />
                <span className="text-white font-medium">Music Player</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUpload(!showUpload)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Upload className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <List className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleCollapse}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* 文件上传 */}
            <AnimatePresence>
              {showUpload && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-dark-700 rounded-lg"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    选择音乐文件
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 播放列表 */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 max-h-40 overflow-y-auto"
                >
                  {tracks.map((track, index) => (
                    <div
                      key={track.id}
                      onClick={() => setCurrentTrack(index)}
                      className={`p-2 rounded-lg cursor-pointer transition-colors ${
                        currentTrack === index
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-dark-600 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-8 h-8 rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{track.title}</p>
                          <p className="text-xs opacity-75 truncate">{track.artist}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 当前播放信息 */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={tracks[currentTrack]?.cover}
                alt={tracks[currentTrack]?.title}
                className="w-12 h-12 rounded-lg"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {tracks[currentTrack]?.title}
                </p>
                <p className="text-gray-400 text-sm truncate">
                  {tracks[currentTrack]?.artist}
                </p>
              </div>
            </div>

            {/* 进度条 */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* 控制按钮 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevious}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="flex items-center space-x-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 transition-colors ${
                    isShuffled ? 'text-primary-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRepeat}
                  className={`p-2 transition-colors ${
                    repeatMode !== 'none' ? 'text-primary-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* 音量控制 */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </motion.button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 bg-dark-600 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        )}

        {/* 音频元素 */}
        <audio
          ref={audioRef}
          src={tracks[currentTrack]?.url}
          preload="metadata"
        />
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
