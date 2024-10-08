import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, map } from 'rxjs';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
constructor(private translationService: TranslateService){}
  transform(key: string, ...args: unknown[]): unknown {
    //let translationService = inject(TranslateService)
    return this.translationService.instant(key)
  }

}
