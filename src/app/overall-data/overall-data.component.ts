import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'overall-data',
  templateUrl: './overall-data.component.html',
  styleUrls: ['./overall-data.component.sass']
})
export class OverallDataComponent {
  chart: Chart = null
  chart2: Chart = null
  blackFridayLine: boolean = true
  cyberMondayLine: boolean = true
  chartRef: any = null
  chartRef2: any = null

  // praise https://www.reuters.com/article/us-holidaysales-shoppertrak/black-friday-sales-up-0-5-percent-shoppertrak-idUSTRE5AR1EY20091128
  // https://www.nytimes.com/2006/11/27/business/27shop.html
  // https://www.thestreet.com/opinion/black-friday-receipts-estimated-at-about-72-billion-10129136
  blackFridayData = {
    name: 'Black Friday Spending ($ billion)',
    id: '1',
    data: [6.84, 7.2, 8.94777164, 8.86796, 9.434 /* 2006 */, 10.28782, 10.606, 10.66, 10.7, 11.4 /* 2011 */, 12.062224, 12.412, 11.6, 10.4 /* 2015 */, 9.975, 10.004925, 10.30507275, 9.6661582395]
  } as any
  // data from adobe, comscore
  cyberMondayData = {
    name: 'Cyber Monday Spending ($ billion)',
    id: '2',
    data: [null, null, null, .484, .608, .733, .846, .887, 1.028, 1.251, 1.465 /* 2012 */, 2.29, 2.64, 3, 3.45, 6.3753, 7.9, 9.4]
  }

  blackFridayChange = {
    name: 'Black Friday Spending Change YoY',
    id: '1',
    data: this.blackFridayData['data'].map((ele: number, i: number) => {
      if (i === 0) {
        return null
      } else {
        return (ele / this.blackFridayData['data'][i - 1] - 1) * 100
      }
    })
  } as any
  cyberMondayChange = {
    name: 'Cyber Monday Spending Change YoY',
    id: '1',
    color: '#90ee90',
    data: this.cyberMondayData['data'].map((ele: number, i: number) => {
      if (i === 0) {
        return null
      } else {
        return (ele / this.cyberMondayData['data'][i - 1] - 1) * 100
      }
    })
  } as any

  constructor() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Shopping Volume Over Time'
      },
      yAxis: {
        title: {
          text: 'Billions of $'
        }
      } as any,
      xAxis: {
        categories: [...Array(18).keys()].map(x => x + 2002),
        title: {
          text: 'Year'
        }
      } as any,
      plotOptions: {
        series: {
          marker: {
            enabled: false
          }
        }
      },
      series: [this.blackFridayData, this.cyberMondayData]
    })
    this.chart.ref$.subscribe(x => this.chartRef = x)

    this.chart2 = new Chart({
      chart: {
        type: 'areaspline'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Shopping Volume YoY'
      },
      yAxis: {
        title: {
          text: '% Change'
        }
      } as any,
      xAxis: {
        categories: [...Array(18).keys()].map(x => x + 2002),
        title: {
          text: 'Year'
        }
      } as any,
      plotOptions: {
        areaspline: {
          negativeFillColor: '#ff0000'
        },
        series: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        // headerFormat: '<span style="color:{point.color}">\u25CF</span> Average {series.name} Discount: ',
        pointFormat: '<b>{point.y}%</b><br/>',
        formatter: function() {
          return '<span style="color:' + (this.series as any).color + '">\u25CF</span> ' + this.series.name + ' ' + this.x + '<br/>' + '<b>' + this.y.toFixed(1) + '%</b><br/>'
        }
      },
      series: [this.blackFridayChange, this.cyberMondayChange]
    })
    this.chart2.ref$.subscribe(x => this.chartRef2 = x)
  }

  swapBlackFridayView() {
    this.blackFridayLine = !this.blackFridayLine
    this.updateChartView()
  }

  swapCyberMondayView() {
    this.cyberMondayLine = !this.cyberMondayLine
    this.updateChartView()
  }

  updateChartView() {
    // (this.chartRef.get('1') as any).setVisible(this.blackFridayLine)
    // (this.chartRef.get('2') as any).setVisible(this.cyberMondayLine)
    this.chartRef.get('1').setVisible(this.blackFridayLine)
    this.chartRef.get('2').setVisible(this.cyberMondayLine)
    this.chartRef2.get('1').setVisible(this.blackFridayLine)
    this.chartRef2.get('2').setVisible(this.cyberMondayLine)
  }
}
