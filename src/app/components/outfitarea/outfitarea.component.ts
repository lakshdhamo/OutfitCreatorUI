import { Outfit } from './../../objects/outfit';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OutfitService } from 'src/app/Services/outfit.service';

@Component({
  selector: 'app-outfitarea',
  templateUrl: './outfitarea.component.html',
  styleUrls: ['./outfitarea.component.scss']
})
export class OutfitareaComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

  }

}
