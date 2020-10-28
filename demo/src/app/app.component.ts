import { Component } from "@angular/core";
import { Sound } from "ngx-soundeffects";
import { Observable, from, throwError } from 'rxjs';
import { delay, take, mergeMap } from 'rxjs/operators';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "demo";

  @Sound('coin.wav')
  public soundCheckDecorator1() {
    console.log("Sound Check Decorator 1");
  }

  @Sound({
    fileName: 'coin',
    extension: '.wav'
  })
  public soundCheckDecorator2() {
    console.log("Sound Check Decorator 2");
  }

  public soundCheckDecorator3() {
    this.asyncSoundWithSuccess().subscribe();
  }

  public soundCheckDecorator4() {
    this.asyncSoundWithError().subscribe();
  }

  @Sound({
    start: {
      fileName: 'coin',
      extension: '.wav'
    },
    success: {
      fileName: 'tada',
      extension: '.wav'
    },
    error: {
      fileName: 'error',
      extension: '.wav'
    }
  })
  public asyncSoundWithSuccess(): Observable<boolean> {
    return from([true]).pipe(
      take(1),
      delay(1000),
    );
  }


  @Sound({
    start: {
      fileName: 'coin',
      extension: '.wav'
    },
    success: {
      fileName: 'tada',
      extension: '.wav'
    },
    error: {
      fileName: 'error',
      extension: '.wav'
    }
  })
  public asyncSoundWithError(): Observable<boolean> {
    return from([true]).pipe(
      take(1),
      delay(1000),
      mergeMap(() => throwError('Error'))
    );
  }
}
