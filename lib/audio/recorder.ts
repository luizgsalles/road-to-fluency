// ============================================================================
// Audio Recorder - Browser Audio Recording
// ============================================================================
// Purpose: Record audio from user microphone using MediaRecorder API
// Author: @dev (Dex) - AIOS Developer
// Based on: Task 14 (Audio Recording & Transcription)
// Browser API: MediaRecorder, MediaStream
// ============================================================================

export type RecorderState = 'inactive' | 'recording' | 'paused';

export interface RecorderOptions {
  mimeType?: string; // 'audio/webm' (default), 'audio/mp4', 'audio/ogg'
  audioBitsPerSecond?: number; // Default: 128000 (128 kbps)
  maxDuration?: number; // Max recording duration in seconds (default: 120)
  onStateChange?: (state: RecorderState) => void;
  onDataAvailable?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

/**
 * AudioRecorder class
 *
 * Handles browser audio recording using MediaRecorder API
 *
 * @example
 * const recorder = new AudioRecorder({
 *   maxDuration: 60,
 *   onStateChange: (state) => console.log('State:', state),
 *   onDataAvailable: (blob) => console.log('Audio ready:', blob.size)
 * })
 *
 * await recorder.start()
 * // ... user speaks ...
 * const audioBlob = await recorder.stop()
 */
export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private startTime: number = 0;
  private maxDurationTimer: NodeJS.Timeout | null = null;
  private options: RecorderOptions;

  constructor(options: RecorderOptions = {}) {
    this.options = {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 128000,
      maxDuration: 120, // 2 minutes max
      ...options,
    };
  }

  /**
   * Get current recorder state
   */
  get state(): RecorderState {
    return (this.mediaRecorder?.state as RecorderState) || 'inactive';
  }

  /**
   * Get recording duration in seconds
   */
  get duration(): number {
    if (this.state === 'inactive') return 0;
    return (Date.now() - this.startTime) / 1000;
  }

  /**
   * Check if browser supports audio recording
   */
  static isSupported(): boolean {
    return !!(
      typeof navigator !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof MediaRecorder !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function'
    );
  }

  /**
   * Get supported MIME types
   */
  static getSupportedMimeTypes(): string[] {
    // Return empty array if MediaRecorder is not available
    if (typeof MediaRecorder === 'undefined') {
      return [];
    }

    const types = [
      'audio/webm',
      'audio/webm;codecs=opus',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/mpeg',
    ];

    return types.filter((type) => MediaRecorder.isTypeSupported(type));
  }

  /**
   * Request microphone permission and start recording
   */
  async start(): Promise<void> {
    // Check browser support
    if (!AudioRecorder.isSupported()) {
      const error = new Error('Audio recording not supported in this browser');
      this.options.onError?.(error);
      throw error;
    }

    // Check if already recording
    if (this.state === 'recording') {
      throw new Error('Already recording');
    }

    try {
      // Request microphone access
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      // Determine best MIME type
      const mimeType = this.getBestMimeType();

      // Create MediaRecorder
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType,
        audioBitsPerSecond: this.options.audioBitsPerSecond,
      });

      // Reset chunks
      this.chunks = [];

      // Setup event handlers
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: mimeType });
        this.options.onDataAvailable?.(blob);
        this.cleanup();
      };

      this.mediaRecorder.onerror = () => {
        const error = new Error('MediaRecorder error: Recording failed');
        this.options.onError?.(error);
        this.cleanup();
      };

      this.mediaRecorder.onstart = () => {
        this.startTime = Date.now();
        this.options.onStateChange?.('recording');
      };

      this.mediaRecorder.onpause = () => {
        this.options.onStateChange?.('paused');
      };

      this.mediaRecorder.onresume = () => {
        this.options.onStateChange?.('recording');
      };

      // Start recording
      this.mediaRecorder.start();

      // Set max duration timer
      if (this.options.maxDuration) {
        this.maxDurationTimer = setTimeout(() => {
          this.stop();
        }, this.options.maxDuration * 1000);
      }
    } catch (error) {
      const recordError = new Error(
        error instanceof Error ? error.message : 'Failed to start recording'
      );
      this.options.onError?.(recordError);
      this.cleanup();
      throw recordError;
    }
  }

  /**
   * Pause recording
   */
  pause(): void {
    if (this.state !== 'recording') {
      throw new Error('Not recording');
    }

    this.mediaRecorder?.pause();
  }

  /**
   * Resume recording
   */
  resume(): void {
    if (this.state !== 'paused') {
      throw new Error('Not paused');
    }

    this.mediaRecorder?.resume();
  }

  /**
   * Stop recording and return audio blob
   */
  async stop(): Promise<Blob> {
    if (this.state === 'inactive') {
      throw new Error('Not recording');
    }

    return new Promise<Blob>((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('MediaRecorder not initialized'));
        return;
      }

      // Override onstop to resolve promise
      const originalOnstop = this.mediaRecorder.onstop;
      const mimeType = this.mediaRecorder.mimeType;
      this.mediaRecorder.onstop = (event) => {
        const blob = new Blob(this.chunks, { type: mimeType });
        if (originalOnstop && this.mediaRecorder) {
          originalOnstop.call(this.mediaRecorder, event);
        }
        resolve(blob);
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Cancel recording and discard audio
   */
  cancel(): void {
    if (this.state === 'inactive') {
      return;
    }

    this.chunks = []; // Discard chunks
    this.mediaRecorder?.stop();
  }

  /**
   * Get best supported MIME type
   */
  private getBestMimeType(): string {
    // This should never happen since isSupported() is checked before recording starts
    if (typeof MediaRecorder === 'undefined') {
      throw new Error('MediaRecorder not available');
    }

    const preferredTypes = [
      this.options.mimeType || 'audio/webm',
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
    ];

    for (const type of preferredTypes) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    throw new Error('No supported audio MIME type found');
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    // Clear max duration timer
    if (this.maxDurationTimer) {
      clearTimeout(this.maxDurationTimer);
      this.maxDurationTimer = null;
    }

    // Stop media stream
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    // Clear chunks
    this.chunks = [];

    // Notify state change
    this.options.onStateChange?.('inactive');
  }

  /**
   * Destroy recorder and release resources
   */
  destroy(): void {
    if (this.state !== 'inactive') {
      this.cancel();
    }
    this.cleanup();
    this.mediaRecorder = null;
  }
}

/**
 * Utility: Convert audio blob to base64 (for storage/transmission)
 */
export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      // Remove data URL prefix (e.g., "data:audio/webm;base64,")
      const base64Data = base64.split(',')[1] || base64;
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Utility: Convert base64 to blob
 */
export function base64ToBlob(base64: string, mimeType = 'audio/webm'): Blob {
  // Add data URL prefix if missing
  const dataUrl = base64.startsWith('data:') ? base64 : `data:${mimeType};base64,${base64}`;

  const byteString = atob(dataUrl.split(',')[1]);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeType });
}

/**
 * Utility: Format duration for display
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
