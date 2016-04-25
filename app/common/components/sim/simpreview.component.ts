import {Component} from 'angular2/core'
import {Messenger} from '../../services/Messenger'
const template = require('./simpreview.jade')
declare var require: any;
var Spinner = require('spin.js/spin.js');
declare var fetch: any;
declare var Chart: any;
var _ = require('lodash');


@Component({
  selector: 'sim-preview',
  template: template
})
export class SimPreview {
  public target: any;
  public spinner: any;

  constructor(public messenger: Messenger) {
    this.target = document.getElementById('metrics-loading')
    this.spinner = new Spinner({
      top: '50%',
      left: '50%'
    })
  }

  getMetrics(type) {
  //   this.spinner.spin(document.getElementById('metrics-loading'));

  //   if (this.messenger.demoMessages.length == 0)
  //     return false;
  //   var texts = _.chain(this.messenger.demoMessages)
  //       .filter((m) => m.author != 'hotel')
  //       .map((m)=> m.body)
  //       .value()
  //       .join(' ')

  //   fetch(`https://docker.default/tone`, {
  //     method: 'POST',
  //     body: JSON.stringify({ "text": texts })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {

  //       var graphData = {
  //         labels: [],
  //         datasets: [
  //           {
  //             fillColor: "rgba(220,220,220,0.2)",
  //             strokeColor: "rgba(220,220,220,1)",
  //             pointColor: "rgba(220,220,220,1)",
  //             pointStrokeColor: "#fff",
  //             pointHighlightFill: "#fff",
  //             pointHighlightStroke: "rgba(220,220,220,1)",
  //             data: []
  //           }
  //         ]
  //       };

  //       var p = JSON.parse(data.text);
  //       console.log(p);
  //       let tones = p.document_tone.tone_categories[type].tones;
  //       tones.forEach((toneData) => {
  //         graphData.labels.push(toneData.tone_name);
  //         graphData.datasets[0].data.push(toneData.score);
  //       })
  //       this.spinner.stop()
  //       var canvas = <HTMLCanvasElement> document.getElementById("myChart");
  //       var ctx = canvas.getContext("2d");
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  //       var myNewChart = new Chart(ctx).Bar(graphData, {
  //         legendTemplate: "peter"
  //       });
  //     })
  //     .catch(function(err) {
  //       console.log(err);
  //     });
  }

}
