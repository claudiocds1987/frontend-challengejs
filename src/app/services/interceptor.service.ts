import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxspinnerService } from './ngxspinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private ngxspinnerService: NgxspinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // En cada solicitud HTTP se va a mostrar el spinner/loader
    this.ngxspinnerService.showSpinner();
    return next.handle(req).pipe(
      // cuando finalize la petición http el spinner/loader desaparece
      finalize(() => this.ngxspinnerService.stopSpinner())
    );
  }

}
