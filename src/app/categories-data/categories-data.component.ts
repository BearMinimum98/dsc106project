import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'categories-data',
  templateUrl: './categories-data.component.html',
  styleUrls: ['./categories-data.component.sass']
})
export class CategoriesDataComponent implements OnInit {
  chart: Chart = null
  chartRef: any = null

  constructor() { }

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'bar'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Average Black Friday Discounts By Category'
      },
      yAxis: {
        title: {
          text: '% Discount'
        }
      } as any,
      legend: {
        enabled: true
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
            formatter: function() {
              return this.y + '%'
            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="color:{point.color}">\u25CF</span> Average {series.name} Discount: ',
        pointFormat: '<b>{point.y}%</b><br/>'
      },
      xAxis: {
        title: {
          text: 'Category',
          enabled: false
        },
        labels: {
          enabled: false
        },
        plotLines: [{
          color: 'red', // Color value
          dashStyle: 'solid', // Style of the plot line. Default to solid
          value: 17, // Value of where the line will appear
          width: 2 // Width of the line
        }]
      } as any,
      series: [{
        name: 'Electronics',
        data: [35.6]
      } as any, {
        name: 'Toys and Games',
        data: [29.1]
      } as any, {
        name: 'Small Appliances',
        data: [33.6]
      } as any, {
        name: 'Luxury Handbags',
        data: [45]
      }]
    })
    this.chart.ref$.subscribe(x => {
      this.chartRef = x
    })
  }

}
