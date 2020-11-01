# ngxSoundEffects

Hi! ngxSoundEffects is a small Angular Library to ease the work with audio. Until now there is the directive `ngxSound` with different input options and the decorator `@Sound()`.

## Install
The package has not yet been uploaded to npmjs.org because I'm currently only using it for private projects. To use the package you have to add the .tgz file to your project. Please have a look at the demo. 
In the package.json of the library you can find the script command `npm run pack`, which will put the right package together.

Deine Musik-Dateien sollten im Ordner `assets/sounds` abgelegt sein. Du kannst den Pfad aber auch ändern.

## Directive ngxSound

ngxSound is an attribute directive that changes the behaviour of a DOM element. The directive makes sure that a sound is generated on certain actions, e.g. a click or a hover. To control the behaviour there are a few properties of ngxSound that can be used.

|Input/Output|Type|Default|Explanation|
|--|--|--|--|
| [soundOnClick] | boolean |true | If set it produces a sound on a click event
| [soundOnHover] | boolean |false| If set it produces a sound on a hover event
| [soundFilePath] | string |/assets/sounds/| Path to your sound files
| [soundFile] | string |-| Name of the sound (with extension)
| [soundPlay] | boolean |true| Start playing the sound
| [soundPause] | boolean | false | Pauses the sound
| [soundStop] | boolean | false | Pauses and resets the sound
| [soundVolume] | number | - | Controls the volume of the sound
| [soundStartTime] | number | - | Sets the start time of the sound
| [soundEndTime] | number | - | Sets the end time of the sound
| (soundLoaded) | EventEmitter\<boolean\>|-|Triggers an event the sound file is loaded
| (soundEnded) | EventEmitter\<boolean\>|-|Triggers an event the sound ends
| (soundError) | EventEmitter\<string\|Event\>|-|Triggers an event if the sound file produces an error
| (soundOnUpdate) | EventEmitter\<{currentTime: number, progress: number, duration: number}\>|-|Triggers an event when the sound updates

## Decorator @Sound()

@Sound() ist ein Decorator für Funktionen. Wenn die Funktion ausgeführt wird, wird der Sound getriggert. Bei asynchronen Funktionen kann außerdem ein Erfolgs- oder Fehlersound hinzugefügt werden.

### Interface ISoundDecorator
	interface ISoundDecorator {
		fileName: string;
		extension: string;
		path?: string;
		volume?: number;
	}

	interface IAsyncSoundDecorator {
		start?: ISoundDecorator;
		success?: ISoundDecorator;
		error?: ISoundDecorator;
	}

#### As string

	@Sound('coin.wav)

#### As object

	@Sound(ISoundDecorator)

#### Use with an asynchrone function
	@Sound(IAsyncDecorator)
