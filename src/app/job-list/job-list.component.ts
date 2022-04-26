import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { Subject } from 'rxjs';
import { TextBoxModel } from '../common/textbox/textbox.model';
import { JobDetails } from '../models/job-details.model';
import { JobDetailsService } from '../services/job-details.service';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  jobList: JobDetails[];
  recommendJobs: JobDetails[];
  positionInputBox: TextBoxModel = {
    heading: "Job Title"
  };
  locationInputBox: TextBoxModel = {
    heading: "Location"
  }
  file: any;
  position = new Subject<string>();
  location = new Subject<string>();
  constructor(public jobService: JobDetailsService) {
    this.position
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(valueKeyword => {
        this.getJobDetailsList(valueKeyword, this.locationInputBox.textValue);
      });

    this.location
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(valueKeyword => {
        this.getJobDetailsList(this.positionInputBox.textValue,valueKeyword);
      });
  }

  ngOnInit(): void {
    this.getJobDetailsList("","");
  }

  redirectToJob(link) {
    console.log("test", link)
    window.open(link, '_blank');
  }

  jobPreview(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  positionChange(position) {
    this.position.next(position);
  }

  locationChange(location) {
    this.location.next(location);
  };

  getJobDetailsList(position, location) {
    let defaultPosition: string = position ? position : null;
    let defaultLocation: string = location ? location : "canada";

    this.jobService.getJobDetailsList(defaultPosition, defaultLocation).subscribe(res => {
      this.jobList = res.all_jobs;
      let recommendedJobs = res.recommend_jobs;
      this.recommendJobs = recommendedJobs.sort(({score:a}, {score:b}) => b-a);
      console.log(res);
    })

  }

  onFileChange(event) {
  
    // if (event.target.files.length > 0) {
    //   this.file = event.target.files[0];
    //   console.log(this.file);
      
    // }
    let input = event.target;
    for (var index = 0; index < input.files.length; index++) {
        let reader = new FileReader();
        reader.onload = () => {
            // this 'text' is the content of the file
            this.file = {
              resumeContent: reader.result
            }
            console.log(this.file);
        }
        console.log(reader.readAsText(input.files[index]));
    };
   
  }

  uploadPreference() {
    
      this.jobService.uploadResume(this.file).subscribe(res=>{

      });
  }

}
