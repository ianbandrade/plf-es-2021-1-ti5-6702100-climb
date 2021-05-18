/// Example of a stacked area chart with custom area colors.
///
/// By default, the area skirt for a chart will be drawn with the same color as
/// the line, but with a 10% opacity assigned to it. An area color function can
/// be provided to override this with any custom color.
import 'package:charts_flutter/flutter.dart' as charts;
import 'package:flutter/material.dart';

class Chart extends StatelessWidget {
  final List<charts.Series> seriesList;
  final bool animate;
  final String chartTitle;
  final String measurementUnity;

  Chart({
    this.seriesList,
    this.animate,
    this.chartTitle,
    this.measurementUnity,
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
                  measurementUnity,
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
                new charts.ChartTitle(
                  chartTitle,
                  behaviorPosition: charts.BehaviorPosition.bottom,
                  titleStyleSpec: charts.TextStyleSpec(
                    fontFamily: 'Alatsi',
                    color: charts.ColorUtil.fromDartColor(
                      Theme.of(context).accentColor,
                    ),
                  ),
                  titleOutsideJustification:
                      charts.OutsideJustification.middleDrawArea,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  /// Create one series with sample hard coded data.

}
