import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SharedModule } from './shared/shared.module';
import { TranslatePipe } from "./translate.pipe";
import { LanguageStoreService } from './services/language-store.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, TranslatePipe, DatePipe, JsonPipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'demo5';
  msg = ""
  constructor(private languageStore: LanguageStoreService, private translate: TranslateService) {
    
  }

  ngOnInit(): void {
    this.languageStore.languageSubject.subscribe(language => {
      this.translate.use(language).subscribe(_ =>{
        this.translate.get('Home.Title').subscribe(value => this.title = value)
      })
      
    })
  }

  switchLanguage(language: string) {
    this.languageStore.changeLanguage(language)
    this.translate.use(language)
    window.location.reload();
  }

}
