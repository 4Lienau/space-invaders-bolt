export function createSoundEffects() {
  const createSound = (frequency, type, duration) => {
    return {
      play: () => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
        }, duration * 1000);
      }
    };
  };

  return {
    shoot: () => createSound(587.33, 'square', 0.1),
    explosion: () => createSound(200, 'sawtooth', 0.3),
    move: () => createSound(150, 'square', 0.1)
  };
}
