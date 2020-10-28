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

  private _soundPlay = true;
  @Input() set soundPlay(play: boolean) {
    if (play) {
      this.sound.play();
    }
    this._soundPlay = play;
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
    this.soundPlay = !pause;
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

  private _soundStartTime: number;
  get soundStartTime() {
    return this._soundStartTime;
  }

  @Input() set soundStartTime(startTime: number) {
    this.sound.currentTime = startTime;
    this._soundStartTime = startTime;
  }

  private _soundEndTime: number;
  @Input() set soundEndTime(endTime: number) {
    this._soundEndTime = endTime;
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
  @Output() soundOnUpdate: EventEmitter<{
    currentTime: number;
    progress: number;
    duration: number;
  }> = new EventEmitter<{
    currentTime: number;
    progress: number;
    duration: number;
  }>(undefined);

  @HostListener("click") onClick() {
    if (!this.sound.src) {
      throw new Error("No valid sound file.")
    }

    if (this.soundOnClick && !this.soundPause) {
      this.resetAndPlay();
    }
  }

  @HostListener("mouseover") onHover() {
    if (!this.sound.src) {
      throw new Error("No valid sound file.")
    }
    if (this.soundOnHover && !this.soundPause) {
      this.resetAndPlay();
    }
  }

  ngOnInit() {
    this.onLoaded();
    this.onEnded();
    this.onError();
    this.onTimeUpdate();
  }

  private onLoaded() {
    this.sound.onloadeddata = () => {
      this.soundLoaded.emit(true);
    };
  }

  private onEnded() {
    this.sound.onended = () => {
      this.soundEnded.emit(true);
    };
  }

  private onError() {
    this.sound.onerror = (err) => {
      this.soundError.emit(err);
    };
  }

  private onTimeUpdate() {
    this.sound.ontimeupdate = (audioEvent: any) => {
      const currentTime = audioEvent?.path[0]?.currentTime || 0;
      const duration = audioEvent?.path[0]?.duration || 0;
      const progress = currentTime / (duration || 1);

      this.soundOnUpdate.emit({
        currentTime,
        duration,
        progress
      });

      if (currentTime >= this.soundEndTime) {
        this.reset();
      }
    };
  }

  private resetAndPlay() {
    if (this.sound.currentTime === 0) {
      this.sound.play();
    } else {
      this.reset();
    }
  }

  private reset() {
    this.sound.pause();
    this.sound.currentTime = this.soundStartTime | 0;
    this.sound.play();
  }
}
