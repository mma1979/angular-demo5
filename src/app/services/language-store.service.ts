import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageStoreService {
  languageSubject = new BehaviorSubject<string>(localStorage.getItem('language') || 'en');
  language$ = this.languageSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(this.languageSubject.value);
    this.translate.use(this.languageSubject.value);
    this.setRtl(this.languageSubject.value)
  }

  changeLanguage(language: string) {
    this.languageSubject.next(language)
    this.translate.setDefaultLang(language);
    this.translate.use(language)
    localStorage.setItem('language', language)
    this.translate.onLangChange.subscribe(event => {

    })
    this.setRtl(language)

  }

  setRtl(language: string) {
    // add or remove rtl styles
    if (language === 'ar') {
      document.querySelector('head')?.append('<link id="rtl" rel="stylesheet" href="your-rtl-style.css/>')
      document.querySelector('body')!.dir = "rtl";
    } else {
      document.querySelector('#rtl')?.remove()
      document.querySelector('body')!.dir = "ltr";
    }
  }
}
