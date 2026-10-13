
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Report } from '../../core/services/report';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class Reports implements OnInit {
  private reportService = inject(Report);

  reports = this.reportService.getReports();
  loading = this.reportService.getLoading();
  error = this.reportService.getError();

  ngOnInit() {
    this.reportService.loadReports();
  }
}
