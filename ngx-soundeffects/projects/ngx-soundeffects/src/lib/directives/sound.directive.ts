import {
  Directive,
  HostListener,
  Input,
  EventEmitter,
  Output,
  OnInit,
} from "@angular/core";

@Directive({
  selector: "[ngxSound]",
})
export class NgxSoundDirective implements OnInit {
  private sound: HTMLAudioElement = new Audio();

  @Input() soundOnClick = true;
  @Input() soundOnHover = false;

  @Input() soundFilePath = "assets/sounds/";

  private _soundFile: string;
  @Input() set soundFile(file: string) {
    this.sound.src = this.soundFilePath + file;
    this.sound.load();
  }

  private _soundStart = true;
  @Input() set soundStart(start: boolean) {
    if (start) {
      this.sound.play();
    }
    this._soundStart = start;
  }

  private _soundPause = false;
  get soundPause() {
    return this._soundPause;
  }

  @Input() set soundPause(pause: boolean) {
    if (pause) {
      this.sound.pause();
    }
    this._soundPause = pause;
    this.soundStart = !pause;
  }

  private _soundStop = false;
  @Input() set soundStop(stop: boolean) {
    if (stop) {
      this.sound.pause();
      this.sound.currentTime = 0;
    }
    this._soundStop = stop;
  }

  private _soundVolume: number;
  @Input() set soundVolume(volume: number) {
    this.sound.volume = volume;
    this._soundVolume = volume;
  }

  @Output() soundLoaded: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );
  @Output() soundEnded: EventEmitter<boolean> = new EventEmitter<boolean>(
    false
  );
  @Output() soundError: EventEmitter<string | Event> = new EventEmitter<
    string | Event
  >(undefined);

  @HostListener("click") onClick() {
    if (!this.sound.src) {
      console.log("No valid sound file");
      return;
    }

    if (this.soundOnClick && !this.soundPause) {
      this.resetAndPlay();
    }
  }

  @HostListener("mouseover") onHover() {
    if (!this.sound.src) {
      console.log("No valid sound file");
      return;
    }
    if (this.soundOnHover && !this.soundPause) {
      this.resetAndPlay();
    }
  }

  ngOnInit() {
    this.onLoaded();
    this.onEnded();
    this.onError();
  }

  private onLoaded() {
    this.sound.onloadeddata = () => {
      console.log("LOADED");
      this.soundLoaded.emit(true);
    };
  }

  private onEnded() {
    this.sound.onended = () => {
      console.log("ENDED");
      this.soundEnded.emit(true);
    };
  }

  private onError() {
    this.sound.onerror = (err) => {
      console.log("ERROR");
      this.soundError.emit(err);
    };
  }

  private resetAndPlay() {
    if (this.sound.currentTime === 0) {
      this.sound.play();
    } else {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.sound.play();
    }
  }
}
