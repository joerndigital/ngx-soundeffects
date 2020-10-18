import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ISoundDecorator, IAsyncSoundDecorator } from '../interfaces/sound-decorator.interface';

const sound = new Audio();

export function Sound(
  fileNameOrOptions: string | ISoundDecorator | IAsyncSoundDecorator
): MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value;

    if (isString(fileNameOrOptions)) {
      return injectSound(
        fileNameOrOptions as string,
        descriptor,
        originalMethod
      );
    }

    if (isISoundDecoratorObject(fileNameOrOptions)) {
      return injectSoundWithOptions(
        fileNameOrOptions as ISoundDecorator,
        descriptor,
        originalMethod
      );
    }

    if (isIAsyncSoundDecoratorObject(fileNameOrOptions)) {
      return injectAsyncSoundWithOptions(
        fileNameOrOptions as IAsyncSoundDecorator,
        descriptor,
        originalMethod
      );
    }

    return descriptor;
  };
}

function injectSound(
  fileName: string,
  descriptor: any,
  originalMethod: any
): any {
  sound.src = `assets/sounds/${fileName}`;
  sound.volume = 0.8;

  return manipulateDescriptor(sound, descriptor, originalMethod);
}

function injectSoundWithOptions(
  options: ISoundDecorator,
  descriptor: any,
  originalMethod: any
): any {
  sound.src = buildFilePath(options);
  sound.volume = options.volume || 0.8;

  return manipulateDescriptor(sound, descriptor, originalMethod);
}

function injectAsyncSoundWithOptions(
  options: IAsyncSoundDecorator,
  descriptor: any,
  originalMethod: any
) {
  const { start, success, error } = options;

  const startSound = initAudioElement(start);
  const successSound = initAudioElement(success);
  const errorSound = initAudioElement(error);

  return manipulateAsyncDescriptor(
    { startSound, successSound, errorSound },
    descriptor,
    originalMethod
  );
}

function initAudioElement(sound: ISoundDecorator): HTMLAudioElement {
  if (!sound) {
    return;
  }

  const audioElement = new Audio();
  audioElement.src = buildFilePath(sound);
  return audioElement;
}

function buildFilePath(options: ISoundDecorator): string {
  return `${!!options.path ? options.path : 'assets/sounds'}/${
    options.fileName
  }${options.extension}`;
}

function manipulateDescriptor(sound, descriptor, originalMethod): any {
  descriptor.value = function(...args: any[]) {
    resetAndPlay();
    const result = originalMethod.apply(this, args);

    return result;
  };

  return descriptor;
}

function manipulateAsyncDescriptor(
  { startSound, successSound, errorSound },
  descriptor: any,
  originalMethod: any
): any {
  descriptor.value = function(...args: any[]) {
    startSound.play();
    let result = originalMethod.apply(this, args) as Observable<any>;

    result = result.pipe(
      tap(() => successSound.play()),
      catchError((err) => {
        errorSound.play();
        return of(err);
      })
    );

    return result;
  };

  return descriptor;
}

function isString(toCheck: any): boolean {
  return typeof toCheck === 'string';
}

function isISoundDecoratorObject(toCheck: any): boolean {
  return typeof toCheck === 'object' && !!(toCheck as ISoundDecorator).fileName;
}

function isIAsyncSoundDecoratorObject(toCheck: any): boolean {
  toCheck = toCheck as IAsyncSoundDecorator;

  return (
    typeof toCheck === 'object' &&
    (!!(toCheck as IAsyncSoundDecorator).start ||
      !!(toCheck as IAsyncSoundDecorator).success ||
      !!(toCheck as IAsyncSoundDecorator).error)
  );
}

function resetAndPlay() {
  if (sound.currentTime === 0) {
    sound.play();
  } else {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}
