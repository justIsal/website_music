//char js
var ctx = document.getElementById('diagram').getContext('2d');
var grafik = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Senin', 'Selasa', 'Rabu','Kamis',"Jum'at",'Sabtu','Minggu'],
    datasets: [{
      label: 'Data',
      data: [10, 20, 30, 19, 45, 31, 21],
      backgroundColor: ['#EAB308']
    }]
  },
  options: {
    maintainAspectRatio: false, 
    responsive: true, 
    scales: {
      y: {
        beginAtZero: true 
      }
    },
  }
});
var ctx = document.getElementById('grafik').getContext('2d');
var grafik = new Chart(ctx, {
type: 'pie',
data: {
  labels: ['Data1', 'Data2'],
  datasets: [{
    label: 'Data',
    data: [10, 20],
    backgroundColor: ['red','#EAB308']
  }]
},
options: {
  maintainAspectRatio: false,
  responsive: true, 
  scales: {
    y: {
      beginAtZero: true 
    }
  },
}
});