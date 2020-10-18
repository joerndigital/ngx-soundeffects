/**
 * fileName: name of the sound effect, e.g. 'click'
 * extension: file extension, e.g. 'mp3'
 * path: path to assets directory
 * volume: volume of the sound effect,
 * startTime: starts the sound effect at this time of the sound effect
 * endTime: ends the sound effect at this time of the sound effect
 * timeout: waits this time before starting the sound effect
 * loops: number of repetations of the sound effects
 */
export interface ISoundDecorator {
  fileName: string;
  extension: string;
  path?: string;
  volume?: number;
  startTime?: number;
  endTime?: number;
  timeout?: number;
  loops?: number;
}

/**
 * start: sound effect when the async method starts
 * success: sound effect when the async method is successful
 * error: sound effect when the async method fails
 */
export interface IAsyncSoundDecorator {
  start?: ISoundDecorator;
  success?: ISoundDecorator;
  error?: ISoundDecorator;
}
