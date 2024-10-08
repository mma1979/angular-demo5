import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom, map, pipe } from 'rxjs';
import { LanguageStoreService } from './services/language-store.service';

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  
constructor(private translationService: TranslateService, private store : LanguageStoreService){}

  async transform(key: string, ...args: unknown[]): Promise<string> {
    this.translationService.use(this.store.languageSubject.value)
    let value =  await firstValueFrom<string>(this.translationService.get(key))
    return value
  }

}
