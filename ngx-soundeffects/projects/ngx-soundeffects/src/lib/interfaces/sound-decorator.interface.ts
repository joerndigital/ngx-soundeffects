/**
 * fileName: name of the sound effect, e.g. 'click'
 * extension: file extension, e.g. 'mp3'
 * path: path to assets directory
 * volume: volume of the sound effect
 */
export interface ISoundDecorator {
  fileName: string;
  extension: string;
  path?: string;
  volume?: number;
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
