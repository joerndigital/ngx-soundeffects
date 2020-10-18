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

  @Sound('Water.mp3')
  public soundCheckDecorator1() {
    console.log("Sound Check Decorator 1");
  }

  @Sound({
    fileName: 'Water',
    extension: '.mp3'
  })
  public soundCheckDecorator2() {
    console.log("Sound Check Decorator 2");
  }

  public soundCheckDecorator3() {
    this.asyncSound().subscribe();
  }


  @Sound({
    start: {
      fileName: 'Water',
      extension: '.mp3'
    },
    success: {
      fileName: 'Water',
      extension: '.mp3'
    },
    error: {
      fileName: 'error',
      extension: '.mp3'
    }
  })
  public asyncSound(): Observable<boolean> {
    return from([true]).pipe(
      take(1),
      delay(2000),
      mergeMap(() => throwError('Error'))
    );
  }
}
