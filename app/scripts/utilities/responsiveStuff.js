GitHUD.utilities.responsive = {
    width: function(chartType){
      var chartType = chartType || {}
      //ipad portrait
      if (window.innerWidth <= 768 && chartType == 'smallLinechart'){
        return 350
      } else if (window.innerWidth > 768 && chartType == 'smallLinechart'){
        return 452
      }else if (window.innerWidth <= 768 && chartType == 'smallDonut'){
        return 70
      }else if (window.innerWidth > 768 && chartType == 'smallDonut'){
        return 110
      }
    },
    height: function(chartType){
      var chartType = chartType || {}
      if (window.innerWidth <= 768 && chartType == 'smallLinechart'){
        return 120
      } else if (window.innerHeight > 1024 && chartType == 'smallLinechart'){
        return 150
      }else if (window.innerHeight <= 1024 && chartType == 'smallDonut'){
        return 70
      }else if (window.innerHeight > 1024 && chartType == 'smallDonut'){
        return 110
      }
    },
    ipadDonut: function(chartType){
      console.log('ipad donut responsive width called, innerWidth: ', window.innerWidth)
      var chartType = chartType || {}
      if (window.innerWidth > 970 && window.innerWidth < 990 && chartType == 'ipadDonutChart'){
        return 200
      }
    },
    ipadLinechart: function(chartType){
      console.log('ipad linechart responsive width called, innerWidth', window.innerWidth)
      var chartType = chartType || {}
      if (window.innerWidth > 970 && window.innerWidth < 990 && chartType == 'ipadLinechart'){
        return 240
      }
    }
}
