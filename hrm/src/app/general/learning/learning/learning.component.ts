import { Component, OnInit } from '@angular/core';
import { DataHandlerService } from '../../services/data-handler.service';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.css']
})
export class LearningComponent implements OnInit {

  constructor(private dataHandlerService: DataHandlerService) {}

  ngOnInit(): void {
    console.log(this.dataHandlerService.getGlobalTestWordPairList());
  }
}
