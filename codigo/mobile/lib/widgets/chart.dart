/// Example of a stacked area chart with custom area colors.
///
/// By default, the area skirt for a chart will be drawn with the same color as
/// the line, but with a 10% opacity assigned to it. An area color function can
/// be provided to override this with any custom color.
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';

class StackedAreaCustomColorLineChart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;
  final String chartTitle;
  StackedAreaCustomColorLineChart({
    this.seriesList,
    this.animate,
    this.chartTitle,
  });

  /// Creates a [LineChart] with sample data and no transition.

  @override
  Widget build(BuildContext context) {
    var axisNum = charts.NumericAxisSpec(
      renderSpec: charts.GridlineRendererSpec(
        minimumPaddingBetweenLabelsPx: 0,
        labelStyle: charts.TextStyleSpec(
          fontSize: 12,
          color: charts.MaterialPalette.gray.shade600,
        ),
      ),
    );

    var axisTime = charts.DateTimeAxisSpec(
      tickFormatterSpec: charts.AutoDateTimeTickFormatterSpec(
        minute: new charts.TimeFormatterSpec(
          format: 'HH:mm', // or even HH:mm here too
          transitionFormat: 'HH:mm',
        ),
      ),
      renderSpec: charts.GridlineRendererSpec(
        minimumPaddingBetweenLabelsPx: 10,
        labelStyle: charts.TextStyleSpec(
          fontSize: 12,
          color: charts.MaterialPalette.gray.shade600,
        ),
      ),
    );
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Container(
            height: 200,
            width: 300,
            child: new charts.TimeSeriesChart(
              seriesList,
              animate: animate,
              dateTimeFactory: const charts.LocalDateTimeFactory(),
              primaryMeasureAxis: axisNum,
              domainAxis: axisTime,
              behaviors: [
                new charts.ChartTitle(
                  'Hz',
                  behaviorPosition: charts.BehaviorPosition.top,
                  titleOutsideJustification: charts.OutsideJustification.start,
                  titleStyleSpec: charts.TextStyleSpec(
                    fontFamily: 'Alatsi',
                    color: charts.ColorUtil.fromDartColor(
                      Theme.of(context).accentColor,
                    ),
                  ),
                  innerPadding: 12,
                ),
                new charts.ChartTitle(chartTitle,
                    behaviorPosition: charts.BehaviorPosition.bottom,
                    titleStyleSpec: charts.TextStyleSpec(
                      fontFamily: 'Alatsi',
                      color: charts.ColorUtil.fromDartColor(
                        Theme.of(context).accentColor,
                      ),
                    ),
                    titleOutsideJustification:
                        charts.OutsideJustification.middleDrawArea),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// Create one series with sample hard coded data.
  static List<charts.Series<TimeSeriesSales, DateTime>> _createSampleData() {
    final data = [
      new TimeSeriesSales(new DateTime(2018, 8, 22, 1, 02, 00), 25),
      new TimeSeriesSales(new DateTime(2018, 8, 22, 1, 07, 30), 12),
      new TimeSeriesSales(new DateTime(2018, 8, 22, 1, 12, 30), 23),
      new TimeSeriesSales(new DateTime(2018, 8, 22, 2, 17, 30), 63),
    ];
    return [
      new charts.Series<TimeSeriesSales, DateTime>(
        id: 'Mobile',

        // colorFn specifies that the line will be green.
        colorFn: (_, __) => charts.MaterialPalette.green.shadeDefault,
        // areaColorFn specifies that the area skirt will be light green.
        areaColorFn: (_, __) =>
            charts.MaterialPalette.green.shadeDefault.lighter,
        domainFn: (TimeSeriesSales sales, _) => sales.time,
        measureFn: (TimeSeriesSales sales, _) => sales.sales,
        data: data,
      )
    ];
  }
}

/// Sample linear data type.

class TimeSeriesSales {
  final DateTime time;
  final int sales;

  TimeSeriesSales(this.time, this.sales);
}
