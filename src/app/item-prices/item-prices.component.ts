import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'item-prices',
  templateUrl: './item-prices.component.html',
  styleUrls: ['./item-prices.component.sass']
})
export class ItemPricesComponent implements OnInit {
  chart: Chart = null
  chartRef: any = null

  g903Data = {
    name: 'Logitech G903 Price, Amazon',
    id: '1',
    data: [150, 150, 150, 150, 150, 150, 142, 152, 142, 100, 142, 130, 130, 130, 130, 130, 130, 130, 140]
  } as any

  rtx2060Data = {
    name: 'Nvidia RTX 2060 Price, Amazon',
    id: '2',
    data: [330, 330, 330, 330, 330, 330, 362, 362, 362, 362, 380, 378, 378, 365, 345, 330, 330, 330, 410, 360]
  } as any

  laptopData = {
    name: 'Microsoft Surface Book 2 Price, Amazon',
    id: '3',
    data: [936, 921, 921, 928, 916, 915, 912, 852, 912, 913, 992, 980, 985, 1000, 900, 898, 898, 891, 1096, 1000]
  }

  availableItems: Array<any> = [this.g903Data, this.rtx2060Data, this.laptopData]
  selected = this.g903Data

  constructor() {}

  ngOnInit() {
    this.chart = new Chart({
      chart: {
        type: 'line'
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Selected Item Pricing History'
      },
      yAxis: {
        title: {
          text: 'USD ($)'
        }
      } as any,
      plotOptions: {
        series: {
          step: 'center',
          marker: {
            enabled: false
          }
        }
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: [...Array(Math.max(this.g903Data['data'].length, this.rtx2060Data['data'].length)).keys()].map(x => {
          let timestamp = new Date(new Date(2019, 8, 6).valueOf() + 1000 * 60 * 60 * 24 * 5 * x)
          return `${timestamp.toLocaleString('default', { month: 'short' })} ${timestamp.getDate()}`
        }),
        title: {
          text: 'Date'
        },
        plotLines: [{
          color: 'red', // Color value
          dashStyle: 'solid', // Style of the plot line. Default to solid
          value: 17, // Value of where the line will appear
          width: 2 // Width of the line
        }]
      } as any,
      series: this.availableItems
    })
    this.chart.ref$.subscribe(x => {
      this.chartRef = x
      this.updateItem()
    })
  }

  updateItem() {
    for (let item of this.availableItems) {
      if (item !== this.selected) {
        this.chartRef.get(item['id']).setVisible(false)
      } else {
        this.chartRef.get(item['id']).setVisible(true)
        this.chartRef.update({
          title: {
            text: item['name']
          }
        })
      }
    }
  }
}
