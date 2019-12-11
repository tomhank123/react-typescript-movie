export const chartData = [
  ['x', 'dogs'],
  ['Jan', 0],
  ['Feb', 10],
  ['Mar', 23],
  ['April', 17],
  ['May', 18],
  ['June', 9],
  ['July', 11],
  ['Aug', 27],
  ['Sept', 33],
  ['Oct', 40],
  ['Nov', 32],
  ['Dec', 35]
];

export const chartUIConfig = {
  legend: 'none',
  vAxis: {
    viewWindow: {
      min: 0,
      max: 40
    },
    ticks: [0, 10, 20, 30, 40],
    textStyle: { color: '#7f8fa4' }
  },
  hAxis: {
    textStyle: { color: '#7f8fa4' }
  },
  lineWidth: 3,
  colors: ['#ff9b3f'],
  pointSize: 8,
  pointShape: 'circle',
  chartArea: {
    left: 45,
    top: 35,
    width: '100%',
    height: '100%',
    bottom: 35
  }
};
