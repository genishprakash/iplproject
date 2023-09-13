document.addEventListener('DOMContentLoaded', function () {
    // Fetch the JSON data
    fetch('../public/matchesperyear.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            Highcharts.chart('container', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'Data Over the Years'
                },
                xAxis: {
                    categories: Object.keys(data)
                },
                yAxis: {
                    title: {
                        text: 'Value'
                    }
                },
                series: [{
                    name: 'Value',
                    data: Object.values(data)
                }]
            });
        })
        .catch(error => {
            console.error('Error:', error);
        })
})