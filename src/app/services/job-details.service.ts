import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobDetails } from '../models/job-details.model';
import { API_URL } from '../env';
import { JobList } from '../models/job_list.model';

@Injectable({
  providedIn: 'root'
})
export class JobDetailsService {

  constructor(private http: HttpClient) { }


  getJobDetailsList(position: string, location: string): Observable<JobList> {
    return this.http.get<JobList>(`${API_URL}/jobs/` + position + "/" + location);
  }

  getRecommendedJobDetailsList(): Observable<JobDetails[]> {
    return this.http.get<JobDetails[]>(`${API_URL}/recommendedjobs`);
  }

  uploadResume(file: any): Observable<any> {
    return this.http.post(`${API_URL}/resume`,
        file);
  }
}
