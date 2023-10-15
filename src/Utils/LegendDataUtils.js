export default class LegendDataUtils {
  static sortLegendData (seriesData, colors) {
    const xData = seriesData.XData
    const yData = seriesData.YData
    const series = []
    for (let i = 0; i < xData.length; i++) {
      series.push([xData[i], yData[i], colors[i]])
    }
    series.sort(function (a, b) {
      return b[1] - a[1]
    })
    const maxValue = series[0][1]

    return [series, maxValue]
  }

  static sumData (data, seriesData) {
    let sumMembers = 0
    seriesData.YData.map(member => {
      sumMembers += member
      return 0
    })
    return [sumMembers, data.CurrentProducts.XData.length]
  }
}
