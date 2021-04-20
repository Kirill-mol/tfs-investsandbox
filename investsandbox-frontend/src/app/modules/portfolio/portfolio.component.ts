import { NavigationService } from './../../../shared/services/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { IBackendApi, IBackendApiToken } from './../../../shared/interfaces/IBackendApi';
import { UpdaterService } from './../../../shared/services/updater.service';
import { Portfolio } from './../../../shared/models/portfolio.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.less'],
})
export class PortfolioComponent implements OnInit {
  portfolio!: Portfolio;

  constructor(private updater: UpdaterService,
    private route: ActivatedRoute,
    private navigator: NavigationService,
    @Inject(IBackendApiToken) private backendService: IBackendApi 
  ) {}

  ngOnInit() {
    const title = this.route.snapshot.paramMap.get('title');
    
    if (title) {
      const portfolio = this.backendService.getPortfolioByTitle(title);

      if (portfolio) {
        this.portfolio = portfolio;
        this.updater.updateQuotes(this.portfolio.quotes);
        this.updater.update();
      } else {
        this.navigator.toMain();
      }
    } else {
      this.navigator.toMain();
    }
  }
}
